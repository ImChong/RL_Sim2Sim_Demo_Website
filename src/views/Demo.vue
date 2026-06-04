<template>
  <AmpMobileJoystick
    v-if="showAmpJoystick"
    ref="ampJoystick"
    :disabled="state !== 1"
    :dock-above-mobile-panel="isSmallScreen"
    :labels="ampJoystickLabels"
    :cmd-x="cmdX"
    :cmd-y="cmdY"
    :cmd-yaw="cmdYaw"
    @command="onAmpJoystickCommand"
    @knockdown="onKnockdownTest"
  />
  <ParkourMobileJoystick
    v-if="showParkourJoystick"
    ref="parkourJoystick"
    :disabled="state !== 1 || parkourLoading"
    :dock-above-mobile-panel="isSmallScreen"
    :labels="parkourJoystickLabels"
    :virtual-keys="parkourVirtualKeys"
    @input="onParkourJoystickInput"
    @pause="onParkourPause"
    @reset-run="onParkourResetRun"
  />
  <div id="mujoco-container"></div>
  <div v-if="isParkourPolicy" class="parkour-frame-wrap">
    <iframe
      ref="parkourFrame"
      :key="parkourReloadKey"
      :src="parkourIframeSrc"
      class="parkour-frame"
      title="G1 Perceptive Parkour Demo"
      allow="autoplay; fullscreen"
      @load="onParkourLoad"
    ></iframe>
  </div>
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
  <div
    ref="mobileControlsPanel"
    :class="['controls', { 'controls-mobile': isSmallScreen, 'controls-mobile-collapsed': isSmallScreen && isMobileControlsCollapsed }]"
    :style="desktopControlsPanelStyle"
  >
    <v-card
      class="controls-card"
      :class="{ 'controls-card-resizable': !isSmallScreen }"
    >
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
        <div class="training-links">
          <v-btn
            href="https://github.com/ccrpRepo/AMP_mjlab"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            size="small"
            color="primary"
            class="text-capitalize"
          >
            <v-icon icon="mdi-github" class="mr-1"></v-icon>
            G1 AMP Walk/Run/Getup Training Code
          </v-btn>
          <v-btn
            href="https://php-parkour.github.io/index.html"
            target="_blank"
            rel="noopener noreferrer"
            variant="text"
            size="small"
            color="primary"
            class="text-capitalize"
          >
            <v-icon icon="mdi-file-document-outline" class="mr-1"></v-icon>
            G1 Perceptive Parkour Paper
          </v-btn>
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
            G1 Tracking Training Code
          </v-btn>
        </div>

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
          :disabled="state !== 1"
          @update:modelValue="onPolicyChange"
        ></v-select>

        <div v-if="isParkourPolicy" class="parkour-controls mt-4">
          <v-alert
            type="info"
            variant="tonal"
            density="compact"
            class="mb-3"
          >
            {{ t.parkourHoldW }}
          </v-alert>
          <template v-if="!isSmallScreen">
            <span class="status-name">{{ t.parkourHowToPlay }}</span>
            <div class="parkour-keys mt-2">
              <template v-for="row in parkourControls" :key="row.key">
                <kbd class="parkour-key">{{ row.key }}</kbd>
                <span class="text-caption">{{ row.label }}</span>
              </template>
            </div>
            <div class="text-caption mt-2 text-medium-emphasis">{{ t.parkourKeyboardFocusHint }}</div>
          </template>
          <div class="text-caption mt-2">{{ t.parkourClimbNote }}</div>
          <div v-if="!isSmallScreen" class="text-caption mt-2 text-medium-emphasis">{{ t.parkourSource }}</div>
        </div>

        <div v-if="isAmpPolicy" class="mt-4">
          <div class="status-legend follow-controls mt-2">
            <span class="status-name">{{ t.velocityX }}</span>
            <span class="text-caption">{{ cmdX.toFixed(2) }}</span>
          </div>
          <v-slider
            v-model="cmdX"
            min="-1.5"
            max="3.0"
            step="0.1"
            density="compact"
            hide-details
            :aria-label="t.velocityX"
            @update:modelValue="onCmdChange"
          ></v-slider>
          <div class="status-legend follow-controls mt-2">
            <span class="status-name">{{ t.velocityY }}</span>
            <span class="text-caption">{{ cmdY.toFixed(2) }}</span>
          </div>
          <v-slider
            v-model="cmdY"
            min="-1.0"
            max="1.0"
            step="0.1"
            density="compact"
            hide-details
            :aria-label="t.velocityY"
            @update:modelValue="onCmdChange"
          ></v-slider>
          <div class="status-legend follow-controls mt-2">
            <span class="status-name">{{ t.yawRate }}</span>
            <span class="text-caption">{{ cmdYaw.toFixed(2) }}</span>
          </div>
          <v-slider
            v-model="cmdYaw"
            min="-1.57"
            max="1.57"
            step="0.1"
            density="compact"
            hide-details
            :aria-label="t.yawRate"
            @update:modelValue="onCmdChange"
          ></v-slider>
          <v-btn
            class="mt-3"
            color="secondary"
            variant="tonal"
            block
            size="small"
            data-test="knockdown-test"
            :disabled="state !== 1"
            @click.stop="onKnockdownTest"
          >
            {{ t.knockdownTest }}
          </v-btn>
          <div class="text-caption mt-1">{{ t.knockdownTestHint }}</div>
          <div v-if="!isSmallScreen" class="amp-keyboard-controls mt-3">
            <span class="status-name">{{ t.ampKeyboardHowToPlay }}</span>
            <div class="parkour-keys mt-2">
              <template v-for="row in ampKeyboardControls" :key="row.key">
                <kbd class="parkour-key">{{ row.key }}</kbd>
                <span class="text-caption">{{ row.label }}</span>
              </template>
            </div>
            <div class="text-caption mt-2 text-medium-emphasis">{{ t.ampKeyboardFocusHint }}</div>
          </div>
        </div>

        <v-alert
          v-if="policyLoadError"
          type="error"
          variant="tonal"
          density="compact"
          class="mt-2"
        >
          {{ policyLoadError }}
        </v-alert>

        <div v-if="!isAmpPolicy && !isParkourPolicy" class="status-legend follow-controls mt-2">
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
          v-if="!isAmpPolicy && !isParkourPolicy"
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

        <template v-if="!isAmpPolicy && !isParkourPolicy">
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
              <span>
                {{ t.motionUploadHelpRead }}
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/Axellwppr/humanoid-policy-viewer?tab=readme-ov-file#add-your-own-robot-policy-and-motions">{{ t.motionUploadHelpLink }}</a>
                {{ t.motionUploadHelpInstructions }}
                <br>
                {{ t.motionUploadHelpDetails }}
              </span>
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

        </template>

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
        <div class="status-legend follow-controls mt-2">
          <span class="status-name">{{ t.simFreq }}</span>
          <span class="text-caption">{{ simStepLabel }}</span>
        </div>
        <div class="status-legend follow-controls mt-2">
          <span class="status-name">{{ t.renderScale }}</span>
          <span class="text-caption">{{ renderScaleLabel }}</span>
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
        <div class="status-legend follow-controls mt-2">
          <span class="status-name">{{ t.groundReflection }}</span>
          <span class="text-caption">{{ reflectionQualityLabel }}</span>
        </div>
        <v-slider
          v-model="reflectionQuality"
          min="0"
          max="4"
          step="1"
          density="compact"
          hide-details
          :aria-label="t.groundReflection"
          @update:modelValue="onReflectionQualityChange"
        ></v-slider>
      </v-card-text>
      <v-card-actions class="controls-actions">
        <v-btn color="primary" block @click="reset">{{ isParkourPolicy ? t.parkourReset : t.reset }}</v-btn>
      </v-card-actions>

      <template v-if="!isSmallScreen">
        <div
          class="controls-resize-handle controls-resize-w"
          role="separator"
          :aria-label="t.resizeControlWidth"
          @mousedown.prevent="startControlPanelResize('w', $event)"
        />
        <div
          class="controls-resize-handle controls-resize-s"
          role="separator"
          :aria-label="t.resizeControlHeight"
          @mousedown.prevent="startControlPanelResize('s', $event)"
        />
        <div
          class="controls-resize-handle controls-resize-sw"
          role="separator"
          :aria-label="t.resizeControlBoth"
          @mousedown.prevent="startControlPanelResize('sw', $event)"
        />
      </template>
    </v-card>
  </div>
  <v-dialog
    :model-value="showSimulationLoadingDialog"
    persistent
    max-width="600px"
    scrollable
    class="loading-simulation-dialog"
  >
    <v-card :title="t.loadingSimulationTitle">
      <v-card-text>
        <p class="text-body-2 mb-3">{{ t.loadingSimulationBody }}</p>
        <v-progress-linear
          :model-value="simulationLoadingProgress"
          height="10"
          color="primary"
          rounded
          class="loading-simulation-progress"
          :aria-label="t.loadingSimulationTitle"
          :aria-valuenow="simulationLoadingProgress"
          aria-valuemin="0"
          aria-valuemax="100"
          role="progressbar"
        ></v-progress-linear>
        <div class="text-caption text-medium-emphasis mt-2 text-end">{{ simulationLoadingProgress }}%</div>
      </v-card-text>
    </v-card>
  </v-dialog>
  <ModelIOFlowchart
    v-if="!isParkourPolicy"
    :demo="demo"
    :ready="state === 1"
    :language="language"
    :is-small-screen="isSmallScreen"
    :mobile-controls-collapsed="isMobileControlsCollapsed"
  />
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
import ModelIOFlowchart from '@/components/ModelIOFlowchart.vue';
import AmpMobileJoystick from '@/components/AmpMobileJoystick.vue';
import ParkourMobileJoystick from '@/components/ParkourMobileJoystick.vue';
import {
  clampControlPanelSize,
  loadControlPanelSize,
  saveControlPanelSize
} from '@/utils/controlPanelSize.js';
import {
  AMP_KEYBOARD_CONTROL_ROWS,
  computeAmpCommandFromKeys,
  isAmpKnockdownKey,
  isAmpMovementKey
} from '@/utils/ampKeyboardCommand.js';
import {
  computeParkourMobileDepthLayout,
  computeParkourMobileDepthLayoutFromMetrics,
  computeParkourMobileDepthLayoutWithClearance
} from '@/utils/parkourDepthPreviewLayout.js';
import {
  isParkourMovementKey,
  isParkourPauseKey,
  isParkourResetKey,
  parkourVirtualKeysFromKeyboard
} from '@/utils/parkourKeyboardCommand.js';

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
    motionUploadHelpRead: 'Read ',
    motionUploadHelpLink: 'readme',
    motionUploadHelpInstructions: ' to learn how to create motion JSON files from GMR.',
    motionUploadHelpDetails: 'Each file should be a single clip (same schema as motions/default.json). File name becomes the motion name (prefixed with [new]). Duplicate names are ignored.',
    cameraFollow: 'Camera follow',
    velocityX: 'Velocity X',
    velocityY: 'Velocity Y',
    yawRate: 'Yaw Rate',
    renderScale: 'Render scale',
    groundReflection: 'Ground reflection',
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
    noMotionsAdded: 'No motions were added.',
    knockdownTest: 'Knockdown test',
    knockdownTestHint: 'Applies a strong horizontal impulse on the pelvis in a random XY direction (fixed magnitude) for get-up testing.',
    ampKeyboardHowToPlay: 'PC keyboard (AMP)',
    ampKeyForward: 'Walk forward',
    ampKeyBackward: 'Walk backward',
    ampKeyLeft: 'Strafe left',
    ampKeyRight: 'Strafe right',
    ampKeyRotateLeft: 'Turn in place left',
    ampKeyRotateRight: 'Turn in place right',
    ampKeySprint: 'Hold for maximum speed',
    ampKeyKnockdown: 'Knockdown test',
    ampKeyboardFocusHint: 'Click the demo view first, then use the keys. Sliders update while keys are held.',
    ampJoystickGroup: 'AMP movement controls',
    ampJoystickMove: 'Move',
    ampJoystickRotateLeft: 'Turn left',
    ampJoystickRotateRight: 'Turn right',
    parkourJoystickGroup: 'Parkour movement controls',
    parkourJoystickMove: 'Move (up = forward, left/right = turn in place, no backward)',
    parkourJoystickPause: 'Pause',
    parkourJoystickResetRun: 'Reset run',
    ampPolicyDescription:
      'AMP policy trained for walk, run, and get-up behaviors.',
    parkourPolicyDescription:
      'Perceptive humanoid parkour demo (embedded). Drive the G1 over the terrain course with the keyboard.',
    parkourHoldW:
      'Keep holding W during approach, climbing, on top, and descent, until you are back on the ground.',
    parkourHowToPlay: 'How to play',
    parkourMoveForward: 'Move forward',
    parkourTurnLeft: 'Turn left',
    parkourTurnRight: 'Turn right',
    parkourSpeed: 'Toggle speed mode',
    parkourPause: 'Pause',
    parkourResetRun: 'Reset run',
    parkourClimbNote: 'Climbing engages automatically while you hold W.',
    parkourFocusHint: 'Click the demo view first, then use the keys.',
    parkourKeyboardFocusHint: 'Use WASD and Shift on the keyboard; the joystick knob follows while keys are held.',
    parkourSource: 'Embedded build from php-parkour, self-hosted in this site.',
    parkourReset: 'Restart run',
    resizeControlWidth: 'Resize control panel width (left edge)',
    resizeControlHeight: 'Resize control panel height (bottom edge)',
    resizeControlBoth: 'Resize control panel (bottom-left corner)'
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
    motionUploadHelpRead: '阅读 ',
    motionUploadHelpLink: 'readme',
    motionUploadHelpInstructions: ' 了解如何从 GMR 创建动作 JSON 文件。',
    motionUploadHelpDetails: '每个文件应只包含一个片段（结构与 motions/default.json 一致）。文件名会作为动作名称（自动添加 [new] 前缀），重复名称会被忽略。',
    cameraFollow: '相机跟随',
    velocityX: 'X 方向速度',
    velocityY: 'Y 方向速度',
    yawRate: '偏航角速度',
    renderScale: '渲染倍率',
    groundReflection: '地面反射',
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
    noMotionsAdded: '没有添加任何动作。',
    knockdownTest: '击倒测试',
    knockdownTestHint: '在骨盆上沿水平面（XY）随机方向施加一次固定大小的强冲击，用于测试倒地起身。',
    ampKeyboardHowToPlay: 'PC 键盘（AMP）',
    ampKeyForward: '向前行走',
    ampKeyBackward: '向后行走',
    ampKeyLeft: '向左平移',
    ampKeyRight: '向右平移',
    ampKeyRotateLeft: '原地向左旋转',
    ampKeyRotateRight: '原地向右旋转',
    ampKeySprint: '按住时以最大速度',
    ampKeyKnockdown: '击倒测试',
    ampKeyboardFocusHint: '请先点击演示画面，再使用键盘。按住按键时滑块会同步显示当前速度。',
    ampJoystickGroup: 'AMP 移动控制',
    ampJoystickMove: '移动',
    ampJoystickRotateLeft: '左转',
    ampJoystickRotateRight: '右转',
    parkourJoystickGroup: '跑酷移动控制',
    parkourJoystickMove: '移动（上=前进，左/右=原地转向，无后退）',
    parkourJoystickPause: '暂停',
    parkourJoystickResetRun: '重置当前回合',
    ampPolicyDescription:
      '用于行走、跑步和起身行为的 AMP 策略。',
    parkourPolicyDescription:
      '感知型人形跑酷演示（内嵌）。用键盘驱动 G1 穿越地形障碍课程。',
    parkourHoldW:
      '在接近、攀爬、登顶和下降的整个过程中持续按住 W，直到重新回到地面。',
    parkourHowToPlay: '操作说明',
    parkourMoveForward: '前进',
    parkourTurnLeft: '左转',
    parkourTurnRight: '右转',
    parkourSpeed: '按住快速（松开恢复慢速）',
    parkourPause: '暂停',
    parkourResetRun: '重置当前回合',
    parkourClimbNote: '按住 W 时会自动触发攀爬。',
    parkourFocusHint: '请先点击演示画面，再使用键盘按键。',
    parkourKeyboardFocusHint: '可用 WASD 与 Shift 键盘控制；按住按键时摇杆会同步显示方向。',
    parkourSource: '内嵌自 php-parkour 的构建，已自托管在本站。',
    parkourReset: '重新开始',
    resizeControlWidth: '拖拽左边框调整控制面板宽度',
    resizeControlHeight: '拖拽下边框调整控制面板高度',
    resizeControlBoth: '拖拽左下角同时调整控制面板大小'
  }
};

