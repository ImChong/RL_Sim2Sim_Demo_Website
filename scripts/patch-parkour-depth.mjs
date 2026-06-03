// One-off patch script: make the vendored G1 Perceptive Parkour depth pipeline
// mobile-compatible (iOS Safari / iOS Chrome, many Android).
//
// The upstream depth pipeline renders linear depth into an RGBA32F (FloatType)
// render target with a DEPTH_COMPONENT32F depth attachment and reads it back as
// a Float32Array. On most mobile GPUs neither RGBA32F rendering nor float
// gl.readPixels is supported, so the depth image came back all-zero (black), the
// depth backbone received a blank image, and the robot fell over.
//
// This rewrites the pipeline to use only mobile-safe formats:
//   - linear depth packed directly into RGBA8 (UnsignedByteType) via
//     packDepthToRGBA, read back as Uint8Array and decoded with THREE's
//     unpackRGBAToDepth;
//   - the depth attachment downgraded from DEPTH_COMPONENT32F to the universally
//     renderable DEPTH_COMPONENT24 (UnsignedIntType).
// It also avoids sampling a depth texture for the policy path: iOS WebKit can
// render the main scene but return black/zero values when a depth texture is
// sampled in a follow-up pass. Rendering the scene once more with an override
// material that writes packed gl_FragCoord.z keeps the whole path on RGBA8.
//
// The script is idempotent: re-run it after re-pulling the upstream build.
// Run: node scripts/patch-parkour-depth.mjs
import fs from 'node:fs';

const FILE = 'public/parkour/dist-desktop/assets/index-Cq8mDpv1.js';
let src = fs.readFileSync(FILE, 'utf8');

function replaceOnce(from, to) {
  if (src.includes(to)) {
    console.log('already patched (skip):', to.slice(0, 56));
    return;
  }
  const first = src.indexOf(from);
  if (first === -1) throw new Error('NOT FOUND:\n' + from.slice(0, 120));
  if (src.indexOf(from, first + from.length) !== -1) {
    throw new Error('NOT UNIQUE:\n' + from.slice(0, 120));
  }
  src = src.slice(0, first) + to + src.slice(first + from.length);
  console.log('patched:', to.slice(0, 56));
}

function replaceOnceAny(froms, to) {
  if (src.includes(to)) {
    console.log('already patched (skip):', to.slice(0, 56));
    return;
  }
  const matches = froms
    .map((from) => ({ from, index: src.indexOf(from) }))
    .filter((match) => match.index !== -1);
  if (matches.length === 0) {
    throw new Error('NOT FOUND:\n' + froms[0].slice(0, 120));
  }
  if (matches.length > 1) {
    throw new Error('MULTIPLE ALTERNATIVES FOUND:\n' + to.slice(0, 120));
  }
  const { from, index } = matches[0];
  if (src.indexOf(from, index + from.length) !== -1) {
    throw new Error('NOT UNIQUE:\n' + from.slice(0, 120));
  }
  src = src.slice(0, index) + to + src.slice(index + from.length);
  console.log('patched:', to.slice(0, 56));
}

// 1) Inference shader: pack linear depth (normalised by far plane) into RGBA8
//    instead of writing a raw float into the red channel.
replaceOnce(
  'gl_FragColor = vec4(linearDepth, 0.0, 0.0, 1.0);',
  'gl_FragColor = packDepthToRGBA(clamp(linearDepth / cameraFar, 0.0, 1.0));'
);

// 2) Inference render target: UnsignedByteType (1009) RGBA8 instead of FloatType,
//    with a depth buffer because the policy pass now renders scene geometry
//    directly instead of a fullscreen quad.
replaceOnceAny(
  [
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})',
    'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:1009,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})'
  ],
  'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:1009,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!0,stencilBuffer:!1})'
);

// 3) Readback buffers: Uint8Array instead of Float32Array (constructor path).
replaceOnce(
  'this.depthPixels=new Float32Array(this.depthInset.width*this.depthInset.height*4)',
  'this.depthPixels=new Uint8Array(this.depthInset.width*this.depthInset.height*4)'
);

