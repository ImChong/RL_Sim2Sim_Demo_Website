import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = join(root, 'docs/knowledge/index.json');

test('knowledge index is valid JSON with required entry fields', () => {
  const index = JSON.parse(readFileSync(indexPath, 'utf8'));
  assert.equal(index.version, 1);
  assert.ok(Array.isArray(index.entries) && index.entries.length > 0);

  for (const entry of index.entries) {
    assert.ok(entry.id, 'entry.id required');
    assert.ok(entry.digestPath, 'entry.digestPath required');
    assert.ok(entry.sourceDir, 'entry.sourceDir required');

    const digestFile = join(root, 'docs/knowledge', entry.digestPath);
    const manifestFile = join(root, 'docs/knowledge', entry.sourceDir, 'manifest.json');
    assert.ok(existsSync(digestFile), `missing digest: ${entry.digestPath}`);
    assert.ok(existsSync(manifestFile), `missing manifest: ${entry.sourceDir}/manifest.json`);
  }
});

test('splitadapter entry lists arxiv and project page', () => {
  const index = JSON.parse(readFileSync(indexPath, 'utf8'));
  const entry = index.entries.find((e) => e.id === 'splitadapter-2606.03297');
  assert.ok(entry);
  assert.equal(entry.arxiv, '2606.03297');
  assert.equal(entry.projectPage, 'https://splitadapter.github.io/');
});
