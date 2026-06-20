import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildParkourObsLayout,
  getParkourPolicyConfig,
  PARKOUR_OBSERVATION_NAMES
} from '../src/simulation/parkourPolicyConfig.js';
import { buildParkourPolicyTelemetry } from '../src/simulation/parkourPolicyTelemetry.js';
import { buildPipelineGraph } from '../src/simulation/pipelineGraphLayout.js';
import { inferPolicyFamily, isPrevActionObsNodeId } from '../src/simulation/pipelineObsNodes.js';

test('parkour config matches student ONNX observation layout', () => {
  const config = getParkourPolicyConfig();
  assert.deepEqual(config.observationNames, PARKOUR_OBSERVATION_NAMES);
  assert.equal(config.numActions, 29);
  assert.equal(config.numObs, 108);
});

test('buildParkourPolicyTelemetry exposes scaffold graph before iframe live data', () => {
  const telemetry = buildParkourPolicyTelemetry(null, { lang: 'zh' });
  assert.equal(telemetry.ready, true);
  assert.equal(telemetry.live, false);
  assert.equal(telemetry.policyFamily, 'parkour');
  assert.ok(telemetry.atomicNodes.some((node) => node.id === 'prep-depth-capture'));
  assert.ok(telemetry.atomicNodes.some((node) => node.id === 'obs-actions'));

  const graph = buildPipelineGraph(telemetry, 'zh');
  assert.ok(graph.nodes.length > 0);
  assert.ok(graph.edges.some((edge) => edge.kind === 'loopback'));
});

test('buildParkourPolicyTelemetry maps live iframe snapshot', () => {
  const config = getParkourPolicyConfig();
  const obsLayout = buildParkourObsLayout();
  const obsVector = new Array(config.numObs).fill(0);
  const snapshot = {
    ready: true,
    timestamp: 1000,
    stepCount: 42,
    obsVector,
    obsLayout,
    jointNames: config.jointNames,
    latestAction: new Array(config.numActions).fill(0.1),
    latestTarget: new Array(config.numActions).fill(0.2),
    prevActions: new Array(config.numActions).fill(0),
    state: {
      rootPos: [0, 0, 0.8],
      rootQuat: [1, 0, 0, 0],
      rootAngVel: [0, 0, 0],
      jointPos: new Array(config.numActions).fill(0),
      jointVel: new Array(config.numActions).fill(0),
      virtualInput: new Array(15).fill(0)
    },
    motorJoints: config.jointNames.slice(0, 2).map((name, index) => ({
      name,
      qpos: 0,
      qvel: 0,
      target: 0.2,
      kp: 100,
      kd: 2,
      torque: 20 + index,
      ctrl: 20 + index
    }))
  };

  const telemetry = buildParkourPolicyTelemetry(snapshot, { lang: 'zh' });
  assert.equal(telemetry.live, true);
  assert.equal(inferPolicyFamily({ policyId: 'g1-parkour' }), 'parkour');
  assert.equal(isPrevActionObsNodeId('obs-actions'), true);
  assert.equal(telemetry.onnx.inputShape[1], 108);
});
