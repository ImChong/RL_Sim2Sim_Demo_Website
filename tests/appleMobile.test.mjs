import assert from 'node:assert/strict';
import test from 'node:test';
import {
  isAppleMobileDevice,
  isBfmDesktopRequired,
  PARKOUR_IOS_MOUNT_DELAY_MS
} from '../src/utils/appleMobile.js';

test('isAppleMobileDevice matches iPhone user agents', () => {
  assert.equal(
    isAppleMobileDevice({
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.6099.119 Mobile/15E148 Safari/604.1',
      platform: 'iPhone',
      maxTouchPoints: 5
    }),
    true
  );
});

test('isAppleMobileDevice matches iPadOS desktop UA', () => {
  assert.equal(
    isAppleMobileDevice({
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
      platform: 'MacIntel',
      maxTouchPoints: 5
    }),
    true
  );
});

test('isAppleMobileDevice rejects desktop Chrome', () => {
  assert.equal(
    isAppleMobileDevice({
      userAgent:
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      platform: 'Linux x86_64',
      maxTouchPoints: 0
    }),
    false
  );
});

test('PARKOUR_IOS_MOUNT_DELAY_MS is a positive delay', () => {
  assert.ok(PARKOUR_IOS_MOUNT_DELAY_MS >= 200);
});

test('isBfmDesktopRequired is true on iPhone', () => {
  assert.equal(
    isBfmDesktopRequired(
      {
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)',
        platform: 'iPhone',
        maxTouchPoints: 5
      },
      { innerWidth: 390 }
    ),
    true
  );
});

test('isBfmDesktopRequired is true for narrow viewports', () => {
  assert.equal(
    isBfmDesktopRequired(
      {
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) Chrome/120.0.0.0',
        platform: 'Linux x86_64',
        maxTouchPoints: 0
      },
      { innerWidth: 768 }
    ),
    true
  );
});

test('isBfmDesktopRequired is false on desktop widths', () => {
  assert.equal(
    isBfmDesktopRequired(
      {
        userAgent: 'Mozilla/5.0 (X11; Linux x86_64) Chrome/120.0.0.0',
        platform: 'Linux x86_64',
        maxTouchPoints: 0
      },
      { innerWidth: 1280 }
    ),
    false
  );
});
