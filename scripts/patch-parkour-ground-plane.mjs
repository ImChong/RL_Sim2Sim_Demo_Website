#!/usr/bin/env node
/**
 * Widen the parkour floor reflector so depth/perception keeps working past the
 * obstacle course end (finish marker at x=66 in g1_with_terrain.xml).
 *
 * The upstream bundle uses PlaneGeometry(100, 100) centered at the origin, which
 * only covers x in [-50, 50]. Scale the course-axis extent to 150 m and scale
 * the checker repeat on that axis so tile size stays consistent.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

const LEGACY_PLANE =
  'J.repeat.set(J.repeat.x,J.repeat.y),J.needsUpdate=!0),(Q.reflectors||(Q.reflectors=[]),r=new yN(new xI(100,100),{clipBias:.003';

const WIDENED_PLANE =
  'J.repeat.set(J.repeat.x*1.5,J.repeat.y),J.needsUpdate=!0),(Q.reflectors||(Q.reflectors=[]),r=new yN(new xI(150,100),{clipBias:.003';

let bundle = readFileSync(bundlePath, 'utf8');

if (bundle.includes(LEGACY_PLANE)) {
  bundle = bundle.replace(LEGACY_PLANE, WIDENED_PLANE);
} else if (!bundle.includes(WIDENED_PLANE)) {
  console.error('Missing parkour ground-plane patch target');
  process.exit(1);
}

writeFileSync(bundlePath, bundle);
console.log('Patched', bundlePath);
