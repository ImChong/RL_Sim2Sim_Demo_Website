/** Slider limits matching microduck_rl infer_policy walking ranges. */
export const MICRODUCK_CMD_LIMITS = {
  cmdX: { min: -0.3, max: 0.3 },
  cmdY: { min: -0.2, max: 0.2 },
  cmdYaw: { min: -1.5, max: 1.5 }
};

/** Moderate walk / strafe / in-place turn speeds (m/s, rad/s). */
export const MICRODUCK_CMD_WALK = {
  vx: 0.2,
  vxBack: 0.15,
  vy: 0.12,
  yaw: 0.8
};

/** Maximum command magnitudes (matches slider maxima). */
export const MICRODUCK_CMD_SPRINT = {
  vx: MICRODUCK_CMD_LIMITS.cmdX.max,
  vxBack: -MICRODUCK_CMD_LIMITS.cmdX.min,
  vy: MICRODUCK_CMD_LIMITS.cmdY.max,
  yaw: MICRODUCK_CMD_LIMITS.cmdYaw.max
};

const MICRODUCK_MOVEMENT_KEY_CODES = new Set([
  'KeyW',
  'KeyA',
  'KeyS',
  'KeyD',
  'KeyQ',
  'KeyE'
]);

export function isMicroduckMovementKey(code) {
  return MICRODUCK_MOVEMENT_KEY_CODES.has(code);
}

export function isMicroduckSitKey(code) {
  return code === 'KeyY';
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Map held movement keys to [vx, vy, yaw_rate] for the Microduck walking policy.
 * Body frame: +X forward, +Y left, +yaw left (CCW).
 */
export function computeMicroduckCommandFromKeys(keys, shiftKey = false) {
  const held = keys instanceof Set ? keys : new Set(keys);
  const speed = shiftKey ? MICRODUCK_CMD_SPRINT : MICRODUCK_CMD_WALK;

  let cmdX = 0;
  if (held.has('KeyW') && !held.has('KeyS')) {
    cmdX = speed.vx;
  } else if (held.has('KeyS') && !held.has('KeyW')) {
    cmdX = -speed.vxBack;
  }

  let cmdY = 0;
  if (held.has('KeyQ') && !held.has('KeyE')) {
    cmdY = speed.vy;
  } else if (held.has('KeyE') && !held.has('KeyQ')) {
    cmdY = -speed.vy;
  }

  let cmdYaw = 0;
  if (held.has('KeyA') && !held.has('KeyD')) {
    cmdYaw = speed.yaw;
  } else if (held.has('KeyD') && !held.has('KeyA')) {
    cmdYaw = -speed.yaw;
  }

  return {
    cmdX: clamp(cmdX, MICRODUCK_CMD_LIMITS.cmdX.min, MICRODUCK_CMD_LIMITS.cmdX.max),
    cmdY: clamp(cmdY, MICRODUCK_CMD_LIMITS.cmdY.min, MICRODUCK_CMD_LIMITS.cmdY.max),
    cmdYaw: clamp(cmdYaw, MICRODUCK_CMD_LIMITS.cmdYaw.min, MICRODUCK_CMD_LIMITS.cmdYaw.max)
  };
}

/** UI rows for the Microduck keyboard hint panel (labels resolved in Demo.vue). */
export const MICRODUCK_KEYBOARD_CONTROL_ROWS = [
  { key: 'W', labelKey: 'microduckKeyForward' },
  { key: 'S', labelKey: 'microduckKeyBackward' },
  { key: 'A', labelKey: 'microduckKeyRotateLeft' },
  { key: 'D', labelKey: 'microduckKeyRotateRight' },
  { key: 'Q', labelKey: 'microduckKeyLeft' },
  { key: 'E', labelKey: 'microduckKeyRight' },
  { key: 'SHIFT', labelKey: 'microduckKeySprint' },
  { key: 'Y', labelKey: 'microduckKeySit' }
];
