import { formatFloat, sampleArray } from './policyTelemetry.js';
import { inferPolicyFamily, policyFamilyLabel, findLoopbackPrevActionNode, isPrevActionObsNodeId } from './pipelineObsNodes.js';

const COL_GAP = 96;
const ROW_GAP = 16;
const ROW_GAP_MOBILE = 10;
const MARGIN_X = 28;
const MARGIN_Y = 22;
const LANE_HEADER = 44;
const LANE_PAD_X = 18;

function colX(index, widths) {
  let x = MARGIN_X;
  for (let i = 0; i < index; i++) {
    x += widths[i] + COL_GAP;
  }
  return x;
}

function stackColumn(nodes, x, gap = ROW_GAP, yStart = MARGIN_Y) {
  let y = yStart;
  let maxW = 0;
  for (const node of nodes) {
    node.x = x;
    node.y = y;
    maxW = Math.max(maxW, node.width ?? 120);
    y += (node.height ?? 48) + gap;
  }
  return { height: y + MARGIN_Y, width: maxW };
}

function laneRange(startCol, endCol, colWidths) {
  const xStart = colX(startCol, colWidths) - LANE_PAD_X;
  const xEnd = colX(endCol, colWidths) + colWidths[endCol] + LANE_PAD_X;
  return { x: xStart, width: xEnd - xStart };
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
  if (id.includes('TrackingCommandObsRaw')) {
    return 'sim-root-quat';
  }
  if (id.includes('TargetRootZObs') || id.includes('TargetProjectedGravityBObs')) {
    return 'sim-root-quat';
  }
  if (id.includes('TargetJointPosObs')) {
    return hasPrepRel ? 'prep-joint-rel' : 'sim-joint-pos';
  }
  if (isPrevActionObsNodeId(id)) {
    return null;
  }
  return 'prep-action-clip';
}

function cloneNodes(list) {
  return list.map((n) => ({ ...n, lines: n.lines ? [...n.lines] : [] }));
}

const NODE_HEAD = 48;
const NODE_CARD_PAD_V = 22;
const NODE_LINE = 19;

function nodeHeightForLines(lineCount) {
  return Math.max(72, NODE_HEAD + NODE_CARD_PAD_V + lineCount * NODE_LINE);
}

/**
 * @param {ReturnType<import('./policyTelemetry.js').buildPolicyTelemetry>} telemetry
 * @param {'zh'|'en'} lang
 * @param {{ layout?: 'horizontal' | 'vertical', activeProbes?: Array<{ id: string, nodeId: string, lineKey: string }> }} [options]
 */
export function buildPipelineGraph(telemetry, lang = 'zh', options = {}) {
  const zh = lang === 'zh';
  if (!telemetry?.ready) {
    return { nodes: [], edges: [], lanes: [], width: 480, height: 200, layout: options.layout ?? 'horizontal' };
  }

  const atomic = telemetry.atomicNodes ?? [];
  if (atomic.length === 0) {
    return { nodes: [], edges: [], lanes: [], width: 480, height: 200, layout: options.layout ?? 'horizontal' };
  }

  const activeProbes = options.activeProbes ?? [];
  if (options.layout === 'vertical') {
    return appendScopeSink(buildVerticalAtomicGraph(telemetry, zh, atomic), activeProbes, zh);
  }
  return appendScopeSink(buildHorizontalAtomicGraph(telemetry, zh, atomic), activeProbes, zh);
}

