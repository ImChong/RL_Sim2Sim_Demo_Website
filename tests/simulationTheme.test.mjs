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
    fogExp2Density: 0,
    cinematicHemiIntensity: 0.2,
    cinematicFillIntensity: 0.12,
  });
});

test('getSimulationThemeSettings slightly dims dark mode', () => {
  assert.deepEqual(getSimulationThemeSettings('dark'), {
    themeName: 'dark',
    lightIntensityScale: 0.72,
    ambientIntensity: 0.07,
    backgroundRgb: [0.07, 0.1, 0.07],
    fogExp2Density: 0.034,
    cinematicHemiIntensity: 0.55,
    cinematicFillIntensity: 0.34,
  });
});
