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

test('parkour floor reflector spans past finish marker (x=66)', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  assert.match(
    bundle,
    /r=new yN\(new xI\(150,100\),\{clipBias:\.003/
  );
  assert.match(bundle, /J\.repeat\.set\(J\.repeat\.x\*1\.5,J\.repeat\.y\)/);
  assert.doesNotMatch(bundle, /r=new yN\(new xI\(100,100\),\{clipBias:\.003/);
});
