/**
 * Resolve a policy-relative ONNX path to an absolute same-origin URL for Netron.
 * @param {string | undefined | null} modelPath e.g. ./examples/checkpoints/g1/tracking/policy_latest.onnx
 * @param {string} [baseUrl=import.meta.env.BASE_URL]
 * @returns {string}
 */
export function resolveModelAssetUrl(
  modelPath,
  baseUrl = import.meta.env.BASE_URL,
  origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
) {
  if (!modelPath || typeof modelPath !== 'string') {
    return '';
  }
  const trimmed = modelPath.trim();
  if (!trimmed) {
    return '';
  }
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const relative = trimmed.replace(/^\.\//, '');
  try {
    return new URL(relative, new URL(normalizedBase, origin)).href;
  } catch {
    return '';
  }
}

/**
 * Build a same-origin Netron viewer URL for an ONNX asset.
 * @param {string | undefined | null} modelPath
 * @param {string} [baseUrl=import.meta.env.BASE_URL]
 * @param {string} [origin]
 * @returns {string}
 */
export function buildNetronViewerUrl(
  modelPath,
  baseUrl = import.meta.env.BASE_URL,
  origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
) {
  const modelUrl = resolveModelAssetUrl(modelPath, baseUrl, origin);
  if (!modelUrl) {
    return '';
  }
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const viewerBase = new URL('netron/index.html', new URL(normalizedBase, origin)).href;
  return `${viewerBase}?url=${encodeURIComponent(modelUrl)}`;
}
