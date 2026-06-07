import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const indexHtml = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'),
  'utf8'
);

/** @param {string} directive */
function getCspDirective(directive) {
  const match = indexHtml.match(
    new RegExp(`Content-Security-Policy"[^>]*content="[\\s\\S]*?${directive}\\s+([^;"]+)`)
  );
  return match?.[1]?.trim() ?? '';
}

test('CSP script-src allows Emscripten glue (MuJoCo / ONNX Runtime Web)', () => {
  const scriptSrc = getCspDirective('script-src');
  assert.doesNotMatch(
    scriptSrc,
    /'unsafe-eval'/,
    "script-src must not include 'unsafe-eval' to prevent XSS vulnerabilities"
  );
  assert.match(
    scriptSrc,
    /'wasm-unsafe-eval'/,
    "script-src must include 'wasm-unsafe-eval' for WebAssembly compilation"
  );
});
