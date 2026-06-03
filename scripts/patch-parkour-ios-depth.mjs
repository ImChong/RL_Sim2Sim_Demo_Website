#!/usr/bin/env node
/**
 * Patch vendored parkour bundle for iOS Safari depth capture compatibility.
 *
 * Safari often fails on FloatType DepthTexture sampling AND float readRenderTargetPixels.
 * This patch renders linear depth directly into an RGBA8 target via overrideMaterial.
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

function replaceRequired(from, to, label) {
  if (bundle.includes(to)) {
    return;
  }
  if (!bundle.includes(from)) {
    console.error(`Missing patch target (${label}):`, from.slice(0, 120));
    process.exit(1);
  }
  bundle = bundle.replace(from, to);
}

const captureInsertFrom =
  'this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),this.depthInferenceTarget=';
const captureInsertTo =
  'this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),this.depthCaptureMaterial=new Sg({uniforms:{depthMin:{value:this.depthCameraConfig.minRange},depthMax:{value:this.depthCameraConfig.maxRange}},vertexShader:`\n        varying float vViewZ;\n        void main() {\n          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\n          vViewZ = -mvPosition.z;\n          gl_Position = projectionMatrix * mvPosition;\n        }\n      `,fragmentShader:`\n        varying float vViewZ;\n        uniform float depthMin;\n        uniform float depthMax;\n        void main() {\n          float v = clamp((vViewZ - depthMin) / (depthMax - depthMin), 0.0, 1.0);\n          gl_FragColor = vec4(v, 0.0, 0.0, 1.0);\n        }\n      `}),this.depthInferenceTarget=';

replaceRequired(captureInsertFrom, captureInsertTo, 'depthCaptureMaterial');

replaceRequired(
  'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})',
  'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:xg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})',
  'inference target type'
);

replaceRequired(
  'this.depthPixels=new Float32Array(this.depthInset.width*this.depthInset.height*4)',
  'this.depthPixels=new Uint8Array(this.depthInset.width*this.depthInset.height*4)',
  'depth pixel buffer'
);

replaceRequired(
  `          float linearDepth = -viewZ;
          gl_FragColor = vec4(linearDepth, 0.0, 0.0, 1.0);`,
  `          float linearDepth = -viewZ;
          float v = clamp((linearDepth - 0.3) / 2.7, 0.0, 1.0);
          gl_FragColor = vec4(v, 0.0, 0.0, 1.0);`,
  'linearize shader encode'
);

replaceRequired(
  'this.renderer.setRenderTarget(this.depthTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.renderer.setRenderTarget(null),this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.depthInferenceScene,this.depthCamera),',
  'const _dco=this.scene.overrideMaterial;this.scene.overrideMaterial=this.depthCaptureMaterial,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.scene.overrideMaterial=_dco,',
  'this._depthCapPrev=this.scene.overrideMaterial,this.scene.overrideMaterial=this.depthCaptureMaterial,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.scene.overrideMaterial=this._depthCapPrev,',
  'depth capture render path'
);

replaceRequired(
  'for(let R=0;R<s;R++)this.depthFrame[R]=this.depthPixels[R*4]',
  'for(let R=0;R<s;R++)this.depthFrame[R]=.3+this.depthPixels[R*4]*(2.7/255)',
  'depth frame decode'
);

replaceRequired(
  'if(this.policyController.setDepthImage(this.depthFrame,Y,N),this.depthRawPixels',
  'if(this.policyController.setDepthImage(this.depthFrame,Y,N),this.policyController._prepareDepthInput(),this.depthRawPixels',
  'depth preview refresh'
);

replaceRequired(
  'async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href},wQ.wasm.numThreads=Math.min(4,navigator.hardwareConcurrency||1)}',
  'async _initOrt(){wQ.wasm.wasmPaths={mjs:new URL("./ort-wasm-simd-threaded.jsep.mjs",import.meta.url).href,wasm:new URL("./ort-wasm-simd-threaded.jsep-6MnTkKum.wasm",import.meta.url).href};const _iosDepthFix=/iPad|iPhone|iPod/.test(navigator.userAgent)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;wQ.wasm.numThreads=_iosDepthFix?1:Math.min(4,navigator.hardwareConcurrency||1),_iosDepthFix&&(wQ.wasm.proxy=!1)}',
  'ORT iOS tuning'
);

writeFileSync(bundlePath, bundle);
console.log('Patched', bundlePath);
