export function normalizeQuat(quat, out = new Float32Array(4)) {
  const w = quat[0];
  const x = quat[1];
  const y = quat[2];
  const z = quat[3];
  // Math.hypot has overhead due to overflow/underflow checking.
  // Using Math.sqrt is significantly faster.
  const n = Math.sqrt(w * w + x * x + y * y + z * z);
  if (n < 1e-9) {
    out[0] = 1; out[1] = 0; out[2] = 0; out[3] = 0;
    return out;
  }
  const inv = 1.0 / n;
  out[0] = w * inv; out[1] = x * inv; out[2] = y * inv; out[3] = z * inv;
  return out;
}

export function quatConjugate(quat, out = new Float32Array(4)) {
  out[0] = quat[0];
  out[1] = -quat[1];
  out[2] = -quat[2];
  out[3] = -quat[3];
  return out;
}

export function quatMultiply(a, b, out = new Float32Array(4)) {
  const aw = a[0], ax = a[1], ay = a[2], az = a[3];
  const bw = b[0], bx = b[1], by = b[2], bz = b[3];
  out[0] = aw * bw - ax * bx - ay * by - az * bz;
  out[1] = aw * bx + ax * bw + ay * bz - az * by;
  out[2] = aw * by - ax * bz + ay * bw + az * bx;
  out[3] = aw * bz + ax * by - ay * bx + az * bw;
  return out;
}

export function quatInverse(quat, out = new Float32Array(4)) {
  const conj = quatConjugate(quat, out);
  const w = quat[0], x = quat[1], y = quat[2], z = quat[3];
  const normSq = w * w + x * x + y * y + z * z;
  if (normSq < 1e-9) {
    out[0] = 1; out[1] = 0; out[2] = 0; out[3] = 0;
    return out;
  }
  const inv = 1.0 / normSq;
  out[0] = conj[0] * inv;
  out[1] = conj[1] * inv;
  out[2] = conj[2] * inv;
  out[3] = conj[3] * inv;
  return out;
}

export function yawComponent(quat, out = new Float32Array(4)) {
  const w = quat[0], x = quat[1], y = quat[2], z = quat[3];
  const sinyCosp = 2.0 * (w * z + x * y);
  const cosyCosp = 1.0 - 2.0 * (y * y + z * z);
  const yaw = Math.atan2(sinyCosp, cosyCosp);
  const half = 0.5 * yaw;
  out[0] = Math.cos(half); out[1] = 0.0; out[2] = 0.0; out[3] = Math.sin(half);
  return normalizeQuat(out, out);
}

export function linspaceRows(a, b, steps) {
  if (steps <= 0) {
    return [];
  }
  const result = [];
  const denom = steps + 1;
  for (let i = 1; i <= steps; i++) {
    const t = i / denom;
    const row = new Float32Array(a.length);
    for (let j = 0; j < a.length; j++) {
      row[j] = (1.0 - t) * a[j] + t * b[j];
    }
    result.push(row);
  }
  return result;
}

export function slerpMany(q0, q1, steps) {
  if (steps <= 0) {
    return [];
  }
  const start = normalizeQuat(q0);
  let end = normalizeQuat(q1);
  let dot = start[0] * end[0] + start[1] * end[1] + start[2] * end[2] + start[3] * end[3];
  if (dot < 0.0) {
    dot = -dot;
    end = end.map((v) => -v);
  }

  const results = [];
  const EPS = 1e-6;
  if (1.0 - dot < EPS) {
    const denom = steps + 1;
    for (let i = 1; i <= steps; i++) {
      const t = i / denom;
      const row = new Float32Array(4);
      for (let j = 0; j < 4; j++) {
        row[j] = (1.0 - t) * start[j] + t * end[j];
      }
      results.push(Float32Array.from(normalizeQuat(row)));
    }
    return results;
  }

  const omega = Math.acos(dot);
  const sinOmega = Math.sin(omega);
  const denom = steps + 1;
  for (let i = 1; i <= steps; i++) {
    const t = i / denom;
    const coeff0 = Math.sin((1.0 - t) * omega) / sinOmega;
    const coeff1 = Math.sin(t * omega) / sinOmega;
    const row = new Float32Array(4);
    for (let j = 0; j < 4; j++) {
      row[j] = coeff0 * start[j] + coeff1 * end[j];
    }
    results.push(Float32Array.from(row));
  }
  return results;
}

export function clampFutureIndices(base, steps, length) {
  return steps.map((step) => {
    const idx = base + step;
    if (idx < 0) return 0;
    if (idx >= length) return length - 1;
    return idx;
  });
}

export function toFloatArray(value, length, fallback = 0.0) {
  if (Array.isArray(value)) {
    const out = new Float32Array(length);
    for (let i = 0; i < length; i++) {
      out[i] = value[i] ?? fallback;
    }
    return out;
  }
  if (ArrayBuffer.isView(value)) {
    const out = new Float32Array(length);
    out.set(value.subarray(0, Math.min(value.length, length)));
    if (value.length < length && fallback !== 0) {
      out.fill(fallback, value.length);
    }
    return out;
  }
  const out = new Float32Array(length);
  out.fill(value ?? fallback);
  return out;
}

export function quatApplyInv(quat, vec, out = new Float32Array(3)) {
  const w = quat[0], x = quat[1], y = quat[2], z = quat[3];
  const vx = vec[0];
  const vy = vec[1];
  const vz = vec[2];
  const tx = 2.0 * (y * vz - z * vy);
  const ty = 2.0 * (z * vx - x * vz);
  const tz = 2.0 * (x * vy - y * vx);
  const cx = y * tz - z * ty;
  const cy = z * tx - x * tz;
  const cz = x * ty - y * tx;
  out[0] = vx - w * tx + cx;
  out[1] = vy - w * ty + cy;
  out[2] = vz - w * tz + cz;
  return out;
}

const _internalQ = new Float32Array(4);
export function quatToRotVec(quat, out = new Float32Array(3)) {
  const q = normalizeQuat(quat, _internalQ);
  const w = Math.max(-1.0, Math.min(1.0, q[0]));
  const angle = 2.0 * Math.acos(w);
  const s = Math.sqrt(Math.max(0.0, 1.0 - w * w));
  if (s < 1e-6) {
    out[0] = q[1] * 2.0; out[1] = q[2] * 2.0; out[2] = q[3] * 2.0;
    return out;
  }
  const inv = 1.0 / s;
  out[0] = q[1] * inv * angle;
  out[1] = q[2] * inv * angle;
  out[2] = q[3] * inv * angle;
  return out;
}

export function quatToRot6d(quat, out = new Float32Array(6)) {
  const q = normalizeQuat(quat, _internalQ);
  const w = q[0], x = q[1], y = q[2], z = q[3];
  const xx = x * x;
  const yy = y * y;
  const zz = z * z;
  const xy = x * y;
  const xz = x * z;
  const yz = y * z;
  const wx = w * x;
  const wy = w * y;
  const wz = w * z;

  out[0] = 1.0 - 2.0 * (yy + zz);
  out[1] = 2.0 * (xy + wz);
  out[2] = 2.0 * (xz - wy);
  out[3] = 2.0 * (xy - wz);
  out[4] = 1.0 - 2.0 * (xx + zz);
  out[5] = 2.0 * (yz + wx);

  return out;
}
