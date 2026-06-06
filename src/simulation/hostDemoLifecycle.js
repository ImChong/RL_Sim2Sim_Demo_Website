/**
 * Helpers for releasing host AMP/Tracking resources when Parkour takes over.
 */

/** @param {import('onnxruntime-web').InferenceSession | null | undefined} session */
export async function releaseOnnxSession(session) {
  if (!session || typeof session.release !== 'function') {
    return;
  }
  try {
    await session.release();
  } catch (error) {
    console.warn('ONNX session release failed:', error);
  }
}

/** @param {import('three').Object3D | null | undefined} root */
export function disposeObject3D(root) {
  if (!root) {
    return;
  }
  root.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    const materials = child.material
      ? (Array.isArray(child.material) ? child.material : [child.material])
      : [];
    for (const material of materials) {
      for (const value of Object.values(material)) {
        if (value && typeof value.dispose === 'function') {
          value.dispose();
        }
      }
      material.dispose();
    }
  });
}

/** @param {WebGLRenderer | null | undefined} renderer */
export function disposeWebGLRenderer(renderer) {
  if (!renderer) {
    return;
  }
  renderer.setAnimationLoop(null);
  const gl = renderer.getContext();
  const loseContext = gl?.getExtension('WEBGL_lose_context');
  renderer.dispose();
  loseContext?.loseContext();
  renderer.domElement?.remove();
}

/** @param {HTMLElement | null | undefined} container */
export function clearHostDemoContainer(container) {
  if (!container) {
    return;
  }
  container.replaceChildren();
}
