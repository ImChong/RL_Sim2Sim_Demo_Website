export const PARKOUR_MOVEMENT_CODES = new Set(['KeyW', 'KeyA', 'KeyD']);

export function isParkourMovementKey(code) {
  return PARKOUR_MOVEMENT_CODES.has(code);
}

export function isParkourPauseKey(code) {
  return code === 'Space';
}

export function isParkourResetKey(code) {
  return code === 'Backspace';
}

/** Build virtual parkour keys from held keyboard codes (desktop host → iframe bridge). */
export function parkourVirtualKeysFromKeyboard(keysHeld, shiftHeld = false) {
  const held = keysHeld instanceof Set ? keysHeld : new Set(keysHeld);
  const w = held.has('KeyW');
  const a = held.has('KeyA');
  const d = held.has('KeyD');
  const active = w || a || d;
  return {
    active,
    w,
    a,
    d,
    highSpeed: shiftHeld && active
  };
}
