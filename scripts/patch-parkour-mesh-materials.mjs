#!/usr/bin/env node
/**
 * Patch vendored parkour bundle mesh materials to match the main-site
 * AMP + Tracking renderer (src/simulation/mujocoUtils.js MeshStandardMaterial heuristic).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

const LEGACY_MATERIAL =
  'let T=new VY({color:new hB(O[0]*u,O[1]*u,O[2]*u),transparent:v<1,opacity:v,specularIntensity:g.geom_matid[M]!=-1?g.mat_specular[g.geom_matid[M]]:void 0,reflectivity:g.geom_matid[M]!=-1?g.mat_reflectance[g.geom_matid[M]]:void 0,roughness:g.geom_matid[M]!=-1?1-g.mat_shininess[g.geom_matid[M]]:void 0,metalness:g.geom_matid[M]!=-1?.1:void 0,map:J})';

const AMP_STYLE_MATERIAL =
  'let T;if(h==B.mjtGeom.mjGEOM_MESH.value){const pQ=Math.max(O[0]*u,O[1]*u,O[2]*u),mQ=pQ<.38,rQ=pQ<.28,sQ={color:new hB(O[0]*u,O[1]*u,O[2]*u),transparent:v<1,opacity:v,metalness:rQ?0:mQ?.22:.38,roughness:rQ?1:mQ?.62:.5};J&&(sQ.map=J),T=new Uh(sQ)}else T=new VY({color:new hB(O[0]*u,O[1]*u,O[2]*u),transparent:v<1,opacity:v,specularIntensity:g.geom_matid[M]!=-1?g.mat_specular[g.geom_matid[M]]:void 0,reflectivity:g.geom_matid[M]!=-1?g.mat_reflectance[g.geom_matid[M]]:void 0,roughness:g.geom_matid[M]!=-1?1-g.mat_shininess[g.geom_matid[M]]:void 0,metalness:g.geom_matid[M]!=-1?.1:void 0,map:J})';

let bundle = readFileSync(bundlePath, 'utf8');

if (bundle.includes(LEGACY_MATERIAL)) {
  bundle = bundle.replace(LEGACY_MATERIAL, AMP_STYLE_MATERIAL);
} else if (!bundle.includes('h==B.mjtGeom.mjGEOM_MESH.value')) {
  console.error('Missing parkour mesh-material patch target (legacy material block)');
  process.exit(1);
}

writeFileSync(bundlePath, bundle);
console.log('Patched', bundlePath);
