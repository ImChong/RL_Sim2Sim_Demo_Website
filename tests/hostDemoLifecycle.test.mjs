import assert from 'node:assert/strict';
import test from 'node:test';
import {
  clearHostDemoContainer,
  prepareMujocoWorkingDirectory,
  releaseOnnxSession,
  unmountMujocoWorkingDirectory
} from '../src/simulation/hostDemoLifecycle.js';
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

test('prepareMujocoWorkingDirectory remounts after unmount', () => {
  const mounts = [];
  const mujoco = {
    MEMFS: {},
    FS: {
      analyzePath(path) {
        return { exists: path === '/working' };
      },
      mkdir(path) {
        this._working = path;
      },
      unmount(path) {
        const idx = mounts.indexOf(path);
        if (idx >= 0) {
          mounts.splice(idx, 1);
        }
      },
      mount(_fs, _opts, path) {
        if (mounts.includes(path)) {
          throw new Error('already mounted');
        }
        mounts.push(path);
      }
    }
  };
  prepareMujocoWorkingDirectory(mujoco);
  assert.equal(mounts.length, 1);
  prepareMujocoWorkingDirectory(mujoco);
  assert.equal(mounts.length, 1);
});

test('unmountMujocoWorkingDirectory is safe when path is missing', () => {
  const mujoco = {
    FS: {
      analyzePath() {
        return { exists: false };
      },
      unmount() {
        throw new Error('should not be called');
      }
    }
  };
  assert.doesNotThrow(() => unmountMujocoWorkingDirectory(mujoco));
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
