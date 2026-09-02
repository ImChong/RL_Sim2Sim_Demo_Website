import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { Observations } from '../src/simulation/observationHelpers.js';
import {
  MICRODUCK_CMD_LIMITS,
  computeMicroduckCommandFromKeys,
  isMicroduckMovementKey,
  isMicroduckSitKey
} from '../src/utils/microduckKeyboardCommand.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

test('microduck movement keys and sit key are recognized', () => {
  assert.equal(isMicroduckMovementKey('KeyW'), true);
  assert.equal(isMicroduckMovementKey('KeyY'), false);
  assert.equal(isMicroduckSitKey('KeyY'), true);
});

test('microduck keyboard command respects walk limits', () => {
  const walk = computeMicroduckCommandFromKeys(['KeyW']);
  assert.equal(walk.cmdX > 0, true);
  assert.ok(walk.cmdX <= MICRODUCK_CMD_LIMITS.cmdX.max);

  const sprint = computeMicroduckCommandFromKeys(['KeyW'], true);
  assert.equal(sprint.cmdX, MICRODUCK_CMD_LIMITS.cmdX.max);

  const turn = computeMicroduckCommandFromKeys(['KeyA']);
  assert.equal(turn.cmdYaw > 0, true);
});

test('Command13 writes twist and zero-pads head/body slots', () => {
  const obs = new Observations.Command13();
  assert.equal(obs.size, 13);
  const out = obs.compute({ cmd: [0.2, -0.1, 0.8] });
  assert.equal(out.length, 13);
  assert.ok(Math.abs(out[0] - 0.2) < 1e-6);
  assert.ok(Math.abs(out[1] + 0.1) < 1e-6);
  assert.ok(Math.abs(out[2] - 0.8) < 1e-6);
  for (let i = 3; i < 13; i++) {
    assert.equal(out[i], 0);
  }
});

test('files.json lists the Microduck scene bundle', () => {
  const files = JSON.parse(readFileSync(join(root, 'public/examples/scenes/files.json'), 'utf8'));
  assert.ok(files.includes('microduck/scene.xml'));
  assert.ok(files.includes('microduck/robot_allcollisions.xml'));
  assert.ok(files.some((path) => path.startsWith('microduck/assets/') && path.endsWith('.stl')));
});

test('microduck policy configs share the 61D contract and position control', () => {
  const names = ['walk_policy.json', 'sitstand_policy.json', 'stand_policy.json', 'roulade_policy.json'];
  for (const name of names) {
    const config = JSON.parse(readFileSync(join(root, 'public/examples/checkpoints/microduck', name), 'utf8'));
    assert.equal(config.control_type, 'mujoco_position');
    assert.equal(config.obs_joint_pos_relative, true);
    assert.equal(config.policy_joint_names.length, 14);
    assert.equal(config.obs_config.policy.at(-1).name, 'Command13');
    assert.equal(config.policy_kind, 'microduck');
    const obsNames = config.obs_config.policy.map((entry) => entry.name);
    assert.deepEqual(obsNames, [
      'RootAngVelB',
      'ProjectedGravityB',
      'JointPos',
      'JointVel',
      'PrevActions',
      'Command13'
    ]);
  }
});
