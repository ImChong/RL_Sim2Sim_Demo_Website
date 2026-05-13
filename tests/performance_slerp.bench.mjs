import { slerpMany } from '../src/simulation/utils/math.js';

const q0 = new Float32Array([1, 0, 0, 0]);
const q1 = new Float32Array([0, 1, 0, 0]);

console.time('slerpMany_original');
for (let i = 0; i < 100000; i++) {
  slerpMany(q0, q1, 10);
}
console.timeEnd('slerpMany_original');
