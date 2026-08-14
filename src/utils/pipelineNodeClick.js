import { nodeHasProbes } from '../simulation/signalScope.js';

export function isArchitectureNode(node) {
  return node?.kind === 'model' || node?.id === 'onnx';
}

/**
 * Decide what clicking a pipeline graph node should do.
 * @returns {'open-architecture' | 'open-scope' | 'probe-node' | null}
 */
export function pipelineNodeClickAction(node) {
  if (!node) {
    return null;
  }
  if (node.kind === 'scope') {
    return 'open-scope';
  }
  if (isArchitectureNode(node)) {
    return 'open-architecture';
  }
  // Not the rendered lines: nodes that only show a dimension summary
  // ("dim 23D") still expose one scope channel per joint.
  if (nodeHasProbes(node)) {
    return 'probe-node';
  }
  return null;
}

export function pipelineNodeHintIcon(action) {
  if (action === 'open-architecture') {
    return 'mdi-sitemap-outline';
  }
  return 'mdi-chart-line-variant';
}
