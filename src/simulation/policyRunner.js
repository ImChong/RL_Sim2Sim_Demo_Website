import * as ort from 'onnxruntime-web';
import { ONNXModule } from './onnxHelper.js';
import { Observations } from './observationHelpers.js';
import { TrackingHelper } from './trackingHelper.js';
import { toFloatArray } from './utils/math.js';

export class PolicyRunner {
  constructor(config, options = {}) {
    this.config = config;
    this.policyJointNames = (options.policyJointNames ?? config.policy_joint_names ?? []).slice();
    if (this.policyJointNames.length === 0) {
      throw new Error('PolicyRunner requires policy_joint_names in config');
    }
    this.numActions = this.policyJointNames.length;

    this.actionScale = toFloatArray(options.actionScale ?? config.action_scale, this.numActions, 1.0);
    this.defaultJointPos = toFloatArray(options.defaultJointPos ?? [], this.numActions, 0.0);
    this.actionClip = typeof config.action_clip === 'number' ? config.action_clip : 10.0;
    this.obsJointPosRelative = config.obs_joint_pos_relative === true;

    this.module = new ONNXModule(config.onnx);
    this.inputDict = {};
    this.isInferencing = false;
    this.lastActions = new Float32Array(this.numActions);

    this.tracking = null;
    if (config.tracking) {
      this.tracking = new TrackingHelper({
        ...config.tracking,
        policy_joint_names: this.policyJointNames
      });
    }

    this.obsModules = this._buildObsModules(config.obs_config);
    this.numObs = this.obsModules.reduce((sum, obs) => sum + (obs.size ?? 0), 0);
    this.historyLength = config.obs_config?.history_length || 1;

    // Pre-allocate arrays to reduce GC pressure during inferencing
    this.cachedJointPosRel = new Float32Array(this.numActions);
    this.historyCount = 0;
    this.fullObs = new Float32Array(this.numObs * this.historyLength);
    this.obsForPolicy = new Float32Array(this.numObs);
    this.target = new Float32Array(this.numActions);
    this._policyTensor = null;
    this._policyTensorSize = 0;
    this.onModuleInitProgress = typeof options.onInitProgress === 'function'
      ? options.onInitProgress
      : null;
  }

  async init() {
    await this.module.init((r) => this.onModuleInitProgress?.(r));
    this.reset();
  }

  _buildObsModules(obsConfig) {
    const obsList = (obsConfig && Array.isArray(obsConfig.policy)) ? obsConfig.policy : [];
    return obsList.map((obsConfigEntry) => {
      const ObsClass = Observations[obsConfigEntry.name];
      if (!ObsClass) {
        throw new Error(`Unknown observation type: ${obsConfigEntry.name}`);
      }
      const kwargs = { ...obsConfigEntry };
      delete kwargs.name;
      return new ObsClass(this, kwargs);
    });
  }

  makePolicyState(state) {
    if (!state) {
      return state;
    }
    if (!this.obsJointPosRelative) {
      return state;
    }
    const jointPosAbs = state.jointPos ?? new Float32Array(this.numActions);
    const jointPosRel = this.cachedJointPosRel;
    for (let i = 0; i < this.numActions; i++) {
      jointPosRel[i] = jointPosAbs[i] - this.defaultJointPos[i];
    }
    const rel = this._relPolicyState ?? {
      jointPos: jointPosRel,
      jointPosAbs,
      jointVel: state.jointVel,
      rootPos: state.rootPos,
      rootQuat: state.rootQuat,
      rootAngVel: state.rootAngVel,
      qvel_base: state.qvel_base,
      complianceEnabled: state.complianceEnabled,
      complianceThreshold: state.complianceThreshold,
      cmd: state.cmd
    };
    if (!this._relPolicyState) {
      this._relPolicyState = rel;
      return rel;
    }
    rel.jointPosAbs = jointPosAbs;
    rel.jointVel = state.jointVel;
    rel.rootPos = state.rootPos;
    rel.rootQuat = state.rootQuat;
    rel.rootAngVel = state.rootAngVel;
    rel.qvel_base = state.qvel_base;
    rel.complianceEnabled = state.complianceEnabled;
    rel.complianceThreshold = state.complianceThreshold;
    rel.cmd = state.cmd;
    return rel;
  }

  _bindPolicyTensor() {
    const data = this.historyLength > 1 ? this.fullObs : this.obsForPolicy;
    const size = data.length;
    if (!this._policyTensor || this._policyTensorSize !== size) {
      this._policyTensor = new ort.Tensor('float32', data, [1, size]);
      this._policyTensorSize = size;
    }
    this.inputDict.policy = this._policyTensor;
  }

  reset(state = null) {
    this.inputDict = this.module.initInput() ?? {};
    this._policyTensor = null;
    this._policyTensorSize = 0;
    this.lastActions.fill(0.0);
    this.historyCount = 0;
    if (this.tracking) {
      this.tracking.reset(state);
    }
    const policyState = this.makePolicyState(state);
    for (const obs of this.obsModules) {
      if (typeof obs.reset === 'function') {
        obs.reset(policyState);
      }
    }
  }

  async step(state) {
    if (this.isInferencing) {
      return null;
    }

    if (!state) {
      throw new Error('PolicyRunner.step requires a state object');
    }

    this.isInferencing = true;
    try {
      if (this.tracking) {
        this.tracking.advance();
      }
      const policyState = this.makePolicyState(state);

      const obsForPolicy = this.obsForPolicy;
      let offset = 0;
      for (const obs of this.obsModules) {
        if (typeof obs.update === 'function') {
          obs.update(policyState);
        }
        const obsValue = obs.compute(policyState);
        // Bolt: Use new Float32Array() instead of Float32Array.from() to avoid iterator allocation overhead
        const obsArray = ArrayBuffer.isView(obsValue) ? obsValue : new Float32Array(obsValue);
        obsForPolicy.set(obsArray, offset);
        offset += obsArray.length;
      }

      if (this.historyLength > 1) {
        const fullObs = this.fullObs;
        if (this.historyCount === 0) {
          // Initialize history by broadcasting the first observation
          for (let i = 0; i < this.historyLength; i++) {
            fullObs.set(obsForPolicy, i * this.numObs);
          }
          this.historyCount = 1;
        } else {
          // Bolt: Use native TypedArray.copyWithin to efficiently shift the history buffer
          // avoiding an array of Float32Arrays and multiple manual .set() calls per tick
          fullObs.copyWithin(0, this.numObs);
          fullObs.set(obsForPolicy, (this.historyLength - 1) * this.numObs);
          if (this.historyCount < this.historyLength) {
            this.historyCount++;
          }
        }
      }
      this._bindPolicyTensor();

      const [result, carry] = await this.module.runInference(this.inputDict);
      if (carry && Object.keys(carry).length > 0) {
        Object.assign(this.inputDict, carry);
      }

      const action = result['action']?.data;
      if (!action || action.length !== this.numActions) {
        throw new Error('PolicyRunner received invalid action output');
      }

      const clip = typeof this.actionClip === 'number' ? this.actionClip : Infinity;
      for (let i = 0; i < this.numActions; i++) {
        const value = action[i];
        const clamped = clip !== Infinity ? Math.max(-clip, Math.min(clip, value)) : value;
        this.lastActions[i] = clamped;
      }

      const target = this.target;
      for (let i = 0; i < this.numActions; i++) {
        target[i] = this.defaultJointPos[i] + this.actionScale[i] * this.lastActions[i];
      }

      return target;
    } finally {
      this.isInferencing = false;
    }
  }
}
