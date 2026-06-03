<template>
  <div
    class="amp-mobile-controls"
    :class="{ 'amp-mobile-controls--disabled': disabled }"
    role="group"
    :aria-label="labels.group"
  >
    <div class="amp-mobile-controls__cluster">
      <div class="amp-mobile-controls__pad">
        <div class="amp-mobile-controls__btn-cluster">
          <button
            type="button"
            class="amp-mobile-controls__action-btn amp-mobile-controls__knockdown-btn"
            :aria-label="labels.knockdown"
            :disabled="disabled"
            data-test="knockdown-test-mobile"
            @click.stop="onKnockdownClick"
          >
            <v-icon icon="mdi-arrow-down-bold" size="22" />
          </button>
          <button
            type="button"
            class="amp-mobile-controls__action-btn"
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
            class="amp-mobile-controls__action-btn"
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
    </div>
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
  emits: ['command', 'knockdown'],
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
        false,
        true
      );
      this.$emit('command', { cmdX, cmdY, cmdYaw });
    },
    emitZero() {
      this.$emit('command', { cmdX: 0, cmdY: 0, cmdYaw: 0 });
    },
    onKnockdownClick() {
      if (this.disabled) {
        return;
      }
      this.$emit('knockdown');
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
  --amp-mobile-glass: rgba(var(--v-theme-on-surface), 0.12);
  --amp-mobile-glass-border: rgba(var(--v-theme-on-surface), 0.16);
  --amp-mobile-glass-active: rgba(var(--v-theme-primary), 0.22);
  --amp-mobile-knockdown: rgba(var(--v-theme-secondary), 0.24);
  --amp-stick-size: 128px;
  --amp-btn-size: 48px;

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
  touch-action: none;
  user-select: none;
  pointer-events: auto;
}

.amp-mobile-controls--disabled {
  opacity: 0.45;
  pointer-events: none;
}

.amp-mobile-controls__pad {
  position: relative;
  width: calc(var(--amp-stick-size) + var(--amp-btn-size) * 0.55);
  height: calc(var(--amp-stick-size) + var(--amp-btn-size) * 0.2);
}

/* Joystick anchor: centered in pad; buttons sit on its upper-left */
.amp-mobile-controls__stick-base {
  position: absolute;
  right: 0;
  bottom: 0;
  width: var(--amp-stick-size);
  height: var(--amp-stick-size);
  border-radius: 50%;
  border: 1px solid var(--amp-mobile-glass-border);
  background: var(--amp-mobile-glass);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  touch-action: none;
  z-index: 1;
}

.amp-mobile-controls__btn-cluster {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
  display: grid;
  grid-template-columns: var(--amp-btn-size) var(--amp-btn-size);
  grid-template-rows: var(--amp-btn-size) var(--amp-btn-size);
  gap: 6px;
}

.amp-mobile-controls__knockdown-btn {
  grid-column: 1;
  grid-row: 1;
}

.amp-mobile-controls__btn-cluster .amp-mobile-controls__action-btn:nth-child(2) {
  grid-column: 2;
  grid-row: 1;
}

.amp-mobile-controls__btn-cluster .amp-mobile-controls__action-btn:nth-child(3) {
  grid-column: 1;
  grid-row: 2;
}

.amp-mobile-controls__stick-base::before {
  content: '';
  position: absolute;
  inset: 22%;
  border-radius: 50%;
  border: 1px dashed rgba(var(--v-theme-on-surface), 0.12);
  pointer-events: none;
}

.amp-mobile-controls__stick-knob {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid rgba(var(--v-theme-primary), 0.45);
  background: rgba(var(--v-theme-primary), 0.2);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  will-change: transform;
}

.amp-mobile-controls__action-btn {
  width: var(--amp-btn-size);
  height: var(--amp-btn-size);
  border-radius: 50%;
  border: 1px solid var(--amp-mobile-glass-border);
  background: var(--amp-mobile-glass);
  color: rgb(var(--v-theme-on-surface));
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.amp-mobile-controls__action-btn:active:not(:disabled) {
  background: var(--amp-mobile-glass-active);
  border-color: rgba(var(--v-theme-primary), 0.4);
}

.amp-mobile-controls__knockdown-btn {
  background: var(--amp-mobile-knockdown);
  border-color: rgba(var(--v-theme-secondary), 0.35);
  color: rgb(var(--v-theme-secondary));
}

.amp-mobile-controls__knockdown-btn:active:not(:disabled) {
  background: rgba(var(--v-theme-secondary), 0.38);
  border-color: rgba(var(--v-theme-secondary), 0.55);
}
</style>
