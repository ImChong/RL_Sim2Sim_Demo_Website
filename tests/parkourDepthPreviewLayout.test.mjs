import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MOBILE_CONTROLS_BOTTOM_GAP,
  MOBILE_JOYSTICK_GAP_ABOVE_PANEL,
  PARKOUR_DEPTH_PROCESSED_HEIGHT,
  PARKOUR_MOBILE_STICK_SIZE,
  computeParkourMobileDepthLayout,
  computeParkourMobileDepthLayoutFromMetrics
} from '../src/utils/parkourDepthPreviewLayout.js';

test('mobile depth preview centers on joystick with equal left and bottom gaps', () => {
  const panelHeight = 56;
  const bottomInset = 0;
  const scale = 2;
  const panelTop = panelHeight + MOBILE_CONTROLS_BOTTOM_GAP + bottomInset;
  const stickCenter = panelTop + MOBILE_JOYSTICK_GAP_ABOVE_PANEL + PARKOUR_MOBILE_STICK_SIZE / 2;

  const layout = computeParkourMobileDepthLayout({
    panelTopFromBottom: panelTop,
    joystickCenterFromBottom: stickCenter,
    previewScale: scale
  });

  const depthHeight = PARKOUR_DEPTH_PROCESSED_HEIGHT * scale;
  const depthCenter = layout.depthPreviewBottomOffset + depthHeight / 2;

  assert.equal(layout.depthPreviewLeftOffset, layout.depthPreviewBottomOffset - panelTop);
  assert.equal(depthCenter, stickCenter);
  assert.equal(layout.depthPreviewLeftOffset, 18);
});

test('computeParkourMobileDepthLayoutFromMetrics matches direct geometry', () => {
  const layout = computeParkourMobileDepthLayoutFromMetrics({
    panelHeight: 120,
    bottomInset: 4,
    previewScale: 2
  });
  const panelTop = 120 + MOBILE_CONTROLS_BOTTOM_GAP + 4;
  assert.equal(layout.depthPreviewLeftOffset, layout.depthPreviewBottomOffset - panelTop);
});
