import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeQuat,
  quatConjugate,
  quatMultiply,
  quatInverse,
  yawComponent,
  linspaceRows,
  slerpMany,
  clampFutureIndices,
  toFloatArray,
  quatApplyInv,
  quatToRotVec,
  quatToRot6d,
} from '../src/simulation/utils/math.js';

const EPS = 1e-6;

function approxEqual(actual, expected, eps = EPS, message = '') {
  assert.equal(
    actual.length,
    expected.length,
    `${message} length mismatch: ${actual.length} vs ${expected.length}`,
  );
  for (let i = 0; i < expected.length; i++) {
    assert.ok(
      Math.abs(actual[i] - expected[i]) <= eps,
      `${message} index ${i}: ${actual[i]} vs ${expected[i]}`,
    );
  }
}

function quatFromAxisAngle(axis, angle) {
  const len = Math.hypot(...axis);
  const [ax, ay, az] = len > 0 ? axis.map((v) => v / len) : [0, 0, 1];
  const half = angle / 2;
  const s = Math.sin(half);
  return [Math.cos(half), ax * s, ay * s, az * s];
}

test('normalizeQuat returns unit-norm quaternion', () => {
  const q = normalizeQuat([2, 0, 0, 0]);
  approxEqual(q, [1, 0, 0, 0]);

  const q2 = normalizeQuat([1, 1, 1, 1]);
  const norm = Math.hypot(...q2);
  assert.ok(Math.abs(norm - 1) < EPS, `norm should be 1, got ${norm}`);
});

test('normalizeQuat falls back to identity for near-zero quaternion', () => {
  approxEqual(normalizeQuat([0, 0, 0, 0]), [1, 0, 0, 0]);
  approxEqual(normalizeQuat([1e-12, 0, 0, 0]), [1, 0, 0, 0]);
});

test('quatConjugate negates the imaginary part', () => {
  approxEqual(quatConjugate([0.5, 1, -2, 3]), [0.5, -1, 2, -3]);
});

test('quatMultiply composes quaternions correctly', () => {
  const identity = [1, 0, 0, 0];
  const q = normalizeQuat([0.3, 0.4, 0.5, 0.6]);
  approxEqual(quatMultiply(identity, q), q);
  approxEqual(quatMultiply(q, identity), q);

  const rotZ90 = quatFromAxisAngle([0, 0, 1], Math.PI / 2);
  const composed = quatMultiply(rotZ90, rotZ90);
  const rotZ180 = quatFromAxisAngle([0, 0, 1], Math.PI);
  approxEqual(composed, rotZ180);
});

test('quatInverse times quaternion equals identity', () => {
  const q = normalizeQuat([0.2, -0.3, 0.5, 0.7]);
  const qInv = quatInverse(q);
  const product = quatMultiply(q, qInv);
  approxEqual(product, [1, 0, 0, 0]);
});

test('quatInverse returns identity for zero quaternion', () => {
  approxEqual(quatInverse([0, 0, 0, 0]), [1, 0, 0, 0]);
});

test('yawComponent extracts yaw-only rotation from pure yaw quaternion', () => {
  const yaw = 0.7;
  const q = quatFromAxisAngle([0, 0, 1], yaw);
  const yq = yawComponent(q);
  approxEqual(yq, q);
});

test('yawComponent strips pitch and roll components', () => {
  const yaw = 0.4;
  const yawQuat = quatFromAxisAngle([0, 0, 1], yaw);
  const pitchQuat = quatFromAxisAngle([0, 1, 0], 0.3);
  const combined = quatMultiply(yawQuat, pitchQuat);
  const extracted = yawComponent(combined);
  approxEqual(extracted, yawQuat, 1e-5);
});

test('linspaceRows returns `steps` interpolated rows with exclusive endpoints', () => {
  const a = [0, 0];
  const b = [10, 20];
  const rows = linspaceRows(a, b, 3);
  assert.equal(rows.length, 3);
  approxEqual(Array.from(rows[0]), [2.5, 5]);
  approxEqual(Array.from(rows[1]), [5, 10]);
  approxEqual(Array.from(rows[2]), [7.5, 15]);
});

test('linspaceRows returns empty for non-positive steps', () => {
  assert.deepEqual(linspaceRows([0], [1], 0), []);
  assert.deepEqual(linspaceRows([0], [1], -1), []);
});

