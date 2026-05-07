/**
 * Read a fetch Response body and report progress (0..1) when Content-Length is known.
 * @param {Response} response
 * @param {(ratio: number) => void} [onProgress]
 * @returns {Promise<Uint8Array>}
 */
export async function readResponseBodyWithProgress(response, onProgress) {
  const total = Number(response.headers.get('content-length'));
  const hasTotal = Number.isFinite(total) && total > 0;
  const reader = response.body?.getReader();
  if (!reader) {
    const buf = new Uint8Array(await response.arrayBuffer());
    onProgress?.(1);
    return buf;
  }

  const chunks = [];
  let loaded = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    if (value && value.length) {
      chunks.push(value);
      loaded += value.length;
      if (hasTotal) {
        onProgress?.(Math.min(1, loaded / total));
      }
    }
  }

  if (!hasTotal) {
    onProgress?.(1);
  } else {
    onProgress?.(1);
  }

  const out = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
}

/**
 * @param {string} url
 * @param {(ratio: number) => void} [onProgress]
 * @returns {Promise<Uint8Array>}
 */
export async function fetchUint8ArrayWithProgress(url, onProgress) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }
  return readResponseBodyWithProgress(response, onProgress);
}

/**
 * @param {string} url
 * @param {(ratio: number) => void} [onProgress]
 * @returns {Promise<string>}
 */
export async function fetchTextWithProgress(url, onProgress) {
  const bytes = await fetchUint8ArrayWithProgress(url, onProgress);
  return new TextDecoder('utf-8').decode(bytes);
}

/**
 * Track parallel downloads: each task reports local 0..1; weights should sum to 1.
 * @param {number[]} weights
 * @param {(overall: number) => void} [onOverall]
 * @returns {(taskIndex: number, localRatio: number) => void}
 */
export function createWeightedProgressReporter(weights, onOverall) {
  if (!onOverall || weights.length === 0) {
    return () => {};
  }
  const sum = weights.reduce((a, b) => a + b, 0) || 1;
  const norm = weights.map((w) => w / sum);
  const state = new Float64Array(weights.length);
  const report = () => {
    let acc = 0;
    for (let i = 0; i < state.length; i++) {
      acc += norm[i] * state[i];
    }
    onOverall(Math.min(1, Math.max(0, acc)));
  };
  return (taskIndex, localRatio) => {
    if (taskIndex < 0 || taskIndex >= state.length) {
      return;
    }
    state[taskIndex] = Math.min(1, Math.max(0, localRatio));
    report();
  };
}
