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

  const { context, getMessageHandler } = createParkourBridgeContext(demo, {
    statsTick(callback) {
      statsTick = callback;
    }
  });
  vm.runInNewContext(bridgeSource, context);
  messageHandler = getMessageHandler();

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

function createParkourBridgeContext(demo, options = {}) {
  const parentMessages = options.parentMessages ?? null;
  const docListeners = options.docListeners ?? null;
  const winListeners = options.winListeners ?? null;
  let messageHandler;

  const context = {
    window: {
      __parkourDemo: demo,
      location: { origin: 'http://localhost' },
      addEventListener(type, handler) {
        if (type === 'message') {
          messageHandler = handler;
        }
        if (type === 'blur' && winListeners) {
          winListeners.blur = handler;
        }
      }
    },
    parent: {
      postMessage(payload) {
        if (parentMessages) {
          parentMessages.push(payload);
        }
      }
    },
    document: {
      addEventListener(type, handler, capture) {
        if (!docListeners) {
          return;
        }
        if (type === 'keydown' && capture) {
          docListeners.keydown = handler;
        }
        if (type === 'keyup' && capture) {
          docListeners.keyup = handler;
        }
      }
    },
    requestAnimationFrame(callback) {
      callback();
    },
    setInterval(callback) {
      if (options.statsTick) {
        options.statsTick(callback);
      }
      return 1;
    },
    console
  };
  context.window.parent = context.parent;
  return { context, getMessageHandler: () => messageHandler };
}

function runBridgeInVm(demo) {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  const { context, getMessageHandler } = createParkourBridgeContext(demo);
  vm.runInNewContext(bridgeSource, context);
  return getMessageHandler();
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

test('host bridge relays iframe keyboard to parent for joystick sync', () => {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  const parentMessages = [];
  const docListeners = { keydown: null, keyup: null };
  const winListeners = { blur: null };
  const demo = {
    reflectors: [],
    policyController: {
      pressedKeys: new Set(),
      highSpeedMode: false,
      _updateCommandState() {}
    },
    render() {}
  };

  const { context } = createParkourBridgeContext(demo, {
    parentMessages,
    docListeners,
    winListeners
  });
  vm.runInNewContext(bridgeSource, context);
  assert.equal(typeof docListeners.keydown, 'function');
  assert.equal(typeof docListeners.keyup, 'function');

  docListeners.keydown({
    code: 'KeyW',
    repeat: false,
    preventDefault() {}
  });
  assert.equal(parentMessages.length, 1);
  assert.equal(parentMessages[0].source, 'parkour-keyboard-sync');
  assert.deepEqual([...parentMessages[0].keysHeld], ['KeyW']);

  docListeners.keyup({
    code: 'KeyW',
    preventDefault() {}
  });
  assert.equal(parentMessages.length, 2);
  assert.deepEqual([...(parentMessages[1].keysHeld ?? [])], []);

  docListeners.keydown({
    code: 'KeyW',
    repeat: false,
    preventDefault() {}
  });
  winListeners.blur();
  assert.equal(parentMessages.at(-1).type, 'clear');
});

test('host bridge rounds depth HUD materials without touching inference', () => {
  const bridgeSource = readFileSync(bridgePath, 'utf8');
  assert.match(bridgeSource, /applyDepthHudRoundedCorners/);
  assert.match(bridgeSource, /depthHudQ/);
  assert.match(bridgeSource, /patchDepthHudRender/);
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
  assert.match(shader.fragmentShader, /uDepthHudCornerRadiusPx/);
  assert.match(shader.fragmentShader, /uDepthHudSize/);
  assert.match(shader.fragmentShader, /discard/);
  assert.equal(shader.uniforms.uDepthHudCornerRadiusPx.value, 0);
  assert.equal(shader.uniforms.uDepthHudSize.value.x, 1);
  assert.equal(shader.uniforms.uDepthHudSize.value.y, 1);
});

test('host bridge disables renderer autoClear during async demo render', () => {
  const demo = {
    reflectors: [],
    renderer: { autoClear: true },
    async render(time) {
      this.renderCalls = (this.renderCalls ?? 0) + 1;
      this.autoClearDuringRender = this.renderer.autoClear;
      this.renderTime = time;
      await Promise.resolve();
      this.autoClearAfterAwait = this.renderer.autoClear;
    }
  };
  runBridgeInVm(demo);
  return demo.render(123.456).then(() => {
    assert.equal(demo.renderCalls, 1);
    assert.equal(demo.autoClearDuringRender, false);
    assert.equal(demo.autoClearAfterAwait, false);
    assert.equal(demo.renderTime, 123.456);
    assert.equal(demo.renderer.autoClear, true);
  });
});

test('host bridge maps panel corner radius px to depth HUD pixel-space uniforms', () => {
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
  const previewUniforms = depthPreviewMaterial.__depthHudRoundUniforms;
  const rawUniforms = depthRawMaterial.__depthHudRoundUniforms;
  assert.equal(previewUniforms.cornerRadiusPx.value, 18);
  assert.equal(previewUniforms.size.value.x, 87 * 4);
  assert.equal(previewUniforms.size.value.y, 58 * 4);
  assert.equal(rawUniforms.cornerRadiusPx.value, 18);
  assert.equal(rawUniforms.size.value.x, 64 * 4);
  assert.equal(rawUniforms.size.value.y, 64 * 4);
});
