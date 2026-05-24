export const CONTROL_PANEL_SIZE_KEY = 'demo-control-panel-size';

export const DEFAULT_CONTROL_PANEL_SIZE = { width: 320, height: 560 };
export const MIN_CONTROL_PANEL_SIZE = { width: 260, height: 300 };

export function clampControlPanelSize(width, height) {
  const headerTop = 78;
  const maxW = Math.max(MIN_CONTROL_PANEL_SIZE.width, window.innerWidth - 36);
  const maxH = Math.max(MIN_CONTROL_PANEL_SIZE.height, window.innerHeight - headerTop);
  return {
    width: Math.round(Math.min(maxW, Math.max(MIN_CONTROL_PANEL_SIZE.width, width))),
    height: Math.round(Math.min(maxH, Math.max(MIN_CONTROL_PANEL_SIZE.height, height)))
  };
}

export function loadControlPanelSize() {
  if (typeof localStorage === 'undefined') {
    return { ...DEFAULT_CONTROL_PANEL_SIZE };
  }
  try {
    const raw = localStorage.getItem(CONTROL_PANEL_SIZE_KEY);
    if (!raw) {
      return { ...DEFAULT_CONTROL_PANEL_SIZE };
    }
    const parsed = JSON.parse(raw);
    return clampControlPanelSize(
      parsed.width ?? DEFAULT_CONTROL_PANEL_SIZE.width,
      parsed.height ?? DEFAULT_CONTROL_PANEL_SIZE.height
    );
  } catch {
    return { ...DEFAULT_CONTROL_PANEL_SIZE };
  }
}

export function saveControlPanelSize(width, height) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(CONTROL_PANEL_SIZE_KEY, JSON.stringify({ width, height }));
  } catch {
    /* ignore */
  }
}
