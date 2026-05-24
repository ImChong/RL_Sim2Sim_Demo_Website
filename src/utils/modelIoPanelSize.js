export const MODEL_IO_PANEL_SIZE_KEY = 'model-io-panel-size';

export const DEFAULT_PANEL_SIZE = { width: 960, height: 540 };
export const MIN_PANEL_SIZE = { width: 520, height: 360 };

export function clampPanelSize(width, height) {
  const maxW = Math.max(MIN_PANEL_SIZE.width, window.innerWidth - 24);
  const maxH = Math.max(MIN_PANEL_SIZE.height, window.innerHeight - 72);
  return {
    width: Math.round(Math.min(maxW, Math.max(MIN_PANEL_SIZE.width, width))),
    height: Math.round(Math.min(maxH, Math.max(MIN_PANEL_SIZE.height, height)))
  };
}

export function loadPanelSize() {
  if (typeof localStorage === 'undefined') {
    return { ...DEFAULT_PANEL_SIZE };
  }
  try {
    const raw = localStorage.getItem(MODEL_IO_PANEL_SIZE_KEY);
    if (!raw) {
      return { ...DEFAULT_PANEL_SIZE };
    }
    const parsed = JSON.parse(raw);
    return clampPanelSize(parsed.width ?? DEFAULT_PANEL_SIZE.width, parsed.height ?? DEFAULT_PANEL_SIZE.height);
  } catch {
    return { ...DEFAULT_PANEL_SIZE };
  }
}

export function savePanelSize(width, height) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(MODEL_IO_PANEL_SIZE_KEY, JSON.stringify({ width, height }));
  } catch {
    /* ignore quota / private mode */
  }
}
