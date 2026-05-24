const DEFAULT_NODE_WIDTH = 136;
const DEFAULT_NODE_HEIGHT = 50;

/**
 * 从布局数据计算端口在 SVG 画布中的坐标（与节点 translate 同一坐标系）。
 * 不依赖 getBoundingClientRect，平移/缩放视口时连线仍与节点对齐。
 */
export function portPointFromLayoutNode(node, side) {
  if (!node || node.x == null || node.y == null) {
    return null;
  }
  const width = node.width ?? DEFAULT_NODE_WIDTH;
  const height = node.height ?? DEFAULT_NODE_HEIGHT;
  const y = node.y + height / 2;
  if (side === 'out') {
    return { x: node.x + width, y };
  }
  return { x: node.x, y };
}

/**
 * 将视口中的 getBoundingClientRect 偏移换算为 SVG 画布坐标（DOM 回退方案）。
 * 使用 canvas 的 clientWidth 与 getBoundingClientRect 宽高比，避免与 Vue state 中的 scale 不同步。
 */
export function portPointInCanvasSpace(canvasRect, targetRect, side, canvasSize) {
  const scaleX = canvasSize.width / (canvasRect.width || 1);
  const scaleY = canvasSize.height / (canvasRect.height || 1);
  const x =
    (targetRect.left + (side === 'out' ? targetRect.width : 0) - canvasRect.left) * scaleX;
  const y = (targetRect.top + targetRect.height / 2 - canvasRect.top) * scaleY;
  return { x, y };
}
