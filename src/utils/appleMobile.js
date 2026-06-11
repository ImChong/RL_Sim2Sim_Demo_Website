/**
 * Detect iPhone / iPad / iPod (including iPadOS desktop UA).
 * Used to defer the host MuJoCo stack on memory-constrained Apple mobile WebKit.
 */
export function isAppleMobileDevice(navigatorLike = globalThis.navigator) {
  if (!navigatorLike) {
    return false;
  }
  const ua = navigatorLike.userAgent ?? '';
  if (/iPad|iPhone|iPod/.test(ua)) {
    return true;
  }
  const platform = navigatorLike.platform ?? '';
  return platform === 'MacIntel' && (navigatorLike.maxTouchPoints ?? 0) > 1;
}

/** Pause after tearing down WebGL/WASM so WebKit can reclaim memory before Parkour loads. */
export const PARKOUR_IOS_MOUNT_DELAY_MS = 350;

/**
 * Perceptive BFM needs desktop WebGL + threaded ORT; upstream blocks mobile viewports.
 * Matches acodedog.github.io/perceptive-bfm/demo.html (@media max-width: 768px).
 */
export function isBfmDesktopRequired(
  navigatorLike = globalThis.navigator,
  windowLike = globalThis
) {
  if (isAppleMobileDevice(navigatorLike)) {
    return true;
  }
  const width = windowLike?.innerWidth;
  return typeof width === 'number' && width < 769;
}
