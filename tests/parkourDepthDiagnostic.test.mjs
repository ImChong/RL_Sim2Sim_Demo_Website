import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildParkourDepthDiagnosticHints,
  buildParkourDepthDiagnosticReport,
  sampleDepthFrameMeters,
  samplePixelBuffer
} from '../src/utils/parkourDepthDiagnostic.js';

test('samplePixelBuffer averages the first channel', () => {
  const buffer = new Uint8Array([10, 0, 0, 255, 20, 0, 0, 255, 0, 0, 0, 255]);
  const stats = samplePixelBuffer(buffer);
  assert.equal(stats.avg, 10);
  assert.equal(stats.nonzero, 2);
  assert.equal(stats.total, 3);
  assert.equal(stats.type, 'Uint8Array');
});

test('sampleDepthFrameMeters ignores non-finite values', () => {
  const frame = new Float32Array([1.2, Number.NaN, 0, 2.4]);
  const stats = sampleDepthFrameMeters(frame);
  assert.equal(stats.sampled, 3);
  assert.equal(stats.nonzero, 2);
  assert.ok(Math.abs(stats.avgMeters - 1.2) < 1e-6);
});

test('buildParkourDepthDiagnosticHints flags dark preview and missing Apple path', () => {
  const hints = buildParkourDepthDiagnosticHints({
    demo: { policyController: { isReady: true }, _appleDepthReadback: false },
    hostUserAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
    depthPreview: { avg: 0, total: 100 },
    depthReadback: { avg: 0, total: 100 },
    bundleHasIosPatch: false
  });

  assert.deepEqual(hints, [
    'apple_path_inactive',
    'preview_dark',
    'readback_zero',
    'bundle_missing_ios_patch'
  ]);
});

test('buildParkourDepthDiagnosticReport includes parkour and webgl fields', () => {
  const gl = {
    VENDOR: 0x1f00,
    RENDERER: 0x1f01,
    VERSION: 0x1f02,
    getParameter(code) {
      if (code === 0x1f00) return 'Apple Inc.';
      if (code === 0x1f01) return 'Apple GPU';
      if (code === 0x1f02) return 'WebGL 2.0';
      return null;
    },
    getError() {
      return 0;
    }
  };

  const report = buildParkourDepthDiagnosticReport({
    demo: {
      _appleDepthReadback: true,
      policyController: { isReady: true },
      params: { policyEnabled: true, showRawDepth: false },
      data: { qpos: [1.5] },
      simStepHz: 500,
      depthPreviewPixels: new Uint8Array([80, 80, 80, 255, 90, 90, 90, 255]),
      depthPixels: new Uint8Array([40, 0, 0, 255, 50, 0, 0, 255]),
      depthFrame: new Float32Array([1.1, 1.2]),
      renderer: { getContext: () => gl }
    },
    host: {
      url: 'https://example.test/',
      userAgent: 'iPhone',
      platform: 'iPhone',
      maxTouchPoints: 5,
      parkourLoading: false,
      isSmallScreen: true
    },
    bundleHasIosPatch: true,
    bundleUrl: 'https://example.test/parkour/dist-desktop/assets/index-BLR_wER3.js'
  });

  assert.equal(report.parkour.appleDepthReadback, true);
  assert.equal(report.parkour.policyReady, true);
  assert.equal(report.parkour.robotX, 1.5);
  assert.ok(report.depthPreview.avg > 0);
  assert.ok(report.depthReadback.avg > 0);
  assert.equal(report.webgl.renderer, 'Apple GPU');
  assert.equal(report.bundle.hasIosPatch, true);
  assert.equal(report.hints.length, 0);
});
