<template>
  <div id="mujoco-container"></div>
  <div class="global-alerts">
    <v-alert
      v-if="isSmallScreen"
      v-model="showSmallScreenAlert"
      type="info"
      variant="flat"
      density="compact"
      closable
      class="small-screen-alert"
    >
      {{ t.mobileModeAlert }}
    </v-alert>
    <v-alert
      v-if="isSafari"
      v-model="showSafariAlert"
      type="warning"
      variant="flat"
      density="compact"
      closable
      class="safari-alert"
    >
      {{ t.safariAlert }}
    </v-alert>
  </div>
  <div :class="['controls', { 'controls-mobile': isSmallScreen, 'controls-mobile-collapsed': isSmallScreen && isMobileControlsCollapsed }]">
    <v-card class="controls-card">
      <v-card-title :class="['controls-title', { 'controls-title-mobile': isSmallScreen }]">
        <span>{{ t.panelTitle }}</span>
        <v-btn
          v-if="isSmallScreen"
          size="x-small"
          variant="text"
          color="primary"
          class="controls-toggle-btn"
          :aria-label="isMobileControlsCollapsed ? t.expandControlPanel : t.collapseControlPanel"
          @click="toggleMobileControls"
        >
          {{ isMobileControlsCollapsed ? t.expand : t.collapse }}
        </v-btn>
      </v-card-title>
      <v-card-text v-show="!isSmallScreen || !isMobileControlsCollapsed" class="py-0 controls-body">
          <v-btn
            href="https://github.com/Axellwppr/motion_tracking"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            size="small"
            color="primary"
            class="text-capitalize"
          >
            <v-icon icon="mdi-github" class="mr-1"></v-icon>
            {{ t.trainingCode }}
          </v-btn>
        <v-divider class="my-2"/>
        <span class="status-name">{{ t.policy }}</span>
        <div v-if="policyDescription" class="text-caption">{{ policyDescription }}</div>
        <v-select
          v-model="currentPolicy"
          :items="policyItems"
          class="mt-2"
          :label="t.selectPolicy"
          :aria-label="t.selectPolicy"
          density="compact"
          hide-details
          item-title="title"
          item-value="value"
          :disabled="isPolicyLoading || state !== 1"
          @update:modelValue="onPolicyChange"
        ></v-select>
        <v-progress-linear
          v-if="isPolicyLoading"
          indeterminate
          height="4"
          color="primary"
          class="mt-2"
          :aria-label="t.policy"
        ></v-progress-linear>
        <v-alert
          v-if="policyLoadError"
          type="error"
          variant="tonal"
          density="compact"
          class="mt-2"
        >
          {{ policyLoadError }}
        </v-alert>

        <div class="status-legend follow-controls mt-2">
          <span class="status-name">{{ t.compliance }}</span>
          <v-btn
            size="x-small"
            variant="tonal"
            color="primary"
            :disabled="state !== 1"
            @click="toggleCompliance"
          >
            {{ complianceEnabled ? t.on : t.off }}
          </v-btn>
          <span class="status-name">{{ t.threshold }}</span>
          <span class="text-caption">{{ complianceThresholdLabel }}</span>
        </div>
        <v-slider
          v-model="complianceThreshold"
          min="10"
          max="20"
          step="0.1"
          density="compact"
          hide-details
          :aria-label="t.threshold"
          :disabled="state !== 1 || !complianceEnabled"
          @update:modelValue="onComplianceThresholdChange"
        ></v-slider>

        <v-divider class="my-2"/>
        <div class="motion-status" v-if="trackingState" role="status" aria-live="polite">
          <div class="status-legend" v-if="trackingState.available">
            <span class="status-name">{{ t.currentMotion }}: {{ trackingState.currentName }}</span>
          </div>
        </div>

          <v-progress-linear
            v-if="shouldShowProgress"
            :model-value="progressValue"
            height="5"
            color="primary"
            rounded
            class="mt-3 motion-progress-no-animation"
            aria-label="Motion progress"
          ></v-progress-linear>
        <v-alert
          v-if="showBackToDefault"
          type="info"
          variant="tonal"
          density="compact"
          class="mt-3"
        >
          {{ formatMessage(t.motionFinished, { name: trackingState.currentName }) }}
          <v-btn color="primary" block density="compact" @click="backToDefault">
            {{ t.backToDefaultPose }}
          </v-btn>
        </v-alert>

        <v-alert
          v-else-if="showMotionLockedNotice"
          type="warning"
          variant="tonal"
          density="compact"
          class="mt-3"
        >
          {{ formatMessage(t.motionLocked, { name: trackingState.currentName }) }}
        </v-alert>

        <div v-if="showMotionSelect" class="motion-groups">
          <div v-for="group in motionGroups" :key="group.title" class="motion-group">
            <span class="status-name motion-group-title">{{ group.title }}</span>
            <v-chip
              v-for="item in group.items"
              :key="item.value"
              :disabled="item.disabled"
              :color="currentMotion === item.value ? 'primary' : undefined"
              :variant="currentMotion === item.value ? 'flat' : 'tonal'"
              class="motion-chip"
              size="x-small"
              role="button"
              :aria-label="item.title"
              @click="onMotionChange(item.value)"
            >
              {{ item.title }}
            </v-chip>
          </div>
        </div>

        <v-alert
          v-else-if="!trackingState.available"
          type="info"
          variant="tonal"
          density="compact"
        >
          {{ t.loadingMotionPresets }}
        </v-alert>

        <v-divider class="my-2"/>
        <div class="upload-section">
          <v-btn
            v-if="!showUploadOptions"
            variant="text"
            density="compact"
            color="primary"
            class="upload-toggle"
            @click="showUploadOptions = true"
          >
            {{ t.useCustomizedMotions }}
          </v-btn>
          <template v-else>
            <span class="status-name">{{ t.customMotions }}</span>
            <v-file-input
              v-model="motionUploadFiles"
              :label="t.uploadMotionJson"
              density="compact"
              hide-details
              accept=".json,application/json"
              prepend-icon="mdi-upload"
              multiple
              show-size
              :disabled="state !== 1"
              @update:modelValue="onMotionUpload"
            ></v-file-input>
            <div class="text-caption">
              <span v-html="t.motionUploadHelp"></span>
            </div>
            <v-alert
              v-if="motionUploadMessage"
              :type="motionUploadType"
              variant="tonal"
              density="compact"
            >
              {{ motionUploadMessage }}
            </v-alert>
          </template>
        </div>

        <v-divider class="my-2"/>
        <div class="status-legend follow-controls">
          <span class="status-name">{{ t.cameraFollow }}</span>
          <v-btn
            size="x-small"
            variant="tonal"
            color="primary"
            :disabled="state !== 1"
            @click="toggleCameraFollow"
          >
            {{ cameraFollowEnabled ? t.on : t.off }}
          </v-btn>
        </div>
        <div class="status-legend">
          <span class="status-name">{{ t.renderScale }}</span>
          <span class="text-caption">{{ renderScaleLabel }}</span>
          <span class="status-name">{{ t.simFreq }}</span>
          <span class="text-caption">{{ simStepLabel }}</span>
        </div>
        <v-slider
          v-model="renderScale"
          min="0.5"
          max="2.0"
          step="0.1"
          density="compact"
          hide-details
          :aria-label="t.renderScale"
          @update:modelValue="onRenderScaleChange"
        ></v-slider>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="reset">{{ t.reset }}</v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <v-dialog :model-value="state === 0" persistent max-width="600px" scrollable>
    <v-card :title="t.loadingSimulationTitle">
      <v-card-text>
        <v-progress-linear indeterminate color="primary" :aria-label="t.loadingSimulationTitle"></v-progress-linear>
        {{ t.loadingSimulationBody }}
      </v-card-text>
    </v-card>
  </v-dialog>
  <v-dialog :model-value="state < 0" persistent max-width="600px" scrollable>
    <v-card :title="t.loadingErrorTitle">
      <v-card-text>
        <span v-if="state === -1">
          {{ t.runtimeError }}<br />
          {{ extra_error_message }}
        </span>
        <span v-else-if="state === -2">
          {{ t.webAssemblyUnsupported }}
        </span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { MuJoCoDemo } from '@/simulation/main.js';
