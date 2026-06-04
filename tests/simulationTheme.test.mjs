import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getSimulationThemeSettings,
  normalizeSimulationThemeName,
} from '../src/simulation/theme.js';

test('normalizeSimulationThemeName maps unknown values to light', () => {
  assert.equal(normalizeSimulationThemeName('dark'), 'dark');
  assert.equal(normalizeSimulationThemeName('light'), 'light');
  assert.equal(normalizeSimulationThemeName('system'), 'light');
  assert.equal(normalizeSimulationThemeName(undefined), 'light');
});

test('getSimulationThemeSettings keeps light mode at default brightness', () => {
  assert.deepEqual(getSimulationThemeSettings('light'), {
    themeName: 'light',
    lightIntensityScale: 1,
    ambientIntensity: 0.1,
    backgroundRgb: [0.15, 0.25, 0.35],
    sonicHemiIntensity: 0.12,
    sonicFillIntensity: 0.18,
    sonicRimIntensity: 0.12,
  });
});

test('getSimulationThemeSettings uses brighter dark mode for parkour parity', () => {
  assert.deepEqual(getSimulationThemeSettings('dark'), {
    themeName: 'dark',
    lightIntensityScale: 1,
    ambientIntensity: 0.18,
    backgroundRgb: [0.11, 0.18, 0.28],
    sonicHemiIntensity: 0.4,
    sonicFillIntensity: 0.48,
    sonicRimIntensity: 0.36,
  });
});
