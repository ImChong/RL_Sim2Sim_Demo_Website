/** Processed depth preview texture height in the parkour bundle (before previewScale). */
export const PARKOUR_DEPTH_PROCESSED_HEIGHT = 58;

/** Processed depth preview texture width in the parkour bundle (before previewScale). */
export const PARKOUR_DEPTH_PROCESSED_WIDTH = 87;

/** Default stick size (desktop / undocked). Must match ParkourMobileJoystick.vue. */
export const PARKOUR_MOBILE_STICK_SIZE = 128;

/** Smaller stick when docked above the mobile control panel. */
export const PARKOUR_MOBILE_DOCK_STICK_SIZE = 108;

/** Minimum horizontal gap between depth preview right edge and joystick pad left edge. */
export const PARKOUR_MOBILE_JOYSTICK_HORIZONTAL_GAP = 12;

/** Must match .controls-mobile left/right inset. */
export const MOBILE_CONTROLS_HORIZONTAL_GAP = 12;

/** Must match .controls-mobile bottom gap. */
export const MOBILE_CONTROLS_BOTTOM_GAP = 12;

/** Must match extra gap in .parkour-mobile-controls--dock-panel bottom calc. */
export const MOBILE_JOYSTICK_GAP_ABOVE_PANEL = 12;

/**
 * Position the depth HUD so its vertical center matches the joystick center.
 * Left inset matches the mobile control panel; bottom gap keeps the preview above the panel.
 * (WebGL viewport coordinates, origin bottom-left.)
 */
export function computeParkourMobileDepthLayout({
  panelTopFromBottom,
  joystickCenterFromBottom,
  previewScale = 2,
  minGap = 8,
  leftOffset = MOBILE_CONTROLS_HORIZONTAL_GAP
}) {
  const depthHeightPx = PARKOUR_DEPTH_PROCESSED_HEIGHT * previewScale;
  const depthBottomOffset = Math.ceil(joystickCenterFromBottom - depthHeightPx / 2);
  const bottomGap = Math.max(minGap, Math.round(depthBottomOffset - panelTopFromBottom));

  return {
    depthPreviewScale: previewScale,
    depthPreviewMargin: bottomGap,
    depthPreviewLeftOffset: leftOffset,
    depthPreviewBottomOffset: Math.ceil(panelTopFromBottom + bottomGap)
  };
}

/**
 * Fit depth preview scale so it does not overlap the joystick pad on narrow mobile viewports.
 */
export function computeParkourMobileDepthLayoutWithClearance({
  panelTopFromBottom,
  joystickCenterFromBottom,
  joystickPadLeft,
  preferredScale = 2,
  minGap = 8,
  leftOffset = MOBILE_CONTROLS_HORIZONTAL_GAP,
  horizontalGap = PARKOUR_MOBILE_JOYSTICK_HORIZONTAL_GAP,
  minScale = 1.25
}) {
  let previewScale = preferredScale;
  let layout = computeParkourMobileDepthLayout({
    panelTopFromBottom,
    joystickCenterFromBottom,
    previewScale,
    minGap,
    leftOffset
  });

  for (let attempt = 0; attempt < 4; attempt += 1) {
    const maxScale =
      (joystickPadLeft - horizontalGap - layout.depthPreviewLeftOffset)
      / PARKOUR_DEPTH_PROCESSED_WIDTH;
    const nextScale = Math.max(minScale, Math.min(preferredScale, maxScale));
    if (Math.abs(nextScale - previewScale) < 0.01) {
      break;
    }
    previewScale = nextScale;
    layout = computeParkourMobileDepthLayout({
      panelTopFromBottom,
      joystickCenterFromBottom,
      previewScale,
      minGap,
      leftOffset
    });
  }

  return layout;
}

/** Fallback when host DOM refs are not yet mounted. */
export function computeParkourMobileDepthLayoutFromMetrics({
  panelHeight,
  bottomInset = 0,
  previewScale = 2,
  stickSize = PARKOUR_MOBILE_DOCK_STICK_SIZE,
  controlsBottomGap = MOBILE_CONTROLS_BOTTOM_GAP,
  joystickGapAbovePanel = MOBILE_JOYSTICK_GAP_ABOVE_PANEL,
  viewportWidth = 390,
  leftOffset = MOBILE_CONTROLS_HORIZONTAL_GAP,
  horizontalGap = PARKOUR_MOBILE_JOYSTICK_HORIZONTAL_GAP
}) {
  const panelTopFromBottom = panelHeight + controlsBottomGap + bottomInset;
  const joystickCenterFromBottom = panelTopFromBottom + joystickGapAbovePanel + stickSize / 2;
  const orbitRadius = stickSize / 2 + 20 + 12;
  const padWidth = stickSize + orbitRadius + 20;
  const joystickPadLeft = viewportWidth - MOBILE_CONTROLS_HORIZONTAL_GAP - padWidth;
  return computeParkourMobileDepthLayoutWithClearance({
    panelTopFromBottom,
    joystickCenterFromBottom,
    joystickPadLeft,
    previewScale,
    leftOffset,
    horizontalGap
  });
}
