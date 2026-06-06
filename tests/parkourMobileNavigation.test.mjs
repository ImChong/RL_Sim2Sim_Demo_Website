import assert from 'node:assert/strict';
import test from 'node:test';
import {
  getMainDemoPageUrl,
  getParkourMobilePageUrl,
  normalizeBaseUrl
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
});
