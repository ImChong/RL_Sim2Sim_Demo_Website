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
