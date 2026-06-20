import { decomposeObsBlockNodes } from './pipelineObsNodes.js';
import {
  formatFloat,
  sampleArray,
  summarizeArray
} from './policyTelemetry.js';
import {
  buildParkourObsLayout,
  getParkourPolicyConfig,
  PARKOUR_DEPTH_CAMERA
} from './parkourPolicyConfig.js';

function shortJointName(name) {
  if (!name) {
    return 'j';
  }
  return name
    .replace(/_joint$/, '')
    .replace(/^left_/, 'L_')
    .replace(/^right_/, 'R_');
}

function jointDimLines(count, zh) {
  return [{ k: zh ? '维度' : 'dim', v: `${count}D` }];
}

function jointLines(jointNames, max = Infinity) {
  const lines = [];
  const n = Math.min(jointNames.length, max);
  for (let i = 0; i < n; i++) {
    lines.push({ k: shortJointName(jointNames[i]) });
  }
  if (jointNames.length > n) {
    lines.push({ k: '…', v: `+${jointNames.length - n}` });
  }
  return lines;
}

function nodeHeight(lineCount) {
  const HEAD = 48;
  const CARD_PAD_V = 22;
  const LINE = 19;
  return Math.max(72, HEAD + CARD_PAD_V + lineCount * LINE);
}

function vec3Lines(prefix = '') {
  return [
    { k: `${prefix}x` },
    { k: `${prefix}y` },
    { k: `${prefix}z` }
  ];
}

function pickLanguage(lang) {
  return lang === 'zh' ? 'zh' : 'en';
}

function buildParkourMotorSample(snapshot, jointCount = 3) {
  const joints = snapshot?.motorJoints ?? [];
  return joints.slice(0, jointCount);
}

/**
 * @param {ReturnType<getParkourPolicyConfig>} config
 * @param {object | null} snapshot
 * @param {'zh'|'en'} lang
 */
