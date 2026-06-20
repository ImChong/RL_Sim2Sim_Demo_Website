<template>
  <div
    :class="[
      'model-io-dock',
      {
        'model-io-dock-mobile': isSmallScreen,
        'model-io-dock-sheet-open': isSmallScreen && expanded
      }
    ]"
  >
    <v-btn
      v-show="!isSmallScreen || !expanded"
      class="model-io-toggle"
      :class="{ 'model-io-toggle-mobile': isSmallScreen }"
      size="small"
      :color="expanded ? 'primary' : 'surface-variant'"
      :variant="expanded ? 'flat' : 'elevated'"
      :aria-label="expanded ? t.collapsePanel : t.expandPanel"
      :aria-expanded="expanded"
      @click="togglePanel"
    >
      <v-icon :icon="expanded ? 'mdi-graph-outline' : 'mdi-graph'" />
      <span v-if="!isSmallScreen" class="ml-1">{{ expanded ? t.collapsePanel : t.expandPanel }}</span>
      <span v-else class="ml-1">{{ t.expandShort }}</span>
    </v-btn>

    <div
      v-if="isSmallScreen && expanded"
      class="model-io-backdrop"
      aria-hidden="true"
      @click="closePanel"
    />

    <v-card
      v-show="expanded"
      ref="panelCard"
      :class="[
        'model-io-panel',
        {
          'model-io-panel-sheet': isSmallScreen,
          'model-io-panel-desktop': !isSmallScreen
        }
      ]"
      :style="desktopPanelStyle"
      elevation="8"
      role="region"
      :aria-label="t.panelTitle"
    >
      <v-card-title class="model-io-title">
        <span>{{ t.panelTitle }}</span>
        <v-chip v-if="telemetryLive" size="x-small" color="primary" variant="tonal">
          {{ t.live }}
        </v-chip>
        <v-chip v-else size="x-small" color="on-surface" variant="outlined">
          {{ t.waiting }}
        </v-chip>
        <v-spacer />
        <v-btn-toggle
          v-if="telemetry.ready"
          v-model="viewTab"
          density="compact"
          mandatory
          color="primary"
          class="model-io-tabs"
        >
          <v-btn value="graph" size="x-small" variant="text">
            <v-icon icon="mdi-graph-outline" size="small" start />
            {{ t.tabGraph }}
          </v-btn>
          <v-btn value="architecture" size="x-small" variant="text">
            <v-icon icon="mdi-sitemap-outline" size="small" start />
            {{ t.tabArchitecture }}
          </v-btn>
          <v-btn value="scope" size="x-small" variant="text">
            <v-icon icon="mdi-chart-line-variant" size="small" start />
            {{ t.tabScope }}
          </v-btn>
        </v-btn-toggle>
        <v-btn
          v-if="isSmallScreen"
          icon="mdi-close"
          size="x-small"
          variant="text"
          :aria-label="t.collapsePanel"
          @click="closePanel"
        />
      </v-card-title>

      <v-card-text class="model-io-body">
        <p v-if="!telemetry.ready" class="text-caption text-medium-emphasis">
          {{ t.notReady }}
        </p>

        <template v-else>
          <p v-if="!isSmallScreen && viewTab === 'graph'" class="text-caption text-medium-emphasis pipeline-hint">
            {{ t.graphHint }}
          </p>
          <ModelIOPipelineGraph
            v-show="viewTab === 'graph'"
            :telemetry="telemetry"
            :language="language"
            :live="telemetryLive"
            :is-mobile="isSmallScreen"
            :active-probes="activeProbes"
            @probe-node="onProbeNode"
            @open-scope="openScopeTab"
          />
          <OnnxNetronViewer
            v-if="viewTab === 'architecture'"
            :model-path="telemetry.model.path"
            :language="language"
          />
          <SignalOscilloscope
            v-show="viewTab === 'scope'"
            :snapshot="scopeSnapshot"
            :active-probe-ids="activeProbeIds"
            :paused="signalScope.paused"
            :channels-label="t.scopeChannels"
            :samples-label="t.scopeSamples"
            :window-label="t.scopeWindow"
            :window-seconds="scopeWindowSeconds"
            :window-min-seconds="scopeWindowMinSeconds"
            :window-max-seconds="scopeWindowMaxSeconds"
            :window-input-aria-label="t.scopeWindowInput"
            :reset-zoom-label="t.scopeResetZoom"
            :clear-label="t.scopeClear"
            :pause-label="t.scopePause"
            :resume-label="t.scopeResume"
            :empty-label="t.scopeEmpty"
            :hint="t.scopeHint"
            :can-reset-zoom="Boolean(scopeZoom)"
            :zoom="scopeZoom"
            @toggle-pause="toggleScopePause"
            @reset-zoom="resetScopeZoom"
            @clear="clearScope"
            @remove-probe="onRemoveProbe"
            @update-window-seconds="onScopeWindowChange"
          />
        </template>
      </v-card-text>

      <template v-if="!isSmallScreen">
        <div
          class="model-io-resize-handle model-io-resize-e"
          role="separator"
          :aria-label="t.resizeWidth"
          @mousedown.prevent="startPanelResize('e', $event)"
        />
        <div
          class="model-io-resize-handle model-io-resize-n"
          role="separator"
          :aria-label="t.resizeHeight"
          @mousedown.prevent="startPanelResize('n', $event)"
        />
        <div
          class="model-io-resize-handle model-io-resize-ne"
          role="separator"
          :aria-label="t.resizeBoth"
          @mousedown.prevent="startPanelResize('ne', $event)"
        />
      </template>
    </v-card>
  </div>
