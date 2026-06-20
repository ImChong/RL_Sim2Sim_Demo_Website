/** Static parkour (PHP) policy metadata mirrored from vendored student ONNX. */
export const PARKOUR_STUDENT_ONNX = 'parkour/dist-desktop/2026-01-17_09-51-30_student-new-loco-old-skill_student.onnx';
export const PARKOUR_DEPTH_BACKBONE_ONNX = 'parkour/dist-desktop/2026-01-17_09-51-30_student-new-loco-old-skill_depth_backbone.onnx';

export const PARKOUR_JOINT_NAMES = [
  'left_hip_pitch_joint',
  'right_hip_pitch_joint',
  'waist_yaw_joint',
  'left_hip_roll_joint',
  'right_hip_roll_joint',
  'waist_roll_joint',
  'left_hip_yaw_joint',
  'right_hip_yaw_joint',
  'waist_pitch_joint',
  'left_knee_joint',
  'right_knee_joint',
  'left_shoulder_pitch_joint',
  'right_shoulder_pitch_joint',
  'left_ankle_pitch_joint',
  'right_ankle_pitch_joint',
  'left_shoulder_roll_joint',
  'right_shoulder_roll_joint',
  'left_ankle_roll_joint',
  'right_ankle_roll_joint',
  'left_shoulder_yaw_joint',
  'right_shoulder_yaw_joint',
  'left_elbow_joint',
  'right_elbow_joint',
  'left_wrist_roll_joint',
  'right_wrist_roll_joint',
  'left_wrist_pitch_joint',
  'right_wrist_pitch_joint',
  'left_wrist_yaw_joint',
  'right_wrist_yaw_joint'
];

export const PARKOUR_OBSERVATION_NAMES = [
  'robot_anchor_projected_gravity',
  'base_ang_vel',
  'joint_pos',
  'joint_vel',
  'actions',
  'placeholder'
];

export const PARKOUR_DEPTH_CAMERA = {
  width: 106,
  height: 60,
  horizontalFovDeg: 58.4,
  minRange: 0.3,
  maxRange: 3
};

const OBS_SIZE_BY_NAME = {
  base_lin_vel: 3,
  base_ang_vel: 3,
  projected_gravity: 3,
  robot_anchor_projected_gravity: 3,
  command: 3,
  placeholder: 15,
  joint_pos: PARKOUR_JOINT_NAMES.length,
  joint_vel: PARKOUR_JOINT_NAMES.length,
  actions: PARKOUR_JOINT_NAMES.length
};

export function parkourObsBlockSize(name) {
  return OBS_SIZE_BY_NAME[name] ?? 0;
}

export function buildParkourObsLayout(observationNames = PARKOUR_OBSERVATION_NAMES, jointCount = PARKOUR_JOINT_NAMES.length) {
  const blocks = [];
  let offset = 0;
  for (const name of observationNames) {
    const size = name === 'joint_pos' || name === 'joint_vel' || name === 'actions'
      ? jointCount
      : parkourObsBlockSize(name);
    blocks.push({ name, offset, size, kwargs: {} });
    offset += size;
  }
  return blocks;
}

export function getParkourPolicyConfig() {
  const obsLayout = buildParkourObsLayout();
  const tensorSize = obsLayout.reduce((sum, block) => sum + block.size, 0);
  return {
    policyId: 'g1-parkour',
    policy_kind: 'parkour',
    jointNames: PARKOUR_JOINT_NAMES.slice(),
    observationNames: PARKOUR_OBSERVATION_NAMES.slice(),
    obsLayout,
    numActions: PARKOUR_JOINT_NAMES.length,
    numObs: tensorSize,
    depthCamera: { ...PARKOUR_DEPTH_CAMERA },
    onnx: {
      studentPath: PARKOUR_STUDENT_ONNX,
      depthBackbonePath: PARKOUR_DEPTH_BACKBONE_ONNX,
      path: PARKOUR_STUDENT_ONNX,
      meta: {
        in_keys: ['policy'],
        out_keys: ['action']
      }
    }
  };
}