import loadMujoco from 'mujoco-js';

const translations = {
  en: {
    mobileModeAlert: 'Mobile mode is enabled. The control panel has been compacted and docked to the bottom for touch interaction.',
    safariAlert: 'Safari has lower memory limits, which can cause WASM to crash.',
    panelTitle: 'General Tracking Demo',
    expandControlPanel: 'Expand control panel',
    collapseControlPanel: 'Collapse control panel',
    expand: 'Expand',
    collapse: 'Collapse',
    trainingCode: 'Training Code',
    policy: 'Policy',
    selectPolicy: 'Select policy',
    compliance: 'Compliance',
    threshold: 'threshold',
    on: 'On',
    off: 'Off',
    currentMotion: 'Current motion',
    motionFinished: 'Motion "{name}" finished. Return to the default pose before starting another clip.',
    backToDefaultPose: 'Back to default pose',
    motionLocked: '"{name}" is still playing. Wait until it finishes and returns to default pose before switching.',
    loadingMotionPresets: 'Loading motion presets...',
    useCustomizedMotions: 'Want to use customized motions?',
    customMotions: 'Custom motions',
    uploadMotionJson: 'Upload motion JSON',
    motionUploadHelp: 'Read <a target="_blank" rel="noopener noreferrer" href="https://github.com/Axellwppr/humanoid-policy-viewer?tab=readme-ov-file#add-your-own-robot-policy-and-motions">readme</a> to learn how to create motion JSON files from GMR.<br>Each file should be a single clip (same schema as motions/default.json). File name becomes the motion name (prefixed with [new]). Duplicate names are ignored.',
    cameraFollow: 'Camera follow',
    renderScale: 'Render scale',
    simFreq: 'Sim Freq',
    reset: 'Reset',
    loadingSimulationTitle: 'Loading Simulation Environment',
    loadingSimulationBody: 'Loading MuJoCo and ONNX policy, please wait',
    loadingErrorTitle: 'Simulation Environment Loading Error',
    runtimeError: 'Unexpected runtime error, please refresh the page.',
    webAssemblyUnsupported: 'Your browser does not support WebAssembly. Please use a recent version of Chrome, Edge, or Firefox.',
    policyDescription: 'Tracking policy with compliance input enabled.',
    customizedGroup: 'Customized',
    demoNotReady: 'Demo not ready yet. Please wait for loading to finish.',
    addedMotions: 'Added {count} motion{plural}',
    skippedDuplicates: 'Skipped {count} duplicate{plural}',
    ignoredInvalid: 'Ignored {count} invalid file{plural}',
    noMotionsAdded: 'No motions were added.'
  },
  zh: {
    mobileModeAlert: '已启用移动端模式，控制面板已精简并停靠到底部，便于触控操作。',
    safariAlert: 'Safari 的内存限制较低，可能导致 WASM 崩溃。',
    panelTitle: '通用跟踪演示',
    expandControlPanel: '展开控制面板',
    collapseControlPanel: '收起控制面板',
    expand: '展开',
    collapse: '收起',
    trainingCode: '训练代码',
    policy: '策略',
    selectPolicy: '选择策略',
    compliance: '顺应性',
    threshold: '阈值',
    on: '开',
    off: '关',
    currentMotion: '当前动作',
    motionFinished: '动作“{name}”已结束。开始其他片段前，请先回到默认姿态。',
    backToDefaultPose: '回到默认姿态',
    motionLocked: '动作“{name}”仍在播放。请等待播放结束并回到默认姿态后再切换。',
    loadingMotionPresets: '正在加载动作预设...',
    useCustomizedMotions: '想使用自定义动作？',
    customMotions: '自定义动作',
    uploadMotionJson: '上传动作 JSON',
    motionUploadHelp: '阅读 <a target="_blank" rel="noopener noreferrer" href="https://github.com/Axellwppr/humanoid-policy-viewer?tab=readme-ov-file#add-your-own-robot-policy-and-motions">readme</a> 了解如何从 GMR 创建动作 JSON 文件。<br>每个文件应只包含一个片段（结构与 motions/default.json 一致）。文件名会作为动作名称（自动添加 [new] 前缀），重复名称会被忽略。',
    cameraFollow: '相机跟随',
    renderScale: '渲染倍率',
    simFreq: '仿真频率',
    reset: '重置',
    loadingSimulationTitle: '正在加载仿真环境',
    loadingSimulationBody: '正在加载 MuJoCo 和 ONNX 策略，请稍候',
    loadingErrorTitle: '仿真环境加载错误',
    runtimeError: '发生意外运行时错误，请刷新页面。',
    webAssemblyUnsupported: '当前浏览器不支持 WebAssembly。请使用较新版本的 Chrome、Edge 或 Firefox。',
    policyDescription: '已启用顺应性输入的跟踪策略。',
    customizedGroup: '自定义',
    demoNotReady: '演示尚未就绪，请等待加载完成。',
    addedMotions: '已添加 {count} 个动作',
    skippedDuplicates: '已跳过 {count} 个重复项',
    ignoredInvalid: '已忽略 {count} 个无效文件',
    noMotionsAdded: '没有添加任何动作。'
  }
};

