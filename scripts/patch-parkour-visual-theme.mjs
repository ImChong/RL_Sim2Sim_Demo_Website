#!/usr/bin/env node
/**
 * Patch vendored parkour bundle lighting/background to match the main-site
 * AMP + Tracking visual theme (src/simulation/theme.js + main.js).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

const LEGACY_LIGHTING =
  'this.scene.background=new hB(.15,.25,.35),this.ambientLight=new kh(16777215,.1*3.14),this.ambientLight.name="AmbientLight",this.scene.add(this.ambientLight),this.spotlight=new bR,this.spotlight.angle=1.11,this.spotlight.distance=1e4,this.spotlight.penumbra=.5,this.spotlight.castShadow=!0,this.spotlight.intensity=this.spotlight.intensity*3.14*10,this.spotlight.shadow.mapSize.width=1024,this.spotlight.shadow.mapSize.height=1024,this.spotlight.shadow.camera.near=.1,this.spotlight.shadow.camera.far=100,this.spotlight.position.set(0,3,3);const A=new RQ;this.scene.add(A),this.spotlight.target=A,A.position.set(0,1,0),this.scene.add(this.spotlight),this.hemiLight=new RR(12572927,2042426,.35*2),this.hemiLight.position.set(0,6,0),this.scene.add(this.hemiLight),this.fillLightLeft=new uw(16777215,.28*2),this.fillLightLeft.position.set(-4,3,2),this.scene.add(this.fillLightLeft),this.fillLightRight=new uw(16777215,.22*2),this.fillLightRight.position.set(4,2.5,-1.5),this.scene.add(this.fillLightRight)';

const AMP_STYLE_LIGHTING =
  'this.visualThemeName="dark",this.lightBaseIntensities=new Map,this.scene.background=new hB(.08,.12,.18),this.scene.fog=null,this.ambientLight=new kh(16777215,.14),this.ambientLight.name="AmbientLight",this.scene.add(this.ambientLight),this.sonicHemi=new RR(6979754,2769450,.34),this.sonicHemi.name="SonicStyleHemisphere",this.scene.add(this.sonicHemi),this.sonicFill=new uw(8443903,.42),this.sonicFill.name="SonicStyleFill",this.sonicFill.position.set(-3,4,2),this.scene.add(this.sonicFill),this.sonicRim=new uw(16777215,.3),this.sonicRim.name="SonicStyleRim",this.sonicRim.position.set(-2,2.5,4),this.scene.add(this.sonicRim)';

const LEGACY_RENDERER_TAIL =
  'this.renderer.useLegacyLights=!0,this.container.appendChild(this.renderer.domElement)';

const AMP_RENDERER_TAIL =
  'this.renderer.useLegacyLights=!0,this.renderer.toneMapping=0,this.renderer.toneMappingExposure=1,this.container.appendChild(this.renderer.domElement)';

let bundle = readFileSync(bundlePath, 'utf8');

if (bundle.includes(LEGACY_LIGHTING)) {
  bundle = bundle.replace(LEGACY_LIGHTING, AMP_STYLE_LIGHTING);
} else if (!bundle.includes('this.sonicHemi=new RR(6979754,2769450,.34)')) {
  console.error('Missing parkour visual-theme patch target (legacy lighting block)');
  process.exit(1);
}

if (bundle.includes(LEGACY_RENDERER_TAIL)) {
  bundle = bundle.replace(LEGACY_RENDERER_TAIL, AMP_RENDERER_TAIL);
} else if (!bundle.includes('this.renderer.toneMapping=0,this.renderer.toneMappingExposure=1')) {
  console.error('Missing parkour visual-theme patch target (renderer tone mapping)');
  process.exit(1);
}

writeFileSync(bundlePath, bundle);
console.log('Patched', bundlePath);
