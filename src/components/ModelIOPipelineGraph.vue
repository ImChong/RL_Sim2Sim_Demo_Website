<template>
  <div class="pipeline-shell" :class="{ 'pipeline-shell-mobile': isMobile }">
    <p class="pipeline-scroll-hint text-caption">
      {{ scrollHint }}
    </p>
    <div
      ref="viewport"
      class="pipeline-viewport pipeline-viewport-zoom"
      :style="viewportStyle"
    >
      <div
        v-if="layout.lanes && layout.lanes.length"
        class="pipeline-lane-headers"
        aria-hidden="true"
      >
        <div
          v-for="lane in layout.lanes"
          :key="`lane-header-${lane.id}`"
          class="pipeline-lane-header"
          :style="{
            left: `${lane.x * scale + panX}px`,
            width: `${lane.width * scale}px`
          }"
        >
          <span class="pipeline-lane-header-text">{{ lane.label }}</span>
        </div>
      </div>
      <div
        class="pipeline-transform"
        :style="transformStyle"
      >
        <div
          class="pipeline-canvas"
          :style="{ width: `${layout.width}px`, height: `${layout.height}px` }"
        >
          <div class="pipeline-grid" aria-hidden="true" />
          <div
            v-for="(lane, idx) in layout.lanes"
            :key="`lane-${lane.id}`"
            class="pipeline-lane"
            :class="[`pipeline-lane-${lane.id}`, { 'pipeline-lane-alt': idx % 2 === 1 }]"
            :style="{
              transform: `translate(${lane.x}px, 0)`,
              width: `${lane.width}px`,
              height: `${layout.height}px`
            }"
            aria-hidden="true"
          />
          <svg
            class="pipeline-edges"
            :width="layout.width"
            :height="layout.height"
            aria-hidden="true"
          >
            <defs>
              <marker
                :id="arrowMarkerId"
                markerWidth="10"
                markerHeight="10"
                refX="8"
                refY="5"
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
              :class="{
                'pipeline-edge-active': live,
                'pipeline-edge-scope': edge.kind === 'scope'
              }"
              :marker-end="edge.kind === 'scope' ? undefined : `url(#${arrowMarkerId})`"
            />
          </svg>

          <div
            v-for="node in layout.nodes"
            :key="node.id"
            :data-node-id="node.id"
            class="pipeline-node"
            :class="[
              `pipeline-node-${node.kind}`,
              {
                'pipeline-node-live': live,
                'pipeline-node-scope': node.kind === 'scope',
                'pipeline-node-clickable': isNodeClickable(node),
                'pipeline-node-probed': isNodeProbed(node)
              }
            ]"
            :style="{
              width: `${node.width}px`,
              height: `${node.height}px`,
              transform: `translate(${node.x}px, ${node.y}px)`
            }"
          >
            <div class="pipeline-node-body">
              <span
                class="pipeline-port pipeline-port-in"
                aria-hidden="true"
              />
              <div class="pipeline-node-inner">
                <div class="pipeline-node-head">
                  <div class="pipeline-node-title" :title="node.title">{{ node.title }}</div>
                  <div
                    v-if="node.subtitle"
                    class="pipeline-node-subtitle"
                    :title="node.subtitle"
                  >{{ node.subtitle }}</div>
                </div>
                <div
                  class="pipeline-node-card"
                  :class="{ 'pipeline-node-card-clickable': isNodeClickable(node) }"
                  @click.stop="onNodeClick(node)"
                >
                  <div
                    v-for="(line, idx) in node.lines"
                    :key="idx"
                    class="pipeline-node-line"
                    :class="{
                      'pipeline-node-line-probed': isLineProbed(node.id, line.k)
                    }"
                  >
                    <span class="pipeline-node-key" :title="line.k">{{ line.k }}</span>
                    <span
                      v-if="line.v"
                      class="pipeline-node-val pipeline-node-meta"
                      :title="line.v"
                    >{{ line.v }}</span>
                  </div>
                  <v-icon
                    v-if="isNodeClickable(node)"
                    icon="mdi-chart-line-variant"
                    size="12"
                    class="pipeline-node-scope-hint"
                  />
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
  </div>
</template>

<script>
import { buildPipelineGraph } from '@/simulation/pipelineGraphLayout.js';
import { portPointFromLayoutNode } from '@/simulation/pipelineGraphEdgeCoords.js';
import { isProbeableLine } from '@/simulation/signalScope.js';

let graphInstanceCounter = 0;

const FIT_MIN_SCALE = 0.12;
const MIN_SCALE = 0.25;
const MAX_SCALE = 3;
const WHEEL_ZOOM_FACTOR = 1.1;

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

function clampScale(scale) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale));
}

