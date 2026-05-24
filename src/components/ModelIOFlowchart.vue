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
      <v-icon :icon="expanded ? 'mdi-chart-timeline-variant' : 'mdi-chart-timeline-variant-shimmer'" class="mr-1" />
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
          <section class="flow-section">
            <div class="flow-node flow-node-source">
              <div class="flow-node-head">{{ t.stepSimState }}</div>
              <div class="flow-node-body text-caption">
                <div>{{ t.rootPos }}: {{ formatVec(telemetry.preprocessing.rootPos) }}</div>
                <div>{{ t.rootAngVel }}: {{ formatVec(telemetry.preprocessing.rootAngVel) }}</div>
                <div>{{ t.jointPos }}: {{ formatVec(telemetry.preprocessing.jointPosSample) }}</div>
                <div>{{ t.jointVel }}: {{ formatVec(telemetry.preprocessing.jointVelSample) }}</div>
                <div v-if="telemetry.preprocessing.cmd">{{ t.cmd }}: {{ formatVec(telemetry.preprocessing.cmd) }}</div>
              </div>
            </div>

            <div class="flow-arrow" aria-hidden="true">↓</div>

            <div class="flow-node">
              <div class="flow-node-head">{{ t.stepPreprocess }}</div>
              <div class="flow-node-body text-caption">
                <div>{{ t.jointRelative }}: {{ telemetry.preprocessing.obsJointPosRelative ? t.yes : t.no }}</div>
                <div v-if="telemetry.preprocessing.jointPosRelativeSample">
                  {{ t.relativeJointSample }}: {{ formatVec(telemetry.preprocessing.jointPosRelativeSample) }}
                </div>
                <div>{{ t.actionClip }}: ±{{ telemetry.preprocessing.actionClip }}</div>
                <div v-if="telemetry.preprocessing.complianceEnabled !== undefined">
                  {{ t.compliance }}: {{ telemetry.preprocessing.complianceEnabled ? t.on : t.off }}
                  ({{ formatFloat(telemetry.preprocessing.complianceThreshold) }})
                </div>
                <div class="text-medium-emphasis mt-1">{{ telemetry.model.normalizerNote }}</div>
              </div>
            </div>

            <div class="flow-arrow" aria-hidden="true">↓</div>

            <div class="flow-node flow-node-obs">
              <div class="flow-node-head">{{ t.stepObsConcat }}</div>
              <div class="flow-node-body">
                <div
                  v-for="block in telemetry.obsBlocks"
                  :key="block.name + block.offset"
                  class="obs-block"
                >
                  <div class="obs-block-title">
                    <span class="obs-name">{{ block.name }}</span>
                    <span class="obs-dim">[{{ block.offset }}:{{ block.offset + block.size }}) · {{ block.size }}D</span>
                  </div>
                  <div class="text-caption text-medium-emphasis">{{ block.description }}</div>
                  <div class="text-caption">
                    {{ t.values }}: {{ formatVec(block.values) }}
                    <span class="obs-stats">
                      min {{ formatFloat(block.stats.min) }} · max {{ formatFloat(block.stats.max) }} · μ {{ formatFloat(block.stats.mean) }}
                    </span>
                  </div>
                </div>
                <div class="text-caption mt-2">
                  {{ t.frameDim }}: {{ telemetry.concat.currentFrameSize }}
                  <template v-if="telemetry.concat.historyLength > 1">
                    · {{ t.history }}: {{ telemetry.concat.historyCount }}/{{ telemetry.concat.historyLength }}
                  </template>
                </div>
              </div>
            </div>

            <div class="flow-arrow" aria-hidden="true">↓</div>

            <div class="flow-node flow-node-onnx">
              <div class="flow-node-head">{{ t.stepOnnx }}</div>
              <div class="flow-node-body text-caption">
                <div class="mono-line">{{ basename(telemetry.model.path) }}</div>
                <div>{{ t.input }}: {{ telemetry.onnx.inKeys.join(', ') }} {{ formatShape(telemetry.onnx.inputShape) }}</div>
                <div>{{ t.output }}: {{ telemetry.onnx.outKeys.join(', ') }}</div>
                <div>{{ t.tensorPreview }}: {{ formatVec(telemetry.onnx.inputPreview) }}</div>
                <div>
                  action(raw): {{ formatVec(telemetry.onnx.rawAction) }}
                  → clip: {{ formatVec(telemetry.onnx.clippedAction) }}
                </div>
                <div
                  v-for="(extra, key) in telemetry.onnx.extraOutputs"
                  :key="key"
                  class="mono-line"
                >
                  {{ key }}{{ formatShape(extra.dims) }}: {{ formatVec(extra.preview) }}
                </div>
              </div>
            </div>

            <div class="flow-arrow" aria-hidden="true">↓</div>

            <div class="flow-node">
              <div class="flow-node-head">{{ t.stepTarget }}</div>
              <div class="flow-node-body text-caption mono-line">
                {{ telemetry.postprocess.formula }}
              </div>
              <div class="flow-node-body text-caption">
                <div>scale: {{ formatVec(telemetry.postprocess.actionScaleSample) }}</div>
                <div>default: {{ formatVec(telemetry.postprocess.defaultJointPosSample) }}</div>
                <div>target: {{ formatVec(telemetry.postprocess.targetSample) }}</div>
              </div>
            </div>

            <div class="flow-arrow" aria-hidden="true">↓</div>

            <div class="flow-node flow-node-motor">
              <div class="flow-node-head">{{ t.stepMotor }}</div>
              <div class="flow-node-body text-caption">
                <div>{{ t.controlType }}: {{ telemetry.motor.controlType }}</div>
                <div>{{ t.decimation }}: {{ telemetry.motor.decimation }} · ~{{ formatFloat(telemetry.motor.policyHz, 1) }} Hz</div>
                <div
                  v-for="joint in telemetry.motor.joints"
                  :key="joint.name"
                  class="motor-joint"
                >
                  <span class="motor-joint-name">{{ shortJointName(joint.name) }}</span>
                  τ = {{ formatFloat(joint.kp) }}×({{ formatFloat(joint.target) }}−{{ formatFloat(joint.qpos) }})
                  + {{ formatFloat(joint.kd) }}×(0−{{ formatFloat(joint.qvel) }})
                  → {{ formatFloat(joint.ctrl) }}
                </div>
              </div>
            </div>
          </section>
        </template>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { buildPolicyTelemetry, formatFloat as fmt } from '@/simulation/policyTelemetry.js';