</template>

<script>
import { buildPolicyTelemetry } from '@/simulation/policyTelemetry.js';
import { buildParkourPolicyTelemetry } from '@/simulation/parkourPolicyTelemetry.js';
import ModelIOPipelineGraph from '@/components/ModelIOPipelineGraph.vue';
import OnnxNetronViewer from '@/components/OnnxNetronViewer.vue';
import SignalOscilloscope from '@/components/SignalOscilloscope.vue';
import {
  clearScopeBuffer,
  createSignalScope,
  getScopeSnapshot,
  listNodeProbes,
  pushScopeSample,
  removeScopeProbe,
  setScopeProbes,
  setScopeWindowSeconds
} from '@/simulation/signalScope.js';
import {
  clampPanelSize,
  loadPanelSize,
  savePanelSize
} from '@/utils/modelIoPanelSize.js';
import {
  loadScopeWindowSeconds,
  MAX_SCOPE_WINDOW_SECONDS,
  MIN_SCOPE_WINDOW_SECONDS,
  saveScopeWindowSeconds
} from '@/utils/scopeWindowPreference.js';

const translations = {
  en: {
    panelTitle: 'Model I/O Pipeline',
    expandPanel: 'Model pipeline',
    collapsePanel: 'Hide pipeline',
    expandShort: 'Pipeline',
    live: 'Live',
    waiting: 'Waiting',
    notReady: 'Simulation is loading. The pipeline graph will update once the policy is running.',
    resizeWidth: 'Resize panel width (right edge)',
    resizeHeight: 'Resize panel height (top edge)',
    resizeBoth: 'Resize panel (top-right corner)',
    tabGraph: 'Graph',
    tabArchitecture: 'Architecture',
    tabScope: 'Scope',
    graphHint: 'Click a node to view its signals in the scope',
    scopeChannels: 'Channels',
    scopeSamples: 'Samples',
    scopeWindow: 'Window',
    scopeWindowInput: 'Oscilloscope window (seconds)',
    scopeResetZoom: 'Reset zoom',
    scopeClear: 'Clear',
    scopePause: 'Pause',
    scopeResume: 'Resume',
    scopeEmpty: 'Waiting for samples…',
    scopeHint: 'Switch to Graph and click a node to plot its signals (up to 8 channels).',
    scopeMaxChannels: 'Maximum 8 scope channels'
  },
  zh: {
    panelTitle: '模型 I/O 连接图',
    expandPanel: '模型流程',
    collapsePanel: '收起流程',
    expandShort: '流程',
    live: '实时',
    waiting: '等待',
    notReady: '仿真仍在加载，策略就绪后将显示实时连接图。',
    resizeWidth: '拖拽右边框调整宽度',
    resizeHeight: '拖拽上边框调整高度',
    resizeBoth: '拖拽右上角同时调整',
    tabGraph: '流程图',
    tabArchitecture: '模型架构',
    tabScope: '示波器',
    graphHint: '点击节点在示波器查看信号曲线',
    scopeChannels: '通道',
    scopeSamples: '采样',
    scopeWindow: '窗口',
    scopeWindowInput: '示波器显示时长（秒）',
    scopeResetZoom: '重置缩放',
    scopeClear: '清空',
    scopePause: '暂停',
    scopeResume: '继续',
    scopeEmpty: '等待采样数据…',
    scopeHint: '切到「流程图」后点击节点即可绘制该节点信号（最多 8 路）。',
    scopeMaxChannels: '示波器最多 8 路通道'
  }
};

