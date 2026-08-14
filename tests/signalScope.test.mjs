import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildProbeId,
  clearScopeBuffer,
  createSignalScope,
  DEFAULT_WINDOW_SECONDS,
  getScopeSnapshot,
  listNodeProbes,
  MAX_SCOPE_CHANNELS,
  nodeHasProbes,
  nodeProbeKeys,
  pushScopeSample,
  resolveSignalValue,
  scopeChannelColor,
  setScopeProbes,
  toggleScopeProbe
} from '../src/simulation/signalScope.js';
import { buildAtomicNodes } from '../src/simulation/pipelineAtomicNodes.js';

test('buildProbeId and toggleScopeProbe manage channels', () => {
  const scope = createSignalScope({ capacity: 8, maxChannels: 2 });
  const probe = {
    id: buildProbeId('sim-cmd-vx', 'vx'),
    nodeId: 'sim-cmd-vx',
    lineKey: 'vx',
    label: 'Cmd vx'
  };
  assert.equal(toggleScopeProbe(scope, probe), true);
  assert.equal(scope.channels.length, 1);
  assert.equal(toggleScopeProbe(scope, probe), false);
  assert.equal(scope.channels.length, 0);
});

test('pushScopeSample writes ring buffer samples', () => {
  const scope = createSignalScope({ capacity: 4, maxChannels: 2 });
  toggleScopeProbe(scope, {
    id: 'sim-cmd-vx:vx',
    nodeId: 'sim-cmd-vx',
    lineKey: 'vx',
    label: 'Cmd vx'
  });
  toggleScopeProbe(scope, {
    id: 'sim-cmd-vy:vy',
    nodeId: 'sim-cmd-vy',
    lineKey: 'vy',
    label: 'Cmd vy'
  });

  const runner = {
    policyJointNames: [],
    historyLength: 1,
    obsForPolicy: new Float32Array(0),
    fullObs: new Float32Array(0),
    obsModules: [],
    config: {}
  };
  const demo = {
    readPolicyState: () => ({ cmd: [1, 2, 3] })
  };

  pushScopeSample(scope, runner, demo, 1000);
  pushScopeSample(scope, runner, {
    readPolicyState: () => ({ cmd: [1.5, 2.5, 3.5] })
  }, 1100);

  const snapshot = getScopeSnapshot(scope);
  assert.equal(snapshot.sampleCount, 2);
  assert.equal(snapshot.series.length, 2);
  assert.equal(snapshot.series[0].values[1], 1.5);
  assert.equal(snapshot.series[1].values[1], 2.5);
});

test('resolveSignalValue reads command and joint action signals', () => {
  const runner = {
    policyJointNames: ['left_hip_pitch_joint', 'right_hip_pitch_joint'],
    lastActions: new Float32Array([0.2, -0.1]),
    target: new Float32Array([0.3, -0.2]),
    cachedJointPosRel: new Float32Array([0.01, 0.02]),
    historyLength: 1,
    obsForPolicy: new Float32Array([0.5, -0.25, 0.75]),
    fullObs: new Float32Array([0.5, -0.25, 0.75]),
    obsModules: [{ size: 3 }],
    config: { obs_config: { policy: [{ name: 'Command' }] } }
  };
  const demo = {
    readPolicyState: () => ({
      cmd: [0.8, 0.1, 0.3],
      jointPos: [1.1, 1.2],
      jointVel: [0.4, 0.5],
      rootPos: [0, 0, 0.9],
      rootAngVel: [0.1, 0.2, 0.3],
      rootQuat: [1, 0, 0, 0]
    })
  };

  assert.equal(resolveSignalValue(runner, demo, { nodeId: 'sim-cmd-vx', lineKey: 'vx' }), 0.8);
  assert.ok(Math.abs(resolveSignalValue(runner, demo, { nodeId: 'out-action', lineKey: 'L_hip_pitch' }) - 0.2) < 1e-5);
  assert.equal(resolveSignalValue(runner, demo, { nodeId: 'obs-Command-vx', lineKey: 'vx' }), 0.5);
});