const translations = {
  en: {
    panelTitle: 'Model I/O Pipeline',
    expandPanel: 'Model pipeline',
    collapsePanel: 'Hide pipeline',
    live: 'Live',
    waiting: 'Waiting',
    notReady: 'Simulation is loading. The pipeline will update once the policy is running.',
    stepSimState: '1 · MuJoCo state',
    stepPreprocess: '2 · Preprocess',
    stepObsConcat: '3 · Observation concat',
    stepOnnx: '4 · ONNX inference',
    stepTarget: '5 · Action → joint target',
    stepMotor: '6 · PD → actuator ctrl',
    rootPos: 'root pos',
    rootAngVel: 'root ω',
    jointPos: 'joint pos',
    jointVel: 'joint vel',
    cmd: 'cmd',
    jointRelative: 'joint pos relative',
    relativeJointSample: 'relative sample',
    actionClip: 'action clip',
    compliance: 'compliance',
    yes: 'yes',
    no: 'no',
    on: 'on',
    off: 'off',
    frameDim: 'per-frame dim',
    history: 'history',
    values: 'values',
    input: 'input',
    output: 'output',
    tensorPreview: 'tensor preview',
    controlType: 'control',
    decimation: 'decimation'
  },
  zh: {
    panelTitle: '模型 I/O 实时流程',
    expandPanel: '模型流程',
    collapsePanel: '收起流程',
    live: '实时',
    waiting: '等待',
    notReady: '仿真仍在加载，策略就绪后将显示实时数据。',
    stepSimState: '1 · MuJoCo 状态',
    stepPreprocess: '2 · 预处理',
    stepObsConcat: '3 · 观测拼接',
    stepOnnx: '4 · ONNX 推理',
    stepTarget: '5 · 动作 → 关节目标',
    stepMotor: '6 · PD → 电机控制量',
    rootPos: '根位置',
    rootAngVel: '根角速度',
    jointPos: '关节角',
    jointVel: '关节速度',
    cmd: '指令',
    jointRelative: '关节相对默认',
    relativeJointSample: '相对关节采样',
    actionClip: '动作裁剪',
    compliance: '顺应性',
    yes: '是',
    no: '否',
    on: '开',
    off: '关',
    frameDim: '单帧维度',
    history: '历史',
    values: '数值',
    input: '输入',
    output: '输出',
    tensorPreview: '张量预览',
    controlType: '控制律',
    decimation: '物理子步'
  }
};