function appendScopeSink(graph, activeProbes, zh) {
  const probes = activeProbes ?? [];
  const uniqueNodeIds = [...new Set(probes.map((p) => p.nodeId))];
  const channelCount = probes.length;
  const previewLines = probes.slice(0, 4).map((probe) => ({
    k: probe.lineKey,
    v: '●'
  }));
  const lines = [
    { k: zh ? '通道' : 'ch', v: String(channelCount) },
    ...previewLines
  ];
  if (channelCount > previewLines.length) {
    lines.push({ k: '…', v: `+${channelCount - previewLines.length}` });
  }

  const scopeHeight = nodeHeightForLines(lines.length);
  const scopeWidth = 200;
  let scopeX;
  let scopeY;

  if (graph.layout === 'vertical') {
    scopeX = graph.nodes[0]?.x ?? MARGIN_X;
    scopeY = graph.height + ROW_GAP_MOBILE;
    graph.height += scopeHeight + ROW_GAP_MOBILE + 8;
    graph.width = Math.max(graph.width, scopeWidth + MARGIN_X * 2);
  } else {
    const rightmost = graph.nodes.reduce((max, node) => Math.max(max, (node.x ?? 0) + (node.width ?? 0)), 0);
    scopeX = rightmost + COL_GAP;
    const coreY = graph.height / 2;
    scopeY = coreY - scopeHeight / 2;
    graph.width = scopeX + scopeWidth + MARGIN_X;
    graph.lanes.push({
      id: 'scope',
      label: zh ? '可视化' : 'Scope',
      x: scopeX - LANE_PAD_X,
      width: scopeWidth + LANE_PAD_X * 2
    });
  }

  graph.nodes.push({
    id: 'out-scope',
    kind: 'scope',
    title: zh ? '示波器' : 'Scope',
    subtitle: zh ? 'uPlot 风格波形' : 'Waveform sink',
    width: scopeWidth,
    height: scopeHeight,
    x: scopeX,
    y: scopeY,
    lines
  });

  const prev = graph.nodes
    .filter((n) => n.group === 'motor' || n.group === 'output')
    .map((n) => n.id)
    .pop();
  if (prev && !uniqueNodeIds.length) {
    graph.edges.push({ id: `e-${prev}-scope`, from: prev, to: 'out-scope', kind: 'scope' });
  }
  for (const nodeId of uniqueNodeIds) {
    graph.edges.push({
      id: `e-${nodeId}-scope`,
      from: nodeId,
      to: 'out-scope',
      kind: 'scope'
    });
  }

  return graph;
}

function appendActionLoopbackEdges(graph) {
  const prevNode = findLoopbackPrevActionNode(graph.nodes);
  if (!prevNode || !graph.nodes.some((node) => node.id === 'out-action')) {
    return;
  }
  graph.edges.push({
    id: `e-out-action-${prevNode.id}-loop`,
    from: 'out-action',
    to: prevNode.id,
    kind: 'loopback'
  });
}

