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

test('CSP frame-src allows same-origin Netron iframe', () => {
  const frameSrc = getCspDirective('frame-src');
  assert.match(frameSrc, /'self'/, "frame-src must include 'self' for embedded Netron viewer");
});
