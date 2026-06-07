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
const scenePath = join(
  __dirname,
  '../public/parkour/assets/scenes/g1_with_terrain.xml'
);

test('parkour bundle uses AMP-style MeshStandardMaterial for mesh geoms', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  assert.match(bundle, /let T,r;if\(h==B\.mjtGeom\.mjGEOM_MESH\.value/);
  assert.match(bundle, /metalness:rQ\?0:mQ\?\.22:\.38,roughness:rQ\?1:mQ\?\.62:\.5/);
  assert.match(bundle, /T=new Uh\(sQ\)/);
  assert.doesNotMatch(
    bundle,
    /let T=new VY\(\{color:new hB\(O\[0\]\*u,O\[1\]\*u,O\[2\]\*u\),transparent:v<1,opacity:v,specularIntensity:g\.geom_matid\[M\]!=-1\?g\.mat_specular\[g\.geom_matid\[M\]\]:void 0,reflectivity:g\.geom_matid\[M\]!=-1\?g\.mat_reflectance\[g\.geom_matid\[M\]\]:void 0,roughness:g\.geom_matid\[M\]!=-1\?1-g\.mat_shininess\[g\.geom_matid\[M\]\]:void 0,metalness:g\.geom_matid\[M\]!=-1\?\.1:void 0,map:J\}\),r/
  );
});

test('parkour G1 MJCF black material matches AMP/Tracking', () => {
  const scene = readFileSync(scenePath, 'utf8');
  assert.match(scene, /<material name="black" rgba="0\.02 0\.02 0\.02 1"\/>/);
  assert.doesNotMatch(scene, /<material name="black" rgba="0\.2 0\.2 0\.2 1"\/>/);
});