export default {
  name: 'ModelIOFlowchart',
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
    },
    formatFloat(value, digits) {
      return fmt(value, digits);
    },
    formatVec(values) {
      if (!values || values.length === 0) {
        return '—';
      }
      return values.map((v) => fmt(v)).join(', ');
    },
    formatShape(dims) {
      if (!dims || dims.length === 0) {
        return '';
      }
      return `[${dims.join('×')}]`;
    },
    basename(path) {
      if (!path) {
        return '—';
      }
      const parts = path.split('/');
      return parts[parts.length - 1] || path;
    },
    shortJointName(name) {
      if (!name) {
        return 'joint';
      }
      return name.replace(/_joint$/, '').replace(/^left_|^right_/, (m) => m[0]);
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
  max-width: min(420px, calc(100vw - 32px));
}

.model-io-dock-mobile {
  left: 12px;
  bottom: calc(72px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
  max-width: min(360px, calc(100vw - 24px));
}

.model-io-toggle {
  text-transform: none;
  letter-spacing: 0;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
}

.model-io-panel {
  width: min(400px, calc(100vw - 32px));
  max-height: min(62vh, 520px);
  display: flex;
  flex-direction: column;
  border-radius: 14px;
  overflow: hidden;
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
  overflow-y: auto;
  overscroll-behavior: contain;
  padding-top: 0;
  padding-bottom: 12px;
}

.flow-section {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.flow-node {
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 10px;
  padding: 8px 10px;
  background: rgba(var(--v-theme-surface-variant), 0.35);
}

.flow-node-head {
  font-weight: 600;
  font-size: 0.82rem;
  margin-bottom: 4px;
}

.flow-node-source {
  border-color: rgba(var(--v-theme-primary), 0.35);
}

.flow-node-onnx {
  border-color: rgba(var(--v-theme-secondary), 0.4);
}

.flow-node-motor {
  border-color: rgba(var(--v-theme-success), 0.35);
}

.flow-arrow {
  text-align: center;
  color: rgba(var(--v-theme-on-surface), 0.45);
  font-size: 0.9rem;
  line-height: 1.2;
  padding: 2px 0;
}

.obs-block {
  padding: 6px 0;
  border-bottom: 1px dashed rgba(var(--v-theme-on-surface), 0.1);
}

.obs-block:last-child {
  border-bottom: none;
}

.obs-block-title {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px;
}

.obs-name {
  font-weight: 600;
  font-size: 0.78rem;
}

.obs-dim {
  font-size: 0.72rem;
  opacity: 0.75;
}

.obs-stats {
  display: block;
  opacity: 0.8;
  margin-top: 2px;
}

.motor-joint {
  margin-top: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.68rem;
  line-height: 1.35;
  word-break: break-all;
}

.motor-joint-name {
  font-weight: 600;
}

.mono-line {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.72rem;
  line-height: 1.4;
  word-break: break-word;
}

@media (max-width: 640px), (max-height: 760px) {
  .model-io-dock {
    left: 12px;
  }
}
</style>
