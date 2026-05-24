import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clampControlPanelSize,
  DEFAULT_CONTROL_PANEL_SIZE,
  MIN_CONTROL_PANEL_SIZE
} from '../src/utils/controlPanelSize.js';

test('clampControlPanelSize respects minimum and viewport', () => {
  const original = globalThis.window;
  globalThis.window = { innerWidth: 1200, innerHeight: 900 };
  try {
    const small = clampControlPanelSize(200, 200);
    assert.equal(small.width, MIN_CONTROL_PANEL_SIZE.width);
    assert.equal(small.height, MIN_CONTROL_PANEL_SIZE.height);

    const large = clampControlPanelSize(4000, 4000);
    assert.equal(large.width, 1164);
    assert.equal(large.height, 822);
  } finally {
    globalThis.window = original;
  }
});

test('DEFAULT_CONTROL_PANEL_SIZE is above minimum', () => {
  assert.ok(DEFAULT_CONTROL_PANEL_SIZE.width >= MIN_CONTROL_PANEL_SIZE.width);
  assert.ok(DEFAULT_CONTROL_PANEL_SIZE.height >= MIN_CONTROL_PANEL_SIZE.height);
});
