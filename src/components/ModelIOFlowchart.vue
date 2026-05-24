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
      :class="['model-io-panel', { 'model-io-panel-sheet': isSmallScreen }]"
      elevation="8"
      role="region"
      :aria-label="t.panelTitle"
    >
      <v-card-title class="model-io-title">
        <span>{{ t.panelTitle }}</span>
        <v-chip v-if="telemetry.ready" size="x-small" color="success" variant="tonal">
          {{ t.live }}
        </v-chip>
        <v-chip v-else size="x-small" color="warning" variant="tonal">
          {{ t.waiting }}
        </v-chip>
        <v-spacer />
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
          <p v-if="!isSmallScreen" class="text-caption text-medium-emphasis pipeline-hint">
            {{ telemetry.model.normalizerNote }}
          </p>
          <ModelIOPipelineGraph
            :telemetry="telemetry"
            :language="language"
            :live="telemetry.ready"
            :is-mobile="isSmallScreen"
          />
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { buildPolicyTelemetry } from '@/simulation/policyTelemetry.js';
import ModelIOPipelineGraph from '@/components/ModelIOPipelineGraph.vue';

const translations = {
  en: {
    panelTitle: 'Model I/O Pipeline',
    expandPanel: 'Model pipeline',
    collapsePanel: 'Hide pipeline',
    expandShort: 'Pipeline',
    live: 'Live',
    waiting: 'Waiting',
    notReady: 'Simulation is loading. The pipeline graph will update once the policy is running.'
  },
  zh: {
    panelTitle: '模型 I/O 连接图',
    expandPanel: '模型流程',
    collapsePanel: '收起流程',
    expandShort: '流程',
    live: '实时',
    waiting: '等待',
    notReady: '仿真仍在加载，策略就绪后将显示实时连接图。'
  }
};

export default {
  name: 'ModelIOFlowchart',
  components: {
    ModelIOPipelineGraph
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
    }
  },
  data: () => ({
    expanded: false,
    telemetry: { ready: false }
  }),
  computed: {
    t() {
      return translations[this.language === 'en' ? 'en' : 'zh'];
    },
    pollIntervalMs() {
      return this.isSmallScreen ? 100 : 50;
    },
    mobileToggleBottom() {
      const safe = 'env(safe-area-inset-bottom, 0px)';
      const vvp = 'var(--vvp-offset-bottom, 0px)';
      const controls = this.mobileControlsCollapsed ? '56px' : 'min(46vh, 380px)';
      return `calc(12px + ${safe} + ${vvp} + ${controls})`;
    }
  },
  watch: {
    ready(isReady) {
      if (!isReady) {
        this.telemetry = { ready: false };
      }
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
  },
  beforeUnmount() {
    this.stopPoll();
    document.body.classList.remove('model-io-sheet-open');
  },
  methods: {
    startPoll() {
      this.stopPoll();
      this.pollTimer = setInterval(() => {
        if (this.expanded && this.ready) {
          this.refreshTelemetry();
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
      if (!this.ready || !this.demo?.policyRunner) {
        this.telemetry = buildPolicyTelemetry(null, null, { lang: this.language });
        return;
      }
      this.telemetry = buildPolicyTelemetry(this.demo.policyRunner, this.demo, {
        lang: this.language
      });
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
  max-width: min(960px, calc(100vw - 24px));
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
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.28);
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
  width: min(920px, calc(100vw - 24px));
  max-height: min(72vh, 640px);
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
}

.model-io-panel-sheet {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100% !important;
  max-width: none;
  max-height: min(82vh, 100dvh - var(--header-h, 58px) - 12px);
  margin: 0;
  border-radius: 16px 16px 0 0;
  z-index: 1100;
  box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.35);
}

.model-io-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  padding: 12px 14px 8px;
  flex-shrink: 0;
}

.model-io-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding-top: 0;
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  -webkit-overflow-scrolling: touch;
}

.pipeline-hint {
  margin-bottom: 8px;
  padding: 0 2px;
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
</style>
