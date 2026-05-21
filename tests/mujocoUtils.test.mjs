import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSceneFilesByPrefixes,
  initialSceneAssetPrefixes,
  sceneAssetPrefixesForPath
} from '../src/simulation/mujocoUtils.js';

test('sceneAssetPrefixesForPath returns top-level folder prefix', () => {
  assert.deepEqual(sceneAssetPrefixesForPath('g1/g1.xml'), ['g1/']);
  assert.deepEqual(sceneAssetPrefixesForPath('g1_amp/scene_g1.xml'), ['g1_amp/']);
  assert.deepEqual(sceneAssetPrefixesForPath('scene.xml'), []);
});

test('initialSceneAssetPrefixes only preloads default AMP scene bundle', () => {
  assert.deepEqual(initialSceneAssetPrefixes(), ['g1_amp/']);
});

test('filterSceneFilesByPrefixes limits downloads to requested bundles', () => {
  const files = ['g1/g1.xml', 'g1_amp/g1.xml', 'g1/meshes/pelvis.STL'];
  assert.deepEqual(filterSceneFilesByPrefixes(files, ['g1/']), ['g1/g1.xml', 'g1/meshes/pelvis.STL']);
  assert.deepEqual(filterSceneFilesByPrefixes(files, ['g1_amp/']), ['g1_amp/g1.xml']);
  assert.deepEqual(filterSceneFilesByPrefixes(files, null), files);
});
