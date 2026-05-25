export const PIPELINE_NODE_LAYOUT_KEY = 'pipeline-graph-node-layout';

export const MIN_NODE_WIDTH = 104;
export const MIN_NODE_HEIGHT = 44;
export const MAX_NODE_WIDTH = 420;
export const MAX_NODE_HEIGHT = 360;

export function graphLayoutKey(nodes) {
  if (!nodes?.length) {
    return '';
  }
  return nodes
    .map((n) => n.id)
    .sort()
    .join('|');
}

export function clampNodeSize(width, height) {
  return {
    width: Math.round(Math.min(MAX_NODE_WIDTH, Math.max(MIN_NODE_WIDTH, width))),
    height: Math.round(Math.min(MAX_NODE_HEIGHT, Math.max(MIN_NODE_HEIGHT, height)))
  };
}

/**
 * @param {Array<{ id: string, x?: number, y?: number, width?: number, height?: number }>} baseNodes
 * @param {Record<string, { x?: number, y?: number, width?: number, height?: number }>} overrides
 */
export function mergeNodeLayout(baseNodes, overrides = {}) {
  return baseNodes.map((node) => {
    const patch = overrides[node.id];
    if (!patch) {
      return { ...node };
    }
    const merged = { ...node };
    if (patch.x != null) {
      merged.x = patch.x;
    }
    if (patch.y != null) {
      merged.y = patch.y;
    }
    if (patch.width != null) {
      merged.width = patch.width;
    }
    if (patch.height != null) {
      merged.height = patch.height;
    }
    return merged;
  });
}

/**
 * @param {Array<{ x?: number, y?: number, width?: number, height?: number }>} nodes
 * @param {{ width?: number, height?: number }} [fallback]
 */
export function computeGraphBounds(nodes, fallback = {}, padding = 28) {
  let maxX = 0;
  let maxY = 0;
  for (const node of nodes) {
    maxX = Math.max(maxX, (node.x ?? 0) + (node.width ?? 160));
    maxY = Math.max(maxY, (node.y ?? 0) + (node.height ?? 56));
  }
  return {
    width: Math.max(fallback.width ?? 0, maxX + padding, 480),
    height: Math.max(fallback.height ?? 0, maxY + padding, 200)
  };
}

export function loadNodeOverrides(layoutKey) {
  if (typeof localStorage === 'undefined' || !layoutKey) {
    return {};
  }
  try {
    const raw = localStorage.getItem(PIPELINE_NODE_LAYOUT_KEY);
    if (!raw) {
      return {};
    }
    const store = JSON.parse(raw);
    if (store?.key !== layoutKey || !store.overrides) {
      return {};
    }
    return store.overrides;
  } catch {
    return {};
  }
}

export function saveNodeOverrides(layoutKey, overrides) {
  if (typeof localStorage === 'undefined' || !layoutKey) {
    return;
  }
  try {
    localStorage.setItem(
      PIPELINE_NODE_LAYOUT_KEY,
      JSON.stringify({ key: layoutKey, overrides })
    );
  } catch {
    /* ignore */
  }
}

export function pruneNodeOverrides(overrides, validIds) {
  const ids = new Set(validIds);
  const next = {};
  for (const [id, patch] of Object.entries(overrides ?? {})) {
    if (ids.has(id)) {
      next[id] = patch;
    }
  }
  return next;
}
