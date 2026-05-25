import { formatFloat, sampleArray } from './policyTelemetry.js';

const COL_GAP = 52;
const ROW_GAP = 12;
const ROW_GAP_MOBILE = 8;
const MARGIN_X = 24;
const MARGIN_Y = 18;

function colX(index, widths) {
  let x = MARGIN_X;
  for (let i = 0; i < index; i++) {
    x += widths[i] + COL_GAP;
  }
  return x;
}

function stackColumn(nodes, x, gap = ROW_GAP) {
  let y = MARGIN_Y;
  let maxW = 0;
  for (const node of nodes) {
    node.x = x;
    node.y = y;
    maxW = Math.max(maxW, node.width ?? 120);
    y += (node.height ?? 48) + gap;
  }
  return { height: y + MARGIN_Y, width: maxW };
}

function obsSourceId(obsNode, hasPrepRel) {
  const id = obsNode.id ?? '';
  if (id.includes('JointPos')) {
    return hasPrepRel ? 'prep-joint-rel' : 'sim-joint-pos';
  }
  if (id.includes('JointVel')) {
    return 'sim-joint-vel';
  }
  if (id.includes('RootAngVel')) {
    return 'sim-root-angvel';
  }
  if (id.includes('ProjectedGravity')) {
    return 'sim-root-quat';
  }
  if (id.includes('Command-vx')) {
    return 'sim-cmd-vx';
  }
  if (id.includes('Command-vy')) {
    return 'sim-cmd-vy';
  }
  if (id.includes('Command-yaw')) {
    return 'sim-cmd-yaw';
  }
  return 'prep-action-clip';
}

function cloneNodes(list) {
  return list.map((n) => ({ ...n, lines: n.lines ? [...n.lines] : [] }));
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

  const atomic = telemetry.atomicNodes ?? [];
  if (atomic.length === 0) {
    return { nodes: [], edges: [], width: 480, height: 200, layout: options.layout ?? 'horizontal' };
  }

  if (options.layout === 'vertical') {
    return buildVerticalAtomicGraph(telemetry, zh, atomic);
  }
  return buildHorizontalAtomicGraph(telemetry, zh, atomic);
}

function buildHorizontalAtomicGraph(telemetry, zh, atomic) {
  const simNodes = cloneNodes(atomic.filter((n) => n.group === 'sim'));
  const prepNodes = cloneNodes(atomic.filter((n) => n.group === 'preprocess'));
  const obsNodes = cloneNodes(atomic.filter((n) => n.group === 'obs'));
  const outputNodes = cloneNodes(atomic.filter((n) => n.group === 'output'));
  const motorNodes = cloneNodes(atomic.filter((n) => n.group === 'motor'));
  const hasPrepRel = prepNodes.some((n) => n.id === 'prep-joint-rel');
  const hasHistory = (telemetry.concat?.historyLength ?? 1) > 1;

  const colWidths = [];
  colWidths.push(Math.max(160, ...simNodes.map((n) => n.width ?? 160)));
  if (prepNodes.length) {
    colWidths.push(Math.max(160, ...prepNodes.map((n) => n.width ?? 160)));
  }
  colWidths.push(Math.max(192, ...obsNodes.map((n) => n.width ?? 192)));
  colWidths.push(188);
  if (hasHistory) {
    colWidths.push(176);
  }
  colWidths.push(196);
  for (const out of outputNodes) {
    colWidths.push(Math.max(200, out.width ?? 200));
  }
  if (motorNodes.length) {
    colWidths.push(Math.max(200, ...motorNodes.map((n) => n.width ?? 200)));
  }

  const nodes = [];
  const edges = [];
  let col = 0;

  const xSim = colX(col, colWidths);
  const simStack = stackColumn(simNodes, xSim);
  nodes.push(...simNodes);
  col += 1;

  if (prepNodes.length) {
    const xPrep = colX(col, colWidths);
    stackColumn(prepNodes, xPrep);
    nodes.push(...prepNodes);
    if (hasPrepRel) {
      edges.push({ id: 'e-sim-prep-joint', from: 'sim-joint-pos', to: 'prep-joint-rel' });
    }
    col += 1;
  }

  const xObs = colX(col, colWidths);
  const obsStack = stackColumn(obsNodes, xObs);
  nodes.push(...obsNodes);
  for (const obs of obsNodes) {
    const src = obsSourceId(obs, hasPrepRel);
    edges.push({ id: `e-${src}-${obs.id}`, from: src, to: obs.id });
    edges.push({ id: `e-${obs.id}-wh`, from: obs.id, to: 'warehouse' });
  }
  col += 1;

  const coreY = Math.max(simStack.height, obsStack.height, 200) / 2;
  const historyLabel = hasHistory
    ? `${telemetry.concat.historyCount}/${telemetry.concat.historyLength}`
    : null;

  const xWarehouse = colX(col, colWidths);
  nodes.push({
    id: 'warehouse',
    kind: 'warehouse',
    title: zh ? '观测仓库' : 'Obs Warehouse',
    subtitle: zh ? '向量拼接' : 'Vector concat',
    width: 188,
    height: 86,
    x: xWarehouse,
    y: coreY - 43,
    lines: [
      { k: zh ? '单帧' : 'frame', v: `${telemetry.concat.currentFrameSize}D` },
      { k: zh ? '张量' : 'tensor', v: `${telemetry.concat.tensorSize}D` },
      ...(historyLabel ? [{ k: zh ? '历史' : 'hist', v: historyLabel }] : [])
    ]
  });
  col += 1;

  let onnxFrom = 'warehouse';
  if (hasHistory) {
    const xHistory = colX(col, colWidths);
    nodes.push({
      id: 'history',
      kind: 'process',
      title: zh ? '历史缓冲' : 'History buffer',
      subtitle: `×${telemetry.concat.historyLength}`,
      width: 176,
      height: 72,
      x: xHistory,
      y: coreY - 36,
      lines: [
        { k: zh ? '窗口' : 'window', v: historyLabel },
        { k: zh ? '预览' : 'preview', v: formatVec(telemetry.concat.tensorPreview, 4) }
      ]
    });
    edges.push({ id: 'e-wh-hist', from: 'warehouse', to: 'history' });
    onnxFrom = 'history';
    col += 1;
  }

  const modelName = telemetry.model.path?.split('/').pop() ?? 'ONNX';
  const xOnnx = colX(col, colWidths);
  nodes.push({
    id: 'onnx',
    kind: 'model',
    title: zh ? '策略网络' : 'Policy net',
    subtitle: modelName,
    width: 196,
    height: 86,
    x: xOnnx,
    y: coreY - 43,
    lines: [
      { k: 'in', v: `${telemetry.onnx.inKeys.join(',')} ${shapeStr(telemetry.onnx.inputShape)}` },
      { k: 'out', v: telemetry.onnx.outKeys.join(',') }
    ]
  });
  edges.push({ id: `e-${onnxFrom}-onnx`, from: onnxFrom, to: 'onnx' });
  col += 1;

  let prev = 'onnx';
  for (const out of outputNodes) {
    const xOut = colX(col, colWidths);
    out.x = xOut;
    out.y = coreY - (out.height ?? 50) / 2;
    nodes.push(out);
    edges.push({ id: `e-${prev}-${out.id}`, from: prev, to: out.id });
    prev = out.id;
    col += 1;
  }

  for (const motor of motorNodes) {
    const xMotor = colX(col, colWidths);
    motor.x = xMotor;
    motor.y = coreY - (motor.height ?? 50) / 2;
    nodes.push(motor);
    edges.push({ id: `e-${prev}-${motor.id}`, from: prev, to: motor.id });
    col += 1;
  }

  const width = colX(col, colWidths) + (colWidths[col - 1] ?? 140) + MARGIN_X;
  const height = Math.max(simStack.height, obsStack.height, 300);

  return { nodes, edges, width, height, layout: 'horizontal' };
}

