<template>
  <div class="pipeline-shell" :class="{ 'pipeline-shell-mobile': isMobile }">
    <p v-if="isMobile" class="pipeline-scroll-hint text-caption">
      {{ scrollHint }}
    </p>
    <div
      ref="viewport"
      class="pipeline-viewport"
      :class="{ 'pipeline-viewport-panzoom': isMobile }"
      :style="viewportStyle"
    >
      <div
        class="pipeline-transform"
        :style="transformStyle"
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
                'pipeline-node-live': live
              }
            ]"
            :style="{
              width: `${node.width}px`,
              height: `${node.height}px`,
              transform: `translate(${node.x}px, ${node.y}px)`
            }"
          >
            <span
              class="pipeline-port pipeline-port-in"
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
              class="pipeline-port pipeline-port-out"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { buildPipelineGraph } from '@/simulation/pipelineGraphLayout.js';

let graphInstanceCounter = 0;

const MIN_SCALE = 0.25;
const MAX_SCALE = 3;

function touchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX;
  const dy = touches[0].clientY - touches[1].clientY;
  return Math.hypot(dx, dy);
}

function touchCenter(touches) {
  return {
    x: (touches[0].clientX + touches[1].clientX) / 2,
    y: (touches[0].clientY + touches[1].clientY) / 2
  };
}

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
    arrowMarkerId: `pipeline-arrow-${++graphInstanceCounter}`,
    panX: 0,
    panY: 0,
    scale: 1,
    gesture: null
  }),
  computed: {
    layout() {
      const lang = this.language === 'en' ? 'en' : 'zh';
      return buildPipelineGraph(this.telemetry, lang, { layout: 'horizontal' });
    },
    scrollHint() {
      return this.language === 'en'
        ? 'Drag to pan · Pinch to zoom'
        : '单指拖动平移 · 双指捏合缩放';
    },
    viewportStyle() {
      if (!this.isMobile) {
        return {
          minWidth: `${this.layout.width}px`,
          minHeight: `${this.layout.height}px`
        };
      }
      return null;
    },
    transformStyle() {
      if (!this.isMobile) {
        return null;
      }
      return {
        transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`,
        transformOrigin: '0 0',
        width: `${this.layout.width}px`,
        height: `${this.layout.height}px`
      };
    }
  },
  watch: {
    layout: {
      handler() {
        this.scheduleEdgeUpdate();
        this.scheduleViewportFit();
      },
      deep: true
    },
    live() {
      this.scheduleEdgeUpdate();
    },
    isMobile(isMobile) {
      this.teardownTouchHandlers();
      if (isMobile) {
        this.$nextTick(() => {
          this.setupTouchHandlers();
          this.fitViewport();
        });
      } else {
        this.panX = 0;
        this.panY = 0;
        this.scale = 1;
      }
      this.scheduleEdgeUpdate();
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleEdgeUpdate();
      this.scheduleViewportFit();
    });
    if (this.$refs.viewport) {
      this.resizeObserver.observe(this.$refs.viewport);
    }
    if (this.isMobile) {
      this.setupTouchHandlers();
    }
    this.scheduleEdgeUpdate();
    this.scheduleViewportFit();
  },
  beforeUnmount() {
    this.teardownTouchHandlers();
    this.resizeObserver?.disconnect();
    if (this._edgeRaf) {
      cancelAnimationFrame(this._edgeRaf);
    }
    if (this._fitRaf) {
      cancelAnimationFrame(this._fitRaf);
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
    setupTouchHandlers() {
      const viewport = this.$refs.viewport;
      if (!viewport || this._touchViewport === viewport) {
        return;
      }
      this.teardownTouchHandlers();
      this._touchViewport = viewport;
      this._onTouchStart = (e) => this.handleTouchStart(e);
      this._onTouchMove = (e) => this.handleTouchMove(e);
      this._onTouchEnd = (e) => this.handleTouchEnd(e);
      viewport.addEventListener('touchstart', this._onTouchStart, { passive: true });
      viewport.addEventListener('touchmove', this._onTouchMove, { passive: false });
      viewport.addEventListener('touchend', this._onTouchEnd, { passive: true });
      viewport.addEventListener('touchcancel', this._onTouchEnd, { passive: true });
    },
    teardownTouchHandlers() {
      const viewport = this._touchViewport;
      if (!viewport) {
        return;
      }
      viewport.removeEventListener('touchstart', this._onTouchStart);
      viewport.removeEventListener('touchmove', this._onTouchMove);
      viewport.removeEventListener('touchend', this._onTouchEnd);
      viewport.removeEventListener('touchcancel', this._onTouchEnd);
      this._touchViewport = null;
      this.gesture = null;
    },
    handleTouchStart(e) {
      if (!this.isMobile) {
        return;
      }
      const touches = e.touches;
      const rect = this.$refs.viewport.getBoundingClientRect();
      if (touches.length === 1) {
        this.gesture = {
          mode: 'pan',
          startX: touches[0].clientX,
          startY: touches[0].clientY,
          startPanX: this.panX,
          startPanY: this.panY
        };
        return;
      }
      if (touches.length >= 2) {
        const center = touchCenter(touches);
        const focalX = (center.x - rect.left - this.panX) / this.scale;
        const focalY = (center.y - rect.top - this.panY) / this.scale;
        this.gesture = {
          mode: 'pinch',
          startDistance: touchDistance(touches),
          startScale: this.scale,
          focalX,
          focalY,
          rectLeft: rect.left,
          rectTop: rect.top
        };
      }
    },
    handleTouchMove(e) {
      if (!this.isMobile || !this.gesture) {
        return;
      }
      const touches = e.touches;
      if (this.gesture.mode === 'pan' && touches.length === 1) {
        e.preventDefault();
        this.panX = this.gesture.startPanX + (touches[0].clientX - this.gesture.startX);
        this.panY = this.gesture.startPanY + (touches[0].clientY - this.gesture.startY);
        this.scheduleEdgeUpdate();
        return;
      }
      if (touches.length >= 2) {
        e.preventDefault();
        const center = touchCenter(touches);
        const distance = touchDistance(touches);
        if (this.gesture.mode === 'pan') {
          const rect = this.$refs.viewport.getBoundingClientRect();
          const focalX = (center.x - rect.left - this.panX) / this.scale;
          const focalY = (center.y - rect.top - this.panY) / this.scale;
          this.gesture = {
            mode: 'pinch',
            startDistance: distance,
            startScale: this.scale,
            focalX,
            focalY,
            rectLeft: rect.left,
            rectTop: rect.top
          };
        }
        const ratio = distance / this.gesture.startDistance;
        const nextScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, this.gesture.startScale * ratio));
        this.scale = nextScale;
        this.panX = center.x - this.gesture.rectLeft - this.gesture.focalX * nextScale;
        this.panY = center.y - this.gesture.rectTop - this.gesture.focalY * nextScale;
        this.scheduleEdgeUpdate();
      }
    },
    handleTouchEnd(e) {
      if (!this.gesture) {
        return;
      }
      if (e.touches.length === 0) {
        this.gesture = null;
        return;
      }
      if (e.touches.length === 1 && this.gesture.mode === 'pinch') {
        this.gesture = {
          mode: 'pan',
          startX: e.touches[0].clientX,
          startY: e.touches[0].clientY,
          startPanX: this.panX,
          startPanY: this.panY
        };
      }
    },
    scheduleViewportFit() {
      if (!this.isMobile) {
        return;
      }
      if (this._fitRaf) {
        cancelAnimationFrame(this._fitRaf);
      }
      this._fitRaf = requestAnimationFrame(() => {
        this._fitRaf = null;
        this.fitViewport();
      });
    },
    fitViewport() {
      const viewport = this.$refs.viewport;
      if (!this.isMobile || !viewport || !this.layout.width) {
        return;
      }
      const pad = 8;
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      if (vw < 1 || vh < 1) {
        return;
      }
      const fitScale = Math.min(
        (vw - pad * 2) / this.layout.width,
        (vh - pad * 2) / this.layout.height,
        1
      );
      this.scale = Math.max(MIN_SCALE, fitScale);
      this.panX = pad + (vw - pad * 2 - this.layout.width * this.scale) / 2;
      this.panY = pad + (vh - pad * 2 - this.layout.height * this.scale) / 2;
      this.scheduleEdgeUpdate();
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
        const selector = side === 'out' ? '.pipeline-port-out' : '.pipeline-port-in';
        const port = el.querySelector(selector);
        const target = port ?? el;
        const r = target.getBoundingClientRect();
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
            d: this.horizontalBezierPath(from, to)
          };
        })
        .filter(Boolean);
    },
    horizontalBezierPath(from, to) {
      const dx = Math.max(40, Math.abs(to.x - from.x) * 0.45);
      const c1x = from.x + dx;
      const c2x = to.x - dx;
      return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
    }
  }
};
</script>

<style scoped>
.pipeline-shell-mobile {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;
  gap: 6px;
}

.pipeline-scroll-hint {
  margin: 0;
  padding: 0 4px;
  flex-shrink: 0;
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

.pipeline-viewport-panzoom {
  flex: 1 1 auto;
  min-height: 220px;
  overflow: hidden;
  touch-action: none;
  user-select: none;
}

.pipeline-transform {
  position: relative;
  will-change: transform;
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
