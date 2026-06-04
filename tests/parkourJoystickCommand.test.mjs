import assert from 'node:assert/strict';
import test from 'node:test';
import {
  computeParkourKeysFromStick,
  stickVisualFromParkourKeys
} from '../src/utils/parkourJoystickCommand.js';

test('parkour stick up maps to forward only', () => {
  const keys = computeParkourKeysFromStick(0, 1);
  assert.equal(keys.w, true);
  assert.equal(keys.a, false);
  assert.equal(keys.d, false);
  assert.equal(keys.active, true);
});

test('parkour stick down produces no command', () => {
  const keys = computeParkourKeysFromStick(0, -1);
  assert.equal(keys.w, false);
  assert.equal(keys.a, false);
  assert.equal(keys.d, false);
  assert.equal(keys.active, false);
});

test('parkour stick left and right map to turn in place', () => {
  const left = computeParkourKeysFromStick(-1, 0);
  assert.equal(left.a, true);
  assert.equal(left.d, false);
  assert.equal(left.w, false);

  const right = computeParkourKeysFromStick(1, 0);
  assert.equal(right.d, true);
  assert.equal(right.a, false);
  assert.equal(right.w, false);
});

test('parkour stick up-left combines forward and turn left', () => {
  const keys = computeParkourKeysFromStick(-1, 1);
  assert.equal(keys.w, true);
  assert.equal(keys.a, true);
  assert.equal(keys.d, false);
});

test('stickVisualFromParkourKeys mirrors active keys', () => {
  const visual = stickVisualFromParkourKeys({ w: true, a: true, d: false });
  assert.ok(visual.normY > 0);
  assert.ok(visual.normX < 0);
});