export default {
  name: 'ModelIOFlowchart',
  components: {
    ModelIOPipelineGraph,
    OnnxNetronViewer,
    SignalOscilloscope
  },
  props: {
    demo: {
      type: Object,
      default: null
    },
    ready: {
      type: Boolean,
      default: false
    },
    language: {
      type: String,
      default: 'zh'
    },
    isSmallScreen: {
      type: Boolean,
      default: false
    },
    mobileControlsCollapsed: {
      type: Boolean,
      default: true
    },
    parkourTelemetrySnapshot: {
      type: Object,
      default: null
    },
    parkourMode: {
      type: Boolean,
      default: false
    }
  },
  data: () => {
    const panelSize = loadPanelSize();
    const scopeWindowSeconds = loadScopeWindowSeconds();
    const signalScope = createSignalScope({ windowSeconds: scopeWindowSeconds });
    return {
      expanded: false,
      viewTab: 'graph',
      telemetry: { ready: false },
      signalScope,
      scopeSnapshot: getScopeSnapshot(signalScope),
      scopeWindowSeconds,
      scopeZoom: null,
      panelWidth: panelSize.width,
      panelHeight: panelSize.height,
      panelResize: null
    };
  },
  computed: {
    activeProbes() {
      return this.signalScope.channels.map((ch) => ({
        id: ch.id,
        nodeId: ch.nodeId,
        lineKey: ch.lineKey,
        label: ch.label
      }));
    },
    activeProbeIds() {
      return this.activeProbes.map((probe) => probe.id);
    },
    desktopPanelStyle() {
      if (this.isSmallScreen) {
        return null;
      }
      return {
        width: `${this.panelWidth}px`,
        height: `${this.panelHeight}px`,
        maxHeight: 'none'
      };
    },
    t() {
      return translations[this.language === 'en' ? 'en' : 'zh'];
    },
    scopeWindowMinSeconds() {
      return MIN_SCOPE_WINDOW_SECONDS;
    },
    scopeWindowMaxSeconds() {
      return MAX_SCOPE_WINDOW_SECONDS;
    },
    pollIntervalMs() {
      return this.isSmallScreen ? 100 : 50;
    },
    usesParkourTelemetry() {
      return this.parkourMode;
    },
    telemetryLive() {
      if (this.usesParkourTelemetry) {
        return Boolean(this.parkourTelemetrySnapshot?.ready);
      }
      return Boolean(this.telemetry?.ready);
    },
    mobileToggleBottom() {
      const safe = 'env(safe-area-inset-bottom, 0px)';
      const vvp = 'var(--vvp-offset-bottom, 0px)';
      const panelHeight = 'var(--mobile-controls-panel-height, 52px)';
      const gap = 'var(--mobile-flow-controls-gap, 10px)';
      return `calc(12px + ${safe} + ${vvp} + ${panelHeight} + ${gap})`;
    }
  },
  watch: {
    parkourTelemetrySnapshot() {
      if (this.usesParkourTelemetry && this.ready) {
        this.refreshTelemetry();
      }
    },
    parkourMode(enabled) {
      if (enabled && this.ready) {
        this.refreshTelemetry();
      }
    },
    ready(isReady) {
      if (!isReady) {
        this.telemetry = { ready: false };
        clearScopeBuffer(this.signalScope);
        this.scopeSnapshot = getScopeSnapshot(this.signalScope);
        return;
      }
      this.refreshTelemetry();
    },
    isSmallScreen(isSmall) {
      if (!isSmall && this.expanded) {
        return;
      }
      if (isSmall && this.expanded) {
        document.body.classList.add('model-io-sheet-open');
      } else {
        document.body.classList.remove('model-io-sheet-open');
      }
    },
    expanded(isOpen) {
      if (this.isSmallScreen) {
        document.body.classList.toggle('model-io-sheet-open', isOpen);
      }
    },
    mobileControlsCollapsed(collapsed, wasCollapsed) {
      if (this.isSmallScreen && this.expanded && !collapsed && wasCollapsed) {
        this.closePanel();
      }
    },
    pollIntervalMs() {
      this.startPoll();
    }
  },
  mounted() {
    this.startPoll();
    this._onPanelResizeMove = (e) => this.onPanelResizeMove(e);
    this._onPanelResizeEnd = () => this.endPanelResize();
    window.addEventListener('resize', this.onWindowResize);
  },
  beforeUnmount() {
    this.stopPoll();
    this.endPanelResize();
    window.removeEventListener('resize', this.onWindowResize);
    document.body.classList.remove('model-io-sheet-open');
    document.body.classList.remove('model-io-panel-resizing');
  },
  methods: {
    onWindowResize() {
      if (this.isSmallScreen) {
        return;
      }
      const next = clampPanelSize(this.panelWidth, this.panelHeight);
      this.panelWidth = next.width;
      this.panelHeight = next.height;
    },
    startPanelResize(edge, event) {
      if (this.isSmallScreen) {
        return;
      }
      this.panelResize = {
        edge,
        startX: event.clientX,
        startY: event.clientY,
        startW: this.panelWidth,
        startH: this.panelHeight
      };
      document.addEventListener('mousemove', this._onPanelResizeMove);
      document.addEventListener('mouseup', this._onPanelResizeEnd);
      document.body.classList.add('model-io-panel-resizing');
    },
    onPanelResizeMove(event) {
      if (!this.panelResize) {
        return;
      }
      const dx = event.clientX - this.panelResize.startX;
      const dy = event.clientY - this.panelResize.startY;
      let w = this.panelResize.startW;
      let h = this.panelResize.startH;
      const { edge } = this.panelResize;
      if (edge.includes('e')) {
        w += dx;
      }
      if (edge.includes('n')) {
        h -= dy;
      }
      const clamped = clampPanelSize(w, h);
      this.panelWidth = clamped.width;
      this.panelHeight = clamped.height;
      const cursor =
        edge === 'e' ? 'ew-resize' : edge === 'n' ? 'ns-resize' : 'nesw-resize';
      document.body.style.cursor = cursor;
    },
    endPanelResize() {
      if (!this.panelResize) {
        return;
      }
      this.panelResize = null;
      document.removeEventListener('mousemove', this._onPanelResizeMove);
      document.removeEventListener('mouseup', this._onPanelResizeEnd);
      document.body.classList.remove('model-io-panel-resizing');
      document.body.style.cursor = '';
      savePanelSize(this.panelWidth, this.panelHeight);
    },
    startPoll() {
      this.stopPoll();
      this.pollTimer = setInterval(() => {
        if (this.expanded && this.ready) {
          this.refreshTelemetry();
          if (this.activeProbes.length > 0) {
            if (this.usesParkourTelemetry) {
              pushScopeSample(this.signalScope, null, null, performance.now(), {
                parkourSnapshot: this.parkourTelemetrySnapshot
              });
            } else {
              pushScopeSample(this.signalScope, this.demo?.policyRunner, this.demo);
            }
            this.scopeSnapshot = getScopeSnapshot(this.signalScope);
          }
        }
      }, this.pollIntervalMs);
    },
    stopPoll() {
      if (this.pollTimer) {
        clearInterval(this.pollTimer);
        this.pollTimer = null;
      }
    },
    togglePanel() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.refreshTelemetry();
        if (this.isSmallScreen) {
          this.startPoll();
        }
      }
    },
    closePanel() {
      this.expanded = false;
    },
    refreshTelemetry() {
      if (this.usesParkourTelemetry) {
        this.telemetry = buildParkourPolicyTelemetry(this.parkourTelemetrySnapshot, {
          lang: this.language
        });
        return;
      }
      if (!this.ready || !this.demo?.policyRunner) {
        this.telemetry = buildPolicyTelemetry(null, null, { lang: this.language });
        return;
      }
      this.telemetry = buildPolicyTelemetry(this.demo.policyRunner, this.demo, {
        lang: this.language,
        policyId: this.demo.currentPolicyId,
        currentPolicyPath: this.demo.currentPolicyPath
      });
    },
    onProbeNode(node) {
      const probes = listNodeProbes(node);
      if (!probes.length) {
        return;
      }
      const switchingNode = this.signalScope.channels.some(
        (channel) => channel.nodeId !== node.id
      );
      if (switchingNode) {
        clearScopeBuffer(this.signalScope);
        this.signalScope.channels = [];
      }
      setScopeProbes(this.signalScope, probes);
      this.scopeZoom = null;
      this.viewTab = 'scope';
      if (this.usesParkourTelemetry) {
        pushScopeSample(this.signalScope, null, null, performance.now(), {
          parkourSnapshot: this.parkourTelemetrySnapshot
        });
      } else if (this.ready && this.demo?.policyRunner) {
        pushScopeSample(this.signalScope, this.demo.policyRunner, this.demo);
      }
      this.scopeSnapshot = getScopeSnapshot(this.signalScope);
    },
    onRemoveProbe(probeId) {
      removeScopeProbe(this.signalScope, probeId);
      this.scopeSnapshot = getScopeSnapshot(this.signalScope);
    },
    onScopeWindowChange(seconds) {
      const next = saveScopeWindowSeconds(seconds);
      this.scopeWindowSeconds = setScopeWindowSeconds(this.signalScope, next);
      this.scopeZoom = null;
      this.scopeSnapshot = getScopeSnapshot(this.signalScope);
    },
    openScopeTab() {
      this.viewTab = 'scope';
    },
    toggleScopePause() {
      this.signalScope.paused = !this.signalScope.paused;
    },
    resetScopeZoom() {
      this.scopeZoom = null;
    },
    clearScope() {
      clearScopeBuffer(this.signalScope);
      this.signalScope.channels = [];
      this.scopeZoom = null;
      this.scopeSnapshot = getScopeSnapshot(this.signalScope);
    }
  }
};
</script>

