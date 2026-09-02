import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { Observations } from '../src/simulation/observationHelpers.js';
import {
  MICRODUCK_CMD_LIMITS,
  MICRODUCK_CMD_WALK,
  MICRODUCK_JOYSTICK_PROFILE,
  computeMicroduckCommandFromKeys,
  isMicroduckMovementKey,
  isMicroduckSitKey
} from '../src/utils/microduckKeyboardCommand.js';
import {
  AMP_JOYSTICK_PROFILE,
  computeAmpCommandFromJoystick,
  stickVisualFromAmpCommand
} from '../src/utils/ampJoystickCommand.js';
import {
  MICRODUCK_DEFAULT_STATE,
  MICRODUCK_POLICY_VALUE,
  MICRODUCK_SCENE_PATH,
  MICRODUCK_STATES,
  findMicroduckState,
  microduckDefaultPolicyPaths,
  microduckStateOrDefault
} from '../src/utils/microduckStateMachine.js';

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

test('microduck state machine exposes one dropdown value and four states', () => {
  assert.equal(MICRODUCK_POLICY_VALUE, 'microduck');
  assert.deepEqual(
    MICRODUCK_STATES.map((state) => state.value),
    ['walk', 'stand', 'sitstand', 'roulade']
  );
  for (const state of MICRODUCK_STATES) {
    assert.ok(state.policyPath.endsWith('.json'));
    assert.ok(state.onnxPath.endsWith('.onnx'));
    assert.ok(state.labelKey && state.hintKey && state.icon);
  }
});

test('microduck state lookup falls back to the default walking state', () => {
  assert.equal(findMicroduckState('roulade')?.commandMode, 'zeros');
  assert.equal(findMicroduckState('nope'), null);
  assert.equal(microduckStateOrDefault('nope').value, MICRODUCK_DEFAULT_STATE);
  assert.equal(microduckStateOrDefault(undefined).value, 'walk');
});

test('roulade is the only transient state and returns to walk', () => {
  const transient = MICRODUCK_STATES.filter((state) => state.autoNext);
  assert.equal(transient.length, 1);
  assert.equal(transient[0].value, 'roulade');
  assert.equal(transient[0].autoNext, 'walk');
  assert.ok(transient[0].autoNextSimSeconds > 0);
});

test('the single microduck dropdown entry defaults to the walking policy', () => {
  const paths = microduckDefaultPolicyPaths();
  const walk = findMicroduckState('walk');
  assert.equal(paths.policyPath, walk.policyPath);
  assert.equal(paths.onnxPath, walk.onnxPath);
  assert.equal(paths.scenePath, MICRODUCK_SCENE_PATH);
});

test('every microduck state points at a shipped policy config and onnx', () => {
  for (const state of MICRODUCK_STATES) {
    const policyFile = join(root, 'public', state.policyPath.replace('./', ''));
    const config = JSON.parse(readFileSync(policyFile, 'utf8'));
    assert.equal(config.policy_kind, 'microduck');
    readFileSync(join(root, 'public', state.onnxPath.replace('./', '')));
  }
});

test('the shared joystick honours the Microduck speed profile', () => {
  const full = computeAmpCommandFromJoystick(0, 1, 0, false, true, MICRODUCK_JOYSTICK_PROFILE);
  assert.equal(full.cmdX, MICRODUCK_CMD_LIMITS.cmdX.max);

  const half = computeAmpCommandFromJoystick(0, 0.5, 0, false, true, MICRODUCK_JOYSTICK_PROFILE);
  assert.ok(half.cmdX > 0 && half.cmdX < MICRODUCK_CMD_LIMITS.cmdX.max);

  const strafe = computeAmpCommandFromJoystick(0, 0, 1, false, true, MICRODUCK_JOYSTICK_PROFILE);
  assert.equal(strafe.cmdY, MICRODUCK_CMD_LIMITS.cmdY.max);

  const turn = computeAmpCommandFromJoystick(1, 0, 0, false, true, MICRODUCK_JOYSTICK_PROFILE);
  assert.equal(turn.cmdYaw, MICRODUCK_CMD_LIMITS.cmdYaw.min);

  // 同样的推杆量在 AMP 档位上应该更快，说明 profile 真的生效了。
  const ampFull = computeAmpCommandFromJoystick(0, 1, 0, false, true, AMP_JOYSTICK_PROFILE);
  assert.ok(ampFull.cmdX > full.cmdX);
});

test('slider / keyboard commands sync the stick under the Microduck profile', () => {
  const visual = stickVisualFromAmpCommand(
    MICRODUCK_CMD_WALK.vx,
    0,
    0,
    MICRODUCK_JOYSTICK_PROFILE
  );
  assert.ok(visual.normY > 0);
  assert.equal(visual.normX, 0);

  const strafeVisual = stickVisualFromAmpCommand(0, -0.1, 0, MICRODUCK_JOYSTICK_PROFILE);
  assert.equal(strafeVisual.yawDirection, -1);
});