export default {
  name: 'DemoPage',
  props: {
    visualTheme: {
      type: String,
      default: 'light'
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  data: () => ({
    state: 0, // 0: loading, 1: running, -1: JS error, -2: wasm unsupported
    extra_error_message: '',
    keydown_listener: null,
    currentMotion: null,
    availableMotions: [],
    trackingState: {
      available: false,
      currentName: 'default',
      currentDone: true,
      refIdx: 0,
      refLen: 0,
      transitionLen: 0,
      motionLen: 0,
      inTransition: false,
      isDefault: true
    },
    trackingTimer: null,
    policies: [
      {
        value: 'g1-tracking-latest',
        title: 'G1 Tracking',
        description: 'Tracking policy with compliance input enabled.',
        descriptionKey: 'policyDescription',
        policyPath: './examples/checkpoints/g1/tracking_policy_latest.json',
        onnxPath: './examples/checkpoints/g1/policy_latest.onnx'
      }
    ],
    currentPolicy: 'g1-tracking-latest',
    policyLabel: '',
    isPolicyLoading: false,
    policyLoadError: '',
    motionUploadFiles: [],
    motionUploadMessage: '',
    motionUploadType: 'success',
    showUploadOptions: false,
    cameraFollowEnabled: true,
    complianceEnabled: false,
    complianceThreshold: 10.0,
    renderScale: 2.0,
    simStepHz: 0,
    isSmallScreen: false,
    isMobileControlsCollapsed: true,
    showSmallScreenAlert: true,
    isSafari: false,
    showSafariAlert: true,
    resize_listener: null,
    vvp_listener: null
  }),
  computed: {
    shouldShowProgress() {
      const state = this.trackingState;
      if (!state || !state.available) {
        return false;
      }
      if (state.refLen > 1) {
        return true;
      }
      return !state.currentDone || !state.isDefault || state.inTransition;
    },
    progressValue() {
      const state = this.trackingState;
      if (!state || state.refLen <= 0) {
        return 0;
      }
      const value = ((state.refIdx + 1) / state.refLen) * 100;
      return Math.max(0, Math.min(100, value));
    },
    showBackToDefault() {
      const state = this.trackingState;
      return state && state.available && !state.isDefault && state.currentDone;
    },
    showMotionLockedNotice() {
      const state = this.trackingState;
      return state && state.available && !state.isDefault && !state.currentDone;
    },
    showMotionSelect() {
      const state = this.trackingState;
      if (!state || !state.available) {
        return false;
      }
      if (!state.isDefault || !state.currentDone) {
        return false;
      }
      return this.motionItems.some((item) => !item.disabled);
    },
    motionItems() {
      const names = [...this.availableMotions].sort((a, b) => {
        if (a === 'default') {
          return -1;
        }
        if (b === 'default') {
          return 1;
        }
        return a.localeCompare(b);
      });
      return names.map((name) => ({
        title: name.split('_')[0],
        value: name,
        disabled: this.isMotionDisabled(name)
      }));
    },
    motionGroups() {
      const items = this.motionItems.filter((item) => item.value !== 'default');
      if (items.length === 0) {
        return [];
      }
      const customized = [];
      const amass = [];
      const gentleHumanoid = [];
      const lafan = [];

      for (const item of items) {
        const value = item.value.toLowerCase();
        if (/(^|[_\s-])gentle$/.test(value)) {
          gentleHumanoid.push(item);
        } else if (value.includes('[new]')) {
          customized.push(item);
        } else if (value.includes('amass')) {
          amass.push(item);
        } else {
          lafan.push(item);
        }
      }

      const groups = [];
      if (lafan.length > 0) {
        groups.push({ title: 'LAFAN1', items: lafan });
      }
      if (amass.length > 0) {
        groups.push({ title: 'AMASS', items: amass });
      }
      if (gentleHumanoid.length > 0) {
        groups.push({ title: 'GentleHumanoid', items: gentleHumanoid });
      }
      if (customized.length > 0) {
        groups.push({ title: this.t.customizedGroup, items: customized });
      }
      return groups;
    },
    policyItems() {
      return this.policies.map((policy) => ({
        title: policy.title,
        value: policy.value
      }));
    },
    selectedPolicy() {
      return this.policies.find((policy) => policy.value === this.currentPolicy) ?? null;
    },
    policyDescription() {
      if (!this.selectedPolicy) {
        return '';
      }
      return this.selectedPolicy.descriptionKey
        ? this.t[this.selectedPolicy.descriptionKey]
        : this.selectedPolicy.description ?? '';
    },
    renderScaleLabel() {
      return `${this.renderScale.toFixed(2)}x`;
    },
    complianceThresholdLabel() {
      return this.complianceThreshold.toFixed(1);
    },
    simStepLabel() {
      if (!this.simStepHz || !Number.isFinite(this.simStepHz)) {
        return '—';
      }
      return `${this.simStepHz.toFixed(1)} Hz`;
    },
    t() {
      return translations[this.language] ?? translations.en;
    }
  },
  watch: {
    visualTheme: {
      immediate: true,
      handler(value) {
        this.demo?.setVisualTheme?.(value);
      }
    }
  },
  methods: {
    detectSafari() {
      const ua = navigator.userAgent;
      return /Safari\//.test(ua)
        && !/Chrome\//.test(ua)
        && !/Chromium\//.test(ua)
        && !/Edg\//.test(ua)
        && !/OPR\//.test(ua)
        && !/SamsungBrowser\//.test(ua)
        && !/CriOS\//.test(ua)
        && !/FxiOS\//.test(ua);
    },
    updateScreenState() {
      const isSmall = window.innerWidth < 500 || window.innerHeight < 700;
      if (!isSmall && this.isSmallScreen) {
        this.showSmallScreenAlert = true;
      }
      if (isSmall !== this.isSmallScreen) {
        this.isMobileControlsCollapsed = isSmall;
      }
      this.isSmallScreen = isSmall;
    },
    updateVisualViewportOffset() {
      if (!window.visualViewport) return;
      const vvp = window.visualViewport;
      // 布局视口底部与可视视口底部之间的差值，即浏览器底部工具栏高度
      const offset = Math.max(0, window.innerHeight - (vvp.offsetTop + vvp.height));
      document.documentElement.style.setProperty('--vvp-offset-bottom', `${offset}px`);
    },
    toggleMobileControls() {
      if (!this.isSmallScreen) {
        return;
      }
      this.isMobileControlsCollapsed = !this.isMobileControlsCollapsed;
    },
    formatMessage(template, values = {}) {
      return Object.entries(values).reduce(
        (message, [key, value]) => message.replaceAll(`{${key}}`, value),
        template
      );
    },
    formatCount(template, count) {
      return this.formatMessage(template, {
        count,
        plural: count === 1 ? '' : 's'
      });
    },
    async init() {
      if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') {
        this.state = -2;
        return;
      }

      try {
        const mujoco = await loadMujoco();
        this.demo = new MuJoCoDemo(mujoco);
        this.demo.setVisualTheme?.(this.visualTheme);
        this.demo.setFollowEnabled?.(this.cameraFollowEnabled);
        await this.demo.init();
        this.demo.main_loop();
        this.demo.params.paused = false;
        this.reapplyCustomMotions();
        this.availableMotions = this.getAvailableMotions();
        this.currentMotion = this.demo.params.current_motion ?? this.availableMotions[0] ?? null;
        this.complianceEnabled = Boolean(this.demo.params?.compliance_enabled);
        const threshold = Number(this.demo.params?.compliance_threshold);
        if (Number.isFinite(threshold)) {
          this.complianceThreshold = threshold;
        }
        this.startTrackingPoll();
        this.renderScale = this.demo.renderScale ?? this.renderScale;
        const matchingPolicy = this.policies.find(
          (policy) => policy.policyPath === this.demo.currentPolicyPath
        );
        if (matchingPolicy) {
          this.currentPolicy = matchingPolicy.value;
        }
        this.policyLabel = this.demo.currentPolicyPath?.split('/').pop() ?? this.policyLabel;
        this.state = 1;
      } catch (error) {
        this.state = -1;
        this.extra_error_message = error.toString();
        console.error(error);
      }
    },
    reapplyCustomMotions() {
      if (!this.demo || !this.customMotions) {
        return;
      }
      const names = Object.keys(this.customMotions);
      if (names.length === 0) {
        return;
      }
      this.addMotions(this.customMotions);
    },
    async onMotionUpload(files) {
      const fileList = Array.isArray(files)
        ? files
        : files instanceof FileList
          ? Array.from(files)
          : files
            ? [files]
            : [];
      if (fileList.length === 0) {
        return;
      }
      if (!this.demo) {
        this.motionUploadMessage = this.t.demoNotReady;
        this.motionUploadType = 'warning';
        this.motionUploadFiles = [];
        return;
      }

      let added = 0;
      let skipped = 0;
      let invalid = 0;
      let failed = 0;
      const prefix = '[new] ';

      for (const file of fileList) {
        try {
          const text = await file.text();
          const parsed = JSON.parse(text);
          const clip = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
            ? parsed
            : null;
          if (!clip) {
            invalid += 1;
            continue;
          }

          const baseName = file.name.replace(/\.[^/.]+$/, '').trim();
          const normalizedName = baseName ? baseName : 'motion';
          const motionName = normalizedName.startsWith(prefix)
            ? normalizedName
            : `${prefix}${normalizedName}`;
          const result = this.addMotions({ [motionName]: clip });
          added += result.added.length;
          skipped += result.skipped.length;
          invalid += result.invalid.length;

          if (result.added.length > 0) {
            if (!this.customMotions) {
              this.customMotions = {};
            }
            for (const name of result.added) {
              this.customMotions[name] = clip;
            }
          }
        } catch (error) {
          console.error('Failed to read motion JSON:', error);
          failed += 1;
        }
      }

      if (added > 0) {
        this.availableMotions = this.getAvailableMotions();
      }

      const parts = [];
      if (added > 0) {
        parts.push(this.formatCount(this.t.addedMotions, added));
      }
      if (skipped > 0) {
        parts.push(this.formatCount(this.t.skippedDuplicates, skipped));
      }
      const badCount = invalid + failed;
      if (badCount > 0) {
        parts.push(this.formatCount(this.t.ignoredInvalid, badCount));
      }
      if (parts.length === 0) {
        this.motionUploadMessage = this.t.noMotionsAdded;
        this.motionUploadType = 'info';
      } else {
        this.motionUploadMessage = `${parts.join('. ')}.`;
        this.motionUploadType = badCount > 0 ? 'warning' : 'success';
      }
      this.motionUploadFiles = [];
    },
    toggleCameraFollow() {
      this.cameraFollowEnabled = !this.cameraFollowEnabled;
      if (this.demo?.setFollowEnabled) {
        this.demo.setFollowEnabled(this.cameraFollowEnabled);
      }
    },
    toggleCompliance() {
      const nextEnabled = !this.complianceEnabled;
      if (nextEnabled) {
        const current = this.currentMotion ?? this.demo?.params?.current_motion;
        if (current && !this.isMotionComplianceSuitable(current)) {
          return;
        }
      }
      this.complianceEnabled = nextEnabled;
      this.applyComplianceSettings();
    },
    onComplianceThresholdChange(value) {
      const numeric = Number(value);
      if (!Number.isFinite(numeric)) {
        return;
      }
      this.complianceThreshold = numeric;
      this.applyComplianceSettings();
    },
    applyComplianceSettings() {
      if (!this.demo?.params) {
        return;
      }
      this.demo.params.compliance_enabled = Boolean(this.complianceEnabled);
      this.demo.params.compliance_threshold = Number(this.complianceThreshold);
    },
    isMotionComplianceSuitable(name) {
      const tracking = this.demo?.policyRunner?.tracking ?? null;
      if (!tracking || typeof tracking.isComplianceSuitable !== 'function') {
        return true;
      }
      return tracking.isComplianceSuitable(name);
    },
    isMotionDisabled(name) {
      if (name === 'default') {
        return true;
      }
      if (!this.complianceEnabled) {
        return false;
      }
      return !this.isMotionComplianceSuitable(name);
    },
    onMotionChange(value) {
      if (!this.demo) {
        return;
      }
      if (!value || value === this.demo.params.current_motion) {
        this.currentMotion = this.demo.params.current_motion ?? value;
        return;
      }
      const accepted = this.requestMotion(value);
      if (!accepted) {
        this.currentMotion = this.demo.params.current_motion;
      } else {
        this.currentMotion = value;
        this.updateTrackingState();
      }
    },
    async onPolicyChange(value) {
      if (!this.demo || !value) {
        return;
      }
      const selected = this.policies.find((policy) => policy.value === value);
      if (!selected) {
        return;
      }
      const needsReload = selected.policyPath !== this.demo.currentPolicyPath || selected.onnxPath;
      if (!needsReload) {
        return;
      }
      const wasPaused = this.demo.params?.paused ?? false;
      this.demo.params.paused = true;
      this.isPolicyLoading = true;
      this.policyLoadError = '';
      try {
        await this.demo.reloadPolicy(selected.policyPath, {
          onnxPath: selected.onnxPath || undefined
        });
        this.policyLabel = selected.policyPath?.split('/').pop() ?? this.policyLabel;
        this.reapplyCustomMotions();
        this.availableMotions = this.getAvailableMotions();
        this.currentMotion = this.demo.params.current_motion ?? this.availableMotions[0] ?? null;
        this.updateTrackingState();
      } catch (error) {
        console.error('Failed to reload policy:', error);
        this.policyLoadError = error.toString();
      } finally {
        this.isPolicyLoading = false;
        this.demo.params.paused = wasPaused;
      }
    },
    reset() {
      if (!this.demo) {
        return;
      }
      this.demo.resetSimulation();
      this.availableMotions = this.getAvailableMotions();
      this.currentMotion = this.demo.params.current_motion ?? this.availableMotions[0] ?? null;
      this.updateTrackingState();
    },
    backToDefault() {
      if (!this.demo) {
        return;
      }
      const accepted = this.requestMotion('default');
      if (accepted) {
        this.currentMotion = 'default';
        this.updateTrackingState();
      }
    },
    startTrackingPoll() {
      this.stopTrackingPoll();
      this.updateTrackingState();
      this.updatePerformanceStats();
      this.trackingTimer = setInterval(() => {
        this.updateTrackingState();
        this.updatePerformanceStats();
      }, 33);
    },
    stopTrackingPoll() {
      if (this.trackingTimer) {
        clearInterval(this.trackingTimer);
        this.trackingTimer = null;
      }
    },
    updateTrackingState() {
      const tracking = this.demo?.policyRunner?.tracking ?? null;
      if (!tracking) {
        this.trackingState = {
          available: false,
          currentName: 'default',
          currentDone: true,
          refIdx: 0,
          refLen: 0,
          transitionLen: 0,
          motionLen: 0,
          inTransition: false,
          isDefault: true
        };
        return;
      }
      const state = tracking.playbackState();
      this.trackingState = { ...state };
      this.availableMotions = tracking.availableMotions();
      const current = this.demo.params.current_motion ?? state.currentName ?? null;
      if (current && this.currentMotion !== current) {
        this.currentMotion = current;
      }
    },
    updatePerformanceStats() {
      if (!this.demo) {
        this.simStepHz = 0;
        return;
      }
      this.simStepHz = this.demo.getSimStepHz?.() ?? this.demo.simStepHz ?? 0;
    },
    onRenderScaleChange(value) {
      if (!this.demo) {
        return;
      }
      this.demo.setRenderScale(value);
    },
    getAvailableMotions() {
      const tracking = this.demo?.policyRunner?.tracking ?? null;
      return tracking ? tracking.availableMotions() : [];
    },
    addMotions(motions, options = {}) {
      const tracking = this.demo?.policyRunner?.tracking ?? null;
      if (!tracking) {
        return { added: [], skipped: [], invalid: [] };
      }
      return tracking.addMotions(motions, options);
    },
    requestMotion(name) {
      const tracking = this.demo?.policyRunner?.tracking ?? null;
      if (!tracking || !this.demo) {
        return false;
      }
      const state = this.demo.readPolicyState();
      const accepted = tracking.requestMotion(name, state);
      if (accepted) {
        this.demo.params.current_motion = name;
      }
      return accepted;
    }
  },
  mounted() {
    this.customMotions = {};
    this.isSafari = this.detectSafari();
    this.updateScreenState();
    this.updateVisualViewportOffset();
    this.resize_listener = () => {
      this.updateScreenState();
      this.updateVisualViewportOffset();
    };
    window.addEventListener('resize', this.resize_listener);
    if (window.visualViewport) {
      this.vvp_listener = () => {
        this.updateVisualViewportOffset();
      };
      window.visualViewport.addEventListener('resize', this.vvp_listener);
      window.visualViewport.addEventListener('scroll', this.vvp_listener);
    }
    this.init();
    this.keydown_listener = (event) => {
      if (event.code === 'Backspace') {
        this.reset();
      }
    };
    document.addEventListener('keydown', this.keydown_listener);
  },
  beforeUnmount() {
    this.stopTrackingPoll();
    document.removeEventListener('keydown', this.keydown_listener);
    if (this.resize_listener) {
      window.removeEventListener('resize', this.resize_listener);
    }
    if (this.vvp_listener && window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.vvp_listener);
      window.visualViewport.removeEventListener('scroll', this.vvp_listener);
    }
  }
};
</script>