<style scoped>
.model-io-dock {
  position: fixed;
  left: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
  z-index: 1050;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-width: calc(100vw - 24px);
}

.model-io-dock-mobile {
  left: 0;
  right: 0;
  bottom: 0;
  max-width: none;
  align-items: stretch;
  pointer-events: none;
}

.model-io-dock-mobile .model-io-toggle,
.model-io-dock-mobile .model-io-panel,
.model-io-dock-mobile .model-io-backdrop {
  pointer-events: auto;
}

.model-io-toggle-mobile {
  position: fixed;
  left: 12px;
  bottom: v-bind(mobileToggleBottom);
  z-index: 1051;
  min-height: 40px;
  padding-inline: 12px;
  border-radius: 18px !important;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.22);
}

.model-io-toggle-mobile :deep(.v-btn__overlay),
.model-io-toggle-mobile :deep(.v-btn__underlay) {
  border-radius: 18px;
}

.model-io-dock-sheet-open .model-io-toggle-mobile {
  display: none;
}

.model-io-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1095;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(2px);
}

.model-io-toggle {
  text-transform: none;
  letter-spacing: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}

.model-io-panel {
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
}

.model-io-panel-desktop {
  position: relative;
  max-width: calc(100vw - 24px);
}

.model-io-panel-desktop .model-io-body {
  flex: 1 1 auto;
  min-height: 0;
}

