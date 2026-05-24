<template>
  <div class="pipeline-shell" :class="{ 'pipeline-shell-mobile': isMobile }">
    <p v-if="isMobile" class="pipeline-scroll-hint text-caption">
      {{ scrollHint }}
    </p>
    <div
      ref="viewport"
      class="pipeline-viewport"
      :class="{ 'pipeline-viewport-vertical': isVertical }"
      :style="viewportStyle"
    >
      <div
        class="pipeline-canvas"
        :style="{ width: `${layout.width}px`, height: `${layout.height}px` }"
      >
        <div class="pipeline-grid" aria-hidden="true" />
        <svg
          class="pipeline-edges"
          :width="layout.width"
          :height="layout.height"
          aria-hidden="true"
        >
          <defs>
            <marker
              :id="arrowMarkerId"
              markerWidth="8"
              markerHeight="8"
              refX="7"
              refY="4"
              orient="auto"
            >
              <path d="M0,0 L8,4 L0,8 Z" fill="context-stroke" />
            </marker>
          </defs>
          <path
            v-for="edge in renderedEdges"
            :key="edge.id"
            :d="edge.d"
            class="pipeline-edge"
            :class="{ 'pipeline-edge-active': live }"
            :marker-end="`url(#${arrowMarkerId})`"
          />
        </svg>

        <div
          v-for="node in layout.nodes"
          :key="node.id"
          :ref="(el) => setNodeRef(node.id, el)"
          class="pipeline-node"
          :class="[
            `pipeline-node-${node.kind}`,
            {
              'pipeline-node-live': live,
              'pipeline-node-vertical': isVertical
            }
          ]"
          :style="{
            width: `${node.width}px`,
            height: `${node.height}px`,
            transform: `translate(${node.x}px, ${node.y}px)`
          }"
        >
          <span
            v-if="!isVertical"
            class="pipeline-port pipeline-port-in"
            aria-hidden="true"
          />
          <span
            v-else
            class="pipeline-port pipeline-port-top"
            aria-hidden="true"
          />
        <div
          class="pipeline-node-card"
          :class="{ 'pipeline-node-card-scroll': node.scrollable }"
        >
          <div class="pipeline-node-title">{{ node.title }}</div>
          <div v-if="node.subtitle" class="pipeline-node-subtitle">{{ node.subtitle }}</div>
          <div v-for="(line, idx) in node.lines" :key="idx" class="pipeline-node-line">
            <span class="pipeline-node-key">{{ line.k }}</span>
            <span class="pipeline-node-val">{{ line.v }}</span>
          </div>
        </div>
          <span
            v-if="!isVertical"
            class="pipeline-port pipeline-port-out"
            aria-hidden="true"
          />
          <span
            v-else
            class="pipeline-port pipeline-port-bottom"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buildPipelineGraph } from '@/simulation/pipelineGraphLayout.js';

let graphInstanceCounter = 0;

export default {
  name: 'ModelIOPipelineGraph',
  props: {
    telemetry: {
      type: Object,
      required: true
    },
    language: {
      type: String,
      default: 'zh'
    },
    live: {
      type: Boolean,
      default: false
    },
    isMobile: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    nodeRefs: {},
    renderedEdges: [],
    resizeObserver: null,
    arrowMarkerId: `pipeline-arrow-${++graphInstanceCounter}`
  }),
  computed: {
    layout() {
      const lang = this.language === 'en' ? 'en' : 'zh';
      return buildPipelineGraph(this.telemetry, lang, {
        layout: this.isMobile ? 'vertical' : 'horizontal'
      });
    },
    isVertical() {
      return this.layout.layout === 'vertical';
    },
    scrollHint() {
      return this.language === 'en'
        ? 'Scroll inside the chart to view all nodes'
        : '在图表区域内滑动查看完整流程';
    },
    viewportStyle() {
      if (!this.isMobile) {
        return {
          minWidth: `${this.layout.width}px`,
          minHeight: `${this.layout.height}px`
        };
      }
      return {
        minHeight: `${Math.min(this.layout.height, 360)}px`,
        maxHeight: 'min(42vh, 360px)'
      };
    }
  },
  watch: {
    layout: {
      handler() {
        this.scheduleEdgeUpdate();
      },
      deep: true
    },
    live() {
      this.scheduleEdgeUpdate();
    },
    isMobile() {
      this.scheduleEdgeUpdate();
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => this.scheduleEdgeUpdate());
    if (this.$refs.viewport) {
      this.resizeObserver.observe(this.$refs.viewport);
    }
    this.scheduleEdgeUpdate();
  },
  beforeUnmount() {
    this.resizeObserver?.disconnect();
    if (this._edgeRaf) {
      cancelAnimationFrame(this._edgeRaf);
    }
  },
  methods: {
    setNodeRef(id, el) {
      if (el) {
        this.nodeRefs[id] = el;
      } else {
        delete this.nodeRefs[id];
      }
    },
    scheduleEdgeUpdate() {
      if (this._edgeRaf) {
        cancelAnimationFrame(this._edgeRaf);
      }
      this._edgeRaf = requestAnimationFrame(() => {
        this._edgeRaf = null;
        this.$nextTick(() => this.updateEdges());
      });
    },
    updateEdges() {
      const canvas = this.$el?.querySelector('.pipeline-canvas');
      if (!canvas) {
        this.renderedEdges = [];
        return;
      }
      const canvasRect = canvas.getBoundingClientRect();
      const portPoint = (nodeId, side) => {
        const el = this.nodeRefs[nodeId];
        if (!el) {
          return null;
        }
        const selector = this.isVertical
          ? (side === 'out' ? '.pipeline-port-bottom' : '.pipeline-port-top')
          : (side === 'out' ? '.pipeline-port-out' : '.pipeline-port-in');
        const port = el.querySelector(selector);
        const target = port ?? el;
        const r = target.getBoundingClientRect();
        if (this.isVertical) {
          return {
            x: r.left + r.width / 2 - canvasRect.left,
            y: r.top + (side === 'out' ? r.height : 0) - canvasRect.top
          };
        }
        return {
          x: r.left + (side === 'out' ? r.width : 0) - canvasRect.left,
          y: r.top + r.height / 2 - canvasRect.top
        };
      };

      this.renderedEdges = this.layout.edges
        .map((edge) => {
          const from = portPoint(edge.from, 'out');
          const to = portPoint(edge.to, 'in');
          if (!from || !to) {
            return null;
          }
          return {
            id: edge.id,
            d: this.isVertical
              ? this.verticalBezierPath(from, to)
              : this.horizontalBezierPath(from, to)
          };
        })
        .filter(Boolean);
    },
    horizontalBezierPath(from, to) {
      const dx = Math.max(40, Math.abs(to.x - from.x) * 0.45);
      const c1x = from.x + dx;
      const c2x = to.x - dx;
      return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
    },
    verticalBezierPath(from, to) {
      const dy = Math.max(28, Math.abs(to.y - from.y) * 0.4);
      const c1y = from.y + dy;
      const c2y = to.y - dy;
      return `M ${from.x} ${from.y} C ${from.x} ${c1y}, ${to.x} ${c2y}, ${to.x} ${to.y}`;
    }
  }
};
</script>

