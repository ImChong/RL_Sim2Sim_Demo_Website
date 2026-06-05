import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { AMP_CMD_SPRINT, AMP_CMD_WALK } from '../src/utils/ampKeyboardCommand.js';
import {
  applyJoystickDeadzone,
  computeAmpCommandFromJoystick,
  computeAmpCommandFromMoveStick,
  computeAmpStrafeFromStick,
  stickVisualFromAmpCommand
} from '../src/utils/ampJoystickCommand.js';

describe('ampJoystickCommand', () => {
  test('applyJoystickDeadzone zeros small input', () => {
    assert.equal(applyJoystickDeadzone(0.05), 0);
    assert.ok(applyJoystickDeadzone(0.5) > 0);
  });

  test('stick up maps to forward velocity', () => {
    const cmd = computeAmpCommandFromMoveStick(0, 0.5, false);
    assert.ok(cmd.cmdX > 0);
    assert.ok(Math.abs(cmd.cmdYaw) < 1e-6);
    assert.equal(cmd.sprint, false);
  });

  test('stick right maps to negative yaw rate', () => {
    const cmd = computeAmpCommandFromMoveStick(0.5, 0, false);
    assert.equal(cmd.cmdX, 0);
    assert.ok(cmd.cmdYaw < 0);
    assert.equal(cmd.sprint, false);
  });

  test('full deflection enables sprint speeds', () => {
    const cmd = computeAmpCommandFromMoveStick(0, 1, true);
    assert.equal(cmd.sprint, true);
    assert.ok(cmd.cmdX > AMP_CMD_WALK.vx);
  });

  test('strafe buttons map to left/right lateral velocity', () => {
    assert.equal(computeAmpStrafeFromStick(1, false), AMP_CMD_WALK.vy);
    assert.equal(computeAmpStrafeFromStick(-1, false), -AMP_CMD_WALK.vy);
    assert.equal(computeAmpStrafeFromStick(0, false), 0);
  });

  test('mobile strafe buttons always use maximum lateral speed', () => {
    assert.equal(computeAmpStrafeFromStick(1, false, true), AMP_CMD_SPRINT.vy);
    assert.equal(computeAmpStrafeFromStick(-1, false, true), -AMP_CMD_SPRINT.vy);
  });

  test('combines move stick and strafe hold', () => {
    const cmd = computeAmpCommandFromJoystick(0, 0.5, 1, false);
    assert.ok(cmd.cmdX > 0);
    assert.equal(cmd.cmdY, AMP_CMD_WALK.vy);
    assert.ok(Math.abs(cmd.cmdYaw) < 1e-6);
  });

  test('mobile joystick uses max strafe while move stick stays at walk speed', () => {
    const cmd = computeAmpCommandFromJoystick(0, 0.5, 1, false, true);
    assert.ok(cmd.cmdX > 0);
    assert.ok(cmd.cmdX < AMP_CMD_SPRINT.vx);
    assert.equal(cmd.cmdY, AMP_CMD_SPRINT.vy);
    assert.ok(Math.abs(cmd.cmdYaw) < 1e-6);
  });

  test('stickVisualFromAmpCommand mirrors forward walk command', () => {
    const visual = stickVisualFromAmpCommand(AMP_CMD_WALK.vx, 0, 0);
    assert.ok(visual.normY > 0.5);
    assert.equal(visual.normX, 0);
    assert.equal(visual.yawDirection, 0);
  });

  test('stickVisualFromAmpCommand mirrors strafe left', () => {
    const visual = stickVisualFromAmpCommand(0, AMP_CMD_SPRINT.vy, 0);
    assert.equal(visual.yawDirection, 1);
  });

  test('stickVisualFromAmpCommand mirrors yaw left', () => {
    const visual = stickVisualFromAmpCommand(0, 0, AMP_CMD_SPRINT.yaw);
    assert.ok(visual.normX < -0.5);
    assert.equal(visual.yawDirection, 0);
  });
});
