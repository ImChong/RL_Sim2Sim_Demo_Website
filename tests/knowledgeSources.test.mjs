import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import assert from 'node:assert/strict';

const SOURCES_PATH = new URL('../docs/knowledge/sources.json', import.meta.url);

test('knowledge sources.json is valid and lists primary papers', async () => {
  const raw = await readFile(SOURCES_PATH, 'utf8');
  const data = JSON.parse(raw);
  assert.equal(data.version, 1);
  assert.ok(Array.isArray(data.primary) && data.primary.length >= 2);

  const ids = data.primary.map((e) => e.id);
  assert.ok(ids.includes('sdamp-2605.18611'));
  assert.ok(ids.includes('heracles-2603.27756'));

  for (const entry of data.primary) {
    assert.ok(entry.arxivId, `missing arxivId: ${entry.id}`);
    assert.ok(entry.urls?.pdf || entry.urls?.html || entry.urls?.abs, `missing url: ${entry.id}`);
    assert.ok(entry.demoMapping, `missing demoMapping: ${entry.id}`);
  }
});
