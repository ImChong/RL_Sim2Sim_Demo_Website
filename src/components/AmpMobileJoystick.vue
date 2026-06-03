<template>
  <div
    class="amp-mobile-controls"
    :class="{ 'amp-mobile-controls--disabled': disabled }"
    role="group"
    :aria-label="labels.group"
  >
    <div class="amp-mobile-controls__cluster">
      <div class="amp-mobile-controls__yaw">
        <button
          type="button"
          class="amp-mobile-controls__yaw-btn"
          :aria-label="labels.rotateLeft"
          :disabled="disabled"
          @pointerdown.prevent="onYawDown(1, $event)"
          @pointerup.prevent="onYawUp($event)"
          @pointercancel.prevent="onYawUp($event)"
          @pointerleave.prevent="onYawUp($event)"
        >
          <v-icon icon="mdi-rotate-left" size="22" />
        </button>
        <button
          type="button"
          class="amp-mobile-controls__yaw-btn"
          :aria-label="labels.rotateRight"
          :disabled="disabled"
          @pointerdown.prevent="onYawDown(-1, $event)"
          @pointerup.prevent="onYawUp($event)"
          @pointercancel.prevent="onYawUp($event)"
          @pointerleave.prevent="onYawUp($event)"
        >
          <v-icon icon="mdi-rotate-right" size="22" />
        </button>
      </div>
      <div
        ref="moveBase"
        class="amp-mobile-controls__stick-base"
        :aria-label="labels.move"
        @pointerdown.prevent="onMoveDown"
        @pointermove.prevent="onMoveMove"
        @pointerup.prevent="onMoveUp"
        @pointercancel.prevent="onMoveUp"
      >
        <div
          class="amp-mobile-controls__stick-knob"
          :style="knobStyle"
        ></div>
      </div>
    </div>
    <div class="amp-mobile-controls__hint text-caption">{{ labels.hint }}</div>
  </div>
</template>

<script>
import { computeAmpCommandFromJoystick } from '@/utils/ampJoystickCommand.js';

export default {
  name: 'AmpMobileJoystick',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Object,
      required: true
    }
  },
  emits: ['command'],
  data: () => ({
    moveNormX: 0,
    moveNormY: 0,
    yawDirection: 0,
    movePointerId: null,
    knobOffsetX: 0,
    knobOffsetY: 0,
    maxRadius: 1
  }),
  computed: {
    knobStyle() {
      return {
        transform: `translate(calc(-50% + ${this.knobOffsetX}px), calc(-50% + ${this.knobOffsetY}px))`
      };
    }
  },
  mounted() {
    this.measureBase();
    this._onResize = () => this.measureBase();
    window.addEventListener('resize', this._onResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this._onResize);
    this.releaseMovePointer();
  },
  methods: {
    measureBase() {
      const base = this.$refs.moveBase;
      if (!base) {
        return;
      }
      const rect = base.getBoundingClientRect();
      this.maxRadius = Math.max(24, (Math.min(rect.width, rect.height) - 44) / 2);
    },
    emitCommand() {
      if (this.disabled) {
        return;
      }
      const { cmdX, cmdY, cmdYaw } = computeAmpCommandFromJoystick(
        this.moveNormX,
        this.moveNormY,
        this.yawDirection,
        false
      );
      this.$emit('command', { cmdX, cmdY, cmdYaw });
    },
    emitZero() {
      this.$emit('command', { cmdX: 0, cmdY: 0, cmdYaw: 0 });
    },
    updateMoveFromClient(clientX, clientY) {
      const base = this.$refs.moveBase;
      if (!base) {
        return;
      }
      const rect = base.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > this.maxRadius) {
        const scale = this.maxRadius / dist;
        dx *= scale;
        dy *= scale;
      }
      this.knobOffsetX = dx;
      this.knobOffsetY = dy;
      this.moveNormX = dx / this.maxRadius;
      this.moveNormY = -dy / this.maxRadius;
      this.emitCommand();
    },
    onMoveDown(event) {
      if (this.disabled) {
        return;
      }
      this.measureBase();
      this.movePointerId = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      this.updateMoveFromClient(event.clientX, event.clientY);
    },
    onMoveMove(event) {
      if (this.disabled || this.movePointerId !== event.pointerId) {
        return;
      }
      this.updateMoveFromClient(event.clientX, event.clientY);
    },
    onMoveUp(event) {
      if (this.movePointerId !== null && event.pointerId !== this.movePointerId) {
        return;
      }
      this.resetMove();
    },
    resetMove() {
      this.movePointerId = null;
      this.moveNormX = 0;
      this.moveNormY = 0;
      this.knobOffsetX = 0;
      this.knobOffsetY = 0;
      this.emitCommand();
    },
    releaseMovePointer() {
      if (this.movePointerId === null) {
        return;
      }
      try {
        this.$refs.moveBase?.releasePointerCapture(this.movePointerId);
      } catch {
        // ignore if capture was already released
      }
      this.resetMove();
    },
    onYawDown(direction, event) {
      if (this.disabled) {
        return;
      }
      event.currentTarget.setPointerCapture(event.pointerId);
      this.yawDirection = direction;
      this.emitCommand();
    },
    onYawUp(event) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // ignore
      }
      this.yawDirection = 0;
      this.emitCommand();
    }
  }
};
</script>

<style scoped>
.amp-mobile-controls {
  position: fixed;
  right: 12px;
  z-index: 1050;
  bottom: calc(
    12px + constant(safe-area-inset-bottom) + var(--vvp-offset-bottom, 0px) +
      var(--mobile-controls-panel-height, 140px) + 12px
  );
  bottom: calc(
    12px + env(safe-area-inset-bottom, 0px) + var(--vvp-offset-bottom, 0px) +
      var(--mobile-controls-panel-height, 140px) + 12px
  );
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  touch-action: none;
  user-select: none;
  pointer-events: auto;
}

.amp-mobile-controls--disabled {
  opacity: 0.45;
  pointer-events: none;
}

.amp-mobile-controls__cluster {
  display: flex;
  align-items: center;
  gap: 10px;
}

.amp-mobile-controls__yaw {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.amp-mobile-controls__yaw-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.22);
  background: rgba(var(--v-theme-surface), 0.82);
  color: rgb(var(--v-theme-on-surface));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.amp-mobile-controls__yaw-btn:active:not(:disabled) {
  background: rgba(var(--v-theme-primary), 0.2);
  border-color: rgba(var(--v-theme-primary), 0.45);
}

.amp-mobile-controls__stick-base {
  position: relative;
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.2);
  background: rgba(var(--v-theme-surface), 0.72);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  touch-action: none;
}

.amp-mobile-controls__stick-base::before {
  content: '';
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.14);
  pointer-events: none;
}

.amp-mobile-controls__stick-knob {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(var(--v-theme-primary), 0.55);
  background: rgba(var(--v-theme-primary), 0.28);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
  pointer-events: none;
  will-change: transform;
}

.amp-mobile-controls__hint {
  max-width: 190px;
  text-align: right;
  color: rgba(var(--v-theme-on-surface), 0.72);
  text-shadow: 0 1px 2px rgba(var(--v-theme-surface), 0.9);
  line-height: 1.3;
}
</style>