export default {
  name: 'ModelIOPipelineGraph',
  components: {},
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
    },
    activeProbes: {
      type: Array,
      default: () => []
    }
  },
  emits: ['probe-node', 'open-scope'],
  data: () => ({
    resizeObserver: null,
    arrowMarkerId: `pipeline-arrow-${++graphInstanceCounter}`,
    panX: 0,
    panY: 0,
    scale: 1,
    gesture: null,
    userHasGestured: false
  }),
  computed: {
    layout() {
      const lang = this.language === 'en' ? 'en' : 'zh';
      return buildPipelineGraph(this.telemetry, lang, {
        layout: 'horizontal',
        activeProbes: this.activeProbes
      });
    },
    activeProbeIds() {
      return new Set(this.activeProbes.map((probe) => probe.id));
    },
    scrollHint() {
      if (this.isMobile) {
        return this.language === 'en'
          ? 'Click a node to view its signals in the scope · Pinch to zoom'
          : '点击节点在示波器查看信号曲线 · 双指缩放';
      }
      return this.language === 'en'
        ? 'Click a node to view its signals in the scope · Wheel to zoom'
        : '点击节点在示波器查看信号曲线 · 滚轮缩放';
    },
    viewportStyle() {
      if (this.isMobile) {
        return null;
      }
      return {
        flex: '1 1 auto',
        minHeight: '280px'
      };
    },
    transformStyle() {
      return {
        transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.scale})`,
        transformOrigin: '0 0',
        width: `${this.layout.width}px`,
        height: `${this.layout.height}px`
      };
    },
    nodeById() {
      return new Map(this.layout.nodes.map((node) => [node.id, node]));
    },
    renderedEdges() {
      const portPoint = (nodeId, side) =>
        portPointFromLayoutNode(this.nodeById.get(nodeId), side);

      return this.layout.edges
        .map((edge) => {
          const from = portPoint(edge.from, 'out');
          const to = portPoint(edge.to, 'in');
          if (!from || !to) {
            return null;
          }
          return {
            id: edge.id,
            d: this.horizontalBezierPath(from, to),
            kind: edge.kind
          };
        })
        .filter(Boolean);
    }
  },
  watch: {
    layout: {
      handler() {
        this.scheduleViewportFit();
      },
      deep: true
    },
    isMobile() {
      this.userHasGestured = false;
      this.scheduleViewportFit();
    }
  },
  mounted() {
    this.resizeObserver = new ResizeObserver(() => {
      this.scheduleViewportFit();
    });
    if (this.$refs.viewport) {
      this.resizeObserver.observe(this.$refs.viewport);
    }
    this.setupZoomHandlers();
    this.scheduleViewportFit();
  },
  beforeUnmount() {
    this.teardownZoomHandlers();
    this.resizeObserver?.disconnect();
    if (this._fitRaf) {
      cancelAnimationFrame(this._fitRaf);
    }
  },
  methods: {
    markUserGestured() {
      this.userHasGestured = true;
    },
    setupZoomHandlers() {
      const viewport = this.$refs.viewport;
      if (!viewport || this._zoomViewport === viewport) {
        return;
      }
      this.teardownZoomHandlers();
      this._zoomViewport = viewport;

      this._onWheel = (e) => this.handleWheel(e);
      this._onTouchStart = (e) => this.handleTouchStart(e);
      this._onTouchMove = (e) => this.handleTouchMove(e);
      this._onTouchEnd = (e) => this.handleTouchEnd(e);
      viewport.addEventListener('wheel', this._onWheel, { passive: false });
      viewport.addEventListener('touchstart', this._onTouchStart, { passive: true });
      viewport.addEventListener('touchmove', this._onTouchMove, { passive: false });
      viewport.addEventListener('touchend', this._onTouchEnd, { passive: true });
      viewport.addEventListener('touchcancel', this._onTouchEnd, { passive: true });
    },
    teardownZoomHandlers() {
      const viewport = this._zoomViewport;
      if (!viewport) {
        return;
      }
      viewport.removeEventListener('wheel', this._onWheel);
      viewport.removeEventListener('touchstart', this._onTouchStart);
      viewport.removeEventListener('touchmove', this._onTouchMove);
      viewport.removeEventListener('touchend', this._onTouchEnd);
      viewport.removeEventListener('touchcancel', this._onTouchEnd);
      this._zoomViewport = null;
      this.gesture = null;
    },
    zoomAt(clientX, clientY, nextScale) {
      const viewport = this.$refs.viewport;
      if (!viewport) {
        return;
      }
      const rect = viewport.getBoundingClientRect();
      const focalX = (clientX - rect.left - this.panX) / this.scale;
      const focalY = (clientY - rect.top - this.panY) / this.scale;
      const clamped = clampScale(nextScale);
      this.scale = clamped;
      this.panX = clientX - rect.left - focalX * clamped;
      this.panY = clientY - rect.top - focalY * clamped;
      this.markUserGestured();
    },
    handleWheel(e) {
      if (!this.$refs.viewport?.contains(e.target)) {
        return;
      }
      e.preventDefault();
      const factor = e.deltaY < 0 ? WHEEL_ZOOM_FACTOR : 1 / WHEEL_ZOOM_FACTOR;
      this.zoomAt(e.clientX, e.clientY, this.scale * factor);
    },
    handleTouchStart(e) {
      if (e.touches.length < 2) {
        return;
      }
      const rect = this.$refs.viewport.getBoundingClientRect();
      const center = touchCenter(e.touches);
      const focalX = (center.x - rect.left - this.panX) / this.scale;
      const focalY = (center.y - rect.top - this.panY) / this.scale;
      this.gesture = {
        mode: 'pinch',
        startDistance: touchDistance(e.touches),
        startScale: this.scale,
        focalX,
        focalY,
        rectLeft: rect.left,
        rectTop: rect.top
      };
    },
    handleTouchMove(e) {
      if (!this.gesture || e.touches.length < 2) {
        return;
      }
      e.preventDefault();
      const center = touchCenter(e.touches);
      const distance = touchDistance(e.touches);
      const ratio = distance / this.gesture.startDistance;
      const nextScale = clampScale(this.gesture.startScale * ratio);
      this.scale = nextScale;
      this.panX = center.x - this.gesture.rectLeft - this.gesture.focalX * nextScale;
      this.panY = center.y - this.gesture.rectTop - this.gesture.focalY * nextScale;
      this.markUserGestured();
    },
    handleTouchEnd(e) {
      if (!this.gesture || e.touches.length >= 2) {
        return;
      }
      this.gesture = null;
    },
    scheduleViewportFit() {
      if (this._fitRaf) {
        cancelAnimationFrame(this._fitRaf);
      }
      this._fitRaf = requestAnimationFrame(() => {
        this._fitRaf = null;
        this.fitViewport();
      });
    },
    fitViewport() {
      if (this.userHasGestured) {
        return;
      }
      const viewport = this.$refs.viewport;
      if (!viewport || !this.layout.width) {
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
      this.scale = Math.max(FIT_MIN_SCALE, fitScale);
      this.panX = pad + (vw - pad * 2 - this.layout.width * this.scale) / 2;
      this.panY = pad + (vh - pad * 2 - this.layout.height * this.scale) / 2;
    },
    horizontalBezierPath(from, to) {
      const dx = Math.max(56, Math.abs(to.x - from.x) * 0.5);
      const c1x = from.x + dx;
      const c2x = to.x - dx;
      return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
    },
    isLineProbeable(line) {
      return isProbeableLine(line);
    },
    isNodeClickable(node) {
      if (!node) {
        return false;
      }
      if (node.kind === 'scope') {
        return true;
      }
      return node.lines?.some((line) => this.isLineProbeable(line));
    },
    isNodeProbed(node) {
      if (!node?.lines?.length) {
        return false;
      }
      return node.lines.some((line) => this.isLineProbed(node.id, line.k));
    },
    isLineProbed(nodeId, lineKey) {
      return this.activeProbeIds.has(`${nodeId}:${lineKey}`);
    },
    onNodeClick(node) {
      if (node.kind === 'scope') {
        this.$emit('open-scope');
        return;
      }
      if (!this.isNodeClickable(node)) {
        return;
      }
      this.$emit('probe-node', node);
    }
  }
};
</script>

<style scoped>
.pipeline-shell {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1 1 auto;
  min-height: 0;
}

.pipeline-shell-mobile {
  /* mobile inherits flex sizing from base */
}

.pipeline-scroll-hint {
  margin: 0;
  padding: 0 4px;
  flex-shrink: 0;
  color: rgba(var(--v-theme-on-surface), 0.55);
  line-height: 1.3;
}

.pipeline-viewport {
  position: relative;
  max-width: 100%;
  border-radius: 10px;
  border: 1px solid rgba(var(--v-theme-primary), 0.2);
  background: #0b1018;
  overscroll-behavior: contain;
}

.pipeline-lane {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.018);
  border-left: 1px dashed rgba(255, 255, 255, 0.06);
}

.pipeline-lane:first-of-type {
  border-left: none;
}

.pipeline-lane-alt {
  background: rgba(255, 255, 255, 0.04);
}

.pipeline-lane-headers {
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 26px;
  pointer-events: none;
  overflow: hidden;
  z-index: 4;
}

.pipeline-lane-header {
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  padding: 0 8px;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
}

.pipeline-lane-header-text {
  display: inline-block;
  max-width: 100%;
  padding: 2px 10px;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(11, 16, 24, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 999px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pipeline-viewport-zoom {
  flex: 1 1 auto;
  min-height: 220px;
  overflow: hidden;
  touch-action: none;
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
  stroke: rgba(var(--v-theme-primary), 0.85);
  stroke-width: 2;
  filter: drop-shadow(0 0 4px rgba(var(--v-theme-primary), 0.35));
}

.pipeline-edge-scope {
  stroke: rgba(76, 179, 212, 0.75);
  stroke-width: 1.5;
  stroke-dasharray: 6 4;
}

.pipeline-node-scope .pipeline-node-card {
  border-color: rgba(76, 179, 212, 0.55);
  background: linear-gradient(180deg, rgba(15, 35, 48, 0.95) 0%, rgba(10, 20, 30, 0.98) 100%);
}

.pipeline-node {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}

.pipeline-node-body {
  display: flex;
  align-items: stretch;
  width: 100%;
  height: 100%;
  min-height: 0;
}

.pipeline-node-inner {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  min-height: 0;
  margin: 0 6px;
}

.pipeline-node-head {
  flex-shrink: 0;
  padding: 5px 8px 2px;
  border-radius: 6px 6px 0 0;
}

.pipeline-node-card {
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 6px 8px;
  border-radius: 8px;
  border: 1px solid rgba(71, 85, 105, 0.65);
  background: linear-gradient(180deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  cursor: default;
  user-select: text;
  position: relative;
}

.pipeline-node-card-clickable {
  cursor: pointer;
}

.pipeline-node-card-clickable:hover {
  border-color: rgba(var(--v-theme-primary), 0.55);
  background: linear-gradient(180deg, rgba(35, 48, 68, 0.96) 0%, rgba(18, 28, 44, 0.99) 100%);
}

.pipeline-node-probed .pipeline-node-card {
  border-color: rgba(76, 179, 212, 0.55);
  box-shadow: 0 0 0 1px rgba(76, 179, 212, 0.2), 0 4px 14px rgba(0, 0, 0, 0.4);
}

.pipeline-node-scope-hint {
  position: absolute;
  top: 6px;
  right: 6px;
  opacity: 0.55;
  pointer-events: none;
}

.pipeline-node-live .pipeline-node-card {
  border-color: rgba(var(--v-theme-primary), 0.45);
  box-shadow: 0 0 0 1px rgba(var(--v-theme-primary), 0.12), 0 4px 14px rgba(0, 0, 0, 0.4);
}

.pipeline-node-warehouse .pipeline-node-card,
.pipeline-node-model .pipeline-node-card {
  border-color: rgba(var(--v-theme-primary), 0.35);
}

.pipeline-shell:not(.pipeline-shell-mobile) .pipeline-node-title {
  font-size: 0.8rem;
}

.pipeline-shell:not(.pipeline-shell-mobile) .pipeline-node-subtitle {
  font-size: 0.68rem;
}

.pipeline-shell:not(.pipeline-shell-mobile) .pipeline-node-line {
  font-size: 0.68rem;
  margin-top: 4px;
}

.pipeline-shell:not(.pipeline-shell-mobile) .pipeline-node-card {
  padding: 8px 10px;
}

.pipeline-shell:not(.pipeline-shell-mobile) .pipeline-node-inner {
  margin: 0 8px;
}

.pipeline-shell:not(.pipeline-shell-mobile) .pipeline-port {
  width: 10px;
  height: 10px;
}

.pipeline-node-title {
  font-size: 0.72rem;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1.25;
  white-space: nowrap;
}

.pipeline-node-subtitle {
  font-size: 0.62rem;
  color: #94a3b8;
  margin-top: 2px;
  white-space: nowrap;
  overflow-wrap: anywhere;
  word-break: break-all;
}

.pipeline-node-line {
  display: flex;
  gap: 6px;
  margin-top: 3px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.6rem;
  line-height: 1.3;
}

.pipeline-node-line-probed .pipeline-node-key {
  color: rgba(76, 179, 212, 0.95);
}

.pipeline-shell-mobile .pipeline-node-title {
  font-size: 0.78rem;
}

.pipeline-shell-mobile .pipeline-node-line {
  font-size: 0.65rem;
}

.pipeline-node-key {
  color: #64748b;
  white-space: nowrap;
  flex: 0 1 auto;
  min-width: 0;
}

.pipeline-node-val {
  color: #94a3b8;
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: auto;
  padding-left: 8px;
}

.pipeline-node-meta {
  color: #94a3b8;
}

.pipeline-port {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  align-self: center;
  background: #1e293b;
  border: 2px solid #475569;
}

.pipeline-node-live .pipeline-port {
  border-color: rgba(var(--v-theme-primary), 0.9);
  background: rgba(var(--v-theme-primary), 0.25);
  box-shadow: 0 0 6px rgba(var(--v-theme-primary), 0.5);
}

</style>
