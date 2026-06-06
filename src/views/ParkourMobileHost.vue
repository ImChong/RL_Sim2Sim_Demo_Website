<template>
  <div class="parkour-mobile-host">
    <header class="parkour-mobile-host__header">
      <a class="parkour-mobile-host__back" :href="mainDemoUrl">
        {{ t.backToDemo }}
      </a>
      <span class="parkour-mobile-host__title">{{ t.title }}</span>
    </header>

    <iframe
      ref="parkourFrame"
      :key="parkourReloadKey"
      :src="parkourIframeSrc"
      class="parkour-mobile-host__frame"
      title="G1 Perceptive Parkour Demo"
      allow="autoplay; fullscreen"
      @load="onParkourLoad"
    />

    <ParkourMobileJoystick
      ref="parkourJoystick"
      :disabled="parkourLoading"
      dock-above-mobile-panel
      :labels="joystickLabels"
      :virtual-keys="parkourVirtualKeys"
      @input="onParkourJoystickInput"
      @pause="onParkourPause"
      @reset-run="onParkourResetRun"
    />

    <footer ref="bottomBar" class="parkour-mobile-host__footer">
      <p class="parkour-mobile-host__hint">{{ t.holdForward }}</p>
      <v-btn
        class="parkour-mobile-host__diagnostic-btn mt-2"
        color="secondary"
        variant="tonal"
        block
        size="small"
        data-test="parkour-depth-diagnostic"
        :disabled="parkourLoading"
        :loading="parkourDepthDiagnosticLoading"
        @click="runParkourDepthDiagnostic"
      >
        {{ t.depthDiagnostic }}
      </v-btn>
      <p class="parkour-mobile-host__diagnostic-hint">{{ t.depthDiagnosticHint }}</p>
    </footer>

    <v-dialog
      v-model="parkourDepthDiagnosticOpen"
      max-width="640"
      scrollable
      class="parkour-depth-diagnostic-dialog"
    >
      <v-card :title="t.depthDiagnosticTitle">
        <v-card-text>
          <v-alert
            v-if="parkourDepthDiagnosticSummary"
            :type="parkourDepthDiagnosticSummary.type"
            variant="tonal"
            density="compact"
            class="mb-3"
          >
            {{ parkourDepthDiagnosticSummary.text }}
          </v-alert>
          <ul v-if="parkourDepthDiagnosticHintLines.length" class="parkour-depth-diagnostic-hints mb-3">
            <li
              v-for="hint in parkourDepthDiagnosticHintLines"
              :key="hint"
              class="text-caption"
            >
              {{ hint }}
            </li>
          </ul>
          <v-textarea
            :model-value="parkourDepthDiagnosticText"
            readonly
            auto-grow
            rows="12"
            variant="outlined"
            density="compact"
            class="parkour-depth-diagnostic-text"
            :aria-label="t.depthDiagnosticTitle"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" @click="parkourDepthDiagnosticOpen = false">
            {{ t.depthDiagnosticClose }}
          </v-btn>
          <v-spacer />
          <v-btn color="primary" @click="copyParkourDepthDiagnostic">
            {{
              parkourDepthDiagnosticCopied
                ? t.depthDiagnosticCopied
                : t.depthDiagnosticCopy
            }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div
      v-if="parkourLoading"
      class="parkour-mobile-host__loading"
      role="dialog"
      aria-modal="true"
      :aria-label="t.loading"
    >
      <div class="parkour-mobile-host__loading-card">
        <p class="parkour-mobile-host__loading-title">{{ t.loading }}</p>
        <div class="parkour-mobile-host__loading-bar" role="progressbar" :aria-valuenow="parkourLoadProgress">
          <div
            class="parkour-mobile-host__loading-bar-fill"
            :style="{ width: `${parkourLoadProgress}%` }"
          />
        </div>
        <p class="parkour-mobile-host__loading-pct">{{ parkourLoadProgress }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import ParkourMobileJoystick from '@/components/ParkourMobileJoystick.vue';
import { applyDocumentTheme, getStoredTheme } from '@/utils/themePreference';
import {
  computeParkourMobileDepthLayoutFromMetrics,
  computeParkourMobileDepthLayoutWithClearance
} from '@/utils/parkourDepthPreviewLayout.js';
import {
  buildParkourDepthDiagnosticReport,
  fetchParkourBundleIosPatchStatus,
  formatParkourDepthDiagnosticReport
} from '@/utils/parkourDepthDiagnostic.js';
import { getMainDemoPageUrl } from '@/utils/parkourMobileNavigation.js';

const translations = {
  en: {
    title: 'G1 Perceptive Parkour',
    backToDemo: '← Demo',
    holdForward: 'Drag the stick up to move forward. Pause / reset are on the joystick.',
    loading: 'Loading Parkour…',
    joystickGroup: 'Parkour movement controls',
    joystickMove: 'Move (up = forward, left/right = turn in place)',
    joystickPause: 'Pause',
    joystickResetRun: 'Reset run',
    depthDiagnostic: 'Depth diagnostic',
    depthDiagnosticHint: 'Copy JSON report for debugging depth preview / iOS readback.',
    depthDiagnosticTitle: 'Parkour depth diagnostic',
    depthDiagnosticCopy: 'Copy report',
    depthDiagnosticCopied: 'Copied',
    depthDiagnosticClose: 'Close',
    depthDiagnosticHealthy: 'Depth preview and readback look healthy.'
  },
  zh: {
    title: 'G1 感知跑酷',
    backToDemo: '← 返回演示',
    holdForward: '向上拖动摇杆前进；暂停与重置在摇杆旁。',
    loading: '正在加载跑酷…',
    joystickGroup: '跑酷移动控制',
    joystickMove: '移动（上=前进，左/右=原地转向）',
    joystickPause: '暂停',
    joystickResetRun: '重置回合',
    depthDiagnostic: '深度诊断',
    depthDiagnosticHint: '复制 JSON 报告，便于排查深度预览 / iOS 回读问题。',
    depthDiagnosticTitle: '跑酷深度诊断',
    depthDiagnosticCopy: '复制报告',
    depthDiagnosticCopied: '已复制',
    depthDiagnosticClose: '关闭',
    depthDiagnosticHealthy: '深度预览与 GPU 回读数据看起来正常。'
  }
};

export default {
  name: 'ParkourMobileHost',
  components: { ParkourMobileJoystick },
  data: () => ({
    parkourLoading: true,
    parkourLoadProgress: 0,
    parkourReceivedProgress: false,
    parkourReloadKey: 0,
    parkourVirtualKeys: { w: false, a: false, d: false, highSpeed: false },
    parkourFallbackTimer: null,
    parkourHardTimer: null,
    language: 'en',
    visualTheme: getStoredTheme(),
    cameraFollowEnabled: true,
    renderScale: 2.0,
    reflectionQuality: 2,
    parkourDepthDiagnosticLoading: false,
    parkourDepthDiagnosticOpen: false,
    parkourDepthDiagnosticReport: null,
    parkourDepthDiagnosticText: '',
    parkourDepthDiagnosticCopied: false
  }),
  computed: {
    t() {
      return translations[this.language] ?? translations.en;
    },
    mainDemoUrl() {
      return getMainDemoPageUrl(import.meta.env.BASE_URL || '/', { fromParkour: true });
    },
    parkourDepthDiagnosticHintLines() {
      const report = this.parkourDepthDiagnosticReport;
      if (!report?.hints?.length) {
        return [];
      }
      return report.hints.map((key) => report.hintLabels?.[key] ?? key);
    },
    parkourDepthDiagnosticSummary() {
      const report = this.parkourDepthDiagnosticReport;
      if (!report) {
        return null;
      }
      if (!report.hints.length) {
        return { type: 'success', text: this.t.depthDiagnosticHealthy };
      }
      const firstHint = report.hintLabels?.[report.hints[0]] ?? report.hints[0];
      return { type: 'warning', text: firstHint };
    },
    parkourIframeSrc() {
      const base = import.meta.env.BASE_URL || '/';
      return `${base}parkour/dist-desktop/index.html`;
    },
    joystickLabels() {
      return {
        group: this.t.joystickGroup,
        move: this.t.joystickMove,
        pause: this.t.joystickPause,
        resetRun: this.t.joystickResetRun
      };
    }
  },
  mounted() {
    applyDocumentTheme(this.visualTheme);
    const storedLang = localStorage.getItem('rl-sim2sim-demo-language');
    this.language = storedLang === 'zh' ? 'zh' : 'en';
    document.documentElement.setAttribute('lang', this.language === 'zh' ? 'zh-CN' : 'en');

    this.parkour_message_listener = (event) => this.handleParkourMessage(event);
    window.addEventListener('message', this.parkour_message_listener);

    this.resize_listener = () => {
      this.updateVisualViewportOffset();
      this.syncParkourHostControls();
    };
    window.addEventListener('resize', this.resize_listener);
    if (window.visualViewport) {
      this.vvp_listener = () => this.updateVisualViewportOffset();
      window.visualViewport.addEventListener('resize', this.vvp_listener);
      window.visualViewport.addEventListener('scroll', this.vvp_listener);
    }
    this.updateVisualViewportOffset();
    this.footerResizeObserver = new ResizeObserver(() => {
      this.updateFooterHeight();
      this.syncParkourHostControls();
    });
    this.$nextTick(() => {
      const footer = this.$refs.bottomBar;
      if (footer) {
        this.footerResizeObserver.observe(footer);
        this.updateFooterHeight();
      }
    });
  },
  beforeUnmount() {
    this.clearParkourLoadTimers();
    if (this.parkour_message_listener) {
      window.removeEventListener('message', this.parkour_message_listener);
    }
    if (this.resize_listener) {
      window.removeEventListener('resize', this.resize_listener);
    }
    if (this.vvp_listener && window.visualViewport) {
      window.visualViewport.removeEventListener('resize', this.vvp_listener);
      window.visualViewport.removeEventListener('scroll', this.vvp_listener);
    }
    this.footerResizeObserver?.disconnect();
    document.documentElement.style.removeProperty('--mobile-controls-panel-height');
    document.documentElement.style.removeProperty('--vvp-offset-bottom');
  },
  methods: {
    updateVisualViewportOffset() {
      if (!window.visualViewport) {
        return;
      }
      const vvp = window.visualViewport;
      const offset = Math.max(0, window.innerHeight - (vvp.offsetTop + vvp.height));
      document.documentElement.style.setProperty('--vvp-offset-bottom', `${offset}px`);
    },
    updateFooterHeight() {
      const footer = this.$refs.bottomBar;
      if (!footer) {
        return;
      }
      const height = Math.ceil(footer.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--mobile-controls-panel-height', `${height}px`);
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
      } catch {
        /* iframe may not be ready */
      }
    },
    getParkourDepthPreviewLayout() {
      const scale = 2;
      const cornerRadiusPx = 18;
      const panel = this.$refs.bottomBar;
      const padEl = this.$refs.parkourJoystick?.$el;
      const stickBase = this.$refs.parkourJoystick?.$refs?.moveBase;
      if (panel && padEl && stickBase) {
        const viewportHeight = window.innerHeight;
        const panelRect = panel.getBoundingClientRect();
        const panelTopFromBottom = viewportHeight - panelRect.top;
        const stickRect = stickBase.getBoundingClientRect();
        const joystickCenterFromBottom = viewportHeight - (stickRect.top + stickRect.height / 2);
        const joystickPadLeft = padEl.getBoundingClientRect().left;
        return {
          ...computeParkourMobileDepthLayoutWithClearance({
            panelTopFromBottom,
            joystickCenterFromBottom,
            joystickPadLeft,
            preferredScale: scale,
            leftOffset: Math.round(panelRect.left)
          }),
          depthPreviewCornerRadiusPx: cornerRadiusPx
        };
      }
      const panelHeight = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--mobile-controls-panel-height')
      ) || 56;
      const bottomInset = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--vvp-offset-bottom')
      ) || 0;
      return {
        ...computeParkourMobileDepthLayoutFromMetrics({
          panelHeight,
          bottomInset,
          previewScale: scale,
          viewportWidth: window.innerWidth
        }),
        depthPreviewCornerRadiusPx: cornerRadiusPx
      };
    },
    syncParkourHostControls() {
      this.postParkourHostControl({
        cameraFollow: this.cameraFollowEnabled,
        renderScale: this.renderScale,
        reflectionQuality: this.reflectionQuality,
        visualTheme: this.visualTheme,
        ...this.getParkourDepthPreviewLayout()
      });
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
    finishParkourLoading() {
      this.clearParkourLoadTimers();
      this.parkourLoadProgress = 100;
      this.parkourLoading = false;
      this.$nextTick(() => {
        this.updateFooterHeight();
        this.syncParkourHostControls();
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
      if (data.source !== 'parkour-loader') {
        return;
      }
      if (data.type === 'progress') {
        this.parkourReceivedProgress = true;
        const value = Number(data.value);
        if (Number.isFinite(value)) {
          const pct = Math.round(Math.min(100, Math.max(0, value * 100)));
          if (pct > this.parkourLoadProgress) {
            this.parkourLoadProgress = pct;
          }
        }
      } else if (data.type === 'ready') {
        this.finishParkourLoading();
      }
    },
    onParkourLoad() {
      this.clearParkourLoadTimers();
      if (!this.parkourLoading) {
        return;
      }
      this.parkourFallbackTimer = setTimeout(() => {
        if (this.parkourLoading && !this.parkourReceivedProgress) {
          this.finishParkourLoading();
        }
      }, 8000);
      this.parkourHardTimer = setTimeout(() => {
        if (this.parkourLoading) {
          this.finishParkourLoading();
        }
      }, 180000);
    },
    onParkourJoystickInput({ active, w, a, d, highSpeed }) {
      if (this.parkourLoading) {
        return;
      }
      this.parkourVirtualKeys = {
        w: Boolean(w),
        a: Boolean(a),
        d: Boolean(d),
        highSpeed: Boolean(highSpeed)
      };
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
      if (this.parkourLoading) {
        return;
      }
      this.postParkourHostControl({ parkourPause: 'toggle' });
    },
    onParkourResetRun() {
      if (this.parkourLoading) {
        return;
      }
      this.parkourVirtualKeys = { w: false, a: false, d: false, highSpeed: false };
      this.postParkourHostControl({
        virtualInput: { active: false, w: false, a: false, d: false, highSpeed: false },
        parkourResetRun: true
      });
    },
    async runParkourDepthDiagnostic() {
      if (this.parkourLoading) {
        return;
      }
      this.parkourDepthDiagnosticLoading = true;
      this.parkourDepthDiagnosticCopied = false;
      try {
        const demo = this.$refs.parkourFrame?.contentWindow?.__parkourDemo ?? null;
        const bundleStatus = await fetchParkourBundleIosPatchStatus(this.parkourIframeSrc);
        const report = buildParkourDepthDiagnosticReport({
          demo,
          host: {
            url: window.location.href,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            maxTouchPoints: navigator.maxTouchPoints,
            parkourLoading: this.parkourLoading,
            isSmallScreen: true
          },
          bundleHasIosPatch: bundleStatus.hasIosPatch,
          bundleUrl: bundleStatus.bundleUrl
        });
        if (bundleStatus.error) {
          report.bundle.error = bundleStatus.error;
        }
        this.parkourDepthDiagnosticReport = report;
        this.parkourDepthDiagnosticText = formatParkourDepthDiagnosticReport(report);
        this.parkourDepthDiagnosticOpen = true;
        await this.copyParkourDepthDiagnostic({ silent: true });
      } finally {
        this.parkourDepthDiagnosticLoading = false;
      }
    },
    async copyParkourDepthDiagnostic({ silent = false } = {}) {
      const text = this.parkourDepthDiagnosticText;
      if (!text) {
        return;
      }
      try {
        await navigator.clipboard.writeText(text);
        if (!silent) {
          this.parkourDepthDiagnosticCopied = true;
          window.setTimeout(() => {
            this.parkourDepthDiagnosticCopied = false;
          }, 2000);
        }
      } catch {
        if (!silent) {
          this.parkourDepthDiagnosticCopied = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.parkour-mobile-host {
  --parkour-mobile-header-h: 44px;
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: #0f172a;
  color: #eceae5;
}

.parkour-mobile-host__header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 600;
  height: var(--parkour-mobile-header-h);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
  padding-top: env(safe-area-inset-top, 0);
  background: rgba(21, 21, 21, 0.92);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
}

.parkour-mobile-host__back {
  color: #69a3ff;
  text-decoration: none;
  font-size: 0.9rem;
  white-space: nowrap;
}

.parkour-mobile-host__title {
  font-size: 0.92rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.parkour-mobile-host__frame {
  position: fixed;
  top: var(--parkour-mobile-header-h);
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: calc(100% - var(--parkour-mobile-header-h));
  border: 0;
  z-index: 500;
}

.parkour-mobile-host__footer {
  position: fixed;
  left: 12px;
  right: 12px;
  bottom: calc(12px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px));
  z-index: 700;
  padding: 10px 12px;
  border-radius: 18px;
  background: rgba(39, 39, 39, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
}

.parkour-mobile-host__hint {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.35;
  color: rgba(236, 234, 229, 0.82);
}

.parkour-mobile-host__diagnostic-btn {
  text-transform: none;
}

.parkour-mobile-host__diagnostic-hint {
  margin: 6px 0 0;
  font-size: 0.72rem;
  line-height: 1.3;
  color: rgba(236, 234, 229, 0.62);
}

.parkour-depth-diagnostic-hints {
  margin: 0;
  padding-left: 1.1rem;
}

.parkour-depth-diagnostic-text :deep(textarea) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
  line-height: 1.35;
}

.parkour-mobile-host__loading {
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  padding: 24px;
}

.parkour-mobile-host__loading-card {
  width: min(100%, 360px);
  padding: 20px;
  border-radius: 16px;
  background: #2a2a2a;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.parkour-mobile-host__loading-title {
  margin: 0 0 12px;
  font-size: 1rem;
}

.parkour-mobile-host__loading-bar {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.parkour-mobile-host__loading-bar-fill {
  height: 100%;
  background: #69a3ff;
  transition: width 0.2s ease;
}

.parkour-mobile-host__loading-pct {
  margin: 8px 0 0;
  text-align: right;
  font-size: 0.8rem;
  color: rgba(236, 234, 229, 0.7);
}
</style>
