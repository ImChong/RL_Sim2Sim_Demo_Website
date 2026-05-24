<template>
  <div :class="['model-io-dock', { 'model-io-dock-mobile': isSmallScreen }]">
    <v-btn
      class="model-io-toggle"
      size="small"
      :color="expanded ? 'primary' : 'surface-variant'"
      :variant="expanded ? 'flat' : 'elevated'"
      :aria-label="expanded ? t.collapsePanel : t.expandPanel"
      :aria-expanded="expanded"
      @click="togglePanel"
    >
      <v-icon :icon="expanded ? 'mdi-graph-outline' : 'mdi-graph'" class="mr-1" />
      {{ expanded ? t.collapsePanel : t.expandPanel }}
    </v-btn>

    <v-card
      v-show="expanded"
      class="model-io-panel"
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
      </v-card-title>

      <v-card-text class="model-io-body">
        <p v-if="!telemetry.ready" class="text-caption text-medium-emphasis">
          {{ t.notReady }}
        </p>

        <template v-else>
          <p class="text-caption text-medium-emphasis pipeline-hint">
            {{ telemetry.model.normalizerNote }}
          </p>
          <ModelIOPipelineGraph
            :telemetry="telemetry"
            :language="language"
            :live="telemetry.ready"
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
    live: 'Live',
    waiting: 'Waiting',
    notReady: 'Simulation is loading. The pipeline graph will update once the policy is running.'
  },
  zh: {
    panelTitle: '模型 I/O 连接图',
    expandPanel: '模型流程',
    collapsePanel: '收起流程',
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
    }
  },
  data: () => ({
    expanded: false,
    telemetry: { ready: false }
  }),
  computed: {
    t() {
      return translations[this.language === 'en' ? 'en' : 'zh'];
    }
  },
  watch: {
    ready(isReady) {
      if (!isReady) {
        this.telemetry = { ready: false };
      }
    }
  },
  mounted() {
    this.pollTimer = setInterval(() => {
      if (this.expanded && this.ready) {
        this.refreshTelemetry();
      }
    }, 50);
  },
  beforeUnmount() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  },
  methods: {
    togglePanel() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        this.refreshTelemetry();
      }
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
  left: 12px;
  bottom: calc(72px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
  max-width: calc(100vw - 16px);
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

.model-io-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.95rem;
  padding: 10px 14px 6px;
  flex-shrink: 0;
}

.model-io-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow: auto;
  overscroll-behavior: contain;
  padding-top: 0;
  padding-bottom: 12px;
}

.pipeline-hint {
  margin-bottom: 8px;
  padding: 0 2px;
}

@media (max-width: 640px), (max-height: 760px) {
  .model-io-dock {
    left: 12px;
  }

  .model-io-panel {
    width: calc(100vw - 16px);
  }
}
</style>
