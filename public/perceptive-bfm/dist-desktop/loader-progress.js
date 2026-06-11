/*
 * Loading reporter for the embedded G1 Perceptive Parkour demo.
 *
 * The iframe's `load` event fires as soon as this HTML document is parsed, but
 * the demo then downloads and initialises ~40 MB of MuJoCo + ONNX assets before
 * anything is drawn, leaving the hosting page showing a blank white frame.
 *
 * This script (loaded before the app bundle) reports progress to the parent
 * window via postMessage so it can show a determinate loading bar that matches
 * the other policies, and only reveal the demo once the scene is actually
 * painted.
 */
(function () {
  'use strict';

  var TARGET_ORIGIN = window.location.origin;
  var ASSET_RE = /\.(wasm|onnx|data|bin)(\?|$)/i;
  // Floor for the expected runtime download size (ort wasm ~25 MB + student
  // onnx ~12.6 MB + depth backbone ~0.1 MB). Keeps the bar from snapping to the
  // top if a small file happens to finish before the big ones start.
  var EXPECTED_TOTAL_BYTES = 55 * 1024 * 1024;

  var loadedBytes = 0;
  var discoveredTotal = 0;
  var displayed = 0; // monotonic 0..0.95 until ready
  var lastSentPct = -1;
  var ready = false;
  var creepTimer = null;

  function post(type, value) {
    try {
      parent.postMessage({ source: 'parkour-loader', type: type, value: value }, TARGET_ORIGIN);
    } catch (e) {
      /* parent gone or cross-origin: nothing we can do */
    }
  }

  function totalBytes() {
    return Math.max(EXPECTED_TOTAL_BYTES, discoveredTotal);
  }

  function bump(fraction) {
    if (fraction > displayed) displayed = fraction;
    if (displayed > 0.95) displayed = 0.95;
  }

  function emit() {
    if (ready) return;
    var pct = Math.round(displayed * 100);
    if (pct === lastSentPct) return;
    lastSentPct = pct;
    post('progress', displayed);
  }

  function signalReady() {
    if (ready) return;
    ready = true;
    if (creepTimer !== null) {
      clearInterval(creepTimer);
      creepTimer = null;
    }
    post('ready', 1);
  }

  // Gentle time-based creep so the bar always moves forward, even when the
  // byte-level progress isn't observable (e.g. assets fetched inside a worker).
  creepTimer = setInterval(function () {
    if (ready) {
      clearInterval(creepTimer);
      creepTimer = null;
      return;
    }
    if (displayed < 0.9) {
      bump(displayed + (0.9 - displayed) * 0.05);
      emit();
    }
  }, 200);

  // Real byte progress for assets fetched on the main thread. The original
  // Response is handed back untouched so WebAssembly.instantiateStreaming / ORT
  // keep working; we only read a clone to count bytes.
  if (typeof window.fetch === 'function') {
    var origFetch = window.fetch.bind(window);
    window.fetch = function (input, init) {
      var url = '';
      try {
        url = typeof input === 'string' ? input : (input && input.url) || '';
      } catch (e) {
        /* exotic Request: ignore */
      }
      var promise = origFetch(input, init);
      if (ASSET_RE.test(url)) {
        promise
          .then(function (res) {
            try {
              if (!res || !res.body || typeof res.body.getReader !== 'function') return;
              var len = Number(res.headers.get('content-length')) || 0;
              if (len > 0) discoveredTotal += len;
              var reader = res.clone().body.getReader();
              (function pump() {
                reader
                  .read()
                  .then(function (chunk) {
                    if (chunk.done || ready) return;
                    loadedBytes += (chunk.value && chunk.value.length) || 0;
                    bump(loadedBytes / totalBytes());
                    emit();
                    pump();
                  })
                  .catch(function () {
                    /* stream aborted: ignore */
                  });
              })();
            } catch (e) {
              /* clone unsupported: fall back to creep only */
            }
          })
          .catch(function () {
            /* network error surfaced by the app itself */
          });
      }
      return promise;
    };
  }

  // Reveal the demo only once the scene is actually drawn. The canvas element
  // (and even the demo's lil-gui panel) can exist for several seconds before the
  // first populated frame appears; until then the canvas is blank and the dark
  // page background shows through. Sampling the canvas lets us keep the loading
  // overlay up until a real, detailed frame is on screen.

  // Force preserveDrawingBuffer so the WebGL canvas can be read back after a
  // frame is drawn. This runs before the app bundle (a deferred module), so the
  // demo's context picks up the flag.
  (function patchGetContext() {
    var proto = (typeof HTMLCanvasElement !== 'undefined') && HTMLCanvasElement.prototype;
    if (!proto || proto.__loaderPatched) return;
    proto.__loaderPatched = true;
    var orig = proto.getContext;
    proto.getContext = function (type, attrs) {
      if (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl') {
        attrs = attrs || {};
        if (attrs.preserveDrawingBuffer !== true) attrs.preserveDrawingBuffer = true;
      }
      return orig.call(this, type, attrs);
    };
  })();

  var SAMPLE_W = 40, SAMPLE_H = 30;
  var sampleCanvas = null, sampleCtx = null;

  function canvasSized(canvas) {
    return !!(canvas && canvas.width > 0 && canvas.height > 0 &&
      canvas.width >= Math.min(window.innerWidth, 320) &&
      canvas.height >= Math.min(window.innerHeight, 240));
  }

  // True once the canvas holds a real rendered frame. A blank/cleared canvas is
  // uniform and dark (or fully transparent); a 3D scene has spatial detail (a
  // wide spread of luminance) and/or is clearly bright.
  function sceneHasContent() {
    var canvas = document.querySelector('canvas');
    if (!canvasSized(canvas)) return false;
    try {
      if (!sampleCanvas) {
        sampleCanvas = document.createElement('canvas');
        sampleCanvas.width = SAMPLE_W;
        sampleCanvas.height = SAMPLE_H;
        sampleCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });
      }
      sampleCtx.clearRect(0, 0, SAMPLE_W, SAMPLE_H);
      sampleCtx.drawImage(canvas, 0, 0, SAMPLE_W, SAMPLE_H);
      var data = sampleCtx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
      var n = SAMPLE_W * SAMPLE_H, sum = 0, sumSq = 0, opaque = 0;
      for (var k = 0, q = 0; k < n; k++, q += 4) {
        var L = 0.299 * data[q] + 0.587 * data[q + 1] + 0.114 * data[q + 2];
        sum += L;
        sumSq += L * L;
        if (data[q + 3] > 16) opaque++;
      }
      if (opaque < n * 0.3) return false; // nothing opaque drawn yet
      var mean = sum / n;
      var std = Math.sqrt(Math.max(0, sumSq / n - mean * mean));
      return std > 10 || mean > 60;
    } catch (e) {
      // Pixels unreadable for some reason: fall back to "canvas is sized".
      return canvasSized(canvas);
    }
  }

  function finishWhenPainted() {
    // One extra frame so the detected frame is definitely presented.
    requestAnimationFrame(signalReady);
  }

  // Poll each animation frame until the scene is drawn. A DOM MutationObserver
  // alone misses the moment the app resizes the canvas / draws its first frame
  // (property changes rather than child mutations).
  var canvasFirstSeen = 0;
  (function waitForScene() {
    if (ready) return;
    if (canvasSized(document.querySelector('canvas')) && !canvasFirstSeen) {
      canvasFirstSeen = Date.now();
    }
    if (sceneHasContent()) {
      finishWhenPainted();
      return;
    }
    // Safety: if the canvas has been up for a while but content is never detected
    // (e.g. an unusual scene), reveal it rather than hang on the loader.
    if (canvasFirstSeen && Date.now() - canvasFirstSeen > 45000) {
      signalReady();
      return;
    }
    requestAnimationFrame(waitForScene);
  })();

  // Absolute safety net so the host is never stuck on the loader.
  setTimeout(signalReady, 120000);

  // Show the bar immediately at 0%.
  post('progress', 0);
})();
