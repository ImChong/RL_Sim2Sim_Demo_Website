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

  function attachHostApi(demo) {
    if (!demo || demo.__hostBridgeAttached) {
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
      for (const reflector of reflectors) {
        reflector.setReflectionQuality?.(preset.size, preset.multisample);
      }
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
      post('stats', { simStepHz: demo.getSimStepHz() });
    }, 500);
  }

  function waitForDemo() {
    if (attachHostApi(window.__parkourDemo)) {
      startStatsReporter();
      return;
    }
    requestAnimationFrame(waitForDemo);
  }

  window.addEventListener('message', handleHostMessage);
  waitForDemo();
})();
