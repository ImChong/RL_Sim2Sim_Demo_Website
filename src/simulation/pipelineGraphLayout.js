import { formatFloat, sampleArray } from './policyTelemetry.js';

const NODE_W = {
  source: 132,
  process: 132,
  obs: 128,
  warehouse: 148,
  model: 152,
  output: 140,
  motor: 140
};

const NODE_H = {
  source: 58,
  process: 58,
  obs: 50,
  warehouse: 62,
  model: 66,
  output: 58,
  motor: 58
};

const COL_GAP = 36;
const ROW_GAP = 10;
const ROW_GAP_MOBILE = 8;

function colX(index, widths) {
  let x = 24;
  for (let i = 0; i < index; i++) {
    x += widths[i] + COL_GAP;
  }
  return x;
}

/**
 * @param {ReturnType<import('./policyTelemetry.js').buildPolicyTelemetry>} telemetry
 * @param {'zh'|'en'} lang
 * @param {{ layout?: 'horizontal' | 'vertical' }} [options]
 */
export function buildPipelineGraph(telemetry, lang = 'zh', options = {}) {
  const zh = lang === 'zh';
  if (!telemetry?.ready) {
    return { nodes: [], edges: [], width: 480, height: 200, layout: options.layout ?? 'horizontal' };
  }

  if (options.layout === 'vertical') {
    return buildVerticalPipelineGraph(telemetry, zh);
  }

  const obsBlocks = telemetry.obsBlocks ?? [];
  const obsCount = Math.max(obsBlocks.length, 1);
  const obsStackHeight = obsCount * (NODE_H.obs + ROW_GAP) - ROW_GAP;
  const coreY = Math.max(80, obsStackHeight / 2);

  const hasHistory = (telemetry.concat?.historyLength ?? 1) > 1;
  const colWidths = [
    NODE_W.source,
    NODE_W.process,
    NODE_W.obs,
    NODE_W.warehouse,
    ...(hasHistory ? [NODE_W.process] : []),
    NODE_W.model,
    NODE_W.output,
    NODE_W.motor
  ];

  let col = 0;
  const xSource = colX(col++, colWidths);
  const xPrep = colX(col++, colWidths);
  const xObs = colX(col++, colWidths);
  const xWarehouse = colX(col++, colWidths);
  const xHistory = hasHistory ? colX(col++, colWidths) : null;
  const xOnnx = colX(col++, colWidths);
  const xTarget = colX(col++, colWidths);
  const xMotor = colX(col++, colWidths);

  const nodes = [];
  const edges = [];

  const pushNode = (node) => {
    nodes.push({
      width: NODE_W[node.kind] ?? 132,
      height: NODE_H[node.kind] ?? 56,
      ...node
    });
  };

  pushNode({
    id: 'sim',
    kind: 'source',
    title: 'MuJoCo',
    subtitle: zh ? '仿真状态' : 'Simulation state',
    x: xSource,
    y: coreY - NODE_H.source / 2,
    lines: [
      { k: zh ? '根位置' : 'root', v: formatVec(telemetry.preprocessing.rootPos) },
      { k: zh ? '关节' : 'joint', v: formatVec(telemetry.preprocessing.jointPosSample) }
    ]
  });

  pushNode({
    id: 'prep',
    kind: 'process',
    title: zh ? '预处理' : 'Preprocess',
    subtitle: zh ? '相对关节 / 裁剪' : 'Rel joints / clip',
    x: xPrep,
    y: coreY - NODE_H.process / 2,
    lines: [
      {
        k: zh ? '相对默认' : 'rel default',
        v: telemetry.preprocessing.obsJointPosRelative ? (zh ? '是' : 'yes') : (zh ? '否' : 'no')
      },
      { k: 'clip', v: `±${telemetry.preprocessing.actionClip}` }
    ]
  });

  edges.push({ id: 'e-sim-prep', from: 'sim', to: 'prep' });

  const obsStartY = coreY - obsStackHeight / 2;
  obsBlocks.forEach((block, i) => {
    const id = `obs-${i}`;
    pushNode({
      id,
      kind: 'obs',
      title: block.name,
      subtitle: `${block.size}D · [${block.offset}:${block.offset + block.size})`,
      x: xObs,
      y: obsStartY + i * (NODE_H.obs + ROW_GAP),
      lines: [
        { k: zh ? '值' : 'val', v: formatVec(block.values) },
        { k: 'μ', v: formatFloat(block.stats.mean) }
      ]
    });
    edges.push({ id: `e-prep-${id}`, from: 'prep', to: id });
    edges.push({ id: `e-${id}-wh`, from: id, to: 'warehouse' });
  });

  const historyLabel = hasHistory
    ? `${telemetry.concat.historyCount}/${telemetry.concat.historyLength}`
    : null;

  pushNode({
    id: 'warehouse',
    kind: 'warehouse',
    title: zh ? '观测仓库' : 'Obs Warehouse',
    subtitle: zh ? '向量拼接' : 'Vector concat',
    x: xWarehouse,
    y: coreY - NODE_H.warehouse / 2,
    lines: [
      { k: zh ? '单帧' : 'frame', v: `${telemetry.concat.currentFrameSize}D` },
      { k: zh ? '张量' : 'tensor', v: `${telemetry.concat.tensorSize}D` },
      ...(historyLabel ? [{ k: zh ? '历史' : 'hist', v: historyLabel }] : [])
    ]
  });

  let onnxFrom = 'warehouse';
  if (hasHistory) {
    pushNode({
      id: 'history',
      kind: 'process',
      title: zh ? '历史缓冲' : 'History buffer',
      subtitle: `×${telemetry.concat.historyLength}`,
      x: xHistory,
      y: coreY - NODE_H.process / 2,
      lines: [
        { k: zh ? '窗口' : 'window', v: historyLabel },
        { k: zh ? '预览' : 'preview', v: formatVec(telemetry.concat.tensorPreview, 4) }
      ]
    });
    edges.push({ id: 'e-wh-hist', from: 'warehouse', to: 'history' });
    onnxFrom = 'history';
  }

  const modelName = telemetry.model.path?.split('/').pop() ?? 'ONNX';
  pushNode({
    id: 'onnx',
    kind: 'model',
    title: zh ? '策略网络' : 'Policy net',
    subtitle: modelName,
    x: xOnnx,
    y: coreY - NODE_H.model / 2,
    lines: [
      { k: 'in', v: `${telemetry.onnx.inKeys.join(',')} ${shapeStr(telemetry.onnx.inputShape)}` },
      { k: 'out', v: telemetry.onnx.outKeys.join(',') },
      { k: 'action', v: formatVec(telemetry.onnx.clippedAction, 3) }
    ]
  });
  edges.push({ id: `e-${onnxFrom}-onnx`, from: onnxFrom, to: 'onnx' });

  pushNode({
    id: 'target',
    kind: 'output',
    title: zh ? '关节目标' : 'Joint target',
    subtitle: zh ? '缩放 + 默认姿态' : 'Scale + default',
    x: xTarget,
    y: coreY - NODE_H.output / 2,
    lines: [
      { k: 'target', v: formatVec(telemetry.postprocess.targetSample, 3) },
      { k: 'scale', v: formatVec(telemetry.postprocess.actionScaleSample, 2) }
    ]
  });
  edges.push({ id: 'e-onnx-target', from: 'onnx', to: 'target' });

  pushNode({
    id: 'motor',
    kind: 'motor',
    title: zh ? '电机控制' : 'Motor ctrl',
    subtitle: telemetry.motor.controlType,
    x: xMotor,
    y: coreY - NODE_H.motor / 2,
    lines: [
      { k: 'Hz', v: formatFloat(telemetry.motor.policyHz, 1) },
      { k: zh ? '子步' : 'decim', v: String(telemetry.motor.decimation) },
      ...(telemetry.motor.joints[0]
        ? [{ k: 'τ', v: formatFloat(telemetry.motor.joints[0].ctrl) }]
        : [])
    ]
  });
  edges.push({ id: 'e-target-motor', from: 'target', to: 'motor' });

  const lastColRight = xMotor + NODE_W.motor;
  const width = lastColRight + 32;
  const height = Math.max(280, obsStackHeight + 120, coreY * 2);

  return { nodes, edges, width, height, layout: 'horizontal' };
}

