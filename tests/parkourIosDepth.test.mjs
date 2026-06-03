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

test('parkour bundle uses Uint8 depth readback for iOS Safari compatibility', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /this\.depthInferenceTarget=new QI\([^)]+\{type:xg,format:SQ/,
    'depth inference render target should use UnsignedByteType (xg)'
  );
  assert.match(
    bundle,
    /this\.depthPixels=new Uint8Array\(this\.depthInset\.width/,
    'depth readback buffer should be Uint8Array'
  );
  assert.match(
    bundle,
    /float v = clamp\(\(linearDepth - 0\.3\) \/ 2\.7, 0\.0, 1\.0\);/,
    'depth linearization shader should encode normalized bytes'
  );
  assert.match(
    bundle,
    /this\.depthFrame\[R\]=\.3\+this\.depthPixels\[R\*4\]\*\(2\.7\/255\)/,
    'depth frame should decode byte readback into meters'
  );
  assert.match(
    bundle,
    /setDepthImage\(this\.depthFrame,Y,N\),this\.policyController\._prepareDepthInput\(\)/,
    'depth preview should update immediately after capture'
  );
  assert.match(
    bundle,
    /_iosDepthFix=\/iPad\|iPhone\|iPod\//,
    'ORT init should detect iOS and tune wasm threading'
  );
});
