import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildAtomicNodes } from '../src/simulation/pipelineAtomicNodes.js';

const runner = {
  policyJointNames: ['hip', 'knee'],
  numActions: 2,
  obsJointPosRelative: true,
  actionClip: 10,
  cachedJointPosRel: new Float32Array([0.1, -0.2]),
  lastActions: new Float32Array([0.5, -0.3]),
  target: new Float32Array([0.05, -0.1])
};

const state = {
  rootPos: new Float32Array([0, 0, 0.9]),
  rootQuat: new Float32Array([1, 0, 0, 0]),
  rootAngVel: new Float32Array([0.1, 0, 0]),
  jointPos: new Float32Array([0.2, 0.4]),
  jointVel: new Float32Array([0, -0.1]),
  cmd: [1, 0, 0.5]
};

const obsLayout = [
  { name: 'RootAngVelB', offset: 0, size: 3 },
  { name: 'Command', offset: 3, size: 3 },
  { name: 'JointPos', offset: 6, size: 2, kwargs: { pos_steps: [0] } }
];

const obsVector = new Float32Array([0.1, 0, 0, 1, 0, 0.5, 0.2, 0.4]);

test('buildAtomicNodes splits command and root signals', () => {
  const nodes = buildAtomicNodes(runner, state, obsVector, obsLayout, 'en');
  assert.ok(nodes.find((n) => n.id === 'sim-root-pos'));
  assert.ok(nodes.find((n) => n.id === 'sim-root-angvel'));
  assert.ok(nodes.find((n) => n.id === 'sim-cmd-vx'));
  assert.ok(nodes.find((n) => n.id === 'obs-Command-vx'));
  const jointPos = nodes.find((n) => n.id === 'sim-joint-pos');
  assert.equal(jointPos.lines.length, 2);
  assert.equal(jointPos.lines[0].k, 'hip');
});

test('buildAtomicNodes includes per-joint policy output', () => {
  const nodes = buildAtomicNodes(runner, state, obsVector, obsLayout, 'zh', [
    { name: 'hip', ctrl: 1.2 }
  ]);
  assert.ok(nodes.find((n) => n.id === 'out-action'));
  assert.ok(nodes.find((n) => n.id === 'motor-torque'));
});
