import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildObsLayout,
  buildPolicyTelemetry,
  formatFloat,
  sampleArray,
  summarizeArray
} from '../src/simulation/policyTelemetry.js';

test('formatFloat handles edge cases', () => {
  assert.equal(formatFloat(NaN), '—');
  assert.equal(formatFloat(0), '0.000');
  assert.match(formatFloat(12345), /e/);
});

test('summarizeArray computes min max mean', () => {
  const stats = summarizeArray(new Float32Array([1, 3, 5]));
  assert.equal(stats.min, 1);
  assert.equal(stats.max, 5);
  assert.equal(stats.mean, 3);
});

test('sampleArray returns first N elements', () => {
  assert.deepEqual(sampleArray(new Float32Array([1, 2, 3, 4, 5]), 3), [1, 2, 3]);
});

test('buildObsLayout uses module sizes and offsets', () => {
  const runner = {
    config: {
      obs_config: {
        policy: [
          { name: 'RootAngVelB' },
          { name: 'Command' }
        ]
      }
    },
    obsModules: [
      { size: 3 },
      { size: 3 }
    ]
  };
  const layout = buildObsLayout(runner);
  assert.equal(layout.length, 2);
  assert.equal(layout[0].offset, 0);
  assert.equal(layout[0].size, 3);
  assert.equal(layout[1].offset, 3);
  assert.equal(layout[1].name, 'Command');
});

test('buildPolicyTelemetry returns ready snapshot', () => {
  const runner = {
    config: {
      onnx: {
        path: './model.onnx',
        meta: { in_keys: ['policy'], out_keys: ['action'] }
      },
      obs_config: { policy: [{ name: 'Command' }], history_length: 1 }
    },
    module: { inKeys: ['policy'], outKeys: ['action'], isRecurrent: false },
    obsModules: [{ size: 3 }],
    numObs: 3,
    numActions: 2,
    historyLength: 1,
    historyCount: 1,
    obsForPolicy: new Float32Array([1, 0, 0.5]),
    fullObs: new Float32Array(3),
    lastActions: new Float32Array([0.1, -0.2]),
    lastRawAction: new Float32Array([0.15, -0.25]),
    lastExtraOutputs: {},
    actionScale: new Float32Array([0.5, 0.5]),
    defaultJointPos: new Float32Array([0, 0]),
    target: new Float32Array([0.05, -0.1]),
    cachedJointPosRel: new Float32Array([0, 0]),
    obsJointPosRelative: false,
    actionClip: 10,
    policyJointNames: ['hip', 'knee'],
    lastStepAt: 100,
    stepCount: 5
  };
  const telemetry = buildPolicyTelemetry(runner, null, { lang: 'zh' });
  assert.equal(telemetry.ready, true);
  assert.equal(telemetry.obsBlocks.length, 1);
  assert.equal(telemetry.onnx.inputShape[1], 3);
  assert.equal(telemetry.postprocess.targetSample.length, 2);
});
