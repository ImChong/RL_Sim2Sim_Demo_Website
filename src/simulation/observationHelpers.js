import * as THREE from 'three';
import {
  normalizeQuat,
  quatMultiply,
  quatInverse,
  quatApplyInv,
  quatToRot6d,
  clampFutureIndices
} from './utils/math.js';

class BootIndicator {
  constructor() {
    this.out = new Float32Array(1);
  }

  get size() {
    return 1;
  }

  compute() {
    this.out[0] = 0.0;
    return this.out;
  }
}

class ComplianceFlagObs {
  constructor() {
    this.out = new Float32Array(3);
  }

  get size() {
    return 3;
  }

  compute(state) {
    const enabled = state?.complianceEnabled ? 1.0 : 0.0;
    const rawThreshold = Number(state?.complianceThreshold);
    const threshold = Number.isFinite(rawThreshold) ? rawThreshold : 0.0;
    const kp = threshold / 0.05;
    this.out[0] = enabled;
    this.out[1] = enabled * threshold;
    this.out[2] = enabled * kp;
    return this.out;
  }
}

class RootAngVelB {
  constructor() {
    this.out = new Float32Array(3);
  }

  get size() {
    return 3;
  }

  compute(state) {
    this.out[0] = state.rootAngVel[0];
    this.out[1] = state.rootAngVel[1];
    this.out[2] = state.rootAngVel[2];
    return this.out;
  }
}

class ProjectedGravityB {
  constructor() {
    this.gravity = [0.0, 0.0, -1.0];
    this.out = new Float32Array(3);
    this._quat = new Float32Array(4);
  }

  get size() {
    return 3;
  }

  compute(state) {
    normalizeQuat(state.rootQuat, this._quat);
    quatApplyInv(this._quat, this.gravity, this.out);
    return this.out;
  }
}

class JointPos {
  constructor(policy, kwargs = {}) {
    const { pos_steps = [0, 1, 2, 3, 4, 8] } = kwargs;
    this.posSteps = pos_steps.slice();
    this.numJoints = policy.numActions;

    this.maxStep = Math.max(...this.posSteps);
    this.history = new Float32Array((this.maxStep + 1) * this.numJoints);
    this.out = new Float32Array(this.posSteps.length * this.numJoints);

    // Bolt: Pre-calculate subarray views to avoid allocations in compute()
    this.cachedViews = new Array(this.posSteps.length);
    for (let i = 0; i < this.posSteps.length; i++) {
      const idx = Math.min(this.posSteps[i], this.maxStep);
      const start = idx * this.numJoints;
      this.cachedViews[i] = this.history.subarray(start, start + this.numJoints);
    }
  }

  get size() {
    return this.posSteps.length * this.numJoints;
  }

  reset(state) {
    if (!this.fallbackJointPos) {
      this.fallbackJointPos = new Float32Array(this.numJoints);
    }
    const source = state?.jointPos ?? this.fallbackJointPos;
    for (let i = 0; i <= this.maxStep; i++) {
      this.history.set(source, i * this.numJoints);
    }
  }

  update(state) {
    this.history.copyWithin(this.numJoints, 0, this.maxStep * this.numJoints);
    this.history.set(state.jointPos, 0);
  }

  compute() {
    let offset = 0;
    for (let i = 0; i < this.cachedViews.length; i++) {
      this.out.set(this.cachedViews[i], offset);
      offset += this.numJoints;
    }
    return this.out;
  }
}

class TrackingCommandObsRaw {
  constructor(policy, kwargs = {}) {
    this.policy = policy;
    this.futureSteps = kwargs.future_steps ?? [0, 2, 4, 8, 16];
    const nFut = this.futureSteps.length;
    this.outputLength = (nFut - 1) * 3 + nFut * 6;
    this.out = new Float32Array(this.outputLength);
    this._baseQuat = new Float32Array(4);
    this._diff = new Float32Array(3);
    this._diffB = new Float32Array(3);
    this._qCur = new Float32Array(4);
    this._qCurInv = new Float32Array(4);
    this._refQuat = new Float32Array(4);
    this._rel = new Float32Array(4);
    this._r6 = new Float32Array(6);
    this._indices = new Int32Array(this.futureSteps.length);
  }

  get size() {
    return this.outputLength;
  }

