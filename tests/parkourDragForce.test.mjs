import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

test('parkour mouse drag uses AMP/Tracking force scale (60, max 30)', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  assert.match(
    bundle,
    /multiplyScalar\(60\)\),_pf=Math\.sqrt\(R\.x\*R\.x\+R\.y\*R\.y\+R\.z\*R\.z\);if\(_pf>30\)/
  );
  assert.doesNotMatch(bundle, /body_mass\[s\]\*250/);
});
