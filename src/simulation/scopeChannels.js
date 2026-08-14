/**
 * Scope channel palette + capacity limits.
 *
 * Kept in a standalone module because the pipeline node builders need the
 * channel cap while signalScope.js already imports those builders — importing
 * the constant from signalScope.js would create a circular import.
 */

/**
 * Upper bound of simultaneously plotted curves. A humanoid joint node expands
 * to one curve per joint (23 / 29 for G1), so the cap has to stay well above
 * the joint count while still bounding memory and canvas work.
 */
export const MAX_SCOPE_CHANNELS = 64;

export const SCOPE_CHANNEL_COLORS = [
  '#00d992',
  '#4cb3d4',
  '#f59e0b',
  '#ef4444',
  '#a78bfa',
  '#22d3ee',
  '#f472b6',
  '#84cc16'
];

// Golden angle keeps consecutive generated hues far apart.
const GOLDEN_ANGLE_DEG = 137.508;

/**
 * Stable color for the n-th channel. The curated palette covers the first
 * channels; beyond it hues are generated so that a full joint node still gets
 * visually separable curves.
 * @param {number} index
 */
export function scopeChannelColor(index) {
  const i = Number.isInteger(index) && index >= 0 ? index : 0;
  if (i < SCOPE_CHANNEL_COLORS.length) {
    return SCOPE_CHANNEL_COLORS[i];
  }
  const step = i - SCOPE_CHANNEL_COLORS.length;
  const hue = (24 + step * GOLDEN_ANGLE_DEG) % 360;
  const saturation = 62 + (step % 3) * 10;
  const lightness = 56 + (step % 2) * 10;
  return `hsl(${hue.toFixed(1)}, ${saturation}%, ${lightness}%)`;
}