  compute(state) {
    const tracking = this.policy.tracking;
    if (!tracking || !tracking.isReady()) {
      this.out.fill(0.0);
      return this.out;
    }

    const baseIdx = tracking.refIdx;
    const refLen = tracking.refLen;
    const indices = clampFutureIndices(baseIdx, this.futureSteps, refLen, this._indices);

    const basePos = tracking.refRootPos[indices[0]];
    normalizeQuat(tracking.refRootQuat[indices[0]], this._baseQuat);

    let offset = 0;
    for (let i = 1; i < indices.length; i++) {
      const pos = tracking.refRootPos[indices[i]];
      this._diff[0] = pos[0] - basePos[0];
      this._diff[1] = pos[1] - basePos[1];
      this._diff[2] = pos[2] - basePos[2];
      quatApplyInv(this._baseQuat, this._diff, this._diffB);
      this.out[offset++] = this._diffB[0];
      this.out[offset++] = this._diffB[1];
      this.out[offset++] = this._diffB[2];
    }

    normalizeQuat(state.rootQuat, this._qCur);
    quatInverse(this._qCur, this._qCurInv);

    for (let i = 0; i < indices.length; i++) {
      normalizeQuat(tracking.refRootQuat[indices[i]], this._refQuat);
      quatMultiply(this._qCurInv, this._refQuat, this._rel);
      quatToRot6d(this._rel, this._r6);
      this.out[offset++] = this._r6[0];
      this.out[offset++] = this._r6[1];
      this.out[offset++] = this._r6[2];
      this.out[offset++] = this._r6[3];
      this.out[offset++] = this._r6[4];
      this.out[offset++] = this._r6[5];
    }

    return this.out;
  }
}

class TargetRootZObs {
  constructor(policy, kwargs = {}) {
    this.policy = policy;
    this.futureSteps = kwargs.future_steps ?? [0, 2, 4, 8, 16];
    this.out = new Float32Array(this.size);
    this._indices = new Int32Array(this.futureSteps.length);
  }

  get size() {
    return this.futureSteps.length;
  }

  compute() {
    const tracking = this.policy.tracking;
    if (!tracking || !tracking.isReady()) {
      this.out.fill(0.0);
      return this.out;
    }
    const indices = clampFutureIndices(tracking.refIdx, this.futureSteps, tracking.refLen, this._indices);
    for (let i = 0; i < indices.length; i++) {
      this.out[i] = tracking.refRootPos[indices[i]][2] + 0.035;
    }
    return this.out;
  }
}

class TargetJointPosObs {
  constructor(policy, kwargs = {}) {
    this.policy = policy;
    this.futureSteps = kwargs.future_steps ?? [0, 2, 4, 8, 16];
    this._indices = new Int32Array(this.futureSteps.length);
    // We lazily allocate this since size depends on policy.tracking.nJoints
    this.out = null;
    this._empty = new Float32Array(0);
  }

  get size() {
    const nJoints = this.policy.tracking?.nJoints ?? 0;
    return this.futureSteps.length * nJoints * 2;
  }

  compute(state) {
    if (!this.out && this.size > 0) {
      this.out = new Float32Array(this.size);
    }

    const tracking = this.policy.tracking;
    if (!tracking || !tracking.isReady()) {
      if (this.out) {
        this.out.fill(0.0);
        return this.out;
      }
      return this._empty;
    }

    if (!this.fallbackJointPos) {
      this.fallbackJointPos = new Float32Array(tracking.nJoints);
    }

    const indices = clampFutureIndices(tracking.refIdx, this.futureSteps, tracking.refLen, this._indices);
    const current = state?.jointPos ?? this.fallbackJointPos;
    let offset = 0;
    const halfLen = indices.length * tracking.nJoints;

    for (const idx of indices) {
      const target = tracking.refJointPos[idx];
      this.out.set(target, offset);
      for (let j = 0; j < tracking.nJoints; j++) {
        this.out[halfLen + offset + j] = target[j] - (current[j] ?? 0.0);
      }
      offset += tracking.nJoints;
    }
    return this.out;
  }
}

class TargetProjectedGravityBObs {
  constructor(policy, kwargs = {}) {
    this.policy = policy;
    this.futureSteps = kwargs.future_steps ?? [0, 2, 4, 8, 16];
    this.out = new Float32Array(this.size);
    this._quat = new Float32Array(4);
    this._gLocal = new Float32Array(3);
    this.g = [0.0, 0.0, -1.0];
    this._indices = new Int32Array(this.futureSteps.length);
  }

