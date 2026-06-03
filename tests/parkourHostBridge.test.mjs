import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-Cq8mDpv1.js'
);
const bridgePath = join(__dirname, '../public/parkour/dist-desktop/host-bridge.js');

test('parkour Reflector setReflectionQuality updates cached size and multisample', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  const classStart = bundle.indexOf('class yN extends');
  assert.ok(classStart >= 0, 'Reflector class yN should exist in parkour bundle');

  const snippet = bundle.slice(classStart, classStart + 4500);
  assert.match(
    snippet,
    /let I=Q\.textureWidth/,
    'texture width must be mutable so quality changes can be tracked'
  );
  assert.match(
    snippet,
    /let w=Q\.multisample/,
    'multisample count must be mutable so quality changes can be tracked'
  );
  assert.match(
    snippet,
    /I=ea,w=sa/,
    'setReflectionQuality must persist the new render-target size'
  );
});

test('parkour policy depth pass avoids iOS depth texture readback path', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  const materialStart = bundle.indexOf('this.depthInferenceMaterial=new Sg');
  assert.ok(materialStart >= 0, 'depth inference material should exist');
  const materialSnippet = bundle.slice(materialStart, materialStart + 1400);

  assert.match(
    materialSnippet,
    /gl_FragCoord\.z/,
    'policy depth pass should pack fragment depth directly from the scene render'
  );
  assert.doesNotMatch(
    materialSnippet,
    /texture2D\(tDepth, vUv\)\.x/,
    'policy depth pass should not sample a depth texture on iOS'
  );
  assert.match(
    bundle,
    /depthInferenceTarget=new QI\(this\.depthInset\.width,this\.depthInset\.height,\{type:1009,format:SQ,minFilter:MQ,magFilter:MQ,depthBuffer:!0,stencilBuffer:!1\}\)/,
    'direct scene depth render needs a depth buffer on the RGBA8 target'
  );

  const readbackStart = bundle.indexOf('this.renderer.readRenderTargetPixels(this.depthInferenceTarget');
  assert.ok(readbackStart >= 0, 'depth readback should exist');
  const readbackSnippet = bundle.slice(Math.max(0, readbackStart - 700), readbackStart);
  assert.match(
    readbackSnippet,
    /this\.scene\.overrideMaterial=this\.depthInferenceMaterial/,
    'readback pass should temporarily override scene materials'
  );
  assert.match(
    readbackSnippet,
    /this\.renderer\.render\(this\.scene,this\.depthCameraView\)/,
    'readback pass should render scene geometry with the depth camera'
  );
  assert.match(
    readbackSnippet,
    /getClearColor\(new hB\).*getClearAlpha\(\).*setClearColor\(16777215,1\)/,
    'readback pass should clear background pixels to packed far depth'
  );
  assert.match(
    readbackSnippet,
    /setClearColor\(_c,_a\)/,
    'readback pass should restore the renderer clear color'
  );
  assert.doesNotMatch(
    readbackSnippet,
    /this\.renderer\.render\(this\.depthInferenceScene,this\.depthCamera\)/,
    'readback pass should not render the old fullscreen depth-texture quad'
  );
  assert.doesNotMatch(
    bundle,
    /depthLatentQueue\.push\(null\)/,
    'policy depth latent queue should not enqueue null while depth warms up'
  );
  assert.match(
    bundle,
    /this\.depthFeature\.set\(I\).*depthLatentQueue\.push\(Float32Array\.from\(this\.depthFeature\)\).*E\.set\(C\?\?this\.depthFeature,g\.length\)/,
    'policy should fall back to the last valid or zero depth feature'
  );
  assert.match(
    bundle,
    /this\.depthSession&&this\.latestDepth/,
    'depth backbone should wait until the first depth frame is available'
  );
});

test('host bridge defers reflection quality until reflectors exist', () => {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  const reflectorCalls = [];
  const demo = {
    reflectors: [],
    render() {}
  };
  let messageHandler;
  let statsTick;

  const context = {
    window: {
      __parkourDemo: demo,
      location: { origin: 'http://localhost' },
      addEventListener(type, handler) {
        if (type === 'message') {
          messageHandler = handler;
        }
      }
    },
    parent: { postMessage() {} },
    requestAnimationFrame(callback) {
      callback();
    },
    setInterval(callback) {
      statsTick = callback;
      return 1;
    },
    console
  };
  context.window.parent = context.parent;

  vm.runInNewContext(bridgeSource, context);

  messageHandler({
    data: {
      source: 'parkour-host-control',
      type: 'apply',
      reflectionQuality: 0
    }
  });

  assert.equal(demo._pendingReflectionQuality, 0);
  assert.equal(reflectorCalls.length, 0);

  demo.reflectors.push({
    setReflectionQuality(size, multisample) {
      reflectorCalls.push({ size, multisample });
    }
  });
  statsTick();

  assert.equal(reflectorCalls.length, 1);
  assert.deepEqual(reflectorCalls[0], { size: 128, multisample: 0 });
  assert.equal(demo._pendingReflectionQuality, undefined);
  assert.equal(demo.reflectionQuality, 0);
});
