import { AMP_CMD_LIMITS, AMP_CMD_SPRINT, AMP_CMD_WALK } from './ampKeyboardCommand.js';

/**
 * Speed / limit table the stick math runs on. Defaults to AMP; Microduck passes
 * MICRODUCK_JOYSTICK_PROFILE so the same joystick drives its slower gaits.
 */
export const AMP_JOYSTICK_PROFILE = {
  limits: AMP_CMD_LIMITS,
  walk: AMP_CMD_WALK,
  sprint: AMP_CMD_SPRINT
};

export const AMP_JOYSTICK_DEADZONE = 0.12;
export const AMP_JOYSTICK_SPRINT_THRESHOLD = 0.85;

/** Keyboard / slider sync: partial deflection for normal speed. */
export const AMP_JOYSTICK_NORMAL_VISUAL_SCALE = 0.5;

/** Keyboard / slider sync: full deflection for Shift / sprint. */
export const AMP_JOYSTICK_HIGH_SPEED_VISUAL_SCALE = 1;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/** Remove small drift around the stick center. */
export function applyJoystickDeadzone(value, zone = AMP_JOYSTICK_DEADZONE) {
  const abs = Math.abs(value);
  if (abs < zone) {
    return 0;
  }
  const sign = Math.sign(value);
  return (sign * (abs - zone)) / (1 - zone);
}

/**
 * Map a 2D stick (-1..1) to planar velocity.
 * Stick up (+normY) = forward (+cmdX); stick right (+normX) = turn right (-cmdYaw).
 */
export function computeAmpCommandFromMoveStick(
  normX,
  normY,
  sprint = false,
  profile = AMP_JOYSTICK_PROFILE
) {
  const x = applyJoystickDeadzone(normX);
  const y = applyJoystickDeadzone(normY);
  const magnitude = Math.hypot(x, y);
  const useSprint = sprint || magnitude >= AMP_JOYSTICK_SPRINT_THRESHOLD;
  const speed = useSprint ? profile.sprint : profile.walk;

  let cmdX = 0;
  if (y > 0) {
    cmdX = y * speed.vx;
  } else if (y < 0) {
    cmdX = y * speed.vxBack;
  }

  const cmdYaw = -x * speed.yaw;

  return {
    cmdX: clamp(cmdX, profile.limits.cmdX.min, profile.limits.cmdX.max),
    cmdYaw: clamp(cmdYaw, profile.limits.cmdYaw.min, profile.limits.cmdYaw.max),
    sprint: useSprint
  };
}

/** direction: +1 left, -1 right, 0 release. */
export function computeAmpStrafeFromStick(
  direction,
  sprint = false,
  strafeAlwaysMax = false,
  profile = AMP_JOYSTICK_PROFILE
) {
  if (!direction) {
    return 0;
  }
  const speed = sprint || strafeAlwaysMax ? profile.sprint : profile.walk;
  const cmdY = direction * speed.vy;
  return clamp(cmdY, profile.limits.cmdY.min, profile.limits.cmdY.max);
}

export function computeAmpCommandFromJoystick(
  moveNormX,
  moveNormY,
  strafeDirection,
  sprint = false,
  strafeAlwaysMax = false,
  profile = AMP_JOYSTICK_PROFILE
) {
  const move = computeAmpCommandFromMoveStick(moveNormX, moveNormY, sprint, profile);
  const cmdY = computeAmpStrafeFromStick(
    strafeDirection,
    move.sprint || sprint,
    strafeAlwaysMax,
    profile
  );
  return {
    cmdX: move.cmdX,
    cmdY,
    cmdYaw: move.cmdYaw
  };
}

/** Approximate stick pose from velocity command (for keyboard / slider → joystick sync). */
export function stickVisualFromAmpCommand(cmdX, cmdY, cmdYaw, profile = AMP_JOYSTICK_PROFILE) {
  const absX = Math.abs(cmdX);
  const absStrafe = Math.abs(cmdY);
  const absYaw = Math.abs(cmdYaw);
  const useSprint =
    absX >= profile.sprint.vx * AMP_JOYSTICK_SPRINT_THRESHOLD
    || absStrafe >= profile.sprint.vy * AMP_JOYSTICK_SPRINT_THRESHOLD
    || absYaw >= profile.sprint.yaw * AMP_JOYSTICK_SPRINT_THRESHOLD
    || (cmdX < 0 && absX >= profile.sprint.vxBack * AMP_JOYSTICK_SPRINT_THRESHOLD);
  const speed = useSprint ? profile.sprint : profile.walk;

  let normY = 0;
  if (cmdX > 1e-4) {
    normY = cmdX / speed.vx;
  } else if (cmdX < -1e-4) {
    normY = cmdX / speed.vxBack;
  }

  let normX = 0;
  if (absYaw > 1e-4) {
    normX = -cmdYaw / speed.yaw;
  }

  const mag = Math.hypot(normX, normY);
  if (mag > 0) {
    const scale = useSprint
      ? AMP_JOYSTICK_HIGH_SPEED_VISUAL_SCALE
      : AMP_JOYSTICK_NORMAL_VISUAL_SCALE;
    normX = (normX / mag) * scale;
    normY = (normY / mag) * scale;
  }

  let strafeDirection = 0;
  if (cmdY > 1e-4) {
    strafeDirection = 1;
  } else if (cmdY < -1e-4) {
    strafeDirection = -1;
  }

  return { normX, normY, yawDirection: strafeDirection };
}
