import { clampScopeWindowSeconds } from '../utils/scopeWindowPreference.js';
import { registerObsNodeOffsets } from './pipelineObsNodes.js';

const DEFAULT_CAPACITY = 3000;
const DEFAULT_MAX_CHANNELS = 8;
export const DEFAULT_WINDOW_SECONDS = 20;
export const MIN_WINDOW_SECONDS = 10;

export const SCOPE_CHANNEL_COLORS = [
  '#00d992',
  '#4cb3d4',
  '#f59e0b',
  '#ef4444',
  '#a78bfa',
  '#22d3ee',
  '#f472b6',
  '#84cc16'
];

export function buildProbeId(nodeId, lineKey) {
  return `${nodeId}:${lineKey}`;
}

export function parseProbeId(probeId) {
  const idx = probeId.lastIndexOf(':');
  if (idx <= 0) {
    return { nodeId: probeId, lineKey: '' };
  }
  return {
    nodeId: probeId.slice(0, idx),
    lineKey: probeId.slice(idx + 1)
  };
}

function shortJointName(name) {
  if (!name) {
    return 'j';
  }
  return name
    .replace(/_joint$/, '')
    .replace(/^left_/, 'L_')
    .replace(/^right_/, 'R_');
}

function findJointIndex(jointNames, lineKey) {
  if (!jointNames?.length || !lineKey) {
    return -1;
  }
  for (let i = 0; i < jointNames.length; i++) {
    if (shortJointName(jointNames[i]) === lineKey) {
      return i;
    }
  }
  return -1;
}

function vecComponent(values, key) {
  const map = { x: 0, y: 1, z: 2, w: 0 };
  const idx = map[key];
  if (idx === undefined || !values?.length) {
    return NaN;
  }
  return Number(values[idx]);
}

function readObsScalar(runner, offset) {
  if (!runner || !Number.isInteger(offset) || offset < 0) {
    return NaN;
  }
  const data = runner.historyLength > 1 ? runner.fullObs : runner.obsForPolicy;
  if (!data || offset >= data.length) {
    return NaN;
  }
  return Number(data[offset]);
}

/**
 * Resolve a probed signal to a scalar from the live policy runner + demo.
 * @param {import('./policyRunner.js').PolicyRunner | null} runner
 * @param {import('./main.js').MuJoCoDemo | null} demo
 * @param {{ nodeId: string, lineKey: string }} probe
 */
export function resolveSignalValue(runner, demo, probe) {
  if (!runner || !probe?.nodeId) {
    return NaN;
  }
  const { nodeId, lineKey } = probe;
  const state = demo?.readPolicyState?.() ?? null;
  const jointNames = runner.policyJointNames ?? [];

  if (nodeId === 'sim-cmd-vx') return Number(state?.cmd?.[0] ?? 0);
  if (nodeId === 'sim-cmd-vy') return Number(state?.cmd?.[1] ?? 0);
  if (nodeId === 'sim-cmd-yaw') return Number(state?.cmd?.[2] ?? 0);

  if (nodeId === 'sim-root-pos') return vecComponent(state?.rootPos, lineKey);
  if (nodeId === 'sim-root-angvel') return vecComponent(state?.rootAngVel, lineKey);
  if (nodeId === 'sim-root-quat') return vecComponent(state?.rootQuat, lineKey);

  if (nodeId === 'sim-joint-pos') {
    const idx = findJointIndex(jointNames, lineKey);
    return idx >= 0 ? Number(state?.jointPos?.[idx] ?? NaN) : NaN;
  }
  if (nodeId === 'sim-joint-vel') {
    const idx = findJointIndex(jointNames, lineKey);
    return idx >= 0 ? Number(state?.jointVel?.[idx] ?? NaN) : NaN;
  }

  if (nodeId === 'prep-joint-rel') {
    const idx = findJointIndex(jointNames, lineKey);
    return idx >= 0 ? Number(runner.cachedJointPosRel?.[idx] ?? NaN) : NaN;
  }

  if (nodeId === 'out-action') {
    const idx = findJointIndex(jointNames, lineKey);
    return idx >= 0 ? Number(runner.lastActions?.[idx] ?? NaN) : NaN;
  }
  if (nodeId === 'out-target') {
    const idx = findJointIndex(jointNames, lineKey);
    return idx >= 0 ? Number(runner.target?.[idx] ?? NaN) : NaN;
  }

  if (nodeId === 'motor-torque') {
    const idx = findJointIndex(jointNames, lineKey);
    if (idx < 0) {
      return NaN;
    }
    const qposAdr = demo?.qpos_adr_policy?.[idx];
    const qvelAdr = demo?.qvel_adr_policy?.[idx];
    const target = demo?.actionTarget?.[idx] ?? runner.target?.[idx] ?? 0;
    const qpos = Number.isInteger(qposAdr) ? demo.simulation.qpos[qposAdr] : 0;
    const qvel = Number.isInteger(qvelAdr) ? demo.simulation.qvel[qvelAdr] : 0;
    const kp = demo?.kpPolicy?.[idx] ?? 0;
    const kd = demo?.kdPolicy?.[idx] ?? 0;
    const ctrlAdr = demo?.ctrl_adr_policy?.[idx];
    const torque = kp * (target - qpos) + kd * (0 - qvel);
    return Number.isInteger(ctrlAdr) ? demo.simulation.ctrl[ctrlAdr] : torque;
  }

  if (nodeId.startsWith('obs-')) {
    const obsLayout = buildObsOffsetLookup(runner);
    const entry = obsLayout.get(nodeId);
    if (!entry) {
      return NaN;
    }
    if (entry.kind === 'vec3') {
      return vecComponent(
        readObsSlice(runner, entry.offset, entry.size),
        lineKey
      );
    }
    if (entry.kind === 'joint') {
      const idx = findJointIndex(jointNames, lineKey);
      return idx >= 0 ? readObsScalar(runner, entry.offset + idx) : NaN;
    }
    if (entry.kind === 'scalar') {
      const idx = entry.keys?.indexOf(lineKey) ?? 0;
      return readObsScalar(runner, entry.offset + Math.max(0, idx));
    }
    const idx = Number.parseInt(lineKey.replace(/^\[/, '').replace(/\]$/, ''), 10);
    if (Number.isInteger(idx)) {
      return readObsScalar(runner, entry.offset + idx);
    }
  }

  return NaN;
}

