import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildProbeId,
  clearScopeBuffer,
  createSignalScope,
  getScopeSnapshot,
  pushScopeSample,
  resolveSignalValue,
  setScopeProbes,
  toggleScopeProbe
} from '../src/simulation/signalScope.js';

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
