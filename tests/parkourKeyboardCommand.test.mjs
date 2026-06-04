import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isParkourMovementKey,
  isParkourPauseKey,
  isParkourResetKey,
  parkourVirtualKeysFromKeyboard
} from '../src/utils/parkourKeyboardCommand.js';

test('parkour movement keys are W/A/D only', () => {
  assert.equal(isParkourMovementKey('KeyW'), true);
  assert.equal(isParkourMovementKey('KeyS'), false);
});

test('parkourVirtualKeysFromKeyboard maps held codes', () => {
  const keys = parkourVirtualKeysFromKeyboard(new Set(['KeyW', 'KeyA']), true);
  assert.equal(keys.w, true);
  assert.equal(keys.a, true);
  assert.equal(keys.d, false);
  assert.equal(keys.highSpeed, true);
  assert.equal(keys.active, true);
});

test('parkour pause and reset key codes', () => {
  assert.equal(isParkourPauseKey('Space'), true);
  assert.equal(isParkourResetKey('Backspace'), true);
});
