import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { AMP_CMD_SPRINT, AMP_CMD_WALK } from '../src/utils/ampKeyboardCommand.js';
import {
  applyJoystickDeadzone,
  computeAmpCommandFromJoystick,
  computeAmpCommandFromMoveStick,
  computeAmpYawFromStick
} from '../src/utils/ampJoystickCommand.js';

describe('ampJoystickCommand', () => {
  test('applyJoystickDeadzone zeros small input', () => {
    assert.equal(applyJoystickDeadzone(0.05), 0);
    assert.ok(applyJoystickDeadzone(0.5) > 0);
  });

  test('stick up maps to forward velocity', () => {
    const cmd = computeAmpCommandFromMoveStick(0, 0.5, false);
    assert.ok(cmd.cmdX > 0);
    assert.ok(Math.abs(cmd.cmdY) < 1e-6);
    assert.equal(cmd.sprint, false);
  });

  test('stick right maps to negative lateral velocity', () => {
    const cmd = computeAmpCommandFromMoveStick(0.5, 0, false);
    assert.equal(cmd.cmdX, 0);
    assert.ok(cmd.cmdY < 0);
    assert.equal(cmd.sprint, false);
  });

  test('full deflection enables sprint speeds', () => {
    const cmd = computeAmpCommandFromMoveStick(0, 1, true);
    assert.equal(cmd.sprint, true);
    assert.ok(cmd.cmdX > AMP_CMD_WALK.vx);
  });

  test('yaw buttons map to left/right turn rates', () => {
    assert.equal(computeAmpYawFromStick(1, false), AMP_CMD_WALK.yaw);
    assert.equal(computeAmpYawFromStick(-1, false), -AMP_CMD_WALK.yaw);
    assert.equal(computeAmpYawFromStick(0, false), 0);
  });

  test('mobile yaw buttons always use maximum turn rate', () => {
    assert.equal(computeAmpYawFromStick(1, false, true), AMP_CMD_SPRINT.yaw);
    assert.equal(computeAmpYawFromStick(-1, false, true), -AMP_CMD_SPRINT.yaw);
  });

  test('combines move stick and yaw hold', () => {
    const cmd = computeAmpCommandFromJoystick(0, 0.5, 1, false);
    assert.ok(cmd.cmdX > 0);
    assert.equal(cmd.cmdYaw, AMP_CMD_WALK.yaw);
  });

  test('mobile joystick uses max yaw while move stick stays at walk speed', () => {
    const cmd = computeAmpCommandFromJoystick(0, 0.5, 1, false, true);
    assert.ok(cmd.cmdX > 0);
    assert.ok(cmd.cmdX < AMP_CMD_SPRINT.vx);
    assert.equal(cmd.cmdYaw, AMP_CMD_SPRINT.yaw);
  });
});
