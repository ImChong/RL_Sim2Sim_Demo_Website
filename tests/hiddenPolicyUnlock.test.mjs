import assert from 'node:assert/strict';
import test from 'node:test';
import {
  MICRODUCK_UNLOCK_CODE,
  UNLOCK_STORAGE_KEY,
  isPolicyUnlocked,
  parseUnlockCodes,
  readStoredUnlockCodes,
  resolveUnlockedPolicyCodes,
  storeUnlockCodes
} from '../src/utils/hiddenPolicyUnlock.js';

function makeStorage(initial = {}) {
  const map = new Map(Object.entries(initial));
  return {
    map,
    getItem: (key) => map.get(key) ?? null,
    setItem: (key, value) => map.set(key, value),
    removeItem: (key) => map.delete(key)
  };
}

test('no unlock command in the url means nothing is unlocked', () => {
  assert.deepEqual(parseUnlockCodes({ search: '', hash: '' }), []);
  assert.equal(isPolicyUnlocked({ unlockCode: MICRODUCK_UNLOCK_CODE }, []), false);
});

test('policies without an unlock code stay visible', () => {
  assert.equal(isPolicyUnlocked({ value: 'g1-amp-walk-run-getup' }, []), true);
});

test('the microduck command is read from search, hash and lists', () => {
  assert.deepEqual(parseUnlockCodes({ search: '?unlock=microduck', hash: '' }), ['microduck']);
  assert.deepEqual(parseUnlockCodes({ search: '', hash: '#unlock=MicroDuck' }), ['microduck']);
  assert.deepEqual(parseUnlockCodes({ search: '', hash: '#/demo?unlock=microduck' }), ['microduck']);
  assert.deepEqual(parseUnlockCodes({ search: '?lang=zh&unlock=microduck,other' }), [
    'microduck',
    'other'
  ]);
});

test('an unrelated command does not unlock microduck', () => {
  const codes = resolveUnlockedPolicyCodes({ search: '?unlock=parkour' }, makeStorage());
  assert.equal(isPolicyUnlocked({ unlockCode: MICRODUCK_UNLOCK_CODE }, codes), false);
});

test('the url command unlocks microduck and is remembered for the session', () => {
  const storage = makeStorage();
  const codes = resolveUnlockedPolicyCodes({ search: '?unlock=microduck' }, storage);
  assert.equal(isPolicyUnlocked({ unlockCode: MICRODUCK_UNLOCK_CODE }, codes), true);
  assert.deepEqual(readStoredUnlockCodes(storage), ['microduck']);

  // 例如 iOS 切换策略触发的整页重载，网址参数丢了也仍然解锁。
  const afterReload = resolveUnlockedPolicyCodes({ search: '' }, storage);
  assert.equal(isPolicyUnlocked({ unlockCode: MICRODUCK_UNLOCK_CODE }, afterReload), true);
});

test('stored codes survive dirty values and unavailable storage', () => {
  const dirty = makeStorage({ [UNLOCK_STORAGE_KEY]: '{oops' });
  assert.deepEqual(readStoredUnlockCodes(dirty), []);
  assert.deepEqual(readStoredUnlockCodes(undefined), []);
  assert.deepEqual(storeUnlockCodes(['Microduck', 'microduck'], undefined), ['microduck']);
});