<style scoped>
.pipeline-shell-mobile {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pipeline-scroll-hint {
  margin: 0;
  padding: 0 4px;
  color: rgba(var(--v-theme-on-surface), 0.55);
  line-height: 1.3;
}

.pipeline-viewport {
  overflow: auto;
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(56, 189, 148, 0.15);
  background: #0b1018;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-x pan-y;
}

.pipeline-viewport-vertical {
  overflow-x: hidden;
  overflow-y: auto;
  touch-action: pan-y;
}

.pipeline-canvas {
  position: relative;
  flex-shrink: 0;
  margin: 0 auto;
}

.pipeline-grid {
  position: absolute;
  inset: 0;
  background-color: #0b1018;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.14) 1px, transparent 0);
  background-size: 18px 18px;
  pointer-events: none;
}

.pipeline-edges {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: visible;
}

.pipeline-edge {
  fill: none;
  stroke: rgba(100, 116, 139, 0.55);
  stroke-width: 1.5;
  transition: stroke 0.2s ease;
}

.pipeline-edge-active {
  stroke: rgba(52, 211, 153, 0.85);
  stroke-width: 2;
  filter: drop-shadow(0 0 4px rgba(52, 211, 153, 0.35));
}

.pipeline-node {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
}

.pipeline-node-vertical {
  flex-direction: column;
  align-items: stretch;
}

.pipeline-node-card {
  flex: 1;
  min-width: 0;
  margin: 0 6px;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid rgba(71, 85, 105, 0.65);
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.pipeline-node-vertical .pipeline-node-card {
  margin: 0 8px;
}

.pipeline-node-live .pipeline-node-card {
  border-color: rgba(52, 211, 153, 0.45);
  box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.12), 0 4px 14px rgba(0, 0, 0, 0.4);
}

.pipeline-node-warehouse .pipeline-node-card,
.pipeline-node-model .pipeline-node-card {
  border-color: rgba(52, 211, 153, 0.35);
}

.pipeline-node-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pipeline-node-subtitle {
  font-size: 0.62rem;
  color: #94a3b8;
  margin-top: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pipeline-node-line {
  display: flex;
  gap: 4px;
  margin-top: 3px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.6rem;
  line-height: 1.25;
}

.pipeline-shell-mobile .pipeline-node-title {
  font-size: 0.78rem;
}

.pipeline-shell-mobile .pipeline-node-line {
  font-size: 0.65rem;
}

.pipeline-node-key {
  color: #64748b;
  flex-shrink: 0;
}

.pipeline-node-val {
  color: #a7f3d0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.pipeline-port {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  background: #1e293b;
  border: 2px solid #475569;
}

.pipeline-node-live .pipeline-port {
  border-color: #34d399;
  background: #064e3b;
  box-shadow: 0 0 6px rgba(52, 211, 153, 0.5);
}

.pipeline-node-vertical .pipeline-port-top {
  margin: 0 auto 2px;
}

.pipeline-node-vertical .pipeline-port-bottom {
  margin: 2px auto 0;
}

.pipeline-node-card-scroll {
  max-height: 140px;
  overflow-y: auto;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.pipeline-shell-mobile .pipeline-node-card-scroll {
  max-height: 120px;
}
</style>