test('setScopeProbes replaces active channels', () => {
  const scope = createSignalScope({ capacity: 8, maxChannels: 4 });
  toggleScopeProbe(scope, {
    id: 'sim-cmd-vx:vx',
    nodeId: 'sim-cmd-vx',
    lineKey: 'vx',
    label: 'Cmd vx'
  });
  const probes = [
    {
      id: buildProbeId('sim-root-angvel', 'x'),
      nodeId: 'sim-root-angvel',
      lineKey: 'x',
      label: 'Root AngVel · x'
    },
    {
      id: buildProbeId('sim-root-angvel', 'y'),
      nodeId: 'sim-root-angvel',
      lineKey: 'y',
      label: 'Root AngVel · y'
    }
  ];
  setScopeProbes(scope, probes);
  assert.equal(scope.channels.length, 2);
  assert.equal(scope.channels[0].id, 'sim-root-angvel:x');
  assert.equal(getScopeSnapshot(scope).sampleCount, 0);
});

test('clearScopeBuffer resets timeline but keeps channels', () => {
  const scope = createSignalScope({ capacity: 4 });
  toggleScopeProbe(scope, {
    id: 'sim-cmd-vx:vx',
    nodeId: 'sim-cmd-vx',
    lineKey: 'vx',
    label: 'Cmd vx'
  });
  pushScopeSample(scope, null, { readPolicyState: () => ({ cmd: [1, 0, 0] }) }, 1000);
  clearScopeBuffer(scope);
  assert.equal(scope.channels.length, 1);
  assert.equal(getScopeSnapshot(scope).sampleCount, 0);
});

test('getScopeSnapshot keeps only the latest windowSeconds of samples', () => {
  const scope = createSignalScope({ capacity: 256, windowSeconds: 20 });
  setScopeProbes(scope, [{
    id: 'sim-cmd-vx:vx',
    nodeId: 'sim-cmd-vx',
    lineKey: 'vx',
    label: 'Cmd vx'
  }]);

  for (let t = 0; t <= 30; t += 1) {
    pushScopeSample(
      scope,
      null,
      { readPolicyState: () => ({ cmd: [t, 0, 0] }) },
      1000 + t * 1000
    );
  }

  const snapshot = getScopeSnapshot(scope);
  assert.equal(snapshot.windowSeconds, 20);
  assert.ok(snapshot.sampleCount <= 21);
  assert.ok(snapshot.times[0] >= 10);
  assert.equal(snapshot.times[0], 10);
  assert.equal(snapshot.times[snapshot.times.length - 1], 30);
});

function buildJointRunnerNodes(jointCount) {
  const jointNames = Array.from(
    { length: jointCount },
    (_, i) => `left_joint_${i}_joint`
  );
  const runner = {
    policyJointNames: jointNames,
    numActions: jointCount,
    obsJointPosRelative: false,
    actionClip: 10,
    lastActions: new Float32Array(jointCount),
    target: new Float32Array(jointCount)
  };
  const state = {
    rootPos: new Float32Array([0, 0, 0.9]),
    rootQuat: new Float32Array([1, 0, 0, 0]),
    rootAngVel: new Float32Array([0, 0, 0]),
    jointPos: Float32Array.from(jointNames, (_, i) => i / 10),
    jointVel: new Float32Array(jointCount),
    cmd: [0, 0, 0]
  };
  const obsLayout = [{ name: 'JointPos', offset: 0, size: jointCount, kwargs: { pos_steps: [0] } }];
  const nodes = buildAtomicNodes(
    runner,
    state,
    new Float32Array(jointCount),
    obsLayout,
    'zh'
  );
  return { runner, state, nodes };
}

test('listNodeProbes expands a node summarized by its dimension', () => {
  const { nodes } = buildJointRunnerNodes(23);
  const jointPos = nodes.find((n) => n.id === 'sim-joint-pos');

  // The card only renders "维度 23D" but every joint must still be plottable.
  assert.equal(jointPos.lines.length, 1);
  assert.equal(nodeHasProbes(jointPos), true);

  const probes = listNodeProbes(jointPos);
  assert.equal(probes.length, 23);
  assert.equal(probes[0].nodeId, 'sim-joint-pos');
  assert.equal(probes[0].lineKey, 'L_joint_0');
  assert.equal(probes[0].id, 'sim-joint-pos:L_joint_0');
});