export function buildParkourAtomicNodes(config, snapshot, lang = 'zh') {
  const zh = lang === 'zh';
  const jointNames = snapshot?.jointNames?.length
    ? snapshot.jointNames
    : config.jointNames;
  const obsLayout = config.obsLayout ?? buildParkourObsLayout(config.observationNames, jointNames.length);
  const obsVector = snapshot?.obsVector ?? new Float32Array(
    obsLayout.reduce((sum, block) => sum + block.size, 0)
  );
  const state = snapshot?.state ?? null;
  const nodes = [];

  const push = (spec) => {
    const lines = spec.lines ?? [];
    nodes.push({
      width: spec.kind === 'joints' ? 248 : 184,
      height: nodeHeight(lines.length),
      ...spec
    });
  };

  push({
    id: 'sim-root-pos',
    kind: 'signal',
    group: 'sim',
    title: zh ? '根位置' : 'Root Position',
    subtitle: 'x, y, z',
    lines: vec3Lines('')
  });

  push({
    id: 'sim-root-quat',
    kind: 'signal',
    group: 'sim',
    title: zh ? '根姿态' : 'Root Orientation',
    subtitle: 'w, x, y, z',
    lines: [
      { k: 'w' },
      { k: 'x' },
      { k: 'y' },
      { k: 'z' }
    ]
  });

  push({
    id: 'sim-root-angvel',
    kind: 'signal',
    group: 'sim',
    title: zh ? '根角速度' : 'Root AngVel',
    subtitle: zh ? '机体系' : 'body frame',
    lines: vec3Lines('')
  });

  push({
    id: 'sim-joint-pos',
    kind: 'joints',
    group: 'sim',
    title: zh ? '关节位置' : 'Joint Position',
    subtitle: zh ? 'MuJoCo qpos' : 'MuJoCo qpos',
    lines: jointDimLines(jointNames.length, zh)
  });

  push({
    id: 'sim-joint-vel',
    kind: 'joints',
    group: 'sim',
    title: zh ? '关节速度' : 'Joint Velocity',
    subtitle: zh ? 'MuJoCo qvel' : 'MuJoCo qvel',
    lines: jointDimLines(jointNames.length, zh)
  });

  push({
    id: 'prep-depth-capture',
    kind: 'process',
    group: 'preprocess',
    title: zh ? '深度采集' : 'Depth capture',
    subtitle: zh ? '前向深度相机' : 'forward depth cam',
    width: 248,
    lines: [
      { k: zh ? '分辨率' : 'size', v: `${PARKOUR_DEPTH_CAMERA.width}×${PARKOUR_DEPTH_CAMERA.height}` },
      { k: 'FOV', v: `${PARKOUR_DEPTH_CAMERA.horizontalFovDeg}°` },
      { k: zh ? '量程' : 'range', v: `${PARKOUR_DEPTH_CAMERA.minRange}–${PARKOUR_DEPTH_CAMERA.maxRange}m` }
    ]
  });

  push({
    id: 'prep-depth-backbone',
    kind: 'process',
    group: 'preprocess',
    title: zh ? '深度骨干' : 'Depth backbone',
    subtitle: zh ? 'ONNX 嵌入' : 'ONNX embedding',
    width: 248,
    lines: [
      { k: 'ONNX', v: config.onnx.depthBackbonePath.split('/').pop() ?? 'depth_backbone.onnx' }
    ]
  });

  push({
    id: 'prep-virtual-input',
    kind: 'process',
    group: 'preprocess',
    title: zh ? '虚拟摇杆' : 'Virtual input',
    subtitle: zh ? 'W/A/D + Shift' : 'W/A/D + Shift',
    lines: [{ k: zh ? '维度' : 'dim', v: '15D' }]
  });

  for (const block of obsLayout) {
    const slice = Array.isArray(obsVector)
      ? obsVector.slice(block.offset, block.offset + block.size)
      : obsVector.subarray(block.offset, block.offset + block.size);
    const parts = decomposeObsBlockNodes(block, slice, jointNames, lang, jointNames.length);
    for (const part of parts) {
      push(part);
    }
  }

  push({
    id: 'out-action',
    kind: 'joints',
    group: 'output',
    title: zh ? '动作' : 'Action',
    subtitle: zh ? '策略输出' : 'policy output',
    lines: jointLines(jointNames),
    scrollable: true
  });

  push({
    id: 'out-target',
    kind: 'joints',
    group: 'output',
    title: zh ? '关节目标' : 'Joint Target',
    subtitle: zh ? 'PD 目标角' : 'PD target',
    lines: jointLines(jointNames),
    scrollable: true
  });

  const motorJoints = buildParkourMotorSample(snapshot, jointNames.length);
  if (motorJoints.length > 0) {
    push({
      id: 'motor-torque',
      kind: 'joints',
      group: 'motor',
      title: zh ? '关节力矩' : 'Joint Torque',
      subtitle: 'τ = kp·Δq + kd·Δẋ',
      lines: jointLines(motorJoints.map((joint) => joint.name)),
      scrollable: true
    });
  }

  return nodes;
}

/**
 * @param {object | null} snapshot Live iframe snapshot or null for scaffold mode.
 * @param {{ lang?: string, config?: ReturnType<getParkourPolicyConfig> }} [options]
 */
