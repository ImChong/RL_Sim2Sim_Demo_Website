import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  portPointFromLayoutNode,
  portPointInCanvasSpace
} from '../src/simulation/pipelineGraphEdgeCoords.js';

test('portPointFromLayoutNode places in/out on node box edges', () => {
  const node = { x: 20, y: 100, width: 118, height: 56 };
  const inp = portPointFromLayoutNode(node, 'in');
  const out = portPointFromLayoutNode(node, 'out');
  assert.deepEqual(inp, { x: 20, y: 128 });
  assert.deepEqual(out, { x: 138, y: 128 });
});

test('portPointInCanvasSpace maps scaled viewport offsets to logical SVG coords', () => {
  const canvasRect = { left: 100, top: 50, width: 400, height: 300 };
  const portRect = { left: 220, top: 110, width: 8, height: 8 };
  const canvasSize = { width: 800, height: 600 };

  const out = portPointInCanvasSpace(canvasRect, portRect, 'out', canvasSize);
  assert.equal(out.x, (220 + 8 - 100) * 2);
  assert.equal(out.y, (110 + 4 - 50) * 2);

  const inp = portPointInCanvasSpace(canvasRect, portRect, 'in', canvasSize);
  assert.equal(inp.x, (220 - 100) * 2);
  assert.equal(inp.y, out.y);
});

test('portPointInCanvasSpace is identity when visual scale is 1', () => {
  const canvasRect = { left: 0, top: 0, width: 800, height: 600 };
  const portRect = { left: 120, top: 40, width: 8, height: 8 };
  const canvasSize = { width: 800, height: 600 };
  const p = portPointInCanvasSpace(canvasRect, portRect, 'out', canvasSize);
  assert.equal(p.x, 128);
  assert.equal(p.y, 44);
});
