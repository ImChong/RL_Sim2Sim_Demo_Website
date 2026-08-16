import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildObsStackLayout } from '../src/simulation/obsStackLayout.js';
import { MAX_SCOPE_CHANNELS } from '../src/simulation/scopeChannels.js';

const obsNode = (id, concatOffset, probeKeys) => ({
  id,
  group: 'obs',
  concatOffset,
  probeKeys
});

const telemetry = {
  ready: true,
  obsBlocks: [
    { name: 'RootAngVelB', offset: 0, size: 3, description: 'body angular velocity' },
    { name: 'Command', offset: 3, size: 3, description: 'velocity command' },
    { name: 'JointPos', offset: 6, size: 29, description: 'joint positions' }
  ],
  atomicNodes: [
    { id: 'sim-root-angvel', group: 'sim', probeKeys: ['x', 'y', 'z'] },
    obsNode('obs-RootAngVelB', 0, ['x', 'y', 'z']),
    obsNode('obs-Command-vx', 3, ['vx']),
    obsNode('obs-Command-vy', 4, ['vy']),
    obsNode('obs-Command-yaw', 5, ['yaw']),
    obsNode('obs-JointPos', 6, ['hip', 'knee'])
  ],
  concat: {
    currentFrameSize: 35,
    historyLength: 4,
    historyCount: 4,
    tensorSize: 140
  },
  onnx: { inputShape: [1, 140] }
};

test('buildObsStackLayout maps blocks onto the frame', () => {
  const layout = buildObsStackLayout(telemetry);
  assert.equal(layout.ready, true);
  assert.equal(layout.frameSize, 35);
  assert.equal(layout.tensorSize, 140);
  assert.equal(layout.blocks.length, 3);
  assert.equal(layout.unmappedSize, 0);

  const jointPos = layout.blocks[2];
  assert.equal(jointPos.offset, 6);
  assert.equal(jointPos.end, 35);
  assert.ok(Math.abs(jointPos.share - 29 / 35) < 1e-9);
});

test('buildObsStackLayout orders frames oldest first with the newest last', () => {
  const layout = buildObsStackLayout(telemetry);
  assert.deepEqual(
    layout.frames.map((f) => f.label),
    ['t-3', 't-2', 't-1', 't']
  );
  assert.deepEqual(
    layout.frames.map((f) => f.offset),
    [0, 35, 70, 105]
  );
  assert.equal(layout.frames.at(-1).isLatest, true);
  assert.equal(layout.frames[0].isLatest, false);
});

test('buildObsStackLayout handles a single frame policy', () => {
  const layout = buildObsStackLayout({
    ...telemetry,
    concat: { currentFrameSize: 35, historyLength: 1, historyCount: 1, tensorSize: 35 }
  });
  assert.equal(layout.historyLength, 1);
  assert.deepEqual(layout.frames.map((f) => f.label), ['t']);
  assert.equal(layout.frames[0].isLatest, true);
});

test('buildObsStackLayout reports slots no block claims', () => {
  const layout = buildObsStackLayout({
    ...telemetry,
    obsBlocks: [{ name: 'RootAngVelB', offset: 0, size: 3 }],
    concat: { currentFrameSize: 10, historyLength: 1, historyCount: 1, tensorSize: 10 }
  });
  assert.equal(layout.unmappedSize, 7);
});

test('buildObsStackLayout maps each block onto the nodes carrying its signals', () => {
  const [angVel, command, jointPos] = buildObsStackLayout(telemetry).blocks;

  // A block split across several graph nodes keeps all of them.
  assert.deepEqual(command.nodeIds, ['obs-Command-vx', 'obs-Command-vy', 'obs-Command-yaw']);
  assert.equal(command.channelCount, 3);

  // Only observation nodes count: the sim-side node shares the vec3 keys.
  assert.deepEqual(angVel.nodeIds, ['obs-RootAngVelB']);
  assert.equal(angVel.channelCount, 3);

  assert.deepEqual(jointPos.nodeIds, ['obs-JointPos']);
  assert.equal(jointPos.channelCount, 2);
});

test('buildObsStackLayout leaves blocks without live signals unprobeable', () => {
  const layout = buildObsStackLayout({
    ...telemetry,
    atomicNodes: [
      { id: 'obs-RootAngVelB', group: 'obs', concatOffset: 0, probeKeys: [] }
    ]
  });
  for (const block of layout.blocks) {
    assert.deepEqual(block.nodeIds, []);
    assert.equal(block.channelCount, 0);
  }
});

test('buildObsStackLayout caps the channel count at what the scope can plot', () => {
  const probeKeys = Array.from({ length: MAX_SCOPE_CHANNELS + 8 }, (_, i) => `j${i}`);
  const layout = buildObsStackLayout({
    ...telemetry,
    atomicNodes: [obsNode('obs-JointPos', 6, probeKeys)]
  });
  assert.equal(layout.blocks[2].channelCount, MAX_SCOPE_CHANNELS);
});

test('buildObsStackLayout is not ready without telemetry', () => {
  assert.equal(buildObsStackLayout(null).ready, false);
  assert.equal(buildObsStackLayout({ ready: false }).ready, false);
  assert.equal(buildObsStackLayout({ ready: true, obsBlocks: [], concat: {} }).ready, false);
});
