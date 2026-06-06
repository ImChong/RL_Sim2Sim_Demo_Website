/** Sample the first channel of a packed RGBA (or similar) pixel buffer. */
export function samplePixelBuffer(buffer, { channels = 4, maxPixels = 1000 } = {}) {
  if (!buffer?.length) {
    return { avg: 0, nonzero: 0, total: 0, type: null };
  }

  const total = buffer.length / channels;
  const sampleCount = Math.min(total, maxPixels);
  let sum = 0;
  let nonzero = 0;

  for (let i = 0; i < sampleCount; i += 1) {
    const value = buffer[i * channels];
    sum += value;
    if (value > 0) {
      nonzero += 1;
    }
  }

  return {
    avg: sampleCount ? sum / sampleCount : 0,
    nonzero,
    total,
    type: buffer.constructor?.name ?? null
  };
}

/** Summarize decoded depth frame values in meters. */
export function sampleDepthFrameMeters(depthFrame, { maxSamples = 1000 } = {}) {
  if (!depthFrame?.length) {
    return { avgMeters: 0, nonzero: 0, sampled: 0 };
  }

  const sampleCount = Math.min(depthFrame.length, maxSamples);
  let sum = 0;
  let nonzero = 0;
  let sampled = 0;

  for (let i = 0; i < sampleCount; i += 1) {
    const value = depthFrame[i];
    if (!Number.isFinite(value)) {
      continue;
    }
    sampled += 1;
    sum += value;
    if (value > 0) {
      nonzero += 1;
    }
  }

  return {
    avgMeters: sampled ? sum / sampled : 0,
    nonzero,
    sampled
  };
}

const HINT_LABELS = {
  demo_missing: 'Parkour iframe demo object is missing',
  policy_not_ready: 'ONNX policy is not ready (robot goes limp; preview needs policy backbone)',
  policy_init_failed:
    'Policy init failed — check policyInitError (iOS: WASM OOM if MuJoCo+ORT exceed memory; non-JSEP + preload helps)',
  readback_ok_policy_failed:
    'GPU depth readback works but policy failed — not an iOS depth-texture bug',
  apple_path_inactive: 'iOS Uint8 depth path is not active on Apple hardware',
  preview_dark: 'Processed depth preview looks black',
  readback_zero: 'GPU depth readback buffer is all zeros',
  bundle_missing_ios_patch: 'Loaded parkour bundle is missing the iOS depth patch'
};

/** Build human-readable hints from diagnostic signals. */
export function buildParkourDepthDiagnosticHints({
  demo,
  hostUserAgent = '',
  depthPreview,
  depthReadback,
  bundleHasIosPatch
}) {
  const hints = [];

  if (!demo) {
    hints.push('demo_missing');
  }
  if (!demo?.policyController?.isReady) {
    hints.push('policy_not_ready');
    if (demo?._policyInitError) {
      hints.push('policy_init_failed');
    }
    if ((depthReadback?.avg ?? 0) > 5) {
      hints.push('readback_ok_policy_failed');
    }
  }
  if (
    /iPad|iPhone|iPod/.test(hostUserAgent) &&
    !demo?._appleDepthReadback
  ) {
    hints.push('apple_path_inactive');
  }
  if ((depthPreview?.avg ?? 0) < 5) {
    hints.push('preview_dark');
  }
  if ((depthReadback?.total ?? 0) > 0 && (depthReadback?.avg ?? 0) === 0) {
    hints.push('readback_zero');
  }
  if (bundleHasIosPatch === false) {
    hints.push('bundle_missing_ios_patch');
  }

  return hints;
}

/** Collect a JSON-serializable parkour depth diagnostic report. */
export function buildParkourDepthDiagnosticReport({
  demo,
  host = {},
  bundleHasIosPatch = null,
  bundleUrl = null
}) {
  const depthPreview = samplePixelBuffer(demo?.depthPreviewPixels);
  const depthReadback = samplePixelBuffer(demo?.depthPixels);
  const depthFrame = sampleDepthFrameMeters(demo?.depthFrame);

  const gl = demo?.renderer?.getContext?.();
  const webgl = gl
    ? {
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        error: gl.getError()
      }
    : null;

  const hints = buildParkourDepthDiagnosticHints({
    demo,
    hostUserAgent: host.userAgent ?? '',
    depthPreview,
    depthReadback,
    bundleHasIosPatch
  });

  return {
    generatedAt: new Date().toISOString(),
    host: {
      url: host.url ?? null,
      userAgent: host.userAgent ?? null,
      platform: host.platform ?? null,
      maxTouchPoints: host.maxTouchPoints ?? null,
      parkourLoading: host.parkourLoading ?? null,
      isSmallScreen: host.isSmallScreen ?? null
    },
    parkour: {
      appleDepthReadback: Boolean(demo?._appleDepthReadback),
      policyControllerExists: Boolean(demo?.policyController),
      policyReady: Boolean(demo?.policyController?.isReady),
      policyInitError: demo?._policyInitError ?? null,
      policyEnabled: demo?.params?.policyEnabled ?? null,
      robotX: demo?.data?.qpos?.[0] ?? null,
      simStepHz: demo?.simStepHz ?? null,
      showRawDepth: demo?.params?.showRawDepth ?? null
    },
    depthPreview,
    depthReadback,
    depthFrame,
    webgl,
    bundle: {
      hasIosPatch: bundleHasIosPatch,
      url: bundleUrl
    },
    hints,
    hintLabels: Object.fromEntries(hints.map((key) => [key, HINT_LABELS[key] ?? key]))
  };
}

/** Check whether the parkour iframe bundle includes the iOS depth readback patch. */
export async function fetchParkourBundleIosPatchStatus(iframeSrc, fetchImpl = fetch) {
  try {
    const base = new URL(iframeSrc, globalThis.location?.href ?? 'http://localhost/');
    const html = await fetchImpl(base.href).then((response) => response.text());
    const scriptMatch = html.match(/assets\/index-[A-Za-z0-9_-]+\.js/);
    if (!scriptMatch) {
      return { hasIosPatch: false, bundleUrl: null, error: 'bundle_script_not_found' };
    }

    const bundleUrl = new URL(scriptMatch[0], base).href;
    const bundle = await fetchImpl(bundleUrl).then((response) => response.text());
    return {
      hasIosPatch: bundle.includes('_appleDepthReadback'),
      bundleUrl,
      error: null
    };
  } catch (error) {
    return {
      hasIosPatch: null,
      bundleUrl: null,
      error: error?.message ? String(error.message) : String(error)
    };
  }
}

export function formatParkourDepthDiagnosticReport(report) {
  return JSON.stringify(report, null, 2);
}