// 4) Readback buffer: Uint8Array (resize path).
replaceOnce(
  'this.depthPixels=new Float32Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4)',
  'this.depthPixels=new Uint8Array(this.depthCameraConfig.width*this.depthCameraConfig.height*4)'
);

// 5) Decode RGBA8 back to linear depth in metres (matches THREE unpackRGBAToDepth
//    times the far plane). 0.99609375 === 255/256 (UnpackDownscale).
replaceOnce(
  'for(let R=0;R<s;R++)this.depthFrame[R]=this.depthPixels[R*4];',
  'for(let R=0;R<s;R++){const _t=R*4,_f=this.depthCameraView.far,_d=0.99609375*(this.depthPixels[_t]/255/16777216+this.depthPixels[_t+1]/255/65536+this.depthPixels[_t+2]/255/256+this.depthPixels[_t+3]/255);this.depthFrame[R]=_d*_f;}'
);

// 6) Depth attachment: DEPTH_COMPONENT32F (FloatType, hg) -> DEPTH_COMPONENT24
//    (UnsignedIntType, 1014). 32F depth textures are not reliably renderable on
//    iOS; 24-bit unorm depth is core and universally supported in WebGL2.
replaceOnce(
  'this.depthTarget.depthTexture.type=hg',
  'this.depthTarget.depthTexture.type=1014'
);

// 7) Policy depth pass: render scene geometry directly into the RGBA8 target
//    with a depth-packing override material. This avoids the fragile iOS path
//    where a depth texture is rendered first and sampled by a fullscreen quad.
replaceOnceAny(
  [
    `this.depthInferenceMaterial=new Sg({uniforms:{tDepth:{value:this.depthTarget.depthTexture},cameraNear:{value:this.camera.near},cameraFar:{value:this.camera.far}},vertexShader:\`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      \`,fragmentShader:\`
        #include <packing>
        uniform sampler2D tDepth;
        uniform float cameraNear;
        uniform float cameraFar;
        varying vec2 vUv;
        void main() {
          float depth = texture2D(tDepth, vUv).x;
          float viewZ = perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
          float linearDepth = -viewZ;
          gl_FragColor = packDepthToRGBA(clamp(linearDepth / cameraFar, 0.0, 1.0));
        }
      \`}),this.depthInferenceScene=new nF,this.depthInferenceScene.add(new VQ(new xI(2,2),this.depthInferenceMaterial)),`
  ],
  `this.depthInferenceMaterial=new Sg({uniforms:{cameraNear:{value:this.camera.near},cameraFar:{value:this.camera.far}},vertexShader:\`
        void main() {
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      \`,fragmentShader:\`
        #include <packing>
        uniform float cameraNear;
        uniform float cameraFar;
        void main() {
          float viewZ = perspectiveDepthToViewZ(gl_FragCoord.z, cameraNear, cameraFar);
          float linearDepth = -viewZ;
          gl_FragColor = packDepthToRGBA(clamp(linearDepth / cameraFar, 0.0, 1.0));
        }
      \`}),`
);

// 8) Use the override material render for readback, then restore the scene.
//    Clear to packed far-depth (white) so background pixels do not decode as 0 m.
replaceOnceAny(
  [
    'this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.depthInferenceScene,this.depthCamera),',
    'this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far;const _p=this.scene.overrideMaterial;this.scene.overrideMaterial=this.depthInferenceMaterial,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.scene.overrideMaterial=_p,'
  ],
  'this.depthInferenceMaterial.uniforms.cameraNear.value=this.depthCameraView.near,this.depthInferenceMaterial.uniforms.cameraFar.value=this.depthCameraView.far;const _p=this.scene.overrideMaterial,_c=this.renderer.getClearColor(new hB),_a=this.renderer.getClearAlpha();this.scene.overrideMaterial=this.depthInferenceMaterial,this.renderer.setRenderTarget(this.depthInferenceTarget),this.renderer.setClearColor(16777215,1),this.renderer.clear(),this.renderer.render(this.scene,this.depthCameraView),this.renderer.setClearColor(_c,_a),this.scene.overrideMaterial=_p,'
);

fs.writeFileSync(FILE, src);
console.log('done');
