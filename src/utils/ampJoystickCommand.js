import { AMP_CMD_LIMITS, AMP_CMD_SPRINT, AMP_CMD_WALK } from './ampKeyboardCommand.js';

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
export function computeAmpCommandFromMoveStick(normX, normY, sprint = false) {
  const x = applyJoystickDeadzone(normX);
  const y = applyJoystickDeadzone(normY);
  const magnitude = Math.hypot(x, y);
  const useSprint = sprint || magnitude >= AMP_JOYSTICK_SPRINT_THRESHOLD;
  const speed = useSprint ? AMP_CMD_SPRINT : AMP_CMD_WALK;

  let cmdX = 0;
  if (y > 0) {
    cmdX = y * speed.vx;
  } else if (y < 0) {
    cmdX = y * speed.vxBack;
  }

  const cmdYaw = -x * speed.yaw;

  return {
    cmdX: clamp(cmdX, AMP_CMD_LIMITS.cmdX.min, AMP_CMD_LIMITS.cmdX.max),
    cmdYaw: clamp(cmdYaw, AMP_CMD_LIMITS.cmdYaw.min, AMP_CMD_LIMITS.cmdYaw.max),
    sprint: useSprint
  };
}

/** direction: +1 left, -1 right, 0 release. */
export function computeAmpStrafeFromStick(direction, sprint = false, strafeAlwaysMax = false) {
  if (!direction) {
    return 0;
  }
  const speed = sprint || strafeAlwaysMax ? AMP_CMD_SPRINT : AMP_CMD_WALK;
  const cmdY = direction * speed.vy;
  return clamp(cmdY, AMP_CMD_LIMITS.cmdY.min, AMP_CMD_LIMITS.cmdY.max);
}

export function computeAmpCommandFromJoystick(
  moveNormX,
  moveNormY,
  strafeDirection,
  sprint = false,
  strafeAlwaysMax = false
) {
  const move = computeAmpCommandFromMoveStick(moveNormX, moveNormY, sprint);
  const cmdY = computeAmpStrafeFromStick(
    strafeDirection,
    move.sprint || sprint,
    strafeAlwaysMax
  );
  return {
    cmdX: move.cmdX,
    cmdY,
    cmdYaw: move.cmdYaw
  };
}

/** Approximate stick pose from velocity command (for keyboard / slider → joystick sync). */
export function stickVisualFromAmpCommand(cmdX, cmdY, cmdYaw) {
  const absX = Math.abs(cmdX);
  const absStrafe = Math.abs(cmdY);
  const absYaw = Math.abs(cmdYaw);
  const useSprint =
    absX >= AMP_CMD_SPRINT.vx * AMP_JOYSTICK_SPRINT_THRESHOLD
    || absStrafe >= AMP_CMD_SPRINT.vy * AMP_JOYSTICK_SPRINT_THRESHOLD
    || absYaw >= AMP_CMD_SPRINT.yaw * AMP_JOYSTICK_SPRINT_THRESHOLD
    || (cmdX < 0 && absX >= AMP_CMD_SPRINT.vxBack * AMP_JOYSTICK_SPRINT_THRESHOLD);
  const speed = useSprint ? AMP_CMD_SPRINT : AMP_CMD_WALK;

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