test('clicking a joint node plots every joint curve', () => {
  const { runner, state, nodes } = buildJointRunnerNodes(23);
  const scope = createSignalScope({ capacity: 8 });
  const probes = listNodeProbes(nodes.find((n) => n.id === 'sim-joint-pos'));

  const channels = setScopeProbes(scope, probes);
  assert.equal(channels.length, 23);
  assert.equal(new Set(channels.map((ch) => ch.color)).size, 23);

  const demo = { readPolicyState: () => state };
  pushScopeSample(scope, runner, demo, 1000);
  const snapshot = getScopeSnapshot(scope);
  assert.equal(snapshot.series.length, 23);
  assert.ok(Math.abs(snapshot.series[7].values[0] - 0.7) < 1e-5);
});

test('nodeProbeKeys treats an empty probeKeys list as not probeable', () => {
  const { nodes } = buildJointRunnerNodes(2);
  const clip = nodes.find((n) => n.id === 'prep-action-clip');
  assert.deepEqual(nodeProbeKeys(clip), []);
  assert.equal(nodeHasProbes(clip), false);
  assert.deepEqual(listNodeProbes(clip), []);
});

test('nodeProbeKeys falls back to rendered lines when no probeKeys exist', () => {
  const node = { id: 'legacy', lines: [{ k: 'a' }, { k: 'dim', v: '3D' }, { k: '…' }] };
  assert.deepEqual(nodeProbeKeys(node), ['a']);
});

test('setScopeProbes stops at the channel cap', () => {
  const scope = createSignalScope({ capacity: 4 });
  const probes = Array.from({ length: MAX_SCOPE_CHANNELS + 5 }, (_, i) => ({
    id: buildProbeId('obs-Wide', `[${i}]`),
    nodeId: 'obs-Wide',
    lineKey: `[${i}]`,
    label: `Wide · [${i}]`
  }));
  assert.equal(setScopeProbes(scope, probes).length, MAX_SCOPE_CHANNELS);
});

test('scopeChannelColor stays distinct past the curated palette', () => {
  const colors = Array.from({ length: MAX_SCOPE_CHANNELS }, (_, i) => scopeChannelColor(i));
  assert.equal(new Set(colors).size, MAX_SCOPE_CHANNELS);
  assert.equal(colors[0], scopeChannelColor(0));
});

test('resolveSignalValue maps quaternion components onto [w, x, y, z]', () => {
  const runner = { policyJointNames: [], historyLength: 1, obsModules: [], config: {} };
  const demo = { readPolicyState: () => ({ rootQuat: [0.1, 0.2, 0.3, 0.4] }) };
  const read = (lineKey) => resolveSignalValue(runner, demo, { nodeId: 'sim-root-quat', lineKey });

  assert.ok(Math.abs(read('w') - 0.1) < 1e-6);
  assert.ok(Math.abs(read('x') - 0.2) < 1e-6);
  assert.ok(Math.abs(read('y') - 0.3) < 1e-6);
  assert.ok(Math.abs(read('z') - 0.4) < 1e-6);
});

test('resolveSignalValue reads raw observation blocks by block-local index', () => {
  const runner = {
    policyJointNames: [],
    numActions: 0,
    historyLength: 1,
    obsForPolicy: new Float32Array([0, 1, 2, 10, 11, 12, 13]),
    fullObs: new Float32Array([0, 1, 2, 10, 11, 12, 13]),
    obsModules: [{ size: 3 }, { size: 4 }],
    config: { obs_config: { policy: [{ name: 'RootAngVelB' }, { name: 'CustomBlock' }] } }
  };

  assert.equal(resolveSignalValue(runner, null, { nodeId: 'obs-CustomBlock', lineKey: '[0]' }), 10);
  assert.equal(resolveSignalValue(runner, null, { nodeId: 'obs-CustomBlock', lineKey: '[2]' }), 12);
});

test('setScopeProbes keeps probes from a single node only', () => {
  const scope = createSignalScope({ capacity: 8, maxChannels: 8 });
  setScopeProbes(scope, [
    {
      id: buildProbeId('sim-cmd-vx', 'vx'),
      nodeId: 'sim-cmd-vx',
      lineKey: 'vx',
      label: 'Cmd vx'
    },
    {
      id: buildProbeId('sim-root-angvel', 'x'),
      nodeId: 'sim-root-angvel',
      lineKey: 'x',
      label: 'Root AngVel · x'
    }
  ]);
  assert.equal(scope.channels.length, 1);
  assert.equal(scope.channels[0].nodeId, 'sim-cmd-vx');
  assert.equal(DEFAULT_WINDOW_SECONDS, 20);
});
