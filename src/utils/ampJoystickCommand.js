import { AMP_CMD_LIMITS, AMP_CMD_SPRINT, AMP_CMD_WALK } from './ampKeyboardCommand.js';

export const AMP_JOYSTICK_DEADZONE = 0.12;
export const AMP_JOYSTICK_SPRINT_THRESHOLD = 0.85;

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
 * Stick up (+normY) = forward (+cmdX); stick right (+normX) = strafe right (-cmdY).
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

  const cmdY = -x * speed.vy;

  return {
    cmdX: clamp(cmdX, AMP_CMD_LIMITS.cmdX.min, AMP_CMD_LIMITS.cmdX.max),
    cmdY: clamp(cmdY, AMP_CMD_LIMITS.cmdY.min, AMP_CMD_LIMITS.cmdY.max),
    sprint: useSprint
  };
}

/** direction: +1 left (CCW), -1 right (CW), 0 release. */
export function computeAmpYawFromStick(direction, sprint = false, yawAlwaysMax = false) {
  if (!direction) {
    return 0;
  }
  const speed = sprint || yawAlwaysMax ? AMP_CMD_SPRINT : AMP_CMD_WALK;
  const cmdYaw = direction * speed.yaw;
  return clamp(cmdYaw, AMP_CMD_LIMITS.cmdYaw.min, AMP_CMD_LIMITS.cmdYaw.max);
}

export function computeAmpCommandFromJoystick(
  moveNormX,
  moveNormY,
  yawDirection,
  sprint = false,
  yawAlwaysMax = false
) {
  const move = computeAmpCommandFromMoveStick(moveNormX, moveNormY, sprint);
  const cmdYaw = computeAmpYawFromStick(
    yawDirection,
    move.sprint || sprint,
    yawAlwaysMax
  );
  return {
    cmdX: move.cmdX,
    cmdY: move.cmdY,
    cmdYaw
  };
}
