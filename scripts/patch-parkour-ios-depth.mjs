#!/usr/bin/env node
/**
 * Patch vendored parkour bundle for iOS Safari depth readback compatibility.
 * Only Apple mobile hardware (iPhone/iPad/iPod) uses Uint8 readback; other
 * platforms keep the original Float32 depth pipeline.
 *
 * On iOS Safari, sampling WEBGL_depth_texture in a fragment shader often returns
 * zero. Apple devices therefore render depth with MeshDepthMaterial override
 * directly into a Uint8 color target (no depth-texture sampling).
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
);

const APPLE_DETECT =
  '/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1';

let bundle = readFileSync(bundlePath, 'utf8');

const replacements = [
  [
    'this.depthProcessedScene.add(this.depthPreviewMesh),this.depthInferenceMaterial=new Sg({uniforms:{tDepth:{value:this.depthTarget.depthTexture},cameraNear:{value:this.camera.near},cameraFar:{value:this.camera.far}},vertexShader:`',
    `this._appleDepthReadback=${APPLE_DETECT},this.depthProcessedScene.add(this.depthPreviewMesh),this.depthInferenceMaterial=new Sg({uniforms:{tDepth:{value:this.depthTarget.depthTexture},cameraNear:{value:this.camera.near},cameraFar:{value:this.camera.far},uAppleDepth:{value:this._appleDepthReadback?1:0}},vertexShader:\``
  ],
  [
    `        uniform float cameraNear;
        uniform float cameraFar;
        varying vec2 vUv;
        void main() {
          float depth = texture2D(tDepth, vUv).x;
          float viewZ = perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
          float linearDepth = -viewZ;
          gl_FragColor = vec4(linearDepth, 0.0, 0.0, 1.0);
        }
      \`}),this.depthInferenceScene=new nF`,
    `        uniform float cameraNear;
        uniform float cameraFar;
        uniform float uAppleDepth;
        varying vec2 vUv;
        void main() {
          float depth = texture2D(tDepth, vUv).x;
          float viewZ = perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
          float linearDepth = -viewZ;
          float v = clamp((linearDepth - 0.3) / 2.7, 0.0, 1.0);
          gl_FragColor = uAppleDepth > 0.5 ? vec4(v, 0.0, 0.0, 1.0) : vec4(linearDepth, 0.0, 0.0, 1.0);
        }
      \`}),this.depthInferenceScene=new nF`
  ],
  [
    'this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=new Float32Array(this.depthInset.width*this.depthInset.height*4)',
    'this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),this._appleDepthOverrideMaterial=new hh({depthPacking:ma}),this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:this._appleDepthReadback?xg:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthInset.width*this.depthInset.height*4):new Float32Array(this.depthInset.width*this.depthInset.height*4)'
  ],
  [
    'this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:this._appleDepthReadback?xg:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthInset.width*this.depthInset.height*4):new Float32Array(this.depthInset.width*this.depthInset.height*4)',
    'this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),this._appleDepthOverrideMaterial=new hh({depthPacking:ma}),this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:this._appleDepthReadback?xg:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthInset.width*this.depthInset.height*4):new Float32Array(this.depthInset.width*this.depthInset.height*4)'
  ],
  [
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=new Float32Array(this.depthInset.width*this.depthInset.height*4)',
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:this._appleDepthReadback?xg:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthInset.width*this.depthInset.height*4):new Float32Array(this.depthInset.width*this.depthInset.height*4)'
  ],
  [
    'this.depthPixels=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4),this.depthFrame=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height)}async render(A){',
    'this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4):new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4),this.depthFrame=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height)}async render(A){'
  ],
  [
    'this.renderer.setRenderTarget(this.depthTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.renderer.setRenderTarget(null),this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.depthInferenceScene,this.depthCamera),this.renderer.readRenderTargetPixels(this.depthInferenceTarget,0,0,this.depthInset.width,this.depthInset.height,this.depthPixels)',
    'if(this._appleDepthReadback){const _ap=this.scene.overrideMaterial;this.scene.overrideMaterial=this._appleDepthOverrideMaterial,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.scene.overrideMaterial=_ap}else{this.renderer.setRenderTarget(this.depthTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.renderer.setRenderTarget(null),this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.depthInferenceScene,this.depthCamera)};this._appleDepthReadback&&this.renderer.getContext().finish(),this.renderer.readRenderTargetPixels(this.depthInferenceTarget,0,0,this.depthInset.width,this.depthInset.height,this.depthPixels)'
  ],
  [
    'for(let R=0;R<s;R++)this.depthFrame[R]=this.depthPixels[R*4];if(this.policyController.setDepthImage(this.depthFrame,Y,N),this.depthRawPixels',
    'for(let R=0;R<s;R++)if(this._appleDepthReadback){const _n=this.depthCameraView.near,_f=this.depthCameraView.far,_d=this.depthPixels[R*4]/255,_z=_d>0&&_d<1?(_n*_f)/((_f-_n)*_d-_f):_f;this.depthFrame[R]=-_z}else this.depthFrame[R]=this.depthPixels[R*4];if(this.policyController.setDepthImage(this.depthFrame,Y,N),this._appleDepthReadback&&this.policyController._prepareDepthInput(),this.depthRawPixels'
  ],
  [
    'for(let R=0;R<s;R++)this.depthFrame[R]=this._appleDepthReadback?.3+this.depthPixels[R*4]*(2.7/255):this.depthPixels[R*4];if(this.policyController.setDepthImage(this.depthFrame,Y,N),this._appleDepthReadback&&this.policyController._prepareDepthInput(),this.depthRawPixels',
    'for(let R=0;R<s;R++)if(this._appleDepthReadback){const _n=this.depthCameraView.near,_f=this.depthCameraView.far,_d=this.depthPixels[R*4]/255,_z=_d>0&&_d<1?(_n*_f)/((_f-_n)*_d-_f):_f;this.depthFrame[R]=-_z}else this.depthFrame[R]=this.depthPixels[R*4];if(this.policyController.setDepthImage(this.depthFrame,Y,N),this._appleDepthReadback&&this.policyController._prepareDepthInput(),this.depthRawPixels'
  ],
  [
    'async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href},wQ.wasm.numThreads=Math.min(4,navigator.hardwareConcurrency||1)}',
    `async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href};const _appleOrt=${APPLE_DETECT};wQ.wasm.numThreads=_appleOrt?1:Math.min(4,navigator.hardwareConcurrency||1),_appleOrt&&(wQ.wasm.proxy=!1)}`
  ]
];

let applied = 0;
for (const [from, to] of replacements) {
  if (bundle.includes(to)) {
    continue;
  }
  if (!bundle.includes(from)) {
    continue;
  }
  bundle = bundle.replace(from, to);
  applied += 1;
}

const requiredMarkers = [
  'this._appleDepthReadback=/iPad|iPhone|iPod/',
  'this._appleDepthOverrideMaterial=new hh({depthPacking:ma})',
  'overrideMaterial=this._appleDepthOverrideMaterial',
  '_d=this.depthPixels[R*4]/255',
  'wQ.wasm.numThreads=_appleOrt?1:'
];

for (const marker of requiredMarkers) {
  if (!bundle.includes(marker)) {
    console.error('Patch incomplete, missing marker:', marker);
    process.exit(1);
  }
}

writeFileSync(bundlePath, bundle);
console.log(`Patched ${bundlePath} (${applied} replacements applied)`);
