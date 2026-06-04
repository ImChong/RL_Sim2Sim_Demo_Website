/** Processed depth preview texture height in the parkour bundle (before previewScale). */
export const PARKOUR_DEPTH_PROCESSED_HEIGHT = 58;

/** Must match --parkour-stick-size in ParkourMobileJoystick.vue */
export const PARKOUR_MOBILE_STICK_SIZE = 128;

/** Must match .controls-mobile bottom gap. */
export const MOBILE_CONTROLS_BOTTOM_GAP = 12;

/** Must match extra gap in .parkour-mobile-controls--dock-panel bottom calc. */
export const MOBILE_JOYSTICK_GAP_ABOVE_PANEL = 12;

/**
 * Position the depth HUD so its vertical center matches the joystick center and
 * left/bottom outer gaps are equal (WebGL viewport coordinates, origin bottom-left).
 */
export function computeParkourMobileDepthLayout({
  panelTopFromBottom,
  joystickCenterFromBottom,
  previewScale = 2,
  minGap = 8
}) {
  const depthHeightPx = PARKOUR_DEPTH_PROCESSED_HEIGHT * previewScale;
  const depthBottomOffset = Math.ceil(joystickCenterFromBottom - depthHeightPx / 2);
  const equalGap = Math.max(minGap, Math.round(depthBottomOffset - panelTopFromBottom));

  return {
    depthPreviewScale: previewScale,
    depthPreviewMargin: equalGap,
    depthPreviewLeftOffset: equalGap,
    depthPreviewBottomOffset: Math.ceil(panelTopFromBottom + equalGap)
  };
}

/** Fallback when host DOM refs are not yet mounted. */
export function computeParkourMobileDepthLayoutFromMetrics({
  panelHeight,
  bottomInset = 0,
  previewScale = 2,
  stickSize = PARKOUR_MOBILE_STICK_SIZE,
  controlsBottomGap = MOBILE_CONTROLS_BOTTOM_GAP,
  joystickGapAbovePanel = MOBILE_JOYSTICK_GAP_ABOVE_PANEL
}) {
  const panelTopFromBottom = panelHeight + controlsBottomGap + bottomInset;
  const joystickCenterFromBottom = panelTopFromBottom + joystickGapAbovePanel + stickSize / 2;
  return computeParkourMobileDepthLayout({
    panelTopFromBottom,
    joystickCenterFromBottom,
    previewScale
  });
}