test('slerpMany interpolates along the great circle between two quaternions', () => {
  const q0 = [1, 0, 0, 0];
  const q1 = quatFromAxisAngle([0, 0, 1], Math.PI / 2);
  const rows = slerpMany(q0, q1, 1);
  assert.equal(rows.length, 1);
  const expected = quatFromAxisAngle([0, 0, 1], Math.PI / 4);
  approxEqual(Array.from(rows[0]), expected);
});

test('slerpMany handles antipodal quaternions by flipping sign', () => {
  const q0 = [1, 0, 0, 0];
  const q1 = [-1, 0, 0, 0];
  const rows = slerpMany(q0, q1, 1);
  assert.equal(rows.length, 1);
  const sample = Array.from(rows[0]);
  approxEqual(sample, [1, 0, 0, 0], 1e-5);
});

test('slerpMany returns empty for non-positive steps', () => {
  assert.deepEqual(slerpMany([1, 0, 0, 0], [0, 1, 0, 0], 0), []);
});

test('clampFutureIndices clamps to [0, length-1]', () => {
  assert.deepEqual(clampFutureIndices(5, [0, 2, 100], 10), [5, 7, 9]);
  assert.deepEqual(clampFutureIndices(0, [-3, 0, 1], 5), [0, 0, 1]);
  assert.deepEqual(clampFutureIndices(2, [-5], 4), [0]);
});

test('toFloatArray fills from array with fallback for missing entries', () => {
  const out = toFloatArray([1, 2, 3], 5, -1);
  assert.equal(out.length, 5);
  approxEqual(Array.from(out), [1, 2, 3, -1, -1]);
});

test('toFloatArray fills from typed array view', () => {
  const out = toFloatArray(new Float32Array([4, 5]), 4, 0);
  approxEqual(Array.from(out), [4, 5, 0, 0]);
});

test('toFloatArray broadcasts a scalar across the array', () => {
  const out = toFloatArray(7, 3);
  approxEqual(Array.from(out), [7, 7, 7]);
});

test('toFloatArray uses fallback when value is null/undefined', () => {
  const out = toFloatArray(undefined, 3, 1.5);
  approxEqual(Array.from(out), [1.5, 1.5, 1.5]);
});

test('quatApplyInv with identity quaternion returns the input vector', () => {
  approxEqual(quatApplyInv([1, 0, 0, 0], [1, 2, 3]), [1, 2, 3]);
});

test('quatApplyInv inverts a rotation around z-axis', () => {
  const q = quatFromAxisAngle([0, 0, 1], Math.PI / 2);
  const result = quatApplyInv(q, [1, 0, 0]);
  approxEqual(result, [0, -1, 0], 1e-5);
});

test('quatApplyInv composed with quatMultiply round-trips the original vector', () => {
  const q = normalizeQuat([0.3, 0.5, 0.2, 0.7]);
  const v = [1.5, -2.0, 0.8];
  const inv = quatInverse(q);
  const rotated = quatApplyInv(inv, v);
  const back = quatApplyInv(q, rotated);
  approxEqual(back, v, 1e-5);
});

test('quatToRotVec returns zero vector for identity quaternion', () => {
  approxEqual(quatToRotVec([1, 0, 0, 0]), [0, 0, 0]);
});

test('quatToRotVec recovers axis-angle for known rotation', () => {
  const angle = 1.2;
  const q = quatFromAxisAngle([0, 0, 1], angle);
  approxEqual(quatToRotVec(q), [0, 0, angle], 1e-5);
});

test('quatToRot6d returns first two rotation matrix columns', () => {
  approxEqual(quatToRot6d([1, 0, 0, 0]), [1, 0, 0, 0, 1, 0]);

  const q = quatFromAxisAngle([0, 0, 1], Math.PI / 2);
  approxEqual(quatToRot6d(q), [0, 1, 0, -1, 0, 0], 1e-5);
});

test('quatToRot6d output preserves orthogonality of first two columns', () => {
  const q = normalizeQuat([0.1, 0.4, -0.3, 0.6]);
  const [a0, a1, a2, b0, b1, b2] = quatToRot6d(q);
  const dotAA = a0 * a0 + a1 * a1 + a2 * a2;
  const dotBB = b0 * b0 + b1 * b1 + b2 * b2;
  const dotAB = a0 * b0 + a1 * b1 + a2 * b2;
  assert.ok(Math.abs(dotAA - 1) < 1e-5, `column a not unit: ${dotAA}`);
  assert.ok(Math.abs(dotBB - 1) < 1e-5, `column b not unit: ${dotBB}`);
  assert.ok(Math.abs(dotAB) < 1e-5, `columns not orthogonal: ${dotAB}`);
});
