import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  decomposeObsBlockNodes,
  findLoopbackPrevActionNode,
  inferPolicyFamily,
  registerObsNodeOffsets
} from '../src/simulation/pipelineObsNodes.js';
import { buildPipelineGraph } from '../src/simulation/pipelineGraphLayout.js';
import { buildAtomicNodes } from '../src/simulation/pipelineAtomicNodes.js';

test('decomposeObsBlockNodes splits PrevActions by history_steps', () => {
  const nodes = decomposeObsBlockNodes(
    { name: 'PrevActions', offset: 40, size: 6, kwargs: { history_steps: 3 } },
    null,
    ['a', 'b'],
    'zh',
    2
  );
  assert.equal(nodes.length, 3);
  assert.equal(nodes[0].id, 'obs-PrevActions-t0');
  assert.equal(nodes[0].title, '上一动作');
  assert.equal(nodes[0].loopbackTarget, true);
  assert.equal(nodes[1].id, 'obs-PrevActions-t1');
  assert.equal(nodes[2].concatOffset, 44);
});

test('decomposeObsBlockNodes splits TrackingCommandObsRaw', () => {
  const nodes = decomposeObsBlockNodes(
    {
      name: 'TrackingCommandObsRaw',
      offset: 0,
      size: 42,
      kwargs: { future_steps: [0, 2, 4, 8, 16] }
    },
    null,
    [],
    'en',
    2
  );
  assert.equal(nodes.length, 2);
  assert.ok(nodes.find((n) => n.id === 'obs-TrackingCommandObsRaw-dpos'));
  assert.ok(nodes.find((n) => n.id === 'obs-TrackingCommandObsRaw-r6'));
});

test('inferPolicyFamily detects tracking and amp', () => {
  assert.equal(inferPolicyFamily({
    config: { obs_config: { policy: [{ name: 'BootIndicator' }] } }
  }), 'tracking');
  assert.equal(inferPolicyFamily({
    config: { obs_config: { history_length: 4, policy: [{ name: 'Command' }] } },
    historyLength: 4
  }), 'amp');
  assert.equal(inferPolicyFamily({
    config: { onnx: { meta: { out_keys: ['loc', 'scale', 'action'] } } }
  }), 'ppo');
});

test('buildPipelineGraph adds dashed loopback from action to last action', () => {
  const obsLayout = [
    { name: 'RootAngVelB', offset: 0, size: 3 },
    { name: 'PrevActions', offset: 3, size: 4, kwargs: { history_steps: 2 } }
  ];
  const atomic = buildAtomicNodes(
    {
      policyJointNames: ['hip', 'knee'],
      numActions: 2,
      obsJointPosRelative: false,
      actionClip: 10,
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
    new Float32Array(7),
    obsLayout,
    'zh'
  );
  const graph = buildPipelineGraph({
    ready: true,
    policyFamily: 'amp',
    atomicNodes: atomic,
    obsBlocks: obsLayout,
    concat: { currentFrameSize: 7, historyLength: 1, historyCount: 1, tensorSize: 7 },
    model: { path: './amp.onnx' },
    onnx: { inKeys: ['policy'], outKeys: ['action'], inputShape: [1, 7] }
  }, 'zh');

  const loop = graph.edges.find((edge) => edge.kind === 'loopback');
  assert.ok(loop);
  assert.equal(loop.from, 'out-action');
  assert.equal(loop.to, 'obs-PrevActions-t0');
  assert.ok(findLoopbackPrevActionNode(graph.nodes));
});