function readObsSlice(runner, offset, size) {
  const data = runner.historyLength > 1 ? runner.fullObs : runner.obsForPolicy;
  if (!data) {
    return [];
  }
  return Array.from(data.subarray(offset, offset + size));
}

function buildObsOffsetLookup(runner) {
  const map = new Map();
  const obsConfig = runner.config?.obs_config?.policy ?? [];
  let offset = 0;
  for (let i = 0; i < runner.obsModules.length; i++) {
    const obs = runner.obsModules[i];
    const cfg = obsConfig[i] ?? {};
    const name = cfg.name ?? 'Unknown';
    const size = obs.size ?? 0;
    const block = { name, offset, size, kwargs: cfg };
    registerObsNodeOffsets(map, block, runner.numActions);
    offset += size;
  }
  return map;
}

export function setScopeWindowSeconds(scope, seconds) {
  if (!scope) {
    return DEFAULT_WINDOW_SECONDS;
  }
  const clamped = clampScopeWindowSeconds(seconds);
  scope.windowSeconds = clamped;
  return clamped;
}

export function createSignalScope(options = {}) {
  const capacity = options.capacity ?? DEFAULT_CAPACITY;
  const maxChannels = options.maxChannels ?? DEFAULT_MAX_CHANNELS;
  const windowSeconds = options.windowSeconds ?? DEFAULT_WINDOW_SECONDS;
  return {
    capacity,
    maxChannels,
    windowSeconds,
    channels: [],
    times: new Float64Array(capacity),
    head: 0,
    length: 0,
    paused: false,
    timeOrigin: null
  };
}

export function isProbeableLine(line) {
  return Boolean(
    line?.k
    && line.k !== '…'
    && line.k !== 'in'
    && line.k !== 'out'
    && line.k !== 'dim'
    && line.k !== '维度'
  );
}

export function listNodeProbes(node) {
  if (!node?.lines?.length) {
    return [];
  }
  const title = node.title ?? node.id;
  return node.lines
    .filter((line) => isProbeableLine(line))
    .map((line) => ({
      id: buildProbeId(node.id, line.k),
      nodeId: node.id,
      lineKey: line.k,
      label: `${title} · ${line.k}`
    }));
}

export function setScopeProbes(scope, probes) {
  if (!scope) {
    return null;
  }
  const limited = (probes ?? []).slice(0, scope.maxChannels);
  if (limited.length === 0) {
    scope.channels = [];
    clearScopeBuffer(scope);
    return [];
  }
  const nodeId = limited[0].nodeId;
  const sameNodeProbes = limited.filter((probe) => probe.nodeId === nodeId);
  scope.channels = sameNodeProbes.map((probe, index) => ({
    id: probe.id,
    nodeId: probe.nodeId,
    lineKey: probe.lineKey,
    label: probe.label,
    color: SCOPE_CHANNEL_COLORS[index % SCOPE_CHANNEL_COLORS.length],
    values: new Float32Array(scope.capacity)
  }));
  clearScopeBuffer(scope);
  return scope.channels;
}