.model-io-panel-sheet {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(12px + constant(safe-area-inset-bottom) + var(--vvp-offset-bottom, 0px));
  bottom: calc(12px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
  width: auto !important;
  max-width: none;
  max-height: min(58vh, calc(100dvh - var(--header-h, 58px) - 24px));
  margin: 0;
  border-radius: 18px;
  z-index: 1100;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.22);
}

.model-io-panel-sheet .model-io-body {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: 12px;
}

.model-io-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  padding: 12px 14px 8px;
  flex-shrink: 0;
}

.model-io-tabs {
  margin-right: 4px;
}

.model-io-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  padding-top: 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  -webkit-overflow-scrolling: touch;
}

.model-io-body > .onnx-netron-viewer {
  flex: 1 1 auto;
  min-height: 280px;
}

.pipeline-hint {
  margin-bottom: 8px;
  padding: 0 2px;
}

.model-io-resize-handle {
  position: absolute;
  z-index: 3;
  touch-action: none;
}

.model-io-resize-e {
  top: 18px;
  right: 0;
  width: 8px;
  bottom: 12px;
  cursor: ew-resize;
}

.model-io-resize-n {
  top: 0;
  left: 12px;
  right: 12px;
  height: 8px;
  cursor: ns-resize;
}

.model-io-resize-ne {
  top: 0;
  right: 0;
  width: 18px;
  height: 18px;
  cursor: nesw-resize;
  background: transparent;
}

.model-io-resize-ne::before {
  content: '';
  position: absolute;
  right: 6px;
  top: 6px;
  width: 8px;
  height: 8px;
  border-right: 1.5px solid rgba(var(--v-theme-primary), 0.5);
  border-top: 1.5px solid rgba(var(--v-theme-primary), 0.5);
  border-top-right-radius: 3px;
  pointer-events: none;
  transition: border-color 0.18s ease;
}

.model-io-resize-e:hover,
.model-io-resize-e:active,
.model-io-resize-n:hover,
.model-io-resize-n:active {
  background-color: rgba(var(--v-theme-primary), 0.12);
}

.model-io-resize-ne:hover::before,
.model-io-resize-ne:active::before {
  border-color: rgba(var(--v-theme-primary), 0.9);
}

@media (max-width: 640px), (max-height: 760px) {
  .model-io-panel:not(.model-io-panel-sheet) {
    width: calc(100vw - 16px);
  }
}
</style>

<style>
/* 移动端底部抽屉打开时禁止背景滚动 */
body.model-io-sheet-open {
  overflow: hidden;
  touch-action: none;
}

body.model-io-panel-resizing {
  user-select: none;
}
</style>
