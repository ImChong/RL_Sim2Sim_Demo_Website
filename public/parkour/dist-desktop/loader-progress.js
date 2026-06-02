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
  var EXPECTED_TOTAL_BYTES = 38 * 1024 * 1024;

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

  // The visible WebGL canvas is appended once the scene is built and rendering;
  // that's when we reveal the demo to the user.
  function canvasReady() {
    var canvas = document.querySelector('canvas');
    return !!(canvas && canvas.width > 0 && canvas.height > 0);
  }

  function finishWhenPainted() {
    // Wait two frames so the first real frame is on screen before revealing it.
    requestAnimationFrame(function () {
      requestAnimationFrame(signalReady);
    });
  }

  if (canvasReady()) {
    finishWhenPainted();
  } else {
    var observer = new MutationObserver(function () {
      if (canvasReady()) {
        observer.disconnect();
        finishWhenPainted();
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    // Absolute safety net so the host is never stuck on the loader.
    setTimeout(function () {
      try {
        observer.disconnect();
      } catch (e) {
        /* already disconnected */
      }
      signalReady();
    }, 120000);
  }

  // Show the bar immediately at 0%.
  post('progress', 0);
})();
