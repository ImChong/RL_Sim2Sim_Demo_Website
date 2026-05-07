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
  }

  get size() {
    return 3;
  }

  compute(state) {
    const quat = normalizeQuat(state.rootQuat);
    const gLocal = quatApplyInv(quat, this.gravity);
    this.out[0] = gLocal[0];
    this.out[1] = gLocal[1];
    this.out[2] = gLocal[2];
    return this.out;
  }
}

class JointPos {
  constructor(policy, kwargs = {}) {
    const { pos_steps = [0, 1, 2, 3, 4, 8] } = kwargs;
    this.posSteps = pos_steps.slice();
    this.numJoints = policy.numActions;

    this.maxStep = Math.max(...this.posSteps);
    this.history = Array.from({ length: this.maxStep + 1 }, () => new Float32Array(this.numJoints));
    this.out = new Float32Array(this.posSteps.length * this.numJoints);
  }

  get size() {
    return this.posSteps.length * this.numJoints;
  }

  reset(state) {
    const source = state?.jointPos ?? new Float32Array(this.numJoints);
    this.history[0].set(source);
    for (let i = 1; i < this.history.length; i++) {
      this.history[i].set(this.history[0]);
    }
  }

  update(state) {
    for (let i = this.history.length - 1; i > 0; i--) {
      this.history[i].set(this.history[i - 1]);
    }
    this.history[0].set(state.jointPos);
  }

  compute() {
    let offset = 0;
    for (const step of this.posSteps) {
      const idx = Math.min(step, this.history.length - 1);
      this.out.set(this.history[idx], offset);
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
    const indices = clampFutureIndices(baseIdx, this.futureSteps, refLen);

    const basePos = tracking.refRootPos[indices[0]];
    const baseQuat = normalizeQuat(tracking.refRootQuat[indices[0]]);

    let offset = 0;
    for (let i = 1; i < indices.length; i++) {
      const pos = tracking.refRootPos[indices[i]];
      const diff = [pos[0] - basePos[0], pos[1] - basePos[1], pos[2] - basePos[2]];
      const diffB = quatApplyInv(baseQuat, diff);
      this.out[offset++] = diffB[0];
      this.out[offset++] = diffB[1];
      this.out[offset++] = diffB[2];
    }

    const qCur = normalizeQuat(state.rootQuat);
    const qCurInv = quatInverse(qCur);

    for (let i = 0; i < indices.length; i++) {
      const refQuat = normalizeQuat(tracking.refRootQuat[indices[i]]);
      const rel = quatMultiply(qCurInv, refQuat);
      const r6 = quatToRot6d(rel);
      this.out[offset++] = r6[0];
      this.out[offset++] = r6[1];
      this.out[offset++] = r6[2];
      this.out[offset++] = r6[3];
      this.out[offset++] = r6[4];
      this.out[offset++] = r6[5];
    }

    return this.out;
  }
}

class TargetRootZObs {
  constructor(policy, kwargs = {}) {
    this.policy = policy;
    this.futureSteps = kwargs.future_steps ?? [0, 2, 4, 8, 16];
    this.out = new Float32Array(this.size);
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
    const indices = clampFutureIndices(tracking.refIdx, this.futureSteps, tracking.refLen);
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

    // We lazily allocate this since size depends on policy.tracking.nJoints
    this.out = null;
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
      if (this.out) this.out.fill(0.0);
      return this.out ?? new Float32Array(0);
    }

    const indices = clampFutureIndices(tracking.refIdx, this.futureSteps, tracking.refLen);
    const current = state?.jointPos ?? new Float32Array(tracking.nJoints);
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
    const indices = clampFutureIndices(tracking.refIdx, this.futureSteps, tracking.refLen);
    const g = [0.0, 0.0, -1.0];
    let offset = 0;
    for (const idx of indices) {
      const quat = normalizeQuat(tracking.refRootQuat[idx]);
      const gLocal = quatApplyInv(quat, g);
      this.out[offset++] = gLocal[0];
      this.out[offset++] = gLocal[1];
      this.out[offset++] = gLocal[2];
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
    this.actionBuffer = Array.from({ length: this.steps }, () => new Float32Array(this.numActions));
    this.out = new Float32Array(this.steps * this.numActions);
  }

  /**
   * 
   * @param {dict} extra_info
   * @returns {Float32Array}
   */
  compute() {
    let offset = 0;
    for (let i = 0; i < this.steps; i++) {
      this.out.set(this.actionBuffer[i], offset);
      offset += this.numActions;
    }
    return this.out;
  }

  reset() {
    for (const buffer of this.actionBuffer) {
      buffer.fill(0.0);
    }
  }

  update() {
    for (let i = this.actionBuffer.length - 1; i > 0; i--) {
      this.actionBuffer[i].set(this.actionBuffer[i - 1]);
    }
    const source = this.policy?.lastActions ?? new Float32Array(this.numActions);
    this.actionBuffer[0].set(source);
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
    this.history = Array.from({ length: this.maxStep + 1 }, () => new Float32Array(this.numJoints));
    this.out = new Float32Array(this.velSteps.length * this.numJoints);
  }

  get size() {
    return this.velSteps.length * this.numJoints;
  }

  reset(state) {
    const source = state?.jointVel ?? new Float32Array(this.numJoints);
    this.history[0].set(source);
    for (let i = 1; i < this.history.length; i++) {
      this.history[i].set(this.history[0]);
    }
  }

  update(state) {
    for (let i = this.history.length - 1; i > 0; i--) {
      this.history[i].set(this.history[i - 1]);
    }
    this.history[0].set(state.jointVel);
  }

  compute() {
    for (let i = 0; i < this.velSteps.length; i++) {
      const step = this.velSteps[i];
      this.out.set(this.history[step], i * this.numJoints);
    }
    return this.out;
  }
}

class Command {
  constructor() {
    this.out = new Float32Array(3);
  }

  get size() {
    return 3;
  }

  compute(state) {
    const cmd = state?.cmd ?? [0, 0, 0];
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
