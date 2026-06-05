/** Slider limits in Demo.vue for G1 AMP velocity commands. */
export const AMP_CMD_LIMITS = {
  cmdX: { min: -1.5, max: 3.0 },
  cmdY: { min: -1.0, max: 1.0 },
  cmdYaw: { min: -1.57, max: 1.57 }
};

/** Moderate walk / strafe / in-place turn speeds (m/s, rad/s). */
export const AMP_CMD_WALK = {
  vx: 0.8,
  vxBack: 0.6,
  vy: 0.35,
  yaw: 0.5
};

/** Maximum command magnitudes (matches slider maxima). */
export const AMP_CMD_SPRINT = {
  vx: AMP_CMD_LIMITS.cmdX.max,
  vxBack: -AMP_CMD_LIMITS.cmdX.min,
  vy: AMP_CMD_LIMITS.cmdY.max,
  yaw: AMP_CMD_LIMITS.cmdYaw.max
};

const AMP_MOVEMENT_KEY_CODES = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyQ',
  'KeyE'
]);

const AMP_KNOCKDOWN_KEY_CODES = new Set(['Enter', 'NumpadEnter']);

export function isAmpMovementKey(code) {
  return AMP_MOVEMENT_KEY_CODES.has(code);
}

export function isAmpKnockdownKey(code) {
  return AMP_KNOCKDOWN_KEY_CODES.has(code);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Map held movement keys to [vx, vy, yaw_rate] for the AMP policy.
 * Body frame: +X forward, +Y left, +yaw left (CCW).
 */
export function computeAmpCommandFromKeys(keys, shiftKey = false) {
  const held = keys instanceof Set ? keys : new Set(keys);
  const speed = shiftKey ? AMP_CMD_SPRINT : AMP_CMD_WALK;

  let cmdX = 0;
  if (held.has('KeyW') && !held.has('KeyS')) {
    cmdX = speed.vx;
  } else if (held.has('KeyS') && !held.has('KeyW')) {
    cmdX = -speed.vxBack;
  }

  let cmdY = 0;
  if (held.has('KeyQ') && !held.has('KeyD')) {
    cmdY = speed.vy;
  } else if (held.has('KeyD') && !held.has('KeyQ')) {
    cmdY = -speed.vy;
  }

  let cmdYaw = 0;
  if (held.has('KeyA') && !held.has('KeyE')) {
    cmdYaw = speed.yaw;
  } else if (held.has('KeyE') && !held.has('KeyA')) {
    cmdYaw = -speed.yaw;
  }

  return {
    cmdX: clamp(cmdX, AMP_CMD_LIMITS.cmdX.min, AMP_CMD_LIMITS.cmdX.max),
    cmdY: clamp(cmdY, AMP_CMD_LIMITS.cmdY.min, AMP_CMD_LIMITS.cmdY.max),
    cmdYaw: clamp(cmdYaw, AMP_CMD_LIMITS.cmdYaw.min, AMP_CMD_LIMITS.cmdYaw.max)
  };
}

/** UI rows for the AMP keyboard hint panel (labels resolved in Demo.vue). */
export const AMP_KEYBOARD_CONTROL_ROWS = [
  { key: 'W', labelKey: 'ampKeyForward' },
  { key: 'S', labelKey: 'ampKeyBackward' },
  { key: 'A', labelKey: 'ampKeyRotateLeft' },
  { key: 'D', labelKey: 'ampKeyRotateRight' },
  { key: 'Q', labelKey: 'ampKeyLeft' },
  { key: 'E', labelKey: 'ampKeyRight' },
  { key: 'SHIFT', labelKey: 'ampKeySprint' },
  { key: 'ENTER', labelKey: 'ampKeyKnockdown' }
];
