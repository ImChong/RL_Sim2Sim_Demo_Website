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

test('getSimulationThemeSettings slightly dims dark mode', () => {
  assert.deepEqual(getSimulationThemeSettings('dark'), {
    themeName: 'dark',
    lightIntensityScale: 0.85,
    ambientIntensity: 0.14,
    backgroundRgb: [0.08, 0.12, 0.18],
    sonicHemiIntensity: 0.34,
    sonicFillIntensity: 0.42,
    sonicRimIntensity: 0.3,
  });
});
