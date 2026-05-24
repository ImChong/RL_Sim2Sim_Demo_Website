import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPipelineGraph } from '../src/simulation/pipelineGraphLayout.js';
import { buildAtomicNodes } from '../src/simulation/pipelineAtomicNodes.js';

const baseAtomic = buildAtomicNodes(
  {
    policyJointNames: ['hip', 'knee'],
    numActions: 2,
    obsJointPosRelative: false,
    actionClip: 10,
    cachedJointPosRel: new Float32Array(2),
    lastActions: new Float32Array([0.1, -0.2]),
    target: new Float32Array([0.05, -0.1])
  },
  {
    rootPos: new Float32Array([0, 0, 0.9]),
    rootQuat: new Float32Array([1, 0, 0, 0]),
    rootAngVel: new Float32Array([0, 0, 0]),
    jointPos: new Float32Array([0.1, 0.2]),
    jointVel: new Float32Array([0, 0]),
    cmd: [0, 0, 0]
  },
  new Float32Array([0, 0, 0, 1, 0, 0, 0.1, 0.2]),
  [
    { name: 'RootAngVelB', offset: 0, size: 3 },
    { name: 'Command', offset: 3, size: 3 },
    { name: 'JointPos', offset: 6, size: 2, kwargs: {} }
  ],
  'en'
);

const baseTelemetry = {
  ready: true,
  preprocessing: {
    rootPos: [0, 0, 0.9],
    jointPosSample: [0.1, 0.2],
    obsJointPosRelative: true,
    actionClip: 10
  },
  obsBlocks: [
    { name: 'RootAngVelB', offset: 0, size: 3, values: [0, 0, 0], stats: { mean: 0, min: 0, max: 0 } },
    { name: 'Command', offset: 3, size: 3, values: [1, 0, 0], stats: { mean: 0.3, min: 0, max: 1 } }
  ],
  atomicNodes: baseAtomic,
  concat: {
    currentFrameSize: 96,
    historyLength: 4,
    historyCount: 4,
    tensorSize: 384,
    tensorPreview: [0, 0, 0, 0]
  },
  model: { path: './model.onnx' },
  onnx: {
    inKeys: ['policy'],
    outKeys: ['action'],
    inputShape: [1, 384],
    clippedAction: [0.1, -0.2]
  },
  postprocess: {
    targetSample: [0.05, -0.1],
    actionScaleSample: [0.5, 0.5]
  },
  motor: {
    controlType: 'unitree_position',
    decimation: 4,
    policyHz: 50,
    joints: [{ ctrl: 1.2 }]
  }
};

test('buildPipelineGraph creates obs fan-in and history node', () => {
  const graph = buildPipelineGraph(baseTelemetry, 'zh');
  assert.ok(graph.nodes.find((n) => n.id === 'warehouse'));
  assert.ok(graph.nodes.find((n) => n.id === 'history'));
  assert.ok(graph.nodes.find((n) => n.id === 'obs-RootAngVelB'));
  const obsNodeCount = baseTelemetry.atomicNodes.filter((n) => n.group === 'obs').length;
  assert.equal(
    graph.edges.filter((e) => e.to === 'warehouse').length,
    obsNodeCount
  );
  assert.ok(graph.nodes.find((n) => n.id === 'sim-root-pos'));
  assert.ok(graph.nodes.find((n) => n.id === 'sim-joint-pos'));
});

test('buildPipelineGraph skips history node when length is 1', () => {
  const graph = buildPipelineGraph({
    ...baseTelemetry,
    concat: { ...baseTelemetry.concat, historyLength: 1, historyCount: 1, tensorSize: 96 }
  }, 'en');
  assert.equal(graph.nodes.find((n) => n.id === 'history'), undefined);
  assert.ok(graph.edges.some((e) => e.from === 'warehouse' && e.to === 'onnx'));
});

test('buildPipelineGraph vertical layout stacks nodes', () => {
  const graph = buildPipelineGraph(baseTelemetry, 'zh', { layout: 'vertical' });
  assert.equal(graph.layout, 'vertical');
  assert.ok(graph.width <= 320);
  assert.ok(graph.height > 400);
  const rootPos = graph.nodes.find((n) => n.id === 'sim-root-pos');
  const tail = graph.nodes.find((n) => n.id === 'out-target') ?? graph.nodes.find((n) => n.id === 'onnx');
  assert.ok(rootPos);
  assert.ok(tail);
  assert.ok(tail.y > rootPos.y);
});