function buildVerticalPipelineGraph(telemetry, zh) {
  const mobileW = {
    source: 280,
    process: 280,
    obs: 280,
    warehouse: 280,
    model: 280,
    output: 280,
    motor: 280
  };
  const mobileH = {
    source: 54,
    process: 52,
    obs: 46,
    warehouse: 58,
    model: 62,
    output: 54,
    motor: 54
  };

  const obsBlocks = telemetry.obsBlocks ?? [];
  const hasHistory = (telemetry.concat?.historyLength ?? 1) > 1;
  const historyLabel = hasHistory
    ? `${telemetry.concat.historyCount}/${telemetry.concat.historyLength}`
    : null;

  const nodes = [];
  const edges = [];
  const x = 16;
  let y = 16;
  const gap = ROW_GAP_MOBILE;

  const pushNode = (node) => {
    const kind = node.kind;
    const height = mobileH[kind] ?? 52;
    const width = mobileW[kind] ?? 280;
    nodes.push({
      width,
      height,
      x,
      y,
      ...node
    });
    y += height + gap;
  };

  pushNode({
    id: 'sim',
    kind: 'source',
    title: 'MuJoCo',
    subtitle: zh ? '仿真状态' : 'Simulation state',
    lines: [
      { k: zh ? '根' : 'root', v: formatVec(telemetry.preprocessing.rootPos, 2) },
      { k: zh ? '关节' : 'joint', v: formatVec(telemetry.preprocessing.jointPosSample, 2) }
    ]
  });

  pushNode({
    id: 'prep',
    kind: 'process',
    title: zh ? '预处理' : 'Preprocess',
    subtitle: zh ? '相对关节 / 裁剪' : 'Rel joints / clip',
    lines: [
      {
        k: zh ? '相对' : 'rel',
        v: telemetry.preprocessing.obsJointPosRelative ? (zh ? '是' : 'yes') : (zh ? '否' : 'no')
      },
      { k: 'clip', v: `±${telemetry.preprocessing.actionClip}` }
    ]
  });
  edges.push({ id: 'e-sim-prep', from: 'sim', to: 'prep' });

  obsBlocks.forEach((block, i) => {
    const id = `obs-${i}`;
    pushNode({
      id,
      kind: 'obs',
      title: block.name,
      subtitle: `${block.size}D`,
      lines: [{ k: zh ? '值' : 'val', v: formatVec(block.values, 4) }]
    });
    edges.push({ id: `e-prep-${id}`, from: 'prep', to: id });
    edges.push({ id: `e-${id}-wh`, from: id, to: 'warehouse' });
  });

  pushNode({
    id: 'warehouse',
    kind: 'warehouse',
    title: zh ? '观测仓库' : 'Obs Warehouse',
    subtitle: `${telemetry.concat.tensorSize}D`,
    lines: [
      { k: zh ? '单帧' : 'frame', v: `${telemetry.concat.currentFrameSize}D` },
      ...(historyLabel ? [{ k: zh ? '历史' : 'hist', v: historyLabel }] : [])
    ]
  });

  let onnxFrom = 'warehouse';
  if (hasHistory) {
    pushNode({
      id: 'history',
      kind: 'process',
      title: zh ? '历史缓冲' : 'History buffer',
      subtitle: `×${telemetry.concat.historyLength}`,
      lines: [{ k: zh ? '窗口' : 'win', v: historyLabel }]
    });
    edges.push({ id: 'e-wh-hist', from: 'warehouse', to: 'history' });
    onnxFrom = 'history';
  }

  const modelName = telemetry.model.path?.split('/').pop() ?? 'ONNX';
  pushNode({
    id: 'onnx',
    kind: 'model',
    title: zh ? '策略网络' : 'Policy net',
    subtitle: modelName.length > 22 ? `${modelName.slice(0, 20)}…` : modelName,
    lines: [
      { k: 'in', v: shapeStr(telemetry.onnx.inputShape) },
      { k: 'act', v: formatVec(telemetry.onnx.clippedAction, 3) }
    ]
  });
  edges.push({ id: `e-${onnxFrom}-onnx`, from: onnxFrom, to: 'onnx' });

  pushNode({
    id: 'target',
    kind: 'output',
    title: zh ? '关节目标' : 'Joint target',
    subtitle: zh ? 'scale × action + default' : 'scale × action + default',
    lines: [{ k: 'tgt', v: formatVec(telemetry.postprocess.targetSample, 3) }]
  });
  edges.push({ id: 'e-onnx-target', from: 'onnx', to: 'target' });

  pushNode({
    id: 'motor',
    kind: 'motor',
    title: zh ? '电机控制' : 'Motor ctrl',
    subtitle: telemetry.motor.controlType,
    lines: [
      { k: 'Hz', v: formatFloat(telemetry.motor.policyHz, 1) },
      { k: 'τ', v: telemetry.motor.joints[0] ? formatFloat(telemetry.motor.joints[0].ctrl) : '—' }
    ]
  });
  edges.push({ id: 'e-target-motor', from: 'target', to: 'motor' });

  return {
    nodes,
    edges,
    width: 312,
    height: y + 8,
    layout: 'vertical'
  };
}

function formatVec(values, max = 3) {
  if (!values?.length) {
    return '—';
  }
  return values.slice(0, max).map((v) => formatFloat(v, 2)).join(', ');
}

function shapeStr(dims) {
  if (!dims?.length) {
    return '';
  }
  return `[${dims.join('×')}]`;
}
