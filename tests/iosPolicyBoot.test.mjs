import assert from 'node:assert/strict';
import test from 'node:test';
import {
  consumeIosBootPolicy,
  IOS_BOOT_POLICY_KEY,
  peekIosBootPolicy,
  scheduleIosPolicyBoot,
  shouldReloadForIosPolicySwitch
} from '../src/utils/iosPolicyBoot.js';

test('shouldReloadForIosPolicySwitch is true on iPhone', () => {
  assert.equal(
    shouldReloadForIosPolicySwitch({
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
      platform: 'iPhone',
      maxTouchPoints: 5
    }),
    true
  );
});

test('ios boot policy round-trips through sessionStorage', () => {
  const storage = new Map();
  const original = globalThis.sessionStorage;
  let reloaded = false;
  globalThis.sessionStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key)
  };
  const originalLocation = globalThis.location;
  globalThis.location = {
    reload() {
      reloaded = true;
    }
  };
  try {
    scheduleIosPolicyBoot('g1-parkour');
    assert.equal(reloaded, true);
    assert.equal(peekIosBootPolicy(), 'g1-parkour');
    assert.equal(consumeIosBootPolicy(), 'g1-parkour');
    assert.equal(peekIosBootPolicy(), null);
    assert.equal(storage.get(IOS_BOOT_POLICY_KEY), undefined);
  } finally {
    globalThis.sessionStorage = original;
    globalThis.location = originalLocation;
  }
});
