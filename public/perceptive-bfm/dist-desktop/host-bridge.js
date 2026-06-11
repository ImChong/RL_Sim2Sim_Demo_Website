/*
 * Host control bridge for the embedded G1 Perceptive BFM demo.
 * Reports telemetry to the parent control panel and accepts terrain commands
 * so corner HUD chrome can stay hidden inside the iframe.
 */
(function () {
  'use strict';

  const TARGET_ORIGIN = window.location.origin;
  let statsTimer = null;

  function post(type, payload) {
    try {
      parent.postMessage({ source: 'bfm-host', type, ...payload }, TARGET_ORIGIN);
    } catch (e) {
      /* parent gone */
    }
  }

  function getApp() {
    return window.__app || null;
  }

  function readFps() {
    const text = document.getElementById('fps-counter')?.textContent ?? '';
    const match = text.match(/(\d+)\s*FPS/i);
    return match ? Number(match[1]) : null;
  }

  function collectStats() {
    const app = getApp();
    if (!app || !app.ready) {
      return null;
    }
    const fps = readFps();
    const simTime = Number(app.simTime);
    return {
      fps: Number.isFinite(fps) ? fps : null,
      simTime: Number.isFinite(simTime) ? simTime : null,
      terrainConfig: app.terrainConfig ? { ...app.terrainConfig } : null
    };
  }

  function handleHostMessage(event) {
    const data = event.data;
    if (!data || data.source !== 'bfm-host-control') {
      return;
    }
    const app = getApp();
    if (!app) {
      return;
    }

    if (data.type === 'terrainGenerate') {
      const cfg = {};
      if (data.difficulty != null) {
        cfg.difficulty = Number(data.difficulty);
      }
      if (data.seed != null) {
        cfg.seed = Number(data.seed);
      }
      app.generateTerrain(cfg);
      return;
    }

    if (data.type === 'getStats') {
      const stats = collectStats();
      if (stats) {
        post('stats', stats);
      }
    }
  }

  function startStatsReporter() {
    if (statsTimer !== null) {
      return;
    }
    statsTimer = setInterval(() => {
      const stats = collectStats();
      if (stats) {
        post('stats', stats);
      }
    }, 500);
  }

  function waitForReady() {
    const app = getApp();
    if (app?.ready) {
      startStatsReporter();
      post('ready', {});
      return;
    }
    setTimeout(waitForReady, 200);
  }

  window.addEventListener('message', handleHostMessage);
  waitForReady();
})();
