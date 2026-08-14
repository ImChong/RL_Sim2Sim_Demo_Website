import { decomposeObsBlockNodes } from './pipelineObsNodes.js';
import { shortJointName } from './jointLabels.js';

const VEC3_KEYS = ['x', 'y', 'z'];
const QUAT_KEYS = ['w', 'x', 'y', 'z'];

/**
 * Scope channel keys for a per-joint node: one curve per policy joint.
 * Node cards only render a dimension summary, so the full channel list has to
 * travel with the node for the oscilloscope to plot every joint.
 * @param {string[]} jointNames
 */
function jointProbeKeys(jointNames) {
  return (jointNames ?? []).map((name) => shortJointName(name));
}

function vec3Lines(prefix) {
  return [
    { k: `${prefix}x` },
    { k: `${prefix}y` },
    { k: `${prefix}z` }
  ];
}

function jointDimLines(count, zh) {
  return [{ k: zh ? '维度' : 'dim', v: `${count}D` }];
}

function jointLines(jointNames, max = Infinity) {
  const lines = [];
  const n = Math.min(jointNames.length, max);
  for (let i = 0; i < n; i++) {
    lines.push({
      k: shortJointName(jointNames[i])
    });
  }
  if (jointNames.length > n) {
    lines.push({
      k: '…',
      v: `+${jointNames.length - n}`
    });
  }
  return lines;
}

function nodeHeight(lineCount) {
  const HEAD = 48;
  const CARD_PAD_V = 22;
  const LINE = 19;
  return Math.max(72, HEAD + CARD_PAD_V + lineCount * LINE);
}

function decomposeObsBlock(block, slice, jointNames, lang) {
  return decomposeObsBlockNodes(block, slice, jointNames, lang, jointNames.length);
}

/**
 * @param {import('./policyRunner.js').PolicyRunner} runner
 * @param {object | null} state
 * @param {Float32Array} obsVector
 * @param {ReturnType<import('./policyTelemetry.js').buildObsLayout>} obsLayout
 * @param {'zh'|'en'} lang
 */
export function buildAtomicNodes(runner, state, obsVector, obsLayout, lang = 'zh', motorJoints = []) {
  const zh = lang === 'zh';
  const jointNames = runner.policyJointNames ?? [];
  const nodes = [];

  const push = (spec) => {
    const lines = spec.lines ?? [];
    nodes.push({
      width: spec.kind === 'joints' ? 248 : 184,
      height: nodeHeight(lines.length),
      ...spec
    });
  };

  const rootQuat = state?.rootQuat;
  const cmd = state?.cmd ?? [0, 0, 0];
  const jointKeys = jointProbeKeys(jointNames);

  push({
    id: 'sim-root-pos',
    kind: 'signal',
    group: 'sim',
    title: zh ? '根位置' : 'Root Position',
    subtitle: 'x, y, z',
    lines: vec3Lines(''),
    probeKeys: VEC3_KEYS
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
    ],
    probeKeys: QUAT_KEYS
  });

  push({
    id: 'sim-root-angvel',
    kind: 'signal',
    group: 'sim',
    title: zh ? '根角速度' : 'Root AngVel',
    subtitle: zh ? '机体系' : 'body frame',
    lines: vec3Lines(''),
    probeKeys: VEC3_KEYS
  });

  push({
    id: 'sim-joint-pos',
    kind: 'joints',
    group: 'sim',
    title: zh ? '关节位置' : 'Joint Position',
    subtitle: zh ? 'MuJoCo qpos' : 'MuJoCo qpos',
    lines: jointDimLines(jointNames.length, zh),
    probeKeys: jointKeys
  });

  push({
    id: 'sim-joint-vel',
    kind: 'joints',
    group: 'sim',
    title: zh ? '关节速度' : 'Joint Velocity',
    subtitle: zh ? 'MuJoCo qvel' : 'MuJoCo qvel',
    lines: jointDimLines(jointNames.length, zh),
    probeKeys: jointKeys
  });

  push({
    id: 'sim-cmd-vx',
    kind: 'signal',
    group: 'sim',
    title: zh ? '速度指令 vx' : 'Cmd vx',
    lines: [{ k: 'vx' }],
    probeKeys: ['vx']
  });
  push({
    id: 'sim-cmd-vy',
    kind: 'signal',
    group: 'sim',
    title: zh ? '速度指令 vy' : 'Cmd vy',
    lines: [{ k: 'vy' }],
    probeKeys: ['vy']
  });
  push({
    id: 'sim-cmd-yaw',
    kind: 'signal',
    group: 'sim',
    title: zh ? '速度指令 yaw' : 'Cmd yaw',
    lines: [{ k: 'yaw' }],
    probeKeys: ['yaw']
  });

  if (runner.obsJointPosRelative) {
    push({
      id: 'prep-joint-rel',
      kind: 'process',
      group: 'preprocess',
      title: zh ? '关节相对化' : 'Joint relative',
      subtitle: zh ? 'q − default' : 'q − default',
      lines: jointLines(jointNames),
      probeKeys: jointKeys,
      width: 248
    });
  }

  push({
    id: 'prep-action-clip',
    kind: 'process',
    group: 'preprocess',
    title: zh ? '动作裁剪' : 'Action clip',
    lines: [{ k: '±', v: String(runner.actionClip) }],
    // Static configuration, not a live signal.
    probeKeys: []
  });

  for (const block of obsLayout) {
    const slice = obsVector.subarray(block.offset, block.offset + block.size);
    const parts = decomposeObsBlock(block, slice, jointNames, lang);
    for (const part of parts) {
      push(part);
    }
  }

  push({
    id: 'out-action',
    kind: 'joints',
    group: 'output',
    title: zh ? '动作' : 'Action',
    subtitle: zh ? 'clip 后' : 'after clip',
    lines: jointLines(jointNames),
    probeKeys: jointKeys,
    scrollable: true
  });

  push({
    id: 'out-target',
    kind: 'joints',
    group: 'output',
    title: zh ? '关节目标' : 'Joint Target',
    subtitle: zh ? '下发目标角' : 'commanded q',
    lines: jointLines(jointNames),
    probeKeys: jointKeys,
    scrollable: true
  });

  if (motorJoints.length > 0) {
    push({
      id: 'motor-torque',
      kind: 'joints',
      group: 'motor',
      title: zh ? '电机力矩' : 'Motor Torque',
      subtitle: 'τ → ctrl',
      lines: motorJoints.map((j) => ({
        k: shortJointName(j.name)
      })),
      probeKeys: motorJoints.map((j) => shortJointName(j.name)),
      scrollable: true
    });
  }

  return nodes;
}
