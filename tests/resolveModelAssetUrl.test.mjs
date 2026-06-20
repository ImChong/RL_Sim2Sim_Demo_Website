import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildNetronViewerUrl,
  resolveModelAssetUrl
} from '../src/utils/resolveModelAssetUrl.js';

const ORIGIN = 'https://example.test';
const BASE = '/RL_Sim2Sim_Demo_Website/';

test('resolveModelAssetUrl resolves relative policy paths against site base', () => {
  const url = resolveModelAssetUrl(
    './examples/checkpoints/g1/tracking/policy_latest.onnx',
    BASE,
    ORIGIN
  );
  assert.equal(
    url,
    'https://example.test/RL_Sim2Sim_Demo_Website/examples/checkpoints/g1/tracking/policy_latest.onnx'
  );
});

test('resolveModelAssetUrl keeps absolute http URLs unchanged', () => {
  const absolute = 'https://cdn.example.test/model.onnx';
  assert.equal(resolveModelAssetUrl(absolute, BASE, ORIGIN), absolute);
});

test('buildNetronViewerUrl points to vendored Netron with encoded model url', () => {
  const viewer = buildNetronViewerUrl(
    './examples/checkpoints/g1/tracking/policy_latest.onnx',
    BASE,
    ORIGIN
  );
  assert.match(viewer, /^https:\/\/example\.test\/RL_Sim2Sim_Demo_Website\/netron\/index\.html\?url=/);
  const modelParam = decodeURIComponent(viewer.split('?url=')[1]);
  assert.equal(
    modelParam,
    'https://example.test/RL_Sim2Sim_Demo_Website/examples/checkpoints/g1/tracking/policy_latest.onnx'
  );
});
