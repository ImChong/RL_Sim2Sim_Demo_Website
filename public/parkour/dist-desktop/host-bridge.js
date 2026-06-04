/*
 * Host control bridge for the embedded G1 Perceptive Parkour demo.
 * The parent page drives camera follow, render scale, and ground reflection
 * via postMessage; this script attaches helpers to window.__parkourDemo.
 */
(function () {
  'use strict';

  const TARGET_ORIGIN = window.location.origin;
  const REFLECTION_QUALITY_PRESETS = [
    { size: 128, multisample: 0 },
    { size: 192, multisample: 0 },
    { size: 256, multisample: 0 },
    { size: 384, multisample: 2 },
    { size: 512, multisample: 4 }
  ];

  let statsTimer = null;

  function post(type, payload) {
    try {
      parent.postMessage(
        { source: 'parkour-host', type: type, ...payload },
        TARGET_ORIGIN
      );
    } catch (e) {
      /* parent gone */
    }
  }

  function getPreset(level) {
    const index = Math.max(0, Math.min(REFLECTION_QUALITY_PRESETS.length - 1, Math.round(level)));
    return REFLECTION_QUALITY_PRESETS[index];
  }

  const DEFAULT_DEPTH_PREVIEW_SCALE = 4;
  const DEFAULT_DEPTH_PREVIEW_MARGIN = 16;

  function patchPolicyVirtualInput(demo) {
    const pc = demo?.policyController;
    if (!pc || pc.__hostVirtualPatched) {
      return !!pc;
    }
    pc.__hostVirtualPatched = true;
    pc._hostVirtual = { active: false, w: false, a: false, d: false, highSpeed: false };

    const originalUpdate = pc._updateCommandState.bind(pc);
    pc._updateCommandState = function hostVirtualUpdateCommandState() {
      const hv = this._hostVirtual;
      if (!hv?.active) {
        return originalUpdate();
      }
      const savedKeys = this.pressedKeys;
      const savedSpeed = this.highSpeedMode;
      this.pressedKeys = new Set();
      if (hv.w) {
        this.pressedKeys.add('w');
      }
      if (hv.a) {
        this.pressedKeys.add('a');
      }
      if (hv.d) {
        this.pressedKeys.add('d');
      }
      this.highSpeedMode = Boolean(hv.highSpeed);
      originalUpdate();
      this.pressedKeys = savedKeys;
      this.highSpeedMode = savedSpeed;
    };

    pc.setHostVirtualInput = function (input) {
      const active = Boolean(input?.active);
      this._hostVirtual.active = active;
      if (active) {
        this._hostVirtual.w = Boolean(input.w);
        this._hostVirtual.a = Boolean(input.a);
        this._hostVirtual.d = Boolean(input.d);
        this._hostVirtual.highSpeed = Boolean(input.highSpeed);
      }
      this._updateCommandState();
    };

    if (demo._pendingVirtualInput) {
      pc.setHostVirtualInput(demo._pendingVirtualInput);
      demo._pendingVirtualInput = undefined;
    }
    return true;
  }

  function applyDepthPreviewLayout(demo, state) {
    if (!demo?.depthInset) {
      return;
    }
    if (state.depthPreviewScale !== undefined) {
      const scale = Math.max(1, Math.min(4, Number(state.depthPreviewScale) || DEFAULT_DEPTH_PREVIEW_SCALE));
      demo.depthInset.previewScale = scale;
      if (demo.depthProcessedInset) {
        demo.depthProcessedInset.scale = scale;
      }
    }
    if (state.depthPreviewMargin !== undefined) {
      const margin = Math.max(4, Math.min(32, Math.round(Number(state.depthPreviewMargin) || DEFAULT_DEPTH_PREVIEW_MARGIN)));
      demo.depthInset.margin = margin;
    }
  }

  function attachHostApi(demo) {
    if (!demo || demo.__hostBridgeAttached) {
      patchPolicyVirtualInput(demo);
      return !!demo;
    }
    demo.__hostBridgeAttached = true;

    if (demo.followEnabled === undefined) {
      demo.followEnabled = true;
    }
    if (demo.renderScale === undefined) {
      demo.renderScale = 1;
    }
    if (demo.reflectionQuality === undefined) {
      demo.reflectionQuality = 2;
    }
    if (demo.simStepHz === undefined) {
      demo.simStepHz = 0;
    }

    demo.setFollowEnabled = function (enabled) {
      this.followEnabled = Boolean(enabled);
    };

    demo.setRenderScale = function (scale) {
      const clamped = Math.max(0.5, Math.min(2.0, Number(scale) || 1));
      this.renderScale = clamped;
      if (this.renderer) {
        this.renderer.setPixelRatio(clamped);
        this.onWindowResize?.();
      }
    };

    demo.setReflectionQuality = function (level) {
      const index = Math.max(0, Math.min(REFLECTION_QUALITY_PRESETS.length - 1, Math.round(level)));
      this.reflectionQuality = index;
      const preset = getPreset(index);
      const reflectors = this.reflectors || [];
      if (reflectors.length === 0) {
        this._pendingReflectionQuality = index;
        return;
      }
      this._pendingReflectionQuality = undefined;
      for (const reflector of reflectors) {
        reflector.setReflectionQuality?.(preset.size, preset.multisample);
      }
      this.render?.();
    };

    demo.getSimStepHz = function () {
      return this.simStepHz || 0;
    };

    demo.applyHostControlState = function (state) {
      if (!state || typeof state !== 'object') {
        return;
      }
      if (state.cameraFollow !== undefined) {
        this.setFollowEnabled(state.cameraFollow);
      }
      if (state.renderScale !== undefined) {
        this.setRenderScale(state.renderScale);
      }
      if (state.reflectionQuality !== undefined) {
        this.setReflectionQuality(state.reflectionQuality);
      }
      if (state.depthPreviewScale !== undefined || state.depthPreviewMargin !== undefined) {
        applyDepthPreviewLayout(this, state);
      }
      if (state.virtualInput !== undefined) {
        this.applyVirtualInput(state.virtualInput);
      }
    };

    demo.applyVirtualInput = function (input) {
      if (!patchPolicyVirtualInput(this)) {
        this._pendingVirtualInput = input;
        return;
      }
      this.policyController.setHostVirtualInput(input);
    };

    return true;
  }

  function handleHostMessage(event) {
    const demo = window.__parkourDemo;
    if (!demo || !attachHostApi(demo)) {
      return;
    }
    const data = event.data;
    if (!data || data.source !== 'parkour-host-control') {
      return;
    }
    if (data.type === 'apply') {
      demo.applyHostControlState(data);
    } else if (data.type === 'getStats') {
      post('stats', { simStepHz: demo.getSimStepHz() });
    }
  }

  function startStatsReporter() {
    if (statsTimer !== null) {
      return;
    }
    statsTimer = setInterval(() => {
      const demo = window.__parkourDemo;
      if (!demo || !attachHostApi(demo)) {
        return;
      }
      applyPendingReflectionQuality(demo);
      post('stats', { simStepHz: demo.getSimStepHz() });
    }, 500);
  }

  function applyPendingReflectionQuality(demo) {
    if (demo._pendingReflectionQuality === undefined) {
      return;
    }
    const reflectors = demo.reflectors || [];
    if (reflectors.length === 0) {
      return;
    }
    demo.setReflectionQuality(demo._pendingReflectionQuality);
  }

  function waitForDemo() {
    const demo = window.__parkourDemo;
    if (attachHostApi(demo)) {
      applyPendingReflectionQuality(demo);
      patchPolicyVirtualInput(demo);
      startStatsReporter();
      return;
    }
    requestAnimationFrame(waitForDemo);
  }

  window.addEventListener('message', handleHostMessage);
  waitForDemo();
})();