function buildHorizontalAtomicGraph(telemetry, zh, atomic) {
  const simNodes = cloneNodes(atomic.filter((n) => n.group === 'sim'));
  const prepNodes = cloneNodes(atomic.filter((n) => n.group === 'preprocess'));
  const obsNodes = cloneNodes(atomic.filter((n) => n.group === 'obs'));
  const outputNodes = cloneNodes(atomic.filter((n) => n.group === 'output'));
  const motorNodes = cloneNodes(atomic.filter((n) => n.group === 'motor'));
  const hasPrepRel = prepNodes.some((n) => n.id === 'prep-joint-rel');
  const hasHistory = (telemetry.concat?.historyLength ?? 1) > 1;
  const onnxColWidth = 220;

  const colWidths = [];
  colWidths.push(Math.max(184, ...simNodes.map((n) => n.width ?? 184)));
  if (prepNodes.length) {
    colWidths.push(Math.max(184, ...prepNodes.map((n) => n.width ?? 184)));
  }
  colWidths.push(Math.max(248, ...obsNodes.map((n) => n.width ?? 248)));
  colWidths.push(200);
  if (hasHistory) {
    colWidths.push(264);
  }
  colWidths.push(onnxColWidth);
  for (const out of outputNodes) {
    colWidths.push(Math.max(248, out.width ?? 248));
  }
  if (motorNodes.length) {
    colWidths.push(Math.max(248, ...motorNodes.map((n) => n.width ?? 248)));
  }

  const nodes = [];
  const edges = [];
  const lanes = [];
  const yStart = MARGIN_Y + LANE_HEADER;
  let col = 0;

  const simStartCol = col;
  const xSim = colX(col, colWidths);
  const simStack = stackColumn(simNodes, xSim, ROW_GAP, yStart);
  nodes.push(...simNodes);
  lanes.push({
    id: 'sim',
    label: zh ? '仿真状态' : 'Simulation',
    ...laneRange(simStartCol, col, colWidths)
  });
  col += 1;

  if (prepNodes.length) {
    const prepStartCol = col;
    const xPrep = colX(col, colWidths);
    stackColumn(prepNodes, xPrep, ROW_GAP, yStart);
    nodes.push(...prepNodes);
    if (hasPrepRel) {
      edges.push({ id: 'e-sim-prep-joint', from: 'sim-joint-pos', to: 'prep-joint-rel' });
    }
    lanes.push({
      id: 'prep',
      label: zh ? '预处理' : 'Preprocess',
      ...laneRange(prepStartCol, col, colWidths)
    });
    col += 1;
  }

  const obsStartCol = col;
  const xObs = colX(col, colWidths);
  const obsStack = stackColumn(obsNodes, xObs, ROW_GAP, yStart);
  nodes.push(...obsNodes);
  for (const obs of obsNodes) {
    const src = obsSourceId(obs, hasPrepRel);
    if (src) {
      edges.push({ id: `e-${src}-${obs.id}`, from: src, to: obs.id });
    }
    edges.push({ id: `e-${obs.id}-wh`, from: obs.id, to: 'warehouse' });
  }
  lanes.push({
    id: 'obs',
    label: zh ? '观测构造' : 'Observation',
    ...laneRange(obsStartCol, col, colWidths)
  });
  col += 1;

  const innerHeight = Math.max(simStack.height, obsStack.height, 200);
  const coreY = yStart + (innerHeight - yStart) / 2;
  const historyLabel = hasHistory
    ? `${telemetry.concat.historyCount}/${telemetry.concat.historyLength}`
    : null;

  const policyStartCol = col;
  const xWarehouse = colX(col, colWidths);
  const warehouseLines = [
    { k: zh ? '单帧' : 'frame', v: `${telemetry.concat.currentFrameSize}D` },
    { k: zh ? '张量' : 'tensor', v: `${telemetry.concat.tensorSize}D` },
    ...(historyLabel ? [{ k: zh ? '历史' : 'hist', v: historyLabel }] : [])
  ];
  const warehouseHeight = nodeHeightForLines(warehouseLines.length);
  nodes.push({
    id: 'warehouse',
    kind: 'warehouse',
    title: zh ? '观测仓库' : 'Obs Warehouse',
    subtitle: zh ? '向量拼接' : 'Vector concat',
    width: 200,
    height: warehouseHeight,
    x: xWarehouse,
    y: coreY - warehouseHeight / 2,
    lines: warehouseLines
  });
  col += 1;

  let onnxFrom = 'warehouse';
  if (hasHistory) {
    const xHistory = colX(col, colWidths);
    const historyLines = [
      { k: zh ? '窗口' : 'window', v: historyLabel },
      { k: zh ? '预览' : 'preview', v: formatVec(telemetry.concat.tensorPreview, 3) }
    ];
    const historyHeight = nodeHeightForLines(historyLines.length);
    nodes.push({
      id: 'history',
      kind: 'process',
      title: zh ? '历史缓冲' : 'History buffer',
      subtitle: `×${telemetry.concat.historyLength}`,
      width: 264,
      height: historyHeight,
      x: xHistory,
      y: coreY - historyHeight / 2,
      lines: historyLines
    });
    edges.push({ id: 'e-wh-hist', from: 'warehouse', to: 'history' });
    onnxFrom = 'history';
    col += 1;
  }

  const modelName = telemetry.model.path?.split('/').pop() ?? 'ONNX';
  const family = telemetry.policyFamily ?? 'generic';
  const familyLabel = policyFamilyLabel(family, zh);
  const xOnnx = colX(col, colWidths);
  const onnxWidth = onnxColWidth;
  const onnxLines = [
    { k: 'in', v: `${telemetry.onnx.inKeys.join(',')} ${shapeStr(telemetry.onnx.inputShape)}` },
    { k: 'out', v: telemetry.onnx.outKeys.join(',') }
  ];
  const onnxHeight = nodeHeightForLines(onnxLines.length);
  nodes.push({
    id: 'onnx',
    kind: 'model',
    title: zh ? '策略网络' : 'Policy net',
    subtitle: `${familyLabel} · ${modelName}`,
    width: onnxWidth,
    height: onnxHeight,
    x: xOnnx,
    y: coreY - onnxHeight / 2,
    lines: onnxLines
  });
  edges.push({ id: `e-${onnxFrom}-onnx`, from: onnxFrom, to: 'onnx' });
  lanes.push({
    id: 'policy',
    label: zh ? '策略推理' : 'Policy',
    ...laneRange(policyStartCol, col, colWidths)
  });
  col += 1;

  const outputStartCol = col;
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
  if (outputNodes.length || motorNodes.length) {
    lanes.push({
      id: 'output',
      label: zh ? '动作输出' : 'Output',
      ...laneRange(outputStartCol, col - 1, colWidths)
    });
  }

  const width = colX(col, colWidths) + (colWidths[col - 1] ?? 140) + MARGIN_X;
  const height = Math.max(simStack.height, obsStack.height, 300) + MARGIN_Y;

  const graph = { nodes, edges, lanes, width, height, layout: 'horizontal' };
  appendActionLoopbackEdges(graph);
  return graph;
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
    if (src) {
      edges.push({ id: `e-${src}-${obs.id}`, from: src, to: obs.id });
    }
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

  const graph = {
    nodes,
    edges,
    lanes: [],
    width: 312,
    height: y + 8,
    layout: 'vertical'
  };
  appendActionLoopbackEdges(graph);
  return graph;
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
