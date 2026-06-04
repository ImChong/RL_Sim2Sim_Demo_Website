#!/usr/bin/env node
/**
 * Patch vendored parkour bundle for iOS Safari depth readback compatibility.
 * Safari WebGL often cannot read FloatType render targets via readRenderTargetPixels.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

let bundle = readFileSync(bundlePath, 'utf8');

const replacements = [
  [
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})',
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:xg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})'
  ],
  [
    'this.depthPixels=new Float32Array(this.depthInset.width*this.depthInset.height*4)',
    'this.depthPixels=new Uint8Array(this.depthInset.width*this.depthInset.height*4)'
  ],
  [
    `          float linearDepth = -viewZ;
          gl_FragColor = vec4(linearDepth, 0.0, 0.0, 1.0);`,
    `          float linearDepth = -viewZ;
          float v = clamp((linearDepth - 0.3) / 2.7, 0.0, 1.0);
          gl_FragColor = vec4(v, 0.0, 0.0, 1.0);`
  ],
  [
    'for(let R=0;R<s;R++)this.depthFrame[R]=this.depthPixels[R*4]',
    'for(let R=0;R<s;R++)this.depthFrame[R]=.3+this.depthPixels[R*4]*(2.7/255)'
  ],
  [
    'if(this.policyController.setDepthImage(this.depthFrame,Y,N),this.depthRawPixels',
    'if(this.policyController.setDepthImage(this.depthFrame,Y,N),this.policyController._prepareDepthInput(),this.depthRawPixels'
  ],
  [
    'async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href},wQ.wasm.numThreads=Math.min(4,navigator.hardwareConcurrency||1)}',
    'async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href};const _iosDepthFix=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;wQ.wasm.numThreads=_iosDepthFix?1:Math.min(4,navigator.hardwareConcurrency||1),_iosDepthFix&&(wQ.wasm.proxy=!1)}'
  ],
  [
    'this.depthPixels=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4),this.depthFrame=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height)}async render(A){if(!this.model||!this.data)return;if(this.updateSpeedModeIndicator(),this.controls.update(),this.policyController&&this.params.policyEnabled&&this.params.scene===hE){const Y=this.data.qpos[0],s=[5,10,15,20,25,30,35,40,45,50,55,60].some(R=>Y>=R-1.5&&Y<=R+1);this.policyController.autoForward=s,this.policyController._updateCommandState()}if(this.params.paused){',
    'this.depthPixels=new Uint8Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4),this.depthFrame=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height)}async render(A){if(!this.model||!this.data)return;if(this.updateSpeedModeIndicator(),this.controls.update(),this.policyController&&this.params.policyEnabled&&this.params.scene===hE){const Y=this.data.qpos[0],s=[5,10,15,20,25,30,35,40,45,50,55,60].some(R=>Y>=R-1.5&&Y<=R+1);this.policyController.autoForward=s,this.policyController._updateCommandState()}if(this.params.paused){'
  ]
];

for (const [from, to] of replacements) {
  if (!bundle.includes(from)) {
    console.error('Missing patch target:', from.slice(0, 120));
    process.exit(1);
  }
  bundle = bundle.replace(from, to);
}

writeFileSync(bundlePath, bundle);
console.log('Patched', bundlePath);