<style scoped>
.controls {
  position: fixed;
  top: calc(var(--header-h, 58px) + 20px);
  right: 20px;
  width: 320px;
  z-index: 1000;
}

.controls-mobile {
  top: auto;
  right: 12px;
  left: 12px;
  bottom: calc(12px + constant(safe-area-inset-bottom) + var(--vvp-offset-bottom, 0px));
  bottom: calc(12px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
  width: auto;
  max-width: none;
}

.controls-mobile-collapsed {
  bottom: calc(12px + constant(safe-area-inset-bottom) + var(--vvp-offset-bottom, 0px));
  bottom: calc(12px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
}

.global-alerts {
  position: fixed;
  top: calc(var(--header-h, 58px) + 20px);
  left: 16px;
  right: 16px;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 1200;
}

.small-screen-alert {
  width: 100%;
}

.safari-alert {
  width: 100%;
}

.controls-card {
  max-height: calc(100vh - 40px);
}

.controls-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.controls-title-mobile {
  padding-right: 12px;
}

.controls-toggle-btn {
  text-transform: none;
  letter-spacing: 0;
}

.controls-mobile .controls-card {
  max-height: min(52vh, 420px);
  border-radius: 18px;
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.22);
  display: flex;
  flex-direction: column;
}

.controls-mobile-collapsed .controls-card {
  max-height: none;
}

.controls-body {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  overscroll-behavior: contain;
}

.controls-mobile .controls-body {
  flex: 1 1 auto;
  min-height: 0;
  max-height: none;
  overflow-y: auto;
}

.controls-mobile :deep(.v-card-title) {
  font-size: 0.95rem;
  line-height: 1.2;
  padding: 12px 16px 8px;
  flex-shrink: 0;
}

/* v-card-text 与 .controls-body 是同一元素，占满剩余空间，内容纵向可滚动 */
.controls-mobile :deep(.v-card-text) {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 16px;
  padding-right: 16px;
}

/* Reset 按钮固定在卡片底部，不被压缩 */
.controls-mobile :deep(.v-card-actions) {
  flex-shrink: 0;
  padding: 8px 16px calc(14px + constant(safe-area-inset-bottom));
  padding: 8px 16px calc(14px + env(safe-area-inset-bottom, 0px));
}

.controls-mobile-collapsed :deep(.v-card-actions) {
  display: none;
}

.controls-mobile :deep(.v-btn) {
  min-height: 34px;
}

.controls-mobile .motion-groups {
  max-height: 132px;
}

.motion-status {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.motion-groups {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
  max-height: 200px;
  overflow-y: auto;
}

.motion-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.motion-chip {
  text-transform: none;
  font-size: 0.7rem;
}

.status-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.status-name {
  font-weight: 600;
}

.policy-file {
  display: block;
  margin-top: 4px;
}


.upload-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.upload-toggle {
  padding: 0;
  min-height: unset;
  font-size: 0.85rem;
  text-transform: none;
}

.motion-progress-no-animation,
.motion-progress-no-animation *,
.motion-progress-no-animation::before,
.motion-progress-no-animation::after {
  transition: none !important;
  animation: none !important;
}

.motion-progress-no-animation :deep(.v-progress-linear__determinate),
.motion-progress-no-animation :deep(.v-progress-linear__indeterminate),
.motion-progress-no-animation :deep(.v-progress-linear__background) {
  transition: none !important;
  animation: none !important;
}

@media (max-width: 640px), (max-height: 760px) {
  .global-alerts {
    top: calc(var(--header-h, 58px) + 12px);
    left: 12px;
    right: 12px;
  }
}
</style>
