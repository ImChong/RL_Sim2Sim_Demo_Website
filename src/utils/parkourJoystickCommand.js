import {
  AMP_JOYSTICK_DEADZONE,
  AMP_JOYSTICK_SPRINT_THRESHOLD,
  applyJoystickDeadzone
} from './ampJoystickCommand.js';

/** Minimum stick deflection before a parkour key is considered pressed. */
export const PARKOUR_JOYSTICK_AXIS_THRESHOLD = 0.2;

/** Keyboard / virtual-key sync: partial deflection for normal speed. */
export const PARKOUR_JOYSTICK_NORMAL_VISUAL_SCALE = 0.5;

/** Keyboard / virtual-key sync: full deflection for Shift / sprint. */
export const PARKOUR_JOYSTICK_HIGH_SPEED_VISUAL_SCALE = 1;

/**
 * Map a 2D stick (-1..1) to G1 parkour virtual keys.
 * Up = forward (W), left/right = turn in place (A/D), down = no command.
 */
export function computeParkourKeysFromStick(normX, normY) {
  const x = applyJoystickDeadzone(normX);
  const y = applyJoystickDeadzone(normY);
  const forwardY = Math.max(0, y);
  const threshold = PARKOUR_JOYSTICK_AXIS_THRESHOLD;

  const w = forwardY >= threshold;
  const a = x <= -threshold;
  const d = x >= threshold;
  const active = w || a || d;
  const magnitude = Math.hypot(x, forwardY);
  const highSpeed = active && magnitude >= AMP_JOYSTICK_SPRINT_THRESHOLD;

  return { w, a, d, highSpeed, active };
}

/** Approximate stick pose from virtual key state (for visual sync). */
export function stickVisualFromParkourKeys({ w, a, d, highSpeed = false }) {
  let normX = 0;
  let normY = 0;
  if (a) {
    normX = -1;
  } else if (d) {
    normX = 1;
  }
  if (w) {
    normY = 1;
  }
  const mag = Math.hypot(normX, normY);
  if (mag > 0) {
    const scale = highSpeed
      ? PARKOUR_JOYSTICK_HIGH_SPEED_VISUAL_SCALE
      : PARKOUR_JOYSTICK_NORMAL_VISUAL_SCALE;
    normX = (normX / mag) * scale;
    normY = (normY / mag) * scale;
  }
  return { normX, normY, highSpeed: Boolean(highSpeed && (w || a || d)) };
}
