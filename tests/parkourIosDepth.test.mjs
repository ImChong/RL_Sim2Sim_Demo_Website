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

test('parkour bundle gates Uint8 depth readback behind Apple hardware detection', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /this\._appleDepthReadback=\/iPad\|iPhone\|iPod\//,
    'demo should detect Apple mobile hardware'
  );
  assert.match(
    bundle,
    /type:this\._appleDepthReadback\?xg:hg/,
    'depth inference render target should be Uint8 only on Apple'
  );
  assert.match(
    bundle,
    /this\.depthPixels=this\._appleDepthReadback\?new Uint8Array/,
    'depth readback buffer should be Uint8Array only on Apple'
  );
  assert.match(
    bundle,
    /uniform float uAppleDepth;/,
    'depth inference shader should branch on Apple flag'
  );
  assert.match(
    bundle,
    /this\.depthFrame\[R\]=this\._appleDepthReadback\?Math\.max\(\.3,Math\.min\(3,\.3\+this\.depthPixels\[R\*4\]\*\(2\.7\/255\)\)\):this\.depthPixels\[R\*4\]/,
    'depth frame decode should restore meters from normalized Uint8 on Apple'
  );
  assert.match(
    bundle,
    /this\._appleDepthReadback&&this\.policyController\._prepareDepthInput\(\)/,
    'depth preview should refresh immediately on Apple after capture'
  );
  assert.match(
    bundle,
    /this\._appleDepthReadback&&this\.renderer\.getContext\(\)\.finish\(\)/,
    'Apple path should flush WebGL before readRenderTargetPixels'
  );
  assert.doesNotMatch(
    bundle,
    /_appleDepthOverrideMaterial/,
    'Apple path must not use MeshDepthMaterial override capture'
  );
});

test('parkour bundle keeps Float32 depth pipeline for non-Apple platforms', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /type:this\._appleDepthReadback\?xg:hg/,
    'non-Apple path should still use FloatType (hg)'
  );
  assert.match(
    bundle,
    /:new Float32Array\(this\.depthInset\.width/,
    'non-Apple init should still allocate Float32Array'
  );
  assert.match(
    bundle,
    /uAppleDepth > 0\.5 \? vec4\(v, 0\.0, 0\.0, 1\.0\) : vec4\(linearDepth, 0\.0, 0\.0, 1\.0\)/,
    'shader should preserve float linearDepth when uAppleDepth is zero'
  );
  assert.doesNotMatch(
    bundle,
    /this\.depthInferenceTarget=new QI\([^)]+\{type:xg,format:SQ/,
    'Uint8 render target must not be unconditional'
  );
  assert.doesNotMatch(
    bundle,
    /this\.depthPixels=new Uint8Array\(this\.depthInset\.width/,
    'Uint8 readback buffer must not be unconditional'
  );
});

test('parkour ORT init uses single-threaded wasm only on Apple hardware', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /const _appleOrt=\/iPad\|iPhone\|iPod\//,
    'ORT init should detect Apple mobile hardware'
  );
  assert.match(
    bundle,
    /wQ\.wasm\.numThreads=_appleOrt\?1:Math\.min\(4,navigator\.hardwareConcurrency\|\|1\)/,
    'ORT thread count should stay multi-threaded off Apple'
  );
  assert.match(
    bundle,
    /_appleOrt&&\(wQ\.wasm\.proxy=!1\)/,
    'ORT worker proxy should be disabled only on Apple'
  );
});

test('parkour ORT init uses non-JSEP wasm on Apple hardware', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /wQ\.wasm\.wasmPaths=_appleOrt\?\{mjs:new URL\("\.\/ort-wasm-simd-threaded\.mjs"/,
    'Apple should load non-JSEP ORT wasm (WebKit 26 JSEP is unstable)'
  );
  assert.match(
    bundle,
    /Failed to fetch policy model for metadata:/,
    'Apple should fetch ONNX bytes for metadata fallback before URL session create'
  );
  assert.match(
    bundle,
    /this\.modelBytes=new Uint8Array\(await Q\.arrayBuffer\(\)\),this\.session=await Xo\.create\(A,this\._ortOpts\(\)\)/,
    'Apple should keep modelBytes until _readMetadata then create session from URL'
  );
  assert.match(
    bundle,
    /this\._policyInitError=String\(C\?\.message\|\|C\)/,
    'policy init should record error message for diagnostics'
  );
  assert.match(
    bundle,
    /else if\(this\.depthPreviewPixels&&this\.depthPreviewSize&&s\)/,
    'depth preview should fall back to readback when policy is unavailable'
  );
});

test('parkour ORT uses low-memory session options and boot preload on Apple', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /_ortOpts\(\)\{const a=\/iPad\|iPhone\|iPod\//,
    'policy controller should expose Apple low-memory ORT session options'
  );
  assert.match(
    bundle,
    /graphOptimizationLevel:"disabled",enableCpuMemArena:!1,enableMemPattern:!1/,
    'Apple ORT sessions should use disabled graph optimization and no arena'
  );
  assert.match(
    bundle,
    /Xo\.create\(A,this\._ortOpts\(\)\)/,
    'Apple ORT sessions should load from URL without duplicate ArrayBuffer'
  );
  assert.match(
    bundle,
    /Boot policy preload failed:/,
    'bundle should boot-preload ORT before MuJoCo tk()'
  );
  assert.ok(
    bundle.indexOf('let _applePrePol') < bundle.indexOf('const $g=await tk()'),
    'boot ORT preload must run before MuJoCo WASM init'
  );
  assert.match(
    bundle,
    /await this\.initPolicy\(this\._applePrePolicy\?\?null\)/,
    'demo init should finish preloaded policy after MuJoCo scene load'
  );
  assert.match(
    bundle,
    /I\.mujoco=this\.mujoco/,
    'preloaded policy controller should receive real MuJoCo reference'
  );
  assert.match(
    bundle,
    /this\.session\|\|\(await this\._initOrt\(\)/,
    'policy init should skip ORT reload when sessions were preloaded'
  );
});
