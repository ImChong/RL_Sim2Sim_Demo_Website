/**
 * Describe how the observation vector is stacked into the policy input tensor:
 * which block occupies which slice of a frame, and how frames are concatenated
 * into the history window.
 *
 * Memory order matches PolicyRunner.fullObs: frame 0 is the oldest, the last
 * frame is the newest (see the copyWithin/set pair in policyRunner.step).
 */

function frameLabel(stepsAgo) {
  return stepsAgo === 0 ? 't' : `t-${stepsAgo}`;
}

/**
 * @param {ReturnType<import('./policyTelemetry.js').buildPolicyTelemetry>} telemetry
 */
export function buildObsStackLayout(telemetry) {
  const empty = {
    ready: false,
    frameSize: 0,
    historyLength: 1,
    historyCount: 0,
    tensorSize: 0,
    inputShape: [],
    blocks: [],
    frames: [],
    unmappedSize: 0
  };
  if (!telemetry?.ready) {
    return empty;
  }

  const concat = telemetry.concat ?? {};
  const frameSize = Math.max(0, Number(concat.currentFrameSize) || 0);
  const historyLength = Math.max(1, Number(concat.historyLength) || 1);
  const tensorSize = Math.max(
    0,
    Number(concat.tensorSize) || frameSize * historyLength
  );

  const sourceBlocks = telemetry.obsBlocks ?? [];
  if (!frameSize || sourceBlocks.length === 0) {
    return empty;
  }

  let mapped = 0;
  const blocks = sourceBlocks.map((block, index) => {
    const size = Math.max(0, Number(block.size) || 0);
    const offset = Math.max(0, Number(block.offset) || 0);
    mapped += size;
    return {
      id: `${block.name ?? 'block'}-${index}`,
      name: block.name ?? `Block ${index}`,
      description: block.description ?? '',
      offset,
      end: offset + size,
      size,
      share: frameSize > 0 ? size / frameSize : 0
    };
  });

  const frames = [];
  for (let i = 0; i < historyLength; i++) {
    const stepsAgo = historyLength - 1 - i;
    frames.push({
      index: i,
      stepsAgo,
      label: frameLabel(stepsAgo),
      isLatest: stepsAgo === 0,
      offset: i * frameSize
    });
  }

  return {
    ready: true,
    frameSize,
    historyLength,
    historyCount: Math.max(0, Number(concat.historyCount) || 0),
    tensorSize,
    inputShape: telemetry.onnx?.inputShape ?? [],
    blocks,
    frames,
    unmappedSize: Math.max(0, frameSize - mapped)
  };
}
