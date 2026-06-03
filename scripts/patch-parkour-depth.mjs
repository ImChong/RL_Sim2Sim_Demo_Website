// One-off patch script: make the vendored G1 Perceptive Parkour depth pipeline
// mobile-compatible by replacing the float (RGBA32F) depth readback with an
// RGBA8 packed readback. Float color-buffer readPixels is unsupported on most
// mobile GPUs (iOS Safari / many Android), which left the depth image black and
// fed garbage to the depth backbone, making the robot fall.
//
// Run: node scripts/patch-parkour-depth.mjs
import fs from 'node:fs';

const FILE = 'public/parkour/dist-desktop/assets/index-BLR_wER3.js';
let src = fs.readFileSync(FILE, 'utf8');

function replaceOnce(from, to) {
  const first = src.indexOf(from);
  if (first === -1) throw new Error('NOT FOUND:\n' + from.slice(0, 120));
  if (src.indexOf(from, first + from.length) !== -1) {
    throw new Error('NOT UNIQUE:\n' + from.slice(0, 120));
  }
  if (src.includes(to)) {
    console.log('already patched (skip):', to.slice(0, 60));
    return;
  }
  src = src.slice(0, first) + to + src.slice(first + from.length);
  console.log('patched:', to.slice(0, 60));
}

// 1) Inference shader: pack linear depth (normalised by far plane) into RGBA8
//    instead of writing a raw float into the red channel.
replaceOnce(
  'gl_FragColor = vec4(linearDepth, 0.0, 0.0, 1.0);',
  'gl_FragColor = packDepthToRGBA(clamp(linearDepth / cameraFar, 0.0, 1.0));'
);

// 2) Inference render target: UnsignedByteType (1009) RGBA8 instead of FloatType.
replaceOnce(
  'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:hg,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})',
  'this.depthInferenceTarget=new QI(this.depthInset.width,this.depthInset.height,{type:1009,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!1,stencilBuffer:!1})'
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

fs.writeFileSync(FILE, src);
console.log('done');