function buildVerticalAtomicGraph(telemetry, zh, atomic) {
  const nodes = [];
  const edges = [];
  const x = MARGIN_X;
  let y = MARGIN_Y;
  const gap = ROW_GAP_MOBILE;
  const hasPrepRel = atomic.some((n) => n.id === 'prep-joint-rel');
  const hasHistory = (telemetry.concat?.historyLength ?? 1) > 1;

  const place = (node) => {
    nodes.push({
      width: Math.min(280, node.width ?? 280),
      ...node,
      x,
      y
    });
    y += (node.height ?? 48) + gap;
  };

  const groups = ['sim', 'preprocess', 'obs'];
  for (const group of groups) {
    for (const node of atomic.filter((n) => n.group === group)) {
      place({ ...node });
    }
  }

  const historyLabel = hasHistory
    ? `${telemetry.concat.historyCount}/${telemetry.concat.historyLength}`
    : null;

  place({
    id: 'warehouse',
    kind: 'warehouse',
    title: zh ? '观测仓库' : 'Obs Warehouse',
    subtitle: `${telemetry.concat.tensorSize}D`,
    height: 58,
    lines: [
      { k: zh ? '单帧' : 'frame', v: `${telemetry.concat.currentFrameSize}D` },
      ...(historyLabel ? [{ k: zh ? '历史' : 'hist', v: historyLabel }] : [])
    ]
  });

  if (hasHistory) {
    place({
      id: 'history',
      kind: 'process',
      title: zh ? '历史缓冲' : 'History buffer',
      height: 52,
      lines: [{ k: zh ? '窗口' : 'win', v: historyLabel }]
    });
  }

  const modelName = telemetry.model.path?.split('/').pop() ?? 'ONNX';
  place({
    id: 'onnx',
    kind: 'model',
    title: zh ? '策略网络' : 'Policy net',
    subtitle: modelName.length > 24 ? `${modelName.slice(0, 22)}…` : modelName,
    height: 60,
    lines: [
      { k: 'in', v: shapeStr(telemetry.onnx.inputShape) },
      { k: 'act', v: formatVec(telemetry.onnx.clippedAction, 3) }
    ]
  });

  for (const node of atomic.filter((n) => n.group === 'output' || n.group === 'motor')) {
    place({ ...node });
  }

  if (hasPrepRel) {
    edges.push({ id: 'e-sim-prep-joint', from: 'sim-joint-pos', to: 'prep-joint-rel' });
  }
  for (const obs of atomic.filter((n) => n.group === 'obs')) {
    const src = obsSourceId(obs, hasPrepRel);
    edges.push({ id: `e-${src}-${obs.id}`, from: src, to: obs.id });
    edges.push({ id: `e-${obs.id}-wh`, from: obs.id, to: 'warehouse' });
  }

  let prev = hasHistory ? 'history' : 'warehouse';
  if (hasHistory) {
    edges.push({ id: 'e-wh-hist', from: 'warehouse', to: 'history' });
  }
  edges.push({ id: `e-${prev}-onnx`, from: prev, to: 'onnx' });
  prev = 'onnx';
  for (const out of atomic.filter((n) => n.group === 'output')) {
    edges.push({ id: `e-${prev}-${out.id}`, from: prev, to: out.id });
    prev = out.id;
  }
  for (const motor of atomic.filter((n) => n.group === 'motor')) {
    edges.push({ id: `e-${prev}-${motor.id}`, from: prev, to: motor.id });
    prev = motor.id;
  }

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
