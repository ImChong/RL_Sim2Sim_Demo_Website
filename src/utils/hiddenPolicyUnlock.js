/**
 * 隐藏策略选项的解锁开关：带 unlockCode 的策略默认不出现在 Policy 下拉栏里，
 * 只有在网址里输入指定指令后才显示，例如
 *   https://<host>/?unlock=microduck
 * 也接受 hash 形式（#unlock=microduck）以及一次解锁多个（?unlock=a,b）。
 * 解锁结果写进 sessionStorage，切换策略触发的整页重载不会丢失。
 */

/** 网址里的解锁参数名。 */
export const UNLOCK_QUERY_KEY = 'unlock';
/** sessionStorage key：解锁在当前标签页会话内一直有效。 */
export const UNLOCK_STORAGE_KEY = 'rl-sim2sim-unlocked-policies';
/** Microduck 下拉项的解锁指令。 */
export const MICRODUCK_UNLOCK_CODE = 'microduck';

function normalizeCodes(values) {
  return values
    .flatMap((value) => String(value).split(/[\s,]+/))
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

function toCodeSet(codes) {
  if (codes instanceof Set) {
    return codes;
  }
  return new Set(normalizeCodes(Array.isArray(codes) ? codes : []));
}

function readQueryCodes(query) {
  if (!query) {
    return [];
  }
  try {
    return new URLSearchParams(query.replace(/^[?#]/, '')).getAll(UNLOCK_QUERY_KEY);
  } catch {
    /* 网址片段无法解析时忽略 */
    return [];
  }
}

/** 从当前网址解析解锁指令（search 与 hash 都支持）。 */
export function parseUnlockCodes(locationLike = globalThis.location) {
  const hash = locationLike?.hash ?? '';
  const hashQuery = hash.includes('?') ? hash.slice(hash.indexOf('?')) : hash;
  return [
    ...new Set(
      normalizeCodes([...readQueryCodes(locationLike?.search ?? ''), ...readQueryCodes(hashQuery)])
    )
  ];
}

/** 读取本会话已解锁的指令。 */
export function readStoredUnlockCodes(storage = globalThis.sessionStorage) {
  try {
    const raw = storage?.getItem(UNLOCK_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? [...new Set(normalizeCodes(parsed))] : [];
  } catch {
    /* 无痕模式或脏数据 */
    return [];
  }
}

/** 记住已解锁的指令，供整页重载后继续使用。 */
export function storeUnlockCodes(codes, storage = globalThis.sessionStorage) {
  const normalized = [...toCodeSet(codes)];
  try {
    storage?.setItem(UNLOCK_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    /* 无痕模式 */
  }
  return normalized;
}

/** 合并网址里的指令与本会话已解锁的指令，并持久化。 */
export function resolveUnlockedPolicyCodes(
  locationLike = globalThis.location,
  storage = globalThis.sessionStorage
) {
  const fromUrl = parseUnlockCodes(locationLike);
  const stored = readStoredUnlockCodes(storage);
  const merged = new Set([...stored, ...fromUrl]);
  if (fromUrl.some((code) => !stored.includes(code))) {
    storeUnlockCodes(merged, storage);
  }
  return merged;
}

/** 没有 unlockCode 的策略始终可见；有的必须先解锁。 */
export function isPolicyUnlocked(policy, codes) {
  const code = policy?.unlockCode;
  if (!code) {
    return true;
  }
  return toCodeSet(codes).has(String(code).toLowerCase());
}
