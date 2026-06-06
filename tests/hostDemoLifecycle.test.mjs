import assert from 'node:assert/strict';
import test from 'node:test';
import { clearHostDemoContainer, releaseOnnxSession } from '../src/simulation/hostDemoLifecycle.js';
import { needsSceneReload } from '../src/simulation/main.js';

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

test('clearHostDemoContainer removes child nodes', () => {
  const container = { children: [{}, {}], replaceChildren() { this.children = []; } };
  clearHostDemoContainer(container);
  assert.equal(container.children.length, 0);
});

test('needsSceneReload loads scene when model is missing even if path matches', () => {
  const scene = 'g1_amp/scene_g1.xml';
  assert.equal(needsSceneReload(scene, scene, null), true);
  assert.equal(needsSceneReload(scene, scene, {}), false);
  assert.equal(needsSceneReload(scene, 'g1/g1.xml', {}), true);
});
