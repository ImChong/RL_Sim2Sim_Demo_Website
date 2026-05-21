import { readFile } from 'node:fs/promises';
import { performance } from 'node:perf_hooks';

const BASE = process.argv[2] ?? 'http://127.0.0.1:4173';

async function fetchBytes(url) {
  const started = performance.now();
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`${url} -> ${response.status}`);
  }
  const buf = await response.arrayBuffer();
  return { url, ms: performance.now() - started, bytes: buf.byteLength };
}

const filesJson = JSON.parse(await readFile('public/examples/scenes/files.json', 'utf8'));
const ampFiles = filesJson.filter((rel) => rel.startsWith('g1_amp/'));
const urls = [
  `${BASE}/`,
  `${BASE}/assets/vendor-mujoco-DT9nIDle.js`,
  `${BASE}/examples/checkpoints/g1/amp_policy_walk_run_getup.json`,
  `${BASE}/examples/checkpoints/g1/walk_run_getup/model_60000.onnx`,
  ...ampFiles.map((rel) => `${BASE}/examples/scenes/${rel}`)
];

const started = performance.now();
const results = await Promise.all(urls.map((url) => fetchBytes(url)));
const totalMs = performance.now() - started;
const totalBytes = results.reduce((sum, item) => sum + item.bytes, 0);
console.log(JSON.stringify({
  base: BASE,
  requests: results.length,
  totalBytes,
  totalMb: (totalBytes / (1024 * 1024)).toFixed(2),
  wallMs: Math.round(totalMs),
  mbPerSec: (totalBytes / (1024 * 1024) / (totalMs / 1000)).toFixed(2)
}, null, 2));
