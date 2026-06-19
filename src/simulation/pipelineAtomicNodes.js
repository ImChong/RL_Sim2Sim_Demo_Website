function shortJointName(name) {
  if (!name) {
    return 'j';
  }
  return name
    .replace(/_joint$/, '')
    .replace(/^left_/, 'L_')
    .replace(/^right_/, 'R_');
}

function vec3Lines(prefix) {
  return [
    { k: `${prefix}x` },
    { k: `${prefix}y` },
    { k: `${prefix}z` }
  ];
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
  const zh = lang === 'zh';
  const data = slice ?? [];
  const idBase = `obs-${block.name}`;

  switch (block.name) {
    case 'RootAngVelB':
      return [{
        id: idBase,
        kind: 'signal',
        group: 'obs',
        title: zh ? '根角速度' : 'Root AngVel',
        subtitle: zh ? '机体系 ω' : 'body ω',
        lines: vec3Lines(''),
        concatOffset: block.offset,
        concatSize: block.size
      }];
    case 'ProjectedGravityB':
      return [{
        id: idBase,
        kind: 'signal',
        group: 'obs',
        title: zh ? '投影重力' : 'Proj Gravity',
        subtitle: zh ? '机体系' : 'body frame',
        lines: vec3Lines(''),
        concatOffset: block.offset,
        concatSize: block.size
      }];
    case 'Command':
      return [
        {
          id: `${idBase}-vx`,
          kind: 'signal',
          group: 'obs',
          title: zh ? '指令 vx' : 'Cmd vx',
          lines: [{ k: 'vx' }],
          concatOffset: block.offset,
          concatSize: 1
        },
        {
          id: `${idBase}-vy`,
          kind: 'signal',
          group: 'obs',
          title: zh ? '指令 vy' : 'Cmd vy',
          lines: [{ k: 'vy' }],
          concatOffset: block.offset + 1,
          concatSize: 1
        },
        {
          id: `${idBase}-yaw`,
          kind: 'signal',
          group: 'obs',
          title: zh ? '指令 yaw' : 'Cmd yaw',
          lines: [{ k: 'yaw' }],
          concatOffset: block.offset + 2,
          concatSize: 1
        }
      ];
    case 'JointPos':
      return [{
        id: idBase,
        kind: 'joints',
        group: 'obs',
        title: zh ? '关节位置' : 'Joint Position',
        subtitle: block.kwargs?.pos_steps
          ? `step ${JSON.stringify(block.kwargs.pos_steps)}`
          : undefined,
        lines: jointLines(jointNames),
        concatOffset: block.offset,
        concatSize: block.size,
        scrollable: true
      }];
    case 'JointVel':
      return [{
        id: idBase,
        kind: 'joints',
        group: 'obs',
        title: zh ? '关节速度' : 'Joint Velocity',
        subtitle: block.kwargs?.vel_steps
          ? `step ${JSON.stringify(block.kwargs.vel_steps)}`
          : undefined,
        lines: jointLines(jointNames),
        concatOffset: block.offset,
        concatSize: block.size,
        scrollable: true
      }];
    case 'PrevActions':
      return [{
        id: idBase,
        kind: 'joints',
        group: 'obs',
        title: zh ? '上一动作' : 'Prev Action',
        subtitle: block.kwargs?.history_steps
          ? `×${block.kwargs.history_steps}`
          : undefined,
        lines: jointLines(jointNames),
        concatOffset: block.offset,
        concatSize: block.size,
        scrollable: true
      }];
    case 'BootIndicator':
      return [{
        id: idBase,
        kind: 'signal',
        group: 'obs',
        title: 'Boot',
        lines: [{ k: 'val' }],
        concatOffset: block.offset,
        concatSize: block.size
      }];
    case 'ComplianceFlagObs':
      return [
        {
          id: `${idBase}-en`,
          kind: 'signal',
          group: 'obs',
          title: zh ? '顺应 开关' : 'Compliance on',
          lines: [{ k: 'on' }],
          concatOffset: block.offset,
          concatSize: 1
        },
        {
          id: `${idBase}-th`,
          kind: 'signal',
          group: 'obs',
          title: zh ? '顺应 阈值' : 'Compliance thr',
          lines: [{ k: 'thr' }],
          concatOffset: block.offset + 1,
          concatSize: 1
        },
        {
          id: `${idBase}-kp`,
          kind: 'signal',
          group: 'obs',
          title: zh ? '顺应 kp' : 'Compliance kp',
          lines: [{ k: 'kp' }],
          concatOffset: block.offset + 2,
          concatSize: 1
        }
      ];
    default:
      return [{
        id: idBase,
        kind: 'signal',
        group: 'obs',
        title: block.name,
        subtitle: `${block.size}D`,
        lines: data.slice(0, 6).map((_, i) => ({
          k: `[${block.offset + i}]`
        })),
        concatOffset: block.offset,
        concatSize: block.size,
        scrollable: data.length > 4
      }];
  }
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
    lines: jointLines(jointNames),
    scrollable: true
  });

  push({
    id: 'sim-joint-vel',
    kind: 'joints',
    group: 'sim',
    title: zh ? '关节速度' : 'Joint Velocity',
    subtitle: zh ? 'MuJoCo qvel' : 'MuJoCo qvel',
    lines: jointLines(jointNames),
    scrollable: true
  });

  push({
    id: 'sim-cmd-vx',
    kind: 'signal',
    group: 'sim',
    title: zh ? '速度指令 vx' : 'Cmd vx',
    lines: [{ k: 'vx' }]
  });
  push({
    id: 'sim-cmd-vy',
    kind: 'signal',
    group: 'sim',
    title: zh ? '速度指令 vy' : 'Cmd vy',
    lines: [{ k: 'vy' }]
  });
  push({
    id: 'sim-cmd-yaw',
    kind: 'signal',
    group: 'sim',
    title: zh ? '速度指令 yaw' : 'Cmd yaw',
    lines: [{ k: 'yaw' }]
  });

  if (runner.obsJointPosRelative) {
    push({
      id: 'prep-joint-rel',
      kind: 'process',
      group: 'preprocess',
      title: zh ? '关节相对化' : 'Joint relative',
      subtitle: zh ? 'q − default' : 'q − default',
      lines: jointLines(jointNames),
      width: 248
    });
  }

  push({
    id: 'prep-action-clip',
    kind: 'process',
    group: 'preprocess',
    title: zh ? '动作裁剪' : 'Action clip',
    lines: [{ k: '±', v: String(runner.actionClip) }]
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
    title: zh ? '策略动作' : 'Policy Action',
    subtitle: zh ? 'clip 后' : 'after clip',
    lines: jointLines(jointNames),
    scrollable: true
  });

  push({
    id: 'out-target',
    kind: 'joints',
    group: 'output',
    title: zh ? '关节目标' : 'Joint Target',
    subtitle: zh ? '下发目标角' : 'commanded q',
    lines: jointLines(jointNames),
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
      scrollable: true
    });
  }

  return nodes;
}