export function buildParkourPolicyTelemetry(snapshot, options = {}) {
  const lang = pickLanguage(options.lang);
  const config = options.config ?? getParkourPolicyConfig();
  const jointNames = snapshot?.jointNames?.length
    ? snapshot.jointNames
    : config.jointNames;
  const obsLayout = config.obsLayout ?? buildParkourObsLayout(config.observationNames, jointNames.length);
  const obsVector = snapshot?.obsVector ?? new Float32Array(
    obsLayout.reduce((sum, block) => sum + block.size, 0)
  );
  const live = Boolean(snapshot?.ready);
  const state = snapshot?.state ?? null;

  if (!live) {
    const atomicNodes = buildParkourAtomicNodes(config, null, lang);
    return {
      ready: true,
      live: false,
      lang,
      policyFamily: 'parkour',
      jointNames: jointNames.slice(),
      atomicNodes,
      concat: {
        currentFrameSize: config.numObs,
        historyLength: 1,
        historyCount: 1,
        tensorSize: config.numObs,
        tensorPreview: [],
        tensorStats: { min: 0, max: 0, mean: 0 }
      },
      onnx: {
        inKeys: config.onnx.meta.in_keys,
        outKeys: config.onnx.meta.out_keys,
        inputShape: [1, config.numObs],
        inputPreview: [],
        rawAction: [],
        clippedAction: [],
        extraOutputs: {},
        architecture: null,
        depthBackbonePath: config.onnx.depthBackbonePath
      },
      model: {
        path: config.onnx.path,
        depthBackbonePath: config.onnx.depthBackbonePath,
        isRecurrent: false,
        numActions: config.numActions,
        numObs: config.numObs,
        historyLength: 1,
        historyCount: 1,
        normalizerNote: lang === 'zh'
          ? '跑酷策略使用深度骨干 + 学生网络两阶段推理；观测向量由 iframe 内策略控制器构造。'
          : 'Parkour uses a depth backbone plus student policy; the observation vector is built inside the embedded demo.'
      }
    };
  }

  const obsBlocks = obsLayout.map((block) => {
    const slice = Array.isArray(obsVector)
      ? obsVector.slice(block.offset, block.offset + block.size)
      : obsVector.subarray(block.offset, block.offset + block.size);
    return {
      ...block,
      description: block.name,
      values: sampleArray(slice, 6),
      stats: summarizeArray(slice)
    };
  });

  const latestAction = snapshot.latestAction ?? [];
  const latestTarget = snapshot.latestTarget ?? [];
  const motorJoints = buildParkourMotorSample(snapshot, config.numActions);
  const atomicNodes = buildParkourAtomicNodes(config, snapshot, lang);

  return {
    ready: true,
    live: true,
    lang,
    timestamp: snapshot.timestamp ?? 0,
    stepCount: snapshot.stepCount ?? 0,
    policyFamily: 'parkour',
    jointNames: jointNames.slice(),
    preprocessing: {
      obsJointPosRelative: true,
      actionClip: null,
      cmd: state?.virtualInput?.slice?.(0, 3) ?? [0, 0, 0],
      rootPos: sampleArray(state?.rootPos, 3),
      rootAngVel: sampleArray(state?.rootAngVel, 3),
      rootQuat: state?.rootQuat ? [...state.rootQuat] : [],
      jointPosSample: sampleArray(state?.jointPos, 4),
      jointVelSample: sampleArray(state?.jointVel, 4),
      jointPosAll: state?.jointPos ? [...state.jointPos] : [],
      jointVelAll: state?.jointVel ? [...state.jointVel] : [],
      depthReady: Boolean(snapshot.depthReady)
    },
    obsBlocks,
    atomicNodes,
    concat: {
      currentFrameSize: config.numObs,
      historyLength: 1,
      historyCount: 1,
      tensorSize: config.numObs,
      tensorPreview: sampleArray(obsVector, 8),
      tensorStats: summarizeArray(obsVector)
    },
    onnx: {
      inKeys: config.onnx.meta.in_keys,
      outKeys: config.onnx.meta.out_keys,
      inputShape: [1, config.numObs],
      inputPreview: sampleArray(obsVector, 8),
      rawAction: sampleArray(latestAction, 6),
      clippedAction: sampleArray(latestAction, 6),
      extraOutputs: {},
      architecture: null,
      depthBackbonePath: config.onnx.depthBackbonePath
    },
    postprocess: {
      formula: lang === 'zh'
        ? 'target[i] = defaultJointPos[i] + actionScale[i] × action[i]'
        : 'target[i] = defaultJointPos[i] + actionScale[i] × action[i]',
      actionScaleSample: sampleArray(snapshot.actionScale, 4),
      defaultJointPosSample: sampleArray(snapshot.defaultJointPos, 4),
      targetSample: sampleArray(latestTarget, 6),
      targetStats: summarizeArray(latestTarget)
    },
    motor: {
      controlType: 'pd',
      decimation: 1,
      policyHz: snapshot.simStepHz ?? 0,
      joints: motorJoints
    },
    model: {
      path: config.onnx.path,
      depthBackbonePath: config.onnx.depthBackbonePath,
      isRecurrent: false,
      numActions: config.numActions,
      numObs: config.numObs,
      historyLength: 1,
      historyCount: 1,
      normalizerNote: lang === 'zh'
        ? '跑酷策略使用深度骨干 + 学生网络两阶段推理；深度图经骨干网络后与本体观测拼接送入学生策略。'
        : 'Parkour runs depth backbone + student policy; depth embeddings are fused with proprioception for the student net.'
    },
    parkour: {
      latestAction: sampleArray(latestAction, 6),
      latestTarget: sampleArray(latestTarget, 6),
      prevActions: sampleArray(snapshot.prevActions, 6),
      depthReady: Boolean(snapshot.depthReady),
      obsLayout
    }
  };
}

export function formatParkourFloat(value, digits = 3) {
  return formatFloat(value, digits);
}
