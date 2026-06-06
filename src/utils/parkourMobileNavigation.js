/**
 * iPhone/iPad cannot keep host AMP (mujoco-js WASM) and Parkour iframe in one tab.
 * Navigate to a separate document that never loads the host MuJoCo stack.
 */

export const PARKOUR_STANDALONE_SESSION_KEY = 'rl-sim2sim-parkour-standalone';

/** @param {string} [baseUrl] */
export function normalizeBaseUrl(baseUrl = '/') {
  if (!baseUrl || baseUrl === '/') {
    return '/';
  }
  return baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
}

/** @param {string} [baseUrl] */
export function getParkourMobilePageUrl(baseUrl = '/') {
  return `${normalizeBaseUrl(baseUrl)}parkour-mobile.html`;
}

/**
 * @param {string} [baseUrl]
 * @param {{ fromParkour?: boolean }} [options]
 */
export function getMainDemoPageUrl(baseUrl = '/', { fromParkour = false } = {}) {
  const base = normalizeBaseUrl(baseUrl);
  const query = fromParkour ? '?from=parkour' : '';
  return base === '/' ? `/${query}` : `${base}index.html${query}`;
}

export function markParkourStandaloneExit() {
  try {
    sessionStorage.setItem(PARKOUR_STANDALONE_SESSION_KEY, '1');
  } catch {
    /* private mode */
  }
}

export function peekParkourStandaloneReturn() {
  try {
    if (sessionStorage.getItem(PARKOUR_STANDALONE_SESSION_KEY) === '1') {
      return true;
    }
  } catch {
    /* ignore */
  }
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search).get('from') === 'parkour';
  }
  return false;
}

export function consumeParkourStandaloneReturn() {
  const fromQuery = typeof window !== 'undefined'
    && new URLSearchParams(window.location.search).get('from') === 'parkour';
  let fromSession = false;
  try {
    fromSession = sessionStorage.getItem(PARKOUR_STANDALONE_SESSION_KEY) === '1';
    if (fromSession) {
      sessionStorage.removeItem(PARKOUR_STANDALONE_SESSION_KEY);
    }
  } catch {
    /* ignore */
  }
  return fromSession || fromQuery;
}

export function stripFromParkourQuery() {
  if (typeof window === 'undefined') {
    return;
  }
  const url = new URL(window.location.href);
  if (!url.searchParams.has('from')) {
    return;
  }
  url.searchParams.delete('from');
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(null, '', next);
}
