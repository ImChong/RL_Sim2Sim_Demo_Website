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

  /** Mirrors src/simulation/theme.js (main-site AMP / Tracking). */
  const SIMULATION_THEME_SETTINGS = {
    dark: {
      lightIntensityScale: 0.85,
      ambientIntensity: 0.14,
      backgroundRgb: [0.08, 0.12, 0.18],
      sonicHemiSky: 0x6a8aaa,
      sonicHemiGround: 0x2a3a28,
      sonicHemiIntensity: 0.34,
      sonicFillColor: 0x80c0ff,
      sonicFillIntensity: 0.42,
      sonicRimIntensity: 0.3
    },
    light: {
      lightIntensityScale: 1,
      ambientIntensity: 0.1,
      backgroundRgb: [0.15, 0.25, 0.35],
      sonicHemiSky: 0x6a8aaa,
      sonicHemiGround: 0x2a3a28,
      sonicHemiIntensity: 0.12,
      sonicFillColor: 0x80c0ff,
      sonicFillIntensity: 0.18,
      sonicRimIntensity: 0.12
    }
  };

  const LEGACY_PARKOUR_LIGHT_KEYS = ['spotlight', 'hemiLight', 'fillLightLeft', 'fillLightRight'];

  let statsTimer = null;

  function normalizeVisualThemeName(name) {
    return name === 'light' ? 'light' : 'dark';
  }

  function getVisualThemeSettings(name) {
    return SIMULATION_THEME_SETTINGS[normalizeVisualThemeName(name)];
  }

  function disposeLegacyParkourLights(demo) {
    for (const key of LEGACY_PARKOUR_LIGHT_KEYS) {
      const light = demo[key];
      if (!light) {
        continue;
      }
      demo.scene?.remove(light);
      light.dispose?.();
      demo[key] = null;
    }
  }

  function applyParkourVisualTheme(demo, themeName) {
    const settings = getVisualThemeSettings(themeName);
    if (!settings || !demo?.scene) {
      return;
    }

    demo.visualThemeName = normalizeVisualThemeName(themeName);
    disposeLegacyParkourLights(demo);

    if (demo.scene.background?.setRGB) {
      demo.scene.background.setRGB(...settings.backgroundRgb);
    }

    demo.scene.fog = null;

    if (demo.ambientLight) {
      demo.ambientLight.intensity = settings.ambientIntensity;
    }

    if (demo.sonicHemi) {
      demo.sonicHemi.color?.setHex?.(settings.sonicHemiSky);
      demo.sonicHemi.groundColor?.setHex?.(settings.sonicHemiGround);
      demo.sonicHemi.intensity = settings.sonicHemiIntensity;
    }

    if (demo.sonicFill) {
      demo.sonicFill.color?.setHex?.(settings.sonicFillColor);
      demo.sonicFill.intensity = settings.sonicFillIntensity;
    }

    if (demo.sonicRim) {
      demo.sonicRim.intensity = settings.sonicRimIntensity;
    }

    if (!demo.lightBaseIntensities) {
      demo.lightBaseIntensities = new Map();
    }

    for (const [index, light] of Object.entries(demo.lights ?? {})) {
      if (!light) {
        continue;
      }
      const lightIndex = Number(index);
      const baseIntensity = demo.lightBaseIntensities.get(lightIndex) ?? light.intensity ?? 1;
      demo.lightBaseIntensities.set(lightIndex, baseIntensity);
      light.intensity = baseIntensity * settings.lightIntensityScale;
    }

    if (demo.renderer) {
      demo.renderer.toneMapping = 0;
      demo.renderer.toneMappingExposure = 1;
    }

    demo.render?.();
  }

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
  /** Fallback when host has not sent panel corner radius yet (matches Vuetify v-card default). */
  const DEFAULT_DEPTH_PREVIEW_CORNER_RADIUS_PX = 4;

  function depthHudClampCornerRadiusPx(radiusPx, widthPx, heightPx) {
    const width = Math.max(1, Number(widthPx) || 1);
    const height = Math.max(1, Number(heightPx) || 1);
    const radius = Math.max(0, Number(radiusPx) || 0);
    return Math.min(radius, width * 0.5, height * 0.5);
  }

  function setDepthHudRoundUniforms(uniforms, radiusPx, widthPx, heightPx) {
    if (!uniforms?.cornerRadiusPx || !uniforms?.size?.value) {
      return;
    }
    const width = Math.max(1, Number(widthPx) || 1);
    const height = Math.max(1, Number(heightPx) || 1);
    uniforms.cornerRadiusPx.value = depthHudClampCornerRadiusPx(radiusPx, width, height);
    uniforms.size.value.x = width;
    uniforms.size.value.y = height;
  }

  function patchDepthHudRoundedCorners(material) {
    if (!material || material.__depthHudRoundedPatched) {
      return;
    }
    material.__depthHudRoundedPatched = true;
    material.depthWrite = false;
    material.depthTest = false;
    if (!material.__depthHudRoundUniforms) {
      material.__depthHudRoundUniforms = {
        cornerRadiusPx: { value: 0 },
        size: { value: { x: 1, y: 1 } }
      };
    }
    const previousOnBeforeCompile = material.onBeforeCompile;
    material.onBeforeCompile = (shader) => {
      if (typeof previousOnBeforeCompile === 'function') {
        previousOnBeforeCompile(shader);
      }
      shader.uniforms.uDepthHudCornerRadiusPx = material.__depthHudRoundUniforms.cornerRadiusPx;
      shader.uniforms.uDepthHudSize = material.__depthHudRoundUniforms.size;
      if (shader.fragmentShader.includes('uDepthHudCornerRadiusPx')) {
        return;
      }
      shader.fragmentShader = shader.fragmentShader.replace(
        'void main() {',
        'uniform float uDepthHudCornerRadiusPx;\nuniform vec2 uDepthHudSize;\nvoid main() {'
      );
      const roundMask = [
        'vec2 depthHudP = (vMapUv - 0.5) * uDepthHudSize;',
        'vec2 depthHudHalf = uDepthHudSize * 0.5;',
        'vec2 depthHudQ = abs(depthHudP) - depthHudHalf + uDepthHudCornerRadiusPx;',
        'float depthHudDist = length(max(depthHudQ, 0.0)) + min(max(depthHudQ.x, depthHudQ.y), 0.0) - uDepthHudCornerRadiusPx;',
        'if (depthHudDist > 0.0) discard;'
      ].join('\n');
      if (shader.fragmentShader.includes('#include <colorspace_fragment>')) {
        shader.fragmentShader = shader.fragmentShader.replace(
          '#include <colorspace_fragment>',
          `${roundMask}\n#include <colorspace_fragment>`
        );
      } else {
        shader.fragmentShader = shader.fragmentShader.replace(
          /\n\}/,
          `\n${roundMask}\n}`
        );
      }
    };
    material.customProgramCacheKey = () => 'depth-hud-rounded-v5';
    material.needsUpdate = true;
  }

  function applyDepthHudRoundedCorners(demo) {
    patchDepthHudRoundedCorners(demo?.depthRawMaterial);
    patchDepthHudRoundedCorners(demo?.depthPreviewMaterial);
  }

  function patchDepthHudRender(demo) {
    if (!demo?.render || demo.__depthHudRenderPatched) {
      return;
    }
    demo.__depthHudRenderPatched = true;
    const originalRender = demo.render.bind(demo);
    demo.render = async function depthHudRenderWrapper(...args) {
      const renderer = this.renderer;
      if (!renderer) {
        return originalRender(...args);
      }
      const previousAutoClear = renderer.autoClear;
      renderer.autoClear = false;
      try {
        return await originalRender(...args);
      } finally {
        renderer.autoClear = previousAutoClear;
      }
    };
  }

  function applyDepthPreviewCornerRadius(demo, radiusPx) {
    if (!demo) {
      return;
    }
    applyDepthHudRoundedCorners(demo);
    const scale = demo.depthInset?.previewScale ?? DEFAULT_DEPTH_PREVIEW_SCALE;
    const processed = demo.depthProcessedInset;
    const procScale = processed?.scale ?? scale;
    const procWidth = (processed?.width ?? 87) * procScale;
    const procHeight = (processed?.height ?? 58) * procScale;
    const rawWidth = (demo.depthInset?.width ?? 64) * scale;
    const rawHeight = (demo.depthInset?.height ?? 64) * scale;
    const cornerRadiusPx = Number.isFinite(Number(radiusPx))
      ? Number(radiusPx)
      : DEFAULT_DEPTH_PREVIEW_CORNER_RADIUS_PX;
    setDepthHudRoundUniforms(
      demo.depthPreviewMaterial?.__depthHudRoundUniforms,
      cornerRadiusPx,
      procWidth,
      procHeight
    );
    setDepthHudRoundUniforms(
      demo.depthRawMaterial?.__depthHudRoundUniforms,
      cornerRadiusPx,
      rawWidth,
      rawHeight
    );
  }

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
    if (state.depthPreviewLeftOffset !== undefined) {
      const left = Math.max(4, Math.min(48, Math.round(Number(state.depthPreviewLeftOffset) || DEFAULT_DEPTH_PREVIEW_MARGIN)));
      demo.depthInset.leftOffset = left;
    }
    if (state.depthPreviewBottomOffset !== undefined) {
      const bottom = Math.max(4, Math.min(640, Math.round(Number(state.depthPreviewBottomOffset) || DEFAULT_DEPTH_PREVIEW_MARGIN)));
      demo.depthInset.bottomOffset = bottom;
    }
    if (state.depthPreviewCornerRadiusPx !== undefined) {
      demo._depthPreviewCornerRadiusPx = Number(state.depthPreviewCornerRadiusPx);
    }
    applyDepthPreviewCornerRadius(
      demo,
      demo._depthPreviewCornerRadiusPx ?? DEFAULT_DEPTH_PREVIEW_CORNER_RADIUS_PX
    );
  }

  function attachHostApi(demo) {
    if (!demo || demo.__hostBridgeAttached) {
      patchPolicyVirtualInput(demo);
      applyDepthHudRoundedCorners(demo);
      patchDepthHudRender(demo);
      if (demo) {
        applyParkourVisualTheme(demo, demo.visualThemeName ?? 'dark');
      }
      return !!demo;
    }
    demo.__hostBridgeAttached = true;
    applyDepthHudRoundedCorners(demo);
    patchDepthHudRender(demo);

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

    demo.setVisualTheme = function (name) {
      applyParkourVisualTheme(this, name);
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
      if (state.visualTheme !== undefined) {
        this.setVisualTheme(state.visualTheme);
      }
      if (
        state.depthPreviewScale !== undefined
        || state.depthPreviewMargin !== undefined
        || state.depthPreviewLeftOffset !== undefined
        || state.depthPreviewBottomOffset !== undefined
        || state.depthPreviewCornerRadiusPx !== undefined
      ) {
        applyDepthPreviewLayout(this, state);
      }
      if (state.virtualInput !== undefined) {
        this.applyVirtualInput(state.virtualInput);
      }
      if (state.parkourPause === 'toggle') {
        this.togglePause();
      }
      if (state.parkourResetRun) {
        this.resetRun();
      }
    };

    demo.applyVirtualInput = function (input) {
      if (!patchPolicyVirtualInput(this)) {
        this._pendingVirtualInput = input;
        return;
      }
      this.policyController.setHostVirtualInput(input);
    };

    demo.togglePause = function () {
      if (!this.params) {
        return;
      }
      this.params.paused = !this.params.paused;
    };

    demo.resetRun = function () {
      if (typeof this.reloadScene === 'function') {
        void this.reloadScene();
        return;
      }
      this.applySceneInitialState?.({ resetData: true, rebindCameras: true });
    };

    applyParkourVisualTheme(demo, demo.visualThemeName ?? 'dark');

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

  const PARKOUR_MOVEMENT_CODES = new Set(['KeyW', 'KeyA', 'KeyD']);
  let parkourRelayKeysHeld = null;
  let parkourRelayShiftHeld = false;
  let parkourKeyboardRelayInstalled = false;

  function postParkourKeyboardSync(payload) {
    try {
      parent.postMessage(
        { source: 'parkour-keyboard-sync', ...payload },
        TARGET_ORIGIN
      );
    } catch (e) {
      /* parent gone */
    }
  }

  function emitParkourKeyboardSync() {
    if (!parkourRelayKeysHeld) {
      return;
    }
    postParkourKeyboardSync({
      keysHeld: [...parkourRelayKeysHeld],
      shiftHeld: parkourRelayShiftHeld
    });
  }

  function clearParkourKeyboardRelay() {
    if (!parkourRelayKeysHeld || parkourRelayKeysHeld.size === 0) {
      parkourRelayShiftHeld = false;
      return;
    }
    parkourRelayKeysHeld.clear();
    parkourRelayShiftHeld = false;
    postParkourKeyboardSync({ type: 'clear' });
  }

  function installParkourKeyboardRelay() {
    if (parkourKeyboardRelayInstalled) {
      return;
    }
    parkourKeyboardRelayInstalled = true;
    parkourRelayKeysHeld = new Set();

    document.addEventListener(
      'keydown',
      (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          parkourRelayShiftHeld = event.getModifierState('Shift');
          emitParkourKeyboardSync();
          return;
        }
        if (!PARKOUR_MOVEMENT_CODES.has(event.code)) {
          return;
        }
        if (event.repeat && parkourRelayKeysHeld.has(event.code)) {
          return;
        }
        event.preventDefault();
        parkourRelayKeysHeld.add(event.code);
        emitParkourKeyboardSync();
      },
      true
    );

    document.addEventListener(
      'keyup',
      (event) => {
        if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
          parkourRelayShiftHeld = event.getModifierState('Shift');
          emitParkourKeyboardSync();
          return;
        }
        if (!PARKOUR_MOVEMENT_CODES.has(event.code)) {
          return;
        }
        event.preventDefault();
        parkourRelayKeysHeld.delete(event.code);
        emitParkourKeyboardSync();
      },
      true
    );

    window.addEventListener('blur', clearParkourKeyboardRelay);
  }

  function waitForDemo() {
    const demo = window.__parkourDemo;
    if (attachHostApi(demo)) {
      applyPendingReflectionQuality(demo);
      patchPolicyVirtualInput(demo);
      installParkourKeyboardRelay();
      startStatsReporter();
      return;
    }
    requestAnimationFrame(waitForDemo);
  }

  window.addEventListener('message', handleHostMessage);
  waitForDemo();
})();
