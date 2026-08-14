/**
 * Shorten a MuJoCo joint name for compact pipeline / scope labels.
 * Shared by the pipeline node builders and the signal scope so that the
 * probe line keys always match the labels rendered on the graph nodes.
 * @param {string} name
 */
export function shortJointName(name) {
  if (!name) {
    return 'j';
  }
  return name
    .replace(/_joint$/, '')
    .replace(/^left_/, 'L_')
    .replace(/^right_/, 'R_');
}
