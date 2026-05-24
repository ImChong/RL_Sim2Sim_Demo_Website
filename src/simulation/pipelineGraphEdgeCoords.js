/**
 * 将端口在视口中的 getBoundingClientRect 偏移换算为 SVG 画布坐标。
 * 画布位于带 scale() 的 transform 容器内时，必须除以 scale，否则连线与节点错位。
 */
export function portPointInCanvasSpace(canvasRect, targetRect, side, scale = 1) {
  const s = scale > 0 ? scale : 1;
  const x =
    (targetRect.left + (side === 'out' ? targetRect.width : 0) - canvasRect.left) / s;
  const y = (targetRect.top + targetRect.height / 2 - canvasRect.top) / s;
  return { x, y };
}
