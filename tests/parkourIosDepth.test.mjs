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
    /if\(this\._appleDepthReadback\)\{const _n=this\.depthCameraView\.near,_f=this\.depthCameraView\.far,_d=this\.depthPixels\[R\*4\]\/255/,
    'depth frame decode should use perspectiveDepthToViewZ on Apple'
  );
  assert.match(
    bundle,
    /this\._appleDepthOverrideMaterial=new hh\(\{depthPacking:ma\}\)/,
    'Apple path should use MeshDepthMaterial override for native depth capture'
  );
  assert.match(
    bundle,
    /overrideMaterial=this\._appleDepthOverrideMaterial/,
    'Apple path should render depth via scene overrideMaterial'
  );
  assert.match(
    bundle,
    /\}\)\.call\(this\),this\._appleDepthReadback&&this\.renderer\.getContext\(\)\.finish\(\)/,
    'Apple depth capture should run inside IIFE in comma-chain render loop'
  );
  assert.match(
    bundle,
    /this\._appleDepthReadback&&this\.renderer\.getContext\(\)\.finish\(\)/,
    'Apple path should flush WebGL before readRenderTargetPixels'
  );
  assert.match(
    bundle,
    /this\._appleDepthReadback&&this\.policyController\._prepareDepthInput\(\)/,
    'depth preview should refresh immediately on Apple after capture'
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
