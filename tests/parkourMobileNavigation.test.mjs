import assert from 'node:assert/strict';
import test from 'node:test';
import {
  consumeParkourStandaloneReturn,
  getMainDemoPageUrl,
  getParkourMobilePageUrl,
  markParkourStandaloneExit,
  normalizeBaseUrl,
  PARKOUR_STANDALONE_SESSION_KEY,
  peekParkourStandaloneReturn
} from '../src/utils/parkourMobileNavigation.js';

test('normalizeBaseUrl keeps trailing slash', () => {
  assert.equal(normalizeBaseUrl('/RL_Sim2Sim_Demo_Website/'), '/RL_Sim2Sim_Demo_Website/');
  assert.equal(normalizeBaseUrl('/RL_Sim2Sim_Demo_Website'), '/RL_Sim2Sim_Demo_Website/');
  assert.equal(normalizeBaseUrl('/'), '/');
});

test('getParkourMobilePageUrl resolves under GitHub Pages base', () => {
  assert.equal(
    getParkourMobilePageUrl('/RL_Sim2Sim_Demo_Website/'),
    '/RL_Sim2Sim_Demo_Website/parkour-mobile.html'
  );
});

test('getMainDemoPageUrl resolves index under project base', () => {
  assert.equal(
    getMainDemoPageUrl('/RL_Sim2Sim_Demo_Website/'),
    '/RL_Sim2Sim_Demo_Website/index.html'
  );
  assert.equal(getMainDemoPageUrl('/'), '/');
  assert.equal(
    getMainDemoPageUrl('/RL_Sim2Sim_Demo_Website/', { fromParkour: true }),
    '/RL_Sim2Sim_Demo_Website/index.html?from=parkour'
  );
});

test('parkour standalone session markers round-trip', () => {
  const storage = new Map();
  const original = globalThis.sessionStorage;
  globalThis.sessionStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
    removeItem: (key) => storage.delete(key)
  };
  try {
    markParkourStandaloneExit();
    assert.equal(peekParkourStandaloneReturn(), true);
    assert.equal(consumeParkourStandaloneReturn(), true);
    assert.equal(peekParkourStandaloneReturn(), false);
    assert.equal(storage.get(PARKOUR_STANDALONE_SESSION_KEY), undefined);
  } finally {
    globalThis.sessionStorage = original;
  }
});
