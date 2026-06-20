import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  clampScopeWindowSeconds,
  DEFAULT_SCOPE_WINDOW_SECONDS,
  loadScopeWindowSeconds,
  MAX_SCOPE_WINDOW_SECONDS,
  MIN_SCOPE_WINDOW_SECONDS,
  saveScopeWindowSeconds,
  SCOPE_WINDOW_SECONDS_KEY
} from '../src/utils/scopeWindowPreference.js';
import { setScopeWindowSeconds, createSignalScope } from '../src/simulation/signalScope.js';

test('clampScopeWindowSeconds enforces minimum 10 seconds', () => {
  assert.equal(clampScopeWindowSeconds(5), MIN_SCOPE_WINDOW_SECONDS);
  assert.equal(clampScopeWindowSeconds(10), 10);
  assert.equal(clampScopeWindowSeconds(45.6), 46);
  assert.equal(clampScopeWindowSeconds(999), MAX_SCOPE_WINDOW_SECONDS);
  assert.equal(clampScopeWindowSeconds('bad'), DEFAULT_SCOPE_WINDOW_SECONDS);
});

test('scope window preference persists in localStorage', () => {
  const storage = new Map();
  const original = globalThis.localStorage;
  globalThis.localStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value)
  };
  try {
    assert.equal(loadScopeWindowSeconds(), DEFAULT_SCOPE_WINDOW_SECONDS);
    assert.equal(saveScopeWindowSeconds(30), 30);
    assert.equal(storage.get(SCOPE_WINDOW_SECONDS_KEY), '30');
    assert.equal(loadScopeWindowSeconds(), 30);
    assert.equal(saveScopeWindowSeconds(7), MIN_SCOPE_WINDOW_SECONDS);
  } finally {
    globalThis.localStorage = original;
  }
});

test('setScopeWindowSeconds updates live scope buffer window', () => {
  const scope = createSignalScope({ windowSeconds: 20 });
  assert.equal(setScopeWindowSeconds(scope, 12), 12);
  assert.equal(scope.windowSeconds, 12);
});
