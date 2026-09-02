import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import {
  AMP_CMD_LIMITS,
  AMP_CMD_SPRINT,
  AMP_CMD_WALK,
  computeAmpCommandFromKeys,
  isAmpKnockdownKey,
  isAmpMovementKey,
  shouldIgnoreAmpKeyboardTarget
} from '../src/utils/ampKeyboardCommand.js';

describe('ampKeyboardCommand', () => {
  test('isAmpMovementKey recognizes WASD/QE', () => {
    assert.equal(isAmpMovementKey('KeyW'), true);
    assert.equal(isAmpMovementKey('KeyQ'), true);
    assert.equal(isAmpMovementKey('Space'), false);
  });

  test('isAmpKnockdownKey recognizes Enter and NumpadEnter', () => {
    assert.equal(isAmpKnockdownKey('Enter'), true);
    assert.equal(isAmpKnockdownKey('NumpadEnter'), true);
    assert.equal(isAmpKnockdownKey('KeyW'), false);
  });

  test('walk forward on W', () => {
    assert.deepEqual(computeAmpCommandFromKeys(new Set(['KeyW']), false), {
      cmdX: AMP_CMD_WALK.vx,
      cmdY: 0,
      cmdYaw: 0
    });
  });

  test('sprint forward on Shift+W', () => {
    assert.deepEqual(computeAmpCommandFromKeys(new Set(['KeyW']), true), {
      cmdX: AMP_CMD_SPRINT.vx,
      cmdY: 0,
      cmdYaw: 0
    });
  });

  test('strafe and yaw signs match body frame (+Y left, +yaw left)', () => {
    assert.equal(computeAmpCommandFromKeys(new Set(['KeyQ']), false).cmdY, AMP_CMD_WALK.vy);
    assert.equal(computeAmpCommandFromKeys(new Set(['KeyE']), false).cmdY, -AMP_CMD_WALK.vy);
    assert.equal(computeAmpCommandFromKeys(new Set(['KeyA']), false).cmdYaw, AMP_CMD_WALK.yaw);
    assert.equal(computeAmpCommandFromKeys(new Set(['KeyD']), false).cmdYaw, -AMP_CMD_WALK.yaw);
  });

  test('opposing keys cancel', () => {
    assert.deepEqual(computeAmpCommandFromKeys(new Set(['KeyW', 'KeyS']), false), {
      cmdX: 0,
      cmdY: 0,
      cmdYaw: 0
    });
    assert.deepEqual(computeAmpCommandFromKeys(new Set(['KeyQ', 'KeyE']), true), {
      cmdX: 0,
      cmdY: 0,
      cmdYaw: 0
    });
  });

  test('commands clamp to slider limits', () => {
    const cmd = computeAmpCommandFromKeys(new Set(['KeyW', 'KeyQ', 'KeyA']), true);
    assert.equal(cmd.cmdX, AMP_CMD_LIMITS.cmdX.max);
    assert.equal(cmd.cmdY, AMP_CMD_LIMITS.cmdY.max);
    assert.equal(cmd.cmdYaw, AMP_CMD_LIMITS.cmdYaw.max);
  });

  test('policy v-select and readonly inputs do not swallow WASD', () => {
    assert.equal(shouldIgnoreAmpKeyboardTarget({ tagName: 'TEXTAREA' }), true);
    assert.equal(shouldIgnoreAmpKeyboardTarget({ tagName: 'INPUT', readOnly: false }), true);
    assert.equal(shouldIgnoreAmpKeyboardTarget({ tagName: 'INPUT', readOnly: true }), false);
    assert.equal(
      shouldIgnoreAmpKeyboardTarget({
        tagName: 'INPUT',
        readOnly: false,
        closest: (sel) => (sel === '[data-test="policy-select"]' ? {} : null)
      }),
      false
    );
    assert.equal(shouldIgnoreAmpKeyboardTarget({ tagName: 'CANVAS' }), false);
  });
});
