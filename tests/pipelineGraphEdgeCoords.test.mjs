import { test } from 'node:test';
import assert from 'node:assert/strict';
import { portPointInCanvasSpace } from '../src/simulation/pipelineGraphEdgeCoords.js';

test('portPointInCanvasSpace maps scaled viewport offsets to logical SVG coords', () => {
  const canvasRect = { left: 100, top: 50, width: 400, height: 300 };
  const portRect = { left: 220, top: 110, width: 8, height: 8 };
  const scale = 0.5;

  const out = portPointInCanvasSpace(canvasRect, portRect, 'out', scale);
  assert.equal(out.x, (220 + 8 - 100) / 0.5);
  assert.equal(out.y, (110 + 4 - 50) / 0.5);

  const inp = portPointInCanvasSpace(canvasRect, portRect, 'in', scale);
  assert.equal(inp.x, (220 - 100) / 0.5);
  assert.equal(inp.y, out.y);
});

test('portPointInCanvasSpace is identity when scale is 1', () => {
  const canvasRect = { left: 0, top: 0, width: 800, height: 600 };
  const portRect = { left: 120, top: 40, width: 8, height: 8 };
  const p = portPointInCanvasSpace(canvasRect, portRect, 'out', 1);
  assert.equal(p.x, 128);
  assert.equal(p.y, 44);
});
