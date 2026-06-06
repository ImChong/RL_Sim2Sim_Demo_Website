#!/usr/bin/env node
/**
 * Patch vendored parkour bundle for iOS Safari depth readback compatibility.
 * Only Apple mobile hardware (iPhone/iPad/iPod) uses Uint8 readback; other
 * platforms keep the original Float32 depth pipeline.
 *
 * Safari cannot read FloatType render targets reliably. Apple devices keep the
 * original depth-texture inference pass but pack linear depth into Uint8 before
 * CPU readback. Do NOT replace this with MeshDepthMaterial override: that makes
 * the HUD visible but distorts depth statistics and causes falls at obstacles.
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

const APPLE_RENDER_TAIL =
  'this.renderer.setRenderTarget(this.depthTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.renderer.setRenderTarget(null),this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.depthInferenceScene,this.depthCamera),this._appleDepthReadback&&this.renderer.getContext().finish(),this.renderer.readRenderTargetPixels(this.depthInferenceTarget,0,0,this.depthInset.width,this.depthInset.height,this.depthPixels)';

const APPLE_DECODE =
  'for(let R=0;R<s;R++)this.depthFrame[R]=this._appleDepthReadback?Math.max(.3,Math.min(3,.3+this.depthPixels[R*4]*(2.7/255))):this.depthPixels[R*4];if(this.policyController.setDepthImage(this.depthFrame,Y,N),this._appleDepthReadback&&this.policyController._prepareDepthInput(),this.depthRawPixels';

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
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=new Float32Array(this.depthInset.width*this.depthInset.height*4)',
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:this._appleDepthReadback?xg:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1}),this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthInset.width*this.depthInset.height*4):new Float32Array(this.depthInset.width*this.depthInset.height*4)'
  ],
  [
    'this.depthPixels=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4),this.depthFrame=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height)}async render(A){',
    'this.depthPixels=this._appleDepthReadback?new Uint8Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4):new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4),this.depthFrame=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height)}async render(A){'
  ],
  [
    'this.renderer.setRenderTarget(this.depthTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.renderer.setRenderTarget(null),this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.depthInferenceScene,this.depthCamera),this.renderer.readRenderTargetPixels(this.depthInferenceTarget,0,0,this.depthInset.width,this.depthInset.height,this.depthPixels)',
    APPLE_RENDER_TAIL
  ],
  [
    'for(let R=0;R<s;R++)this.depthFrame[R]=this.depthPixels[R*4];if(this.policyController.setDepthImage(this.depthFrame,Y,N),this.depthRawPixels',
    APPLE_DECODE
  ],
  [
    'async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href},wQ.wasm.numThreads=Math.min(4,navigator.hardwareConcurrency||1)}',
    `async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href};const _appleOrt=${APPLE_DETECT};wQ.wasm.numThreads=_appleOrt?1:Math.min(4,navigator.hardwareConcurrency||1),_appleOrt&&(wQ.wasm.proxy=!1)}`
  ],
  [
    'async _initOrt(){const _appleOrt=',
    `_ortOpts(){const a=${APPLE_DETECT};return a?{executionProviders:["wasm"],graphOptimizationLevel:"basic",enableCpuMemArena:!1,enableMemPattern:!1}:{executionProviders:["wasm"],graphOptimizationLevel:"all"}}async _initOrt(){const _appleOrt=`
  ],
  [
    'Xo.create(g,{executionProviders:["wasm"],graphOptimizationLevel:"all"})',
    'Xo.create(g,this._ortOpts())'
  ],
  [
    'async init(A){this._bindKeyboard(),await this._initOrt(),await this._initSession(),await this._initDepthSession(),this._readMetadata(),this._buildMappings(A),this.reset(),this.isReady=!0}',
    `async init(A){this._bindKeyboard(),this.session||(await this._initOrt(),await this._initSession(),await this._initDepthSession(),this._readMetadata(),(${APPLE_DETECT})&&(this.modelBytes=null)),this._buildMappings(A),this.reset(),this.isReady=!0}`
  ],
  [
    'async initPolicy(){const A=new URLSearchParams(window.location.search),g=A.get("policy")||"./2026-01-17_09-51-30_student-new-loco-old-skill_student.onnx",I=new ak(this.mujoco,{modelPath:g,depthModelPath:A.get("depthPolicy")||g.replace("_student.onnx","_depth_backbone.onnx"),controlDt:.02});try{await I.init(this.model),this.policyController=I,this.policyStepCounter=0;const C=this.model?.opt?.timestep??.002;this.policyDecimation=Math.max(1,Math.round(I.controlDt/C)),console.log("Policy loaded. Decimation:",this.policyDecimation)}catch(C){console.error("Failed to initialize policy:",C),this._policyInitError=String(C?.message||C),this.policyController=null}}',
    `_policyPaths(){const A=new URLSearchParams(window.location.search),g=A.get("policy")||"./2026-01-17_09-51-30_student-new-loco-old-skill_student.onnx";return{modelPath:g,depthModelPath:A.get("depthPolicy")||g.replace("_student.onnx","_depth_backbone.onnx")}}_createPolicyController(){const{modelPath:g,depthModelPath:Q}=this._policyPaths();return new ak(this.mujoco,{modelPath:g,depthModelPath:Q,controlDt:.02})}async beginPolicyPreload(){const I=this._createPolicyController();return I._bindKeyboard(),await I._initOrt(),await I._initSession(),await I._initDepthSession(),I._readMetadata(),I.modelBytes=null,I}async initPolicy(A){const I=A??this._createPolicyController();try{await I.init(this.model),this.policyController=I,this.policyStepCounter=0;const C=this.model?.opt?.timestep??.002;this.policyDecimation=Math.max(1,Math.round(I.controlDt/C)),console.log("Policy loaded. Decimation:",this.policyDecimation)}catch(C){console.error("Failed to initialize policy:",C),this._policyInitError=String(C?.message||C),this.policyController=null}}`
  ],
  [
    'async init(){await PZ($g),[this.model,this.data,this.bodies,this.lights]=await yR($g,hE,this),this.applySceneInitialState({resetData:!1,rebindCameras:!0}),this.gui=new hN,rZ(this),await this.initPolicy(),this.renderer.setAnimationLoop(this.render.bind(this))}',
    `async init(){const _applePol=${APPLE_DETECT};let _pol=null;if(_applePol)try{_pol=await this.beginPolicyPreload()}catch(B){console.error("Policy preload failed:",B),this._policyInitError=String(B?.message||B)}await PZ($g),[this.model,this.data,this.bodies,this.lights]=await yR($g,hE,this),this.applySceneInitialState({resetData:!1,rebindCameras:!0}),this.gui=new hN,rZ(this),await this.initPolicy(_pol),this.renderer.setAnimationLoop(this.render.bind(this))}`
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

const forbiddenMarkers = [
  '_appleDepthOverrideMaterial',
  '_appleDepthCaptureTarget',
  'overrideMaterial=this._appleDepthOverrideMaterial'
];

for (const marker of forbiddenMarkers) {
  if (bundle.includes(marker)) {
    console.error('Patch should not include override capture path:', marker);
    process.exit(1);
  }
}

const requiredMarkers = [
  'this._appleDepthReadback=/iPad|iPhone|iPod/',
  'type:this._appleDepthReadback?xg:hg',
  'uAppleDepth > 0.5 ? vec4(v, 0.0, 0.0, 1.0)',
  'this._appleDepthReadback&&this.renderer.getContext().finish()',
  'this.depthFrame[R]=this._appleDepthReadback?Math.max(.3,Math.min(3,.3+this.depthPixels[R*4]*(2.7/255))):this.depthPixels[R*4]',
  'this._appleDepthReadback&&this.policyController._prepareDepthInput()',
  'wQ.wasm.numThreads=_appleOrt?1:',
  'ort-wasm-simd-threaded.mjs',
  'this._policyInitError=String(C?.message||C)',
  'else if(this.depthPreviewPixels&&this.depthPreviewSize&&s)',
  '_ortOpts(){const a=/iPad|iPhone|iPod/',
  'enableCpuMemArena:!1,enableMemPattern:!1',
  'async beginPolicyPreload(){',
  'await this.beginPolicyPreload()',
  'this.session||(await this._initOrt()'
];

for (const marker of requiredMarkers) {
  if (!bundle.includes(marker)) {
    console.error('Patch incomplete, missing marker:', marker);
    process.exit(1);
  }
}

writeFileSync(bundlePath, bundle);
console.log(`Patched ${bundlePath} (${applied} replacements applied)`);
