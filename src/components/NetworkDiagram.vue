<template>
  <div class="network-diagram" :class="{ 'network-diagram-live': live }">
    <svg
      class="network-diagram-svg"
      :viewBox="`0 0 ${width} ${height}`"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <g class="network-diagram-edges">
        <line
          v-for="edge in renderedEdges"
          :key="edge.id"
          :x1="edge.x1"
          :y1="edge.y1"
          :x2="edge.x2"
          :y2="edge.y2"
          class="network-diagram-edge"
        />
      </g>
      <g v-for="col in renderedColumns" :key="col.id" class="network-diagram-col">
        <circle
          v-for="(n, idx) in col.neurons"
          :key="`${col.id}-n${idx}`"
          :cx="col.cx"
          :cy="n.y"
          :r="NEURON_R"
          class="network-diagram-neuron"
          :class="`network-diagram-neuron-${col.kind}`"
        />
        <text
          v-if="col.ellipsisY != null"
          :x="col.cx"
          :y="col.ellipsisY"
          class="network-diagram-ellipsis"
          text-anchor="middle"
          dominant-baseline="middle"
        >⋮</text>
        <text
          :x="col.cx"
          :y="LABEL_TOP_Y"
          class="network-diagram-label"
          text-anchor="middle"
        >{{ col.label }}</text>
        <text
          v-if="col.transform"
          :x="col.cx"
          :y="LABEL_TOP_Y + 12"
          class="network-diagram-sublabel"
          text-anchor="middle"
        >{{ col.transform }}</text>
        <text
          :x="col.cx"
          :y="LABEL_BOTTOM_Y"
          class="network-diagram-dim"
          text-anchor="middle"
        >{{ col.dim }}</text>
        <text
          v-if="col.post && col.post.length"
          :x="col.cx"
          :y="LABEL_BOTTOM_Y + 12"
          class="network-diagram-post"
          text-anchor="middle"
        >+ {{ col.post.join(' + ') }}</text>
      </g>
    </svg>
  </div>
</template>

<script>
const NEURON_R = 3.6;
const NEURON_GAP = 11;
const MAX_VISIBLE = 9;
const LABEL_TOP_Y = 14;
const LABEL_BOTTOM_Y = 224;
const COL_W = 78;
const PAD_X = 20;
const TOP_NEURON_Y = 36;

export default {
  name: 'NetworkDiagram',
  props: {
    columns: { type: Array, required: true },
    architecture: { type: Object, default: null },
    live: { type: Boolean, default: false }
  },
  data: () => ({
    NEURON_R,
    LABEL_TOP_Y,
    LABEL_BOTTOM_Y
  }),
  computed: {
    width() {
      const cols = this.columns ?? [];
      return Math.max(320, PAD_X * 2 + cols.length * COL_W);
    },
    height() {
      return 260;
    },
    renderedColumns() {
      const cols = this.columns ?? [];
      return cols.map((col, i) => {
        const cx = PAD_X + COL_W / 2 + i * COL_W;
        const visible = Math.min(MAX_VISIBLE, col.dim || 1);
        const halfVisible = Math.floor(visible / 2);
        const totalH = (visible - 1) * NEURON_GAP;
        const cy0 = (LABEL_TOP_Y + LABEL_BOTTOM_Y) / 2 - totalH / 2;
        const neurons = [];
        for (let k = 0; k < visible; k++) {
          neurons.push({ y: cy0 + k * NEURON_GAP });
        }
        const ellipsisY = (col.dim > visible) ? cy0 + Math.floor(visible / 2) * NEURON_GAP : null;
        return {
          ...col,
          cx,
          neurons,
          ellipsisY
        };
      });
    },
    renderedEdges() {
      const cols = this.renderedColumns;
      const edges = [];
      for (let i = 0; i < cols.length - 1; i++) {
        const a = cols[i];
        const b = cols[i + 1];
        for (const na of a.neurons) {
          for (const nb of b.neurons) {
            edges.push({
              id: `${a.id}-${b.id}-${na.y.toFixed(1)}-${nb.y.toFixed(1)}`,
              x1: a.cx + NEURON_R,
              y1: na.y,
              x2: b.cx - NEURON_R,
              y2: nb.y
            });
          }
        }
      }
      return edges;
    }
  }
};
</script>

<style scoped>
.network-diagram {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.network-diagram-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.network-diagram-edge {
  stroke: rgba(148, 163, 184, 0.18);
  stroke-width: 0.5;
}

.network-diagram-live .network-diagram-edge {
  stroke: rgba(var(--v-theme-primary), 0.22);
}

.network-diagram-neuron {
  fill: rgba(30, 41, 59, 0.95);
  stroke: rgba(148, 163, 184, 0.7);
  stroke-width: 1;
}

.network-diagram-live .network-diagram-neuron {
  stroke: rgba(var(--v-theme-primary), 0.9);
  fill: rgba(var(--v-theme-primary), 0.18);
}

.network-diagram-neuron-input,
.network-diagram-neuron-output {
  fill: rgba(15, 23, 42, 0.95);
}

.network-diagram-live .network-diagram-neuron-input,
.network-diagram-live .network-diagram-neuron-output {
  fill: rgba(var(--v-theme-primary), 0.32);
}

.network-diagram-ellipsis {
  font-size: 12px;
  fill: rgba(148, 163, 184, 0.85);
  font-weight: 700;
}

.network-diagram-label {
  font-size: 9px;
  fill: rgba(226, 232, 240, 0.92);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.network-diagram-sublabel {
  font-size: 8px;
  fill: rgba(148, 163, 184, 0.85);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.network-diagram-dim {
  font-size: 9.5px;
  fill: rgba(var(--v-theme-primary), 0.95);
  font-weight: 700;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
}

.network-diagram-post {
  font-size: 7.5px;
  fill: rgba(148, 163, 184, 0.8);
}
</style>
