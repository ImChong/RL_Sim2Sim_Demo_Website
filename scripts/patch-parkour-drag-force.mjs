#!/usr/bin/env node
/**
 * Align parkour mouse-drag disturbance force with AMP / Tracking
 * (src/simulation/main.js: multiplyScalar(60), max magnitude 30).
 *
 * Upstream parkour uses body_mass * 250, which is far too strong on G1.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

const LEGACY_DRAG_FORCE =
  'let R=Qi(this.dragStateManager.currentWorld.clone().sub(this.dragStateManager.worldHit).multiplyScalar(this.model.body_mass[s]*250)),d=Qi(this.dragStateManager.worldHit.clone());';

const AMP_STYLE_DRAG_FORCE =
  'let R=Qi(this.dragStateManager.currentWorld.clone().sub(this.dragStateManager.worldHit).multiplyScalar(60)),_pf=Math.sqrt(R.x*R.x+R.y*R.y+R.z*R.z);if(_pf>30){const _ps=30/_pf;R.x*=_ps,R.y*=_ps,R.z*=_ps}d=Qi(this.dragStateManager.worldHit.clone());';

let bundle = readFileSync(bundlePath, 'utf8');

if (bundle.includes(LEGACY_DRAG_FORCE)) {
  bundle = bundle.replace(LEGACY_DRAG_FORCE, AMP_STYLE_DRAG_FORCE);
} else if (!bundle.includes(AMP_STYLE_DRAG_FORCE)) {
  console.error('Missing parkour drag-force patch target');
  process.exit(1);
}

writeFileSync(bundlePath, bundle);
console.log('Patched', bundlePath);
