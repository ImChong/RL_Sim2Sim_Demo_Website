import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import vm from 'node:vm';

const __dirname = dirname(fileURLToPath(import.meta.url));
const bundlePath = join(
  __dirname,
  '../public/parkour/dist-desktop/assets/index-BLR_wER3.js'
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

function runBridgeInVm(demo) {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  let messageHandler;
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
    setInterval() {
      return 1;
    },
    console
  };
  context.window.parent = context.parent;
  vm.runInNewContext(bridgeSource, context);
  return messageHandler;
}

test('host bridge applies virtual joystick input to policy controller', () => {
  const joystickStates = [];
  const policyController = {
    pressedKeys: new Set(),
    highSpeedMode: false,
    _updateCommandState() {
      joystickStates.push({
        keys: [...this.pressedKeys],
        highSpeedMode: this.highSpeedMode
      });
    }
  };
  const demo = {
    reflectors: [],
    policyController,
    depthInset: { margin: 16, previewScale: 4 },
    depthProcessedInset: { scale: 4 },
    render() {}
  };

  const messageHandler = runBridgeInVm(demo);
  messageHandler({
    data: {
      source: 'parkour-host-control',
      type: 'apply',
      virtualInput: { active: true, w: true, a: true, d: false, highSpeed: true }
    }
  });

  assert.equal(joystickStates.length, 1);
  assert.deepEqual(joystickStates[0].keys.sort(), ['a', 'w']);
  assert.equal(joystickStates[0].highSpeedMode, true);
  assert.deepEqual([...policyController.pressedKeys], []);
});

test('host bridge shrinks depth preview layout for mobile host controls', () => {
  const demo = {
    reflectors: [],
    depthInset: { margin: 16, previewScale: 4 },
    depthProcessedInset: { scale: 4, width: 87, height: 58, gap: 8 },
    render() {}
  };
  const messageHandler = runBridgeInVm(demo);

  messageHandler({
    data: {
      source: 'parkour-host-control',
      type: 'apply',
      depthPreviewScale: 2,
      depthPreviewMargin: 8,
      depthPreviewLeftOffset: 12,
      depthPreviewBottomOffset: 96
    }
  });

  assert.equal(demo.depthInset.previewScale, 2);
  assert.equal(demo.depthInset.margin, 8);
  assert.equal(demo.depthInset.leftOffset, 12);
  assert.equal(demo.depthInset.bottomOffset, 96);
  assert.equal(demo.depthProcessedInset.scale, 2);
});

test('host bridge toggles pause and resets parkour run', () => {
  let reloadCalls = 0;
  const demo = {
    reflectors: [],
    params: { paused: false },
    reloadScene() {
      reloadCalls += 1;
    },
    render() {}
  };
  const messageHandler = runBridgeInVm(demo);

  messageHandler({
    data: {
      source: 'parkour-host-control',
      type: 'apply',
      parkourPause: 'toggle'
    }
  });
  assert.equal(demo.params.paused, true);

  messageHandler({
    data: {
      source: 'parkour-host-control',
      type: 'apply',
      parkourResetRun: true
    }
  });
  assert.equal(reloadCalls, 1);
});

test('parkour bundle supports host depth inset left/bottom offsets', () => {
  const bundle = readFileSync(bundlePath, 'utf8');
  assert.match(
    bundle,
    /const g=this\.depthInset\.leftOffset\?\?this\.depthInset\.margin,I=this\.depthInset\.bottomOffset\?\?this\.depthInset\.margin/,
    'depth HUD must honor host left/bottom offsets'
  );
});

test('host bridge rounds depth HUD materials without touching inference', () => {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  assert.match(bridgeSource, /applyDepthHudRoundedCorners/);
  assert.match(bridgeSource, /depthHudBox/);
  assert.doesNotMatch(bridgeSource, /depthInferenceMaterial/);

  const depthPreviewMaterial = { needsUpdate: false };
  const depthRawMaterial = { needsUpdate: false };
  const demo = {
    reflectors: [],
    depthPreviewMaterial,
    depthRawMaterial,
    render() {}
  };
  runBridgeInVm(demo);

  assert.equal(depthPreviewMaterial.__depthHudRoundedPatched, true);
  assert.equal(depthRawMaterial.__depthHudRoundedPatched, true);
  assert.equal(typeof depthPreviewMaterial.onBeforeCompile, 'function');
  assert.equal(depthPreviewMaterial.depthWrite, false);
  assert.equal(depthPreviewMaterial.depthTest, false);
  assert.notEqual(depthPreviewMaterial.transparent, true);

  const shader = { uniforms: {}, fragmentShader: 'void main() {\n#include <colorspace_fragment>\n}' };
  depthPreviewMaterial.onBeforeCompile(shader);
  assert.match(shader.fragmentShader, /uDepthHudCornerRadius/);
  assert.match(shader.fragmentShader, /discard/);
  assert.equal(shader.uniforms.uDepthHudCornerRadius.value, 0);
});

test('host bridge maps panel corner radius px to depth HUD normalized radius', () => {
  const depthPreviewMaterial = { needsUpdate: false };
  const depthRawMaterial = { needsUpdate: false };
  const demo = {
    reflectors: [],
    depthInset: { width: 64, previewScale: 4 },
    depthProcessedInset: { width: 87, height: 58, scale: 4 },
    depthPreviewMaterial,
    depthRawMaterial,
    render() {}
  };
  const messageHandler = runBridgeInVm(demo);

  messageHandler({
    data: {
      source: 'parkour-host-control',
      type: 'apply',
      depthPreviewCornerRadiusPx: 18
    }
  });

  assert.equal(demo._depthPreviewCornerRadiusPx, 18);
  assert.ok(Math.abs(depthPreviewMaterial.__depthHudCornerRadiusUniform.value - 18 / (87 * 4)) < 1e-6);
  assert.ok(Math.abs(depthRawMaterial.__depthHudCornerRadiusUniform.value - 18 / (64 * 4)) < 1e-6);
});