export function toggleScopeProbe(scope, probe) {
  const idx = scope.channels.findIndex((ch) => ch.id === probe.id);
  if (idx >= 0) {
    scope.channels.splice(idx, 1);
    return false;
  }
  if (scope.channels.length >= scope.maxChannels) {
    return null;
  }
  const color = SCOPE_CHANNEL_COLORS[scope.channels.length % SCOPE_CHANNEL_COLORS.length];
  scope.channels.push({
    id: probe.id,
    nodeId: probe.nodeId,
    lineKey: probe.lineKey,
    label: probe.label,
    color,
    values: new Float32Array(scope.capacity)
  });
  return true;
}

export function removeScopeProbe(scope, probeId) {
  const idx = scope.channels.findIndex((ch) => ch.id === probeId);
  if (idx >= 0) {
    scope.channels.splice(idx, 1);
    return true;
  }
  return false;
}

export function clearScopeBuffer(scope) {
  scope.head = 0;
  scope.length = 0;
  scope.timeOrigin = null;
  for (const ch of scope.channels) {
    ch.values.fill(0);
  }
  scope.times.fill(0);
}

/**
 * Push one sample for all active scope channels.
 */
export function pushScopeSample(scope, runner, demo, timeMs = performance.now()) {
  if (!scope || scope.paused || scope.channels.length === 0) {
    return;
  }
  if (scope.timeOrigin === null) {
    scope.timeOrigin = timeMs;
  }
  const t = (timeMs - scope.timeOrigin) / 1000;
  const idx = scope.head;
  scope.times[idx] = t;
  for (const ch of scope.channels) {
    const value = resolveSignalValue(runner, demo, ch);
    ch.values[idx] = Number.isFinite(value) ? value : 0;
  }
  scope.head = (scope.head + 1) % scope.capacity;
  if (scope.length < scope.capacity) {
    scope.length += 1;
  }
}

export function getScopeSnapshot(scope) {
  const { capacity, length, head, channels, times } = scope;
  if (length === 0) {
    return {
      sampleCount: 0,
      windowSeconds: scope.windowSeconds ?? DEFAULT_WINDOW_SECONDS,
      labels: channels.map((ch) => ch.label),
      series: channels.map((ch) => ({
        id: ch.id,
        label: ch.label,
        color: ch.color,
        values: []
      })),
      timeRange: [0, scope.windowSeconds ?? DEFAULT_WINDOW_SECONDS]
    };
  }

  const orderedTimes = new Float64Array(length);
  const orderedSeries = channels.map((ch) => ({
    id: ch.id,
    label: ch.label,
    color: ch.color,
    values: new Float32Array(length)
  }));

  const start = length < capacity ? 0 : head;
  for (let i = 0; i < length; i++) {
    const src = (start + i) % capacity;
    orderedTimes[i] = times[src];
    for (let c = 0; c < channels.length; c++) {
      orderedSeries[c].values[i] = channels[c].values[src];
    }
  }

  const windowSeconds = scope.windowSeconds ?? DEFAULT_WINDOW_SECONDS;
  let sliceStart = 0;
  if (length > 0) {
    const latestTime = orderedTimes[length - 1];
    const cutoff = latestTime - windowSeconds;
    while (sliceStart < length && orderedTimes[sliceStart] < cutoff) {
      sliceStart += 1;
    }
  }
  const visibleLength = length - sliceStart;
  const visibleTimes = orderedTimes.subarray(sliceStart, length);
  const visibleSeries = orderedSeries.map((series) => ({
    ...series,
    values: series.values.subarray(sliceStart, length)
  }));

  let minY = Infinity;
  let maxY = -Infinity;
  for (const series of visibleSeries) {
    for (let i = 0; i < visibleLength; i++) {
      const v = series.values[i];
      if (v < minY) minY = v;
      if (v > maxY) maxY = v;
    }
  }
  if (!Number.isFinite(minY) || !Number.isFinite(maxY)) {
    minY = -1;
    maxY = 1;
  }
  if (minY === maxY) {
    minY -= 0.5;
    maxY += 0.5;
  }

  return {
    sampleCount: visibleLength,
    windowSeconds,
    labels: channels.map((ch) => ch.label),
    series: visibleSeries.map((s) => ({
      ...s,
      values: Array.from(s.values)
    })),
    times: Array.from(visibleTimes),
    timeRange: visibleLength > 0
      ? [visibleTimes[0], visibleTimes[visibleLength - 1]]
      : [0, windowSeconds],
    valueRange: [minY, maxY]
  };
}
