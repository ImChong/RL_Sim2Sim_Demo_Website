export const SCOPE_WINDOW_SECONDS_KEY = 'model-io-scope-window-seconds';
export const MIN_SCOPE_WINDOW_SECONDS = 10;
export const DEFAULT_SCOPE_WINDOW_SECONDS = 20;
export const MAX_SCOPE_WINDOW_SECONDS = 120;

export function clampScopeWindowSeconds(seconds) {
  const value = Number(seconds);
  if (!Number.isFinite(value)) {
    return DEFAULT_SCOPE_WINDOW_SECONDS;
  }
  return Math.min(
    MAX_SCOPE_WINDOW_SECONDS,
    Math.max(MIN_SCOPE_WINDOW_SECONDS, Math.round(value))
  );
}

export function loadScopeWindowSeconds() {
  if (typeof localStorage === 'undefined') {
    return DEFAULT_SCOPE_WINDOW_SECONDS;
  }
  try {
    const raw = localStorage.getItem(SCOPE_WINDOW_SECONDS_KEY);
    if (raw === null || raw === '') {
      return DEFAULT_SCOPE_WINDOW_SECONDS;
    }
    return clampScopeWindowSeconds(Number(raw));
  } catch {
    return DEFAULT_SCOPE_WINDOW_SECONDS;
  }
}

export function saveScopeWindowSeconds(seconds) {
  if (typeof localStorage === 'undefined') {
    return clampScopeWindowSeconds(seconds);
  }
  const clamped = clampScopeWindowSeconds(seconds);
  try {
    localStorage.setItem(SCOPE_WINDOW_SECONDS_KEY, String(clamped));
  } catch {
    /* ignore quota / private mode */
  }
  return clamped;
}
