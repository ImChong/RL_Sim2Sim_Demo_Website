import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  mergeNodeLayout,
  computeGraphBounds,
  clampNodeSize,
  pruneNodeOverrides,
  graphLayoutKey
} from '../src/utils/pipelineGraphNodeLayout.js';

test('mergeNodeLayout applies per-node overrides', () => {
  const base = [{ id: 'a', x: 10, y: 20, width: 100, height: 50 }];
  const merged = mergeNodeLayout(base, { a: { x: 30, width: 140 } });
  assert.deepEqual(merged[0], { id: 'a', x: 30, y: 20, width: 140, height: 50 });
});

test('computeGraphBounds expands canvas for dragged nodes', () => {
  const nodes = [{ id: 'a', x: 400, y: 300, width: 120, height: 60 }];
  const bounds = computeGraphBounds(nodes, { width: 200, height: 200 });
  assert.ok(bounds.width >= 400 + 120 + 28);
  assert.ok(bounds.height >= 300 + 60 + 28);
});

test('clampNodeSize enforces limits', () => {
  assert.deepEqual(clampNodeSize(50, 20), { width: 104, height: 44 });
  assert.deepEqual(clampNodeSize(500, 400), { width: 420, height: 360 });
});

test('pruneNodeOverrides drops stale node ids', () => {
  const pruned = pruneNodeOverrides({ a: { x: 1 }, b: { x: 2 } }, ['a']);
  assert.deepEqual(pruned, { a: { x: 1 } });
});

test('graphLayoutKey is stable for node set', () => {
  assert.equal(graphLayoutKey([{ id: 'b' }, { id: 'a' }]), 'a|b');
});