  get size() {
    return this.futureSteps.length * 3;
  }

  compute() {
    const tracking = this.policy.tracking;
    if (!tracking || !tracking.isReady()) {
      this.out.fill(0.0);
      return this.out;
    }
    const indices = clampFutureIndices(tracking.refIdx, this.futureSteps, tracking.refLen, this._indices);
    let offset = 0;
    for (const idx of indices) {
      normalizeQuat(tracking.refRootQuat[idx], this._quat);
      quatApplyInv(this._quat, this.g, this._gLocal);
      this.out[offset++] = this._gLocal[0];
      this.out[offset++] = this._gLocal[1];
      this.out[offset++] = this._gLocal[2];
    }
    return this.out;
  }
}


class PrevActions {
  /**
   * 
   * @param {mujoco.Model} model 
   * @param {mujoco.Simulation} simulation 
   * @param {MuJoCoDemo} demo
   * @param {number} steps 
   */
  constructor(policy, kwargs = {}) {
    this.policy = policy;
    const { history_steps = 4 } = kwargs;
    this.steps = Math.max(1, Math.floor(history_steps));
    this.numActions = policy.numActions;
    this.actionBuffer = new Float32Array(this.steps * this.numActions);
    this.fallbackActions = new Float32Array(this.numActions);
  }

  /**
   * 
   * @param {dict} extra_info
   * @returns {Float32Array}
   */
  compute() {
    return this.actionBuffer;
  }

  reset() {
    this.actionBuffer.fill(0.0);
  }

  update() {
    this.actionBuffer.copyWithin(this.numActions, 0, (this.steps - 1) * this.numActions);
    const source = this.policy?.lastActions ?? this.fallbackActions;
    this.actionBuffer.set(source, 0);
  }

  get size() {
    return this.steps * this.numActions;
  }
}



class JointVel {
  constructor(policy, kwargs = {}) {
    const { vel_steps = [0] } = kwargs;
    this.velSteps = vel_steps.slice();
    this.numJoints = policy.numActions;

    this.maxStep = Math.max(...this.velSteps);
    this.history = new Float32Array((this.maxStep + 1) * this.numJoints);
    this.out = new Float32Array(this.velSteps.length * this.numJoints);

    // Bolt: Pre-calculate subarray views to avoid allocations in compute()
    this.cachedViews = new Array(this.velSteps.length);
    for (let i = 0; i < this.velSteps.length; i++) {
      const idx = Math.min(this.velSteps[i], this.maxStep);
      const start = idx * this.numJoints;
      this.cachedViews[i] = this.history.subarray(start, start + this.numJoints);
    }
  }

  get size() {
    return this.velSteps.length * this.numJoints;
  }

  reset(state) {
    if (!this.fallbackJointVel) {
      this.fallbackJointVel = new Float32Array(this.numJoints);
    }
    const source = state?.jointVel ?? this.fallbackJointVel;
    for (let i = 0; i <= this.maxStep; i++) {
      this.history.set(source, i * this.numJoints);
    }
  }

  update(state) {
    this.history.copyWithin(this.numJoints, 0, this.maxStep * this.numJoints);
    this.history.set(state.jointVel, 0);
  }

  compute() {
    let offset = 0;
    for (let i = 0; i < this.cachedViews.length; i++) {
      this.out.set(this.cachedViews[i], offset);
      offset += this.numJoints;
    }
    return this.out;
  }
}

class Command {
  constructor() {
    this.out = new Float32Array(3);
    this.fallbackCmd = new Float32Array([0, 0, 0]);
  }

  get size() {
    return 3;
  }

  compute(state) {
    const cmd = state?.cmd ?? this.fallbackCmd;
    this.out[0] = cmd[0];
    this.out[1] = cmd[1];
    this.out[2] = cmd[2];
    return this.out;
  }
}

// Export a dictionary of all observation classes
export const Observations = {
  Command,
  JointVel,
  PrevActions,
  BootIndicator,
  ComplianceFlagObs,
  RootAngVelB,
  ProjectedGravityB,
  JointPos,
  TrackingCommandObsRaw,
  TargetRootZObs,
  TargetJointPosObs,
  TargetProjectedGravityBObs
};
