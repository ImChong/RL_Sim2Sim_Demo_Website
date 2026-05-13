import { normalizeQuat, slerpMany } from '../src/simulation/utils/math.js';

export function slerpManyNew(q0, q1, steps) {
  if (steps <= 0) {
    return [];
  }
  const start = normalizeQuat(q0);
  const end = normalizeQuat(q1);
  let dot = start[0] * end[0] + start[1] * end[1] + start[2] * end[2] + start[3] * end[3];
  if (dot < 0.0) {
    dot = -dot;
    end[0] = -end[0];
    end[1] = -end[1];
    end[2] = -end[2];
    end[3] = -end[3];
  }

  const results = [];
  const EPS = 1e-6;
  const denom = steps + 1;

  if (1.0 - dot < EPS) {
    for (let i = 1; i <= steps; i++) {
      const t = i / denom;
      const row = new Float32Array(4);
      row[0] = (1.0 - t) * start[0] + t * end[0];
      row[1] = (1.0 - t) * start[1] + t * end[1];
      row[2] = (1.0 - t) * start[2] + t * end[2];
      row[3] = (1.0 - t) * start[3] + t * end[3];
      results.push(normalizeQuat(row, row));
    }
    return results;
  }

  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);
  for (let i = 1; i <= steps; i++) {
    const t = i / denom;
    const coeff0 = Math.sin((1.0 - t) * omega) / sinOmega;
    const coeff1 = Math.sin(t * omega) / sinOmega;
    const row = new Float32Array(4);
    row[0] = coeff0 * start[0] + coeff1 * end[0];
    row[1] = coeff0 * start[1] + coeff1 * end[1];
    row[2] = coeff0 * start[2] + coeff1 * end[2];
    row[3] = coeff0 * start[3] + coeff1 * end[3];
    results.push(row);
  }
  return results;
}

const q0 = new Float32Array([1, 0, 0, 0]);
const q1 = new Float32Array([0, 1, 0, 0]);

console.time('slerpMany_original');
for (let i = 0; i < 100000; i++) {
  slerpMany(q0, q1, 10);
}
console.timeEnd('slerpMany_original');


console.time('slerpManyNew');
for (let i = 0; i < 100000; i++) {
  slerpManyNew(q0, q1, 10);
}
console.timeEnd('slerpManyNew');
