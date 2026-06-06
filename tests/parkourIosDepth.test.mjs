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
    /this\._policyInitError=String\(C\?\.message\|\|C\)/,
    'policy init should record error message for diagnostics'
  );
  assert.match(
    bundle,
    /else if\(this\.depthPreviewPixels&&this\.depthPreviewSize&&s\)/,
    'depth preview should fall back to readback when policy is unavailable'
  );
});

test('parkour ORT uses low-memory session options and early preload on Apple', () => {
  const bundle = readFileSync(bundlePath, 'utf8');

  assert.match(
    bundle,
    /_ortOpts\(\)\{const a=\/iPad\|iPhone\|iPod\//,
    'policy controller should expose Apple low-memory ORT session options'
  );
  assert.match(
    bundle,
    /Xo\.create\(g,this\._ortOpts\(\)\)/,
    'ORT sessions should use _ortOpts() instead of hard-coded graphOptimizationLevel all'
  );
  assert.match(
    bundle,
    /enableCpuMemArena:!1,enableMemPattern:!1/,
    'Apple ORT sessions should disable arena and mem pattern to reduce peak WASM heap'
  );
  assert.match(
    bundle,
    /async beginPolicyPreload\(\)/,
    'demo should preload ORT sessions before MuJoCo on Apple'
  );
  assert.match(
    bundle,
    /await this\.beginPolicyPreload\(\)/,
    'demo init should call beginPolicyPreload on Apple hardware'
  );
  assert.match(
    bundle,
    /this\.session\|\|\(await this\._initOrt\(\)/,
    'policy init should skip ORT reload when sessions were preloaded'
  );
});
