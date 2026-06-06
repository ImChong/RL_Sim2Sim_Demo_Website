import assert from 'node:assert/strict';
import test from 'node:test';
import { releaseOnnxSession } from '../src/simulation/hostDemoLifecycle.js';

test('releaseOnnxSession calls session.release and swallows errors', async () => {
  let released = false;
  await releaseOnnxSession({
    release: async () => {
      released = true;
    }
  });
  assert.equal(released, true);

  await assert.doesNotReject(() => releaseOnnxSession({
    release: async () => {
      throw new Error('already released');
    }
  }));
  await assert.doesNotReject(() => releaseOnnxSession(null));
});
