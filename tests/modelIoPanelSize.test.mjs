import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clampPanelSize,
  DEFAULT_PANEL_SIZE,
  MIN_PANEL_SIZE
} from '../src/utils/modelIoPanelSize.js';

test('clampPanelSize respects minimum and window bounds', () => {
  const original = globalThis.window;
  globalThis.window = { innerWidth: 1200, innerHeight: 800 };
  try {
    const clamped = clampPanelSize(400, 300);
    assert.equal(clamped.width, MIN_PANEL_SIZE.width);
    assert.equal(clamped.height, MIN_PANEL_SIZE.height);

    const large = clampPanelSize(5000, 5000);
    assert.equal(large.width, 1176);
    assert.equal(large.height, 728);
  } finally {
    globalThis.window = original;
  }
});

test('DEFAULT_PANEL_SIZE is above minimum', () => {
  assert.ok(DEFAULT_PANEL_SIZE.width >= MIN_PANEL_SIZE.width);
  assert.ok(DEFAULT_PANEL_SIZE.height >= MIN_PANEL_SIZE.height);
});
