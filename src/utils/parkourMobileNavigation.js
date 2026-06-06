/**
 * iPhone/iPad cannot keep host AMP (mujoco-js WASM) and Parkour iframe in one tab.
 * Navigate to a separate document that never loads the host MuJoCo stack.
 */

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

/** @param {string} [baseUrl] */
export function getMainDemoPageUrl(baseUrl = '/') {
  const base = normalizeBaseUrl(baseUrl);
  return base === '/' ? '/' : `${base}index.html`;
}