export default {
  name: 'DemoPage',
  components: {
    ModelIOFlowchart,
    AmpMobileJoystick,
    ParkourMobileJoystick
  },
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
        value: 'g1-amp-walk-run-getup',
        title: 'G1 AMP Walk/Run/Getup',
        description: 'AMP policy trained for walk, run, and get-up behaviors.',
        descriptionKey: 'ampPolicyDescription',
        policyPath: './examples/checkpoints/g1/amp_policy_walk_run_getup.json',
        onnxPath: './examples/checkpoints/g1/walk_run_getup/model_60000.onnx',
        scenePath: 'g1_amp/scene_g1.xml'
      },
      {
        value: 'g1-parkour',
        title: 'G1 Perceptive Parkour',
        descriptionKey: 'parkourPolicyDescription',
        isExternalDemo: true,
        iframePath: 'parkour/dist-desktop/index.html'
      },
      {
        value: 'g1-tracking-latest',
        title: 'G1 Tracking',
        description: 'Tracking policy with compliance input enabled.',
        descriptionKey: 'policyDescription',
        policyPath: './examples/checkpoints/g1/tracking_policy_latest.json',
        onnxPath: './examples/checkpoints/g1/tracking/policy_latest.onnx',
        scenePath: 'g1/g1.xml'
      }
    ],
    currentPolicy: 'g1-amp-walk-run-getup',
    policyLabel: '',
    policyLoadError: '',
    motionUploadFiles: [],
    motionUploadMessage: '',
    motionUploadType: 'success',
    showUploadOptions: false,
    cameraFollowEnabled: true,
    complianceEnabled: false,
    complianceThreshold: 10.0,
    cmdX: 0.0,
    cmdY: 0.0,
    cmdYaw: 0.0,
    ampKeysHeld: new Set(),
    ampShiftHeld: false,
    renderScale: 2.0,
    reflectionQuality: 2,
    simStepHz: 0,
    isSmallScreen: false,
    isMobileControlsCollapsed: true,
    showSmallScreenAlert: true,
    isSafari: false,
    showSafariAlert: true,
    resize_listener: null,
    vvp_listener: null,
    simulationLoadProgress: 0,
    controlPanelWidth: loadControlPanelSize().width,
    controlPanelHeight: loadControlPanelSize().height,
    controlPanelResize: null,
    parkourSuspended: false,
    parkourLoading: false,
    parkourLoadProgress: 0,
    parkourReceivedProgress: false,
    parkourReloadKey: 0,
    parkourVirtualKeys: { w: false, a: false, d: false },
    parkourKeysHeld: new Set(),
    parkourShiftHeld: false
  }),
  computed: {
    desktopControlsPanelStyle() {
      if (this.isSmallScreen) {
        return null;
      }
      return {
        width: `${this.controlPanelWidth}px`,
        height: `${this.controlPanelHeight}px`
      };
    },
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
    isAmpPolicy() {
      return this.currentPolicy?.startsWith('g1-amp');
    },
    showAmpJoystick() {
      return this.isAmpPolicy && !this.isParkourPolicy;
    },
    showParkourJoystick() {
      return this.isParkourPolicy;
    },
    ampJoystickLabels() {
      return {
        group: this.t.ampJoystickGroup,
        move: this.t.ampJoystickMove,
        rotateLeft: this.t.ampJoystickRotateLeft,
        rotateRight: this.t.ampJoystickRotateRight,
        knockdown: this.t.knockdownTest
      };
    },
    parkourJoystickLabels() {
      return {
        group: this.t.parkourJoystickGroup,
        move: this.t.parkourJoystickMove,
        pause: this.t.parkourJoystickPause,
        resetRun: this.t.parkourJoystickResetRun
      };
    },
    isParkourPolicy() {
      return this.selectedPolicy?.isExternalDemo === true;
    },
    parkourIframeSrc() {
      const base = import.meta.env.BASE_URL || '/';
      const path = this.selectedPolicy?.iframePath ?? '';
      return `${base}${path}`;
    },
    parkourControls() {
      return [
        { key: 'W', label: this.t.parkourMoveForward },
        { key: 'A', label: this.t.parkourTurnLeft },
        { key: 'D', label: this.t.parkourTurnRight },
        { key: 'SHIFT', label: this.t.parkourSpeed },
        { key: 'SPACE', label: this.t.parkourPause },
        { key: 'BACKSPACE', label: this.t.parkourResetRun }
      ];
    },
    ampKeyboardControls() {
      return AMP_KEYBOARD_CONTROL_ROWS.map((row) => ({
        key: row.key,
        label: this.t[row.labelKey] ?? row.labelKey
      }));
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
    reflectionQualityLabel() {
      const sizes = [128, 192, 256, 384, 512];
      const idx = Math.max(0, Math.min(4, Math.round(this.reflectionQuality)));
      return `${sizes[idx]} px`;
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
    },
    showSimulationLoadingDialog() {
      return this.state === 0 || this.parkourLoading;
    },
    simulationLoadingProgress() {
      return this.parkourLoading ? this.parkourLoadProgress : this.simulationLoadProgress;
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
        this.syncParkourHostControls();
      }
      this.isSmallScreen = isSmall;
      this.$nextTick(() => this.syncMobileControlsHeightObserver());
    },
    updateVisualViewportOffset() {
      if (!window.visualViewport) return;
      const vvp = window.visualViewport;
      // 布局视口底部与可视视口底部之间的差值，即浏览器底部工具栏高度
      const offset = Math.max(0, window.innerHeight - (vvp.offsetTop + vvp.height));
      document.documentElement.style.setProperty('--vvp-offset-bottom', `${offset}px`);
      this.updateMobileControlsHeight();
    },
    updateMobileControlsHeight() {
      if (!this.isSmallScreen) {
        document.documentElement.style.removeProperty('--mobile-controls-panel-height');
        return;
      }
      const panel = this.$refs.mobileControlsPanel;
      if (!panel) {
        return;
      }
      const height = Math.ceil(panel.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--mobile-controls-panel-height', `${height}px`);
      if (this.isParkourPolicy) {
        this.syncParkourHostControls();
      }
    },
    syncMobileControlsHeightObserver() {
      if (!this.mobileControlsResizeObserver) {
        return;
      }
      this.mobileControlsResizeObserver.disconnect();
      if (!this.isSmallScreen) {
        document.documentElement.style.removeProperty('--mobile-controls-panel-height');
        return;
      }
      const panel = this.$refs.mobileControlsPanel;
      if (panel) {
        this.mobileControlsResizeObserver.observe(panel);
        this.updateMobileControlsHeight();
      }
    },
    toggleMobileControls() {
      if (!this.isSmallScreen) {
        return;
      }
      this.isMobileControlsCollapsed = !this.isMobileControlsCollapsed;
      this.$nextTick(() => {
        this.updateMobileControlsHeight();
        if (this.isParkourPolicy) {
          this.syncParkourHostControls();
        }
      });
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
    setSimulationLoadProgress(ratio) {
      this.simulationLoadProgress = Math.round(Math.min(100, Math.max(0, ratio * 100)));
    },
    async runWithSimulationLoading(task) {
      const previousState = this.state;
      this.state = 0;
      this.simulationLoadProgress = 0;
      try {
        await task((ratio) => this.setSimulationLoadProgress(ratio));
        this.state = 1;
      } catch (error) {
        if (previousState === 1) {
          this.state = 1;
        } else {
          this.state = -1;
          // Fail securely: do not expose error.message to the user to prevent leaking sensitive system information.
          this.extra_error_message = 'An unexpected error occurred';
          console.error('Simulation load failed:', error);
        }
        throw error;
      }
    },
    async init() {
      if (typeof WebAssembly !== 'object' || typeof WebAssembly.instantiate !== 'function') {
        this.state = -2;
        return;
      }

      try {
        await this.runWithSimulationLoading(async (report) => {
          report(0.02);
          const mujoco = await loadMujoco();
          report(0.10);
          this.demo = new MuJoCoDemo(mujoco);
          this.demo.setVisualTheme?.(this.visualTheme);
          this.demo.setFollowEnabled?.(this.cameraFollowEnabled);
          await this.demo.init((r) => {
            report(0.10 + 0.90 * r);
          });
          report(1);
        });
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
        this.reflectionQuality = this.demo.reflectionQuality ?? this.reflectionQuality;
        const matchingPolicy = this.policies.find(
          (policy) => policy.policyPath === this.demo.currentPolicyPath
        );
        if (matchingPolicy) {
          this.currentPolicy = matchingPolicy.value;
        }
        this.policyLabel = this.demo.currentPolicyPath?.split('/').pop() ?? this.policyLabel;
      } catch (error) {
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
          // Add a 5MB size limit check to prevent Uncontrolled Resource Consumption (DoS)
          // parsing large JSON files could block the UI thread or cause OOM
          if (file.size > 5 * 1024 * 1024) {
            console.warn(`File ${file.name} exceeds 5MB limit, skipping.`);
            failed += 1;
            continue;
          }
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
      if (this.isParkourPolicy) {
        this.postParkourHostControl({ cameraFollow: this.cameraFollowEnabled });
        return;
      }
      if (this.demo?.setFollowEnabled) {
        this.demo.setFollowEnabled(this.cameraFollowEnabled);
      }
    },
    postParkourHostControl(partial) {
      const win = this.$refs.parkourFrame?.contentWindow;
      if (!win) {
        return;
      }
      try {
        win.postMessage(
          {
            source: 'parkour-host-control',
            type: 'apply',
            ...partial
          },
          window.location.origin
        );
      } catch (error) {
        /* iframe may not be ready */
      }
    },
    syncParkourHostControls() {
      if (!this.isParkourPolicy) {
        return;
      }
      this.postParkourHostControl({
        cameraFollow: this.cameraFollowEnabled,
        renderScale: this.renderScale,
        reflectionQuality: this.reflectionQuality,
        ...this.getParkourDepthPreviewLayout()
      });
    },
    getParkourDepthPreviewLayout() {
      const scale = this.isSmallScreen ? 2 : 4;
      if (!this.isSmallScreen) {
        const inset = 16;
        return {
          depthPreviewScale: scale,
          depthPreviewMargin: inset,
          depthPreviewLeftOffset: inset,
          depthPreviewBottomOffset: inset
        };
      }

      const panel = this.$refs.mobileControlsPanel;
      const padEl = this.$refs.parkourJoystick?.$el;
      const stickBase = this.$refs.parkourJoystick?.$refs?.moveBase;
      if (panel && padEl && stickBase) {
        const viewportHeight = window.innerHeight;
        const panelTopFromBottom = viewportHeight - panel.getBoundingClientRect().top;
        const stickRect = stickBase.getBoundingClientRect();
        const joystickCenterFromBottom = viewportHeight - (stickRect.top + stickRect.height / 2);
        const joystickPadLeft = padEl.getBoundingClientRect().left;
        return computeParkourMobileDepthLayoutWithClearance({
          panelTopFromBottom,
          joystickCenterFromBottom,
          joystickPadLeft,
          preferredScale: scale
        });
      }

      const panelHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--mobile-controls-panel-height')
      ) || 56;
      const bottomInset = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--vvp-offset-bottom')
      ) || 0;
      return computeParkourMobileDepthLayoutFromMetrics({
        panelHeight,
        bottomInset,
        previewScale: scale,
        viewportWidth: window.innerWidth
      });
    },
    clearParkourVirtualInput() {
      this.parkourVirtualKeys = { w: false, a: false, d: false };
      this.postParkourHostControl({
        virtualInput: { active: false, w: false, a: false, d: false, highSpeed: false }
      });
    },
    onParkourJoystickInput({ active, w, a, d, highSpeed }) {
      if (!this.isParkourPolicy || this.state !== 1 || this.parkourLoading) {
        return;
      }
      if (this.parkourKeysHeld.size > 0) {
        this.applyParkourKeyboardCommand();
        return;
      }
      this.parkourVirtualKeys = { w: Boolean(w), a: Boolean(a), d: Boolean(d) };
      this.postParkourHostControl({
        virtualInput: {
          active: Boolean(active),
          w: Boolean(w),
          a: Boolean(a),
          d: Boolean(d),
          highSpeed: Boolean(highSpeed)
        }
      });
    },
    onParkourPause() {
      if (!this.isParkourPolicy || this.state !== 1 || this.parkourLoading) {
        return;
      }
      this.postParkourHostControl({ parkourPause: 'toggle' });
    },
    onParkourResetRun() {
      if (!this.isParkourPolicy || this.state !== 1 || this.parkourLoading) {
        return;
      }
      this.clearParkourKeyboardState();
      this.clearParkourVirtualInput();
      this.postParkourHostControl({ parkourResetRun: true });
    },
    clearParkourKeyboardState() {
      this.parkourKeysHeld.clear();
      this.parkourShiftHeld = false;
    },
    applyParkourKeyboardCommand() {
      if (!this.isParkourPolicy || this.state !== 1 || this.isSmallScreen) {
        return;
      }
      const input = parkourVirtualKeysFromKeyboard(this.parkourKeysHeld, this.parkourShiftHeld);
      this.parkourVirtualKeys = { w: input.w, a: input.a, d: input.d };
      this.postParkourHostControl({ virtualInput: input });
    },
    handleParkourKeyDown(event) {
      if (!this.isParkourPolicy || this.state !== 1 || this.isSmallScreen || this.shouldIgnoreAmpKeyboard(event)) {
        return;
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.parkourShiftHeld = event.getModifierState('Shift');
        this.applyParkourKeyboardCommand();
        return;
      }
      if (isParkourResetKey(event.code)) {
        if (event.repeat) {
          return;
        }
        event.preventDefault();
        this.onParkourResetRun();
        return;
      }
      if (isParkourPauseKey(event.code)) {
        if (event.repeat) {
          return;
        }
        event.preventDefault();
        this.onParkourPause();
        return;
      }
      if (!isParkourMovementKey(event.code)) {
        return;
      }
      if (event.repeat && this.parkourKeysHeld.has(event.code)) {
        return;
      }
      event.preventDefault();
      this.parkourKeysHeld.add(event.code);
      this.applyParkourKeyboardCommand();
    },
    handleParkourKeyUp(event) {
      if (!this.isParkourPolicy || this.isSmallScreen) {
        return;
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.parkourShiftHeld = event.getModifierState('Shift');
        this.applyParkourKeyboardCommand();
        return;
      }
      if (!isParkourMovementKey(event.code)) {
        return;
      }
      event.preventDefault();
      this.parkourKeysHeld.delete(event.code);
      this.applyParkourKeyboardCommand();
    },
    onParkourKeyboardBlur() {
      if (!this.isParkourPolicy) {
        return;
      }
      this.clearParkourKeyboardState();
      this.applyParkourKeyboardCommand();
    },
    onParkourKeyboardSync(data) {
      if (!this.isParkourPolicy || this.state !== 1 || this.isSmallScreen) {
        return;
      }
      if (data.type === 'clear') {
        this.clearParkourKeyboardState();
        this.applyParkourKeyboardCommand();
        return;
      }
      const codes = Array.isArray(data.keysHeld) ? data.keysHeld : [];
      this.parkourKeysHeld = new Set(codes.filter((code) => isParkourMovementKey(code)));
      this.parkourShiftHeld = Boolean(data.shiftHeld);
      this.applyParkourKeyboardCommand();
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

    onCmdChange() {
      if (!this.demo) {
        return;
      }
      this.demo.params.cmdX = this.cmdX;
      this.demo.params.cmdY = this.cmdY;
      this.demo.params.cmdYaw = this.cmdYaw;
    },
    onAmpJoystickCommand({ cmdX, cmdY, cmdYaw }) {
      if (!this.isAmpPolicy || this.state !== 1) {
        return;
      }
      this.cmdX = cmdX;
      this.cmdY = cmdY;
      this.cmdYaw = cmdYaw;
      this.onCmdChange();
      if (this.ampKeysHeld.size > 0) {
        this.applyAmpKeyboardCommand();
      }
    },
    shouldIgnoreAmpKeyboard(event) {
      const tag = event.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') {
        return true;
      }
      return event.target?.isContentEditable === true;
    },
    clearAmpKeyboardState() {
      this.ampKeysHeld.clear();
      this.ampShiftHeld = false;
    },
    applyAmpKeyboardCommand() {
      if (!this.isAmpPolicy || this.state !== 1) {
        return;
      }
      const { cmdX, cmdY, cmdYaw } = computeAmpCommandFromKeys(
        this.ampKeysHeld,
        this.ampShiftHeld
      );
      this.cmdX = cmdX;
      this.cmdY = cmdY;
      this.cmdYaw = cmdYaw;
      this.onCmdChange();
    },
    handleAmpKeyDown(event) {
      if (!this.isAmpPolicy || this.state !== 1 || this.shouldIgnoreAmpKeyboard(event)) {
        return;
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.ampShiftHeld = event.getModifierState('Shift');
        this.applyAmpKeyboardCommand();
        return;
      }
      if (isAmpKnockdownKey(event.code)) {
        if (event.repeat) {
          return;
        }
        event.preventDefault();
        this.onKnockdownTest();
        this.$refs.ampJoystick?.pulseKnockdown?.();
        return;
      }
      if (!isAmpMovementKey(event.code)) {
        return;
      }
      if (event.repeat && this.ampKeysHeld.has(event.code)) {
        return;
      }
      event.preventDefault();
      this.ampKeysHeld.add(event.code);
      this.applyAmpKeyboardCommand();
    },
    handleAmpKeyUp(event) {
      if (!this.isAmpPolicy) {
        return;
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.ampShiftHeld = event.getModifierState('Shift');
        this.applyAmpKeyboardCommand();
        return;
      }
      if (!isAmpMovementKey(event.code)) {
        return;
      }
      event.preventDefault();
      this.ampKeysHeld.delete(event.code);
      this.applyAmpKeyboardCommand();
    },
    onAmpKeyboardBlur() {
      if (!this.isAmpPolicy) {
        return;
      }
      this.clearAmpKeyboardState();
      this.applyAmpKeyboardCommand();
    },
    onKnockdownTest() {
      if (!this.demo || this.state !== 1) {
        return;
      }
      this.demo.queueKnockdownDisturbance();
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
    async onMotionChange(value) {
      if (!this.demo) {
        return;
      }
      if (!value || value === this.demo.params.current_motion) {
        this.currentMotion = this.demo.params.current_motion ?? value;
        return;
      }
      const tracking = this.demo?.policyRunner?.tracking ?? null;
      if (tracking?.ensureMotionLoaded) {
        try {
          const loaded = await tracking.ensureMotionLoaded(value);
          if (!loaded) {
            this.currentMotion = this.demo.params.current_motion;
            return;
          }
        } catch (error) {
          console.error('Failed to load motion:', error);
          this.currentMotion = this.demo.params.current_motion;
          return;
        }
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
      if (!value) {
        return;
      }
      const selected = this.policies.find((policy) => policy.value === value);
      if (!selected) {
        return;
      }
      if (!value?.startsWith('g1-amp')) {
        this.clearAmpKeyboardState();
      }
      if (!selected?.isExternalDemo) {
        this.clearParkourKeyboardState();
      }
      if (selected.isExternalDemo) {
        // Entering the embedded Parkour demo: pause physics and stop the MuJoCo
        // render loop so we don't run two WebGL apps at once. The iframe mounts
        // via v-if="isParkourPolicy".
        if (this.demo && !this.parkourSuspended) {
          this.demo.suspendRendering();
          this.parkourSuspended = true;
        }
        this.startParkourLoad();
        this.policyLoadError = '';
        return;
      }
      // Leaving the Parkour demo for a MuJoCo policy: resume the render loop.
      // (The iframe is unmounted by v-if, freeing its WebGL/WASM context.)
      if (this.parkourSuspended && this.demo) {
        this.clearParkourVirtualInput();
        this.demo.resumeRendering();
        this.parkourSuspended = false;
      }
      if (!this.demo) {
        return;
      }
      const targetScenePath = selected.scenePath ?? 'g1_amp/scene_g1.xml';
      const needsReload = selected.policyPath !== this.demo.currentPolicyPath
        || selected.onnxPath
        || targetScenePath !== this.demo.currentScenePath;
      if (!needsReload) {
        return;
      }
      const wasPaused = this.demo.params?.paused ?? false;
      this.demo.params.paused = true;
      this.policyLoadError = '';
      try {
        await this.runWithSimulationLoading((report) =>
          this.demo.switchSceneAndPolicy(targetScenePath, selected.policyPath, {
            onnxPath: selected.onnxPath || undefined,
            onProgress: report
          })
        );
        if (this.isAmpPolicy) {
          this.resetAmpCommandSliders();
        }
        this.policyLabel = selected.policyPath?.split('/').pop() ?? this.policyLabel;
        this.reapplyCustomMotions();
        this.availableMotions = this.getAvailableMotions();
        this.currentMotion = this.demo.params.current_motion ?? this.availableMotions[0] ?? null;
        this.updateTrackingState();
      } catch (error) {
        console.error('Failed to reload policy:', error);
        this.policyLoadError = error instanceof Error ? error.message : 'An unexpected error occurred';
      } finally {
        this.demo.params.paused = wasPaused;
      }
    },
    resetAmpCommandSliders() {
      this.clearAmpKeyboardState();
      this.cmdX = 0.0;
      this.cmdY = 0.0;
      this.cmdYaw = 0.0;
      this.onCmdChange();
    },
    reset() {
      if (this.isParkourPolicy) {
        this.clearParkourVirtualInput();
        // Reload the embedded demo for a clean restart (remounts via :key).
        this.startParkourLoad();
        this.parkourReloadKey += 1;
        return;
      }
      if (!this.demo) {
        return;
      }
      if (this.isAmpPolicy) {
        this.resetAmpCommandSliders();
      }
      this.demo.resetSimulation();
      this.availableMotions = this.getAvailableMotions();
      this.currentMotion = this.demo.params.current_motion ?? this.availableMotions[0] ?? null;
      this.updateTrackingState();
    },
    startParkourLoad() {
      this.clearParkourLoadTimers();
      this.parkourLoading = true;
      this.parkourLoadProgress = 0;
      this.parkourReceivedProgress = false;
      this.simStepHz = 0;
    },
    clearParkourLoadTimers() {
      if (this.parkourFallbackTimer) {
        clearTimeout(this.parkourFallbackTimer);
        this.parkourFallbackTimer = null;
      }
      if (this.parkourHardTimer) {
        clearTimeout(this.parkourHardTimer);
        this.parkourHardTimer = null;
      }
    },
    focusParkourFrame() {
      // Desktop: keep focus on the host page so document key listeners drive
      // virtualInput and the joystick knob stays in sync. Mobile uses touch only.
      try {
        if (this.isSmallScreen) {
          this.$refs.parkourFrame?.contentWindow?.focus();
        } else {
          window.focus();
        }
      } catch (error) {
        /* focusing can throw in some browsers; safe to ignore */
      }
    },
    finishParkourLoading() {
      this.clearParkourLoadTimers();
      this.parkourLoadProgress = 100;
      this.parkourLoading = false;
      this.$nextTick(() => {
        this.updateMobileControlsHeight();
        this.syncParkourHostControls();
        this.focusParkourFrame();
      });
    },
    handleParkourMessage(event) {
      const frame = this.$refs.parkourFrame;
      if (!frame || event.source !== frame.contentWindow) {
        return;
      }
      if (event.origin !== window.location.origin) {
        return;
      }
      const data = event.data;
      if (!data || typeof data !== 'object') {
        return;
      }
      if (data.source === 'parkour-host') {
        if (data.type === 'stats') {
          const hz = Number(data.simStepHz);
          if (Number.isFinite(hz)) {
            this.simStepHz = hz;
          }
        }
        return;
      }
      if (data.source === 'parkour-keyboard-sync') {
        this.onParkourKeyboardSync(data);
        return;
      }
      if (data.source !== 'parkour-loader') {
        return;
      }
      if (data.type === 'progress') {
        this.parkourReceivedProgress = true;
        const value = Number(data.value);
        if (Number.isFinite(value)) {
          const pct = Math.round(Math.min(100, Math.max(0, value * 100)));
          // Monotonic: a fresh load resets parkourLoadProgress to 0 first.
          if (pct > this.parkourLoadProgress) {
            this.parkourLoadProgress = pct;
          }
        }
      } else if (data.type === 'ready') {
        this.finishParkourLoading();
      }
    },
    onParkourLoad() {
      // The iframe's HTML document loaded, but the heavy MuJoCo + ONNX assets
      // are still downloading/initialising inside it. Keep the overlay until the
      // embedded reporter posts 'ready' (scene painted); the timers below guard
      // against the reporter being unavailable so we never hang on the loader.
      this.clearParkourLoadTimers();
      if (!this.parkourLoading) {
        this.focusParkourFrame();
        return;
      }
      // If no progress arrives shortly, assume the reporter is missing and
      // reveal the demo instead of waiting indefinitely.
      this.parkourFallbackTimer = setTimeout(() => {
        if (this.parkourLoading && !this.parkourReceivedProgress) {
          this.finishParkourLoading();
        }
      }, 8000);
      // Absolute cap so we never stay on the loader for a pathological load.
      this.parkourHardTimer = setTimeout(() => {
        if (this.parkourLoading) {
          this.finishParkourLoading();
        }
      }, 180000);
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
      if (this.isParkourPolicy) {
        return;
      }
      if (!this.demo) {
        this.simStepHz = 0;
        return;
      }
      this.simStepHz = this.demo.getSimStepHz?.() ?? this.demo.simStepHz ?? 0;
    },
    onRenderScaleChange(value) {
      if (this.isParkourPolicy) {
        this.postParkourHostControl({ renderScale: value });
        return;
      }
      if (!this.demo) {
        return;
      }
      this.demo.setRenderScale(value);
    },
    onReflectionQualityChange(value) {
      if (this.isParkourPolicy) {
        this.postParkourHostControl({ reflectionQuality: value });
        return;
      }
      if (!this.demo) {
        return;
      }
      this.demo.setReflectionQuality(value);
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
    },
    clampControlPanelToViewport() {
      if (this.isSmallScreen) {
        return;
      }
      const next = clampControlPanelSize(this.controlPanelWidth, this.controlPanelHeight);
      this.controlPanelWidth = next.width;
      this.controlPanelHeight = next.height;
    },
    startControlPanelResize(edge, event) {
      if (this.isSmallScreen) {
        return;
      }
      this.controlPanelResize = {
        edge,
        startX: event.clientX,
        startY: event.clientY,
        startW: this.controlPanelWidth,
        startH: this.controlPanelHeight
      };
      document.addEventListener('mousemove', this._onControlPanelResizeMove);
      document.addEventListener('mouseup', this._onControlPanelResizeEnd);
      document.body.classList.add('controls-panel-resizing');
    },
    onControlPanelResizeMove(event) {
      if (!this.controlPanelResize) {
        return;
      }
      const dx = event.clientX - this.controlPanelResize.startX;
      const dy = event.clientY - this.controlPanelResize.startY;
      let w = this.controlPanelResize.startW;
      let h = this.controlPanelResize.startH;
      const { edge } = this.controlPanelResize;
      if (edge.includes('w')) {
        w -= dx;
      }
      if (edge.includes('s')) {
        h += dy;
      }
      const clamped = clampControlPanelSize(w, h);
      this.controlPanelWidth = clamped.width;
      this.controlPanelHeight = clamped.height;
      const cursor =
        edge === 'w' ? 'ew-resize' : edge === 's' ? 'ns-resize' : 'nesw-resize';
      document.body.style.cursor = cursor;
    },
    endControlPanelResize() {
      if (!this.controlPanelResize) {
        return;
      }
      this.controlPanelResize = null;
      document.removeEventListener('mousemove', this._onControlPanelResizeMove);
      document.removeEventListener('mouseup', this._onControlPanelResizeEnd);
      document.body.classList.remove('controls-panel-resizing');
      document.body.style.cursor = '';
      saveControlPanelSize(this.controlPanelWidth, this.controlPanelHeight);
    }
  },
  mounted() {
    this.customMotions = {};
    this.parkourFallbackTimer = null;
    this.parkourHardTimer = null;
    this.parkour_message_listener = (event) => this.handleParkourMessage(event);
    window.addEventListener('message', this.parkour_message_listener);
    this.isSafari = this.detectSafari();
    this.updateScreenState();
    this.updateVisualViewportOffset();
    this._onControlPanelResizeMove = (e) => this.onControlPanelResizeMove(e);
    this._onControlPanelResizeEnd = () => this.endControlPanelResize();
    this.resize_listener = () => {
      this.updateScreenState();
      this.updateVisualViewportOffset();
      this.clampControlPanelToViewport();
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
      this.handleParkourKeyDown(event);
      this.handleAmpKeyDown(event);
      if (event.code === 'Backspace' && !this.isParkourPolicy) {
        this.reset();
      }
    };
    this.keyup_listener = (event) => {
      this.handleParkourKeyUp(event);
      this.handleAmpKeyUp(event);
    };
    this.amp_blur_listener = () => {
      this.onAmpKeyboardBlur();
      this.onParkourKeyboardBlur();
    };
    document.addEventListener('keydown', this.keydown_listener);
    document.addEventListener('keyup', this.keyup_listener);
    window.addEventListener('blur', this.amp_blur_listener);
    this.mobileControlsResizeObserver = new ResizeObserver(() => {
      this.updateMobileControlsHeight();
    });
    this.$watch(
      () => [this.isSmallScreen, this.isMobileControlsCollapsed],
      () => {
        this.$nextTick(() => this.syncMobileControlsHeightObserver());
      },
      { immediate: true }
    );
  },
  beforeUnmount() {
    this.endControlPanelResize();
    this.stopTrackingPoll();
    this.clearParkourLoadTimers();
    if (this.parkour_message_listener) {
      window.removeEventListener('message', this.parkour_message_listener);
    }
    this.mobileControlsResizeObserver?.disconnect();
    document.documentElement.style.removeProperty('--mobile-controls-panel-height');
    document.removeEventListener('keydown', this.keydown_listener);
    if (this.keyup_listener) {
      document.removeEventListener('keyup', this.keyup_listener);
    }
    if (this.amp_blur_listener) {
      window.removeEventListener('blur', this.amp_blur_listener);
    }
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
.parkour-frame-wrap {
  position: fixed;
  top: var(--header-h, 58px);
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background: #0f172a;
}

.parkour-frame {
  display: block;
  width: 100%;
  height: 100%;
  border: 0;
}
.parkour-controls {
  display: flex;
  flex-direction: column;
}

.parkour-keys {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 6px 10px;
  align-items: center;
}

.parkour-key {
  justify-self: start;
  background: rgba(var(--v-theme-on-surface), 0.08);
  border: 1px solid rgba(var(--v-theme-on-surface), 0.18);
  border-radius: 6px;
  padding: 1px 8px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.6;
}

.controls {
  position: fixed;
  top: calc(var(--header-h, 58px) + 20px);
  right: 20px;
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

.controls-card-resizable {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: none;
}

.controls-card-resizable .controls-body {
  flex: 1 1 auto;
  min-height: 0;
  max-height: none;
}

.controls-actions {
  flex-shrink: 0;
}

.controls-resize-handle {
  position: absolute;
  z-index: 3;
  touch-action: none;
}

.controls-resize-w {
  top: 18px;
  left: 0;
  width: 8px;
  bottom: 18px;
  cursor: ew-resize;
}

.controls-resize-s {
  left: 18px;
  right: 0;
  bottom: 0;
  height: 8px;
  cursor: ns-resize;
}

.controls-resize-sw {
  left: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
  cursor: nesw-resize;
  background: transparent;
}

.controls-resize-sw::before {
  content: '';
  position: absolute;
  left: 4px;
  bottom: 4px;
  width: 8px;
  height: 8px;
  border-left: 1.5px solid rgba(var(--v-theme-primary), 0.45);
  border-bottom: 1.5px solid rgba(var(--v-theme-primary), 0.45);
  border-bottom-left-radius: 3px;
  pointer-events: none;
  transition: border-color 0.18s ease;
}

.controls-resize-w:hover,
.controls-resize-w:active,
.controls-resize-s:hover,
.controls-resize-s:active {
  background-color: rgba(var(--v-theme-primary), 0.12);
}

.controls-resize-sw:hover::before,
.controls-resize-sw:active::before {
  border-color: rgba(var(--v-theme-primary), 0.9);
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

.training-links {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
}

.training-links .v-btn {
  justify-content: flex-start;
}

.training-links :deep(.v-btn__content) {
  justify-content: flex-start;
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

.loading-simulation-progress,
.loading-simulation-progress *,
.loading-simulation-progress::before,
.loading-simulation-progress::after {
  transition: none !important;
  animation: none !important;
}

.loading-simulation-progress :deep(.v-progress-linear__determinate),
.loading-simulation-progress :deep(.v-progress-linear__background) {
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

<style>
body.controls-panel-resizing {
  user-select: none;
}
</style>
