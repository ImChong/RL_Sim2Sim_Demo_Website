import {
  AMP_JOYSTICK_DEADZONE,
  AMP_JOYSTICK_SPRINT_THRESHOLD,
  applyJoystickDeadzone
} from './ampJoystickCommand.js';

/** Minimum stick deflection before a parkour key is considered pressed. */
export const PARKOUR_JOYSTICK_AXIS_THRESHOLD = 0.2;

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
export function stickVisualFromParkourKeys({ w, a, d }) {
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
  if (mag > 1) {
    normX /= mag;
    normY /= mag;
  }
  return { normX, normY };
}
