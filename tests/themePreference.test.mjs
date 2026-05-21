import test from 'node:test';
import assert from 'node:assert/strict';
import { getStoredTheme } from '../src/utils/themePreference.js';

test('getStoredTheme defaults to dark when localStorage is unavailable', () => {
  assert.equal(getStoredTheme(), 'dark');
});
