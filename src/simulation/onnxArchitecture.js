/**
 * Minimal ONNX protobuf decoder that extracts the MLP main path
 * (Gemm/MatMul + Activation + LayerNormalization, with Concat bypass)
 * from an ONNX ModelProto byte buffer. Skips normalization (Sub/Div on input),
 * sampling, Constant/Reshape/Cast helper ops.
 *
 * Returns: { input: { dim }, layers: [...], output: { dim } }
 *   layer kinds: 'linear' | 'activation' | 'layernorm' | 'concat'
 *   - linear:    { kind: 'linear', inDim, outDim, name }
 *   - activation:{ kind: 'activation', op, dim }
 *   - layernorm: { kind: 'layernorm', dim }
 *   - concat:    { kind: 'concat', dim }
 */

const ACTIVATION_OPS = new Set([
  'Elu', 'Relu', 'LeakyRelu', 'Tanh', 'Sigmoid', 'Mish', 'Swish', 'Gelu', 'Selu', 'Softplus'
]);
const SKIP_OPS = new Set([
  'Sub', 'Div', 'Constant', 'ConstantOfShape', 'Shape', 'Cast', 'CastLike',
  'Reshape', 'Expand', 'Mul', 'Add', 'Pow', 'Log', 'Neg', 'Clip',
  'ReduceSum', 'ReduceMean', 'ReduceMax', 'Squeeze', 'Unsqueeze', 'Slice',
  'Gather', 'Transpose', 'Identity'
]);

function readVarint(buf, pos) {
  let val = 0;
  let shift = 0;
  while (true) {
    const byte = buf[pos++];
    val += (byte & 0x7f) * 2 ** shift;
    if ((byte & 0x80) === 0) break;
    shift += 7;
    if (shift > 49) {
      // fall back to BigInt for very large varints
      return readVarintBig(buf, pos - 1 - Math.floor(shift / 7));
    }
  }
  return [val, pos];
}

function readVarintBig(buf, pos) {
  let val = 0n;
  let shift = 0n;
  while (true) {
    const byte = buf[pos++];
    val |= BigInt(byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) break;
    shift += 7n;
  }
  return [Number(val), pos];
}

function decodeMessage(buf, start, end, handlers) {
  let pos = start;
  while (pos < end) {
    const [tag, p1] = readVarint(buf, pos);
    pos = p1;
    const fieldNum = tag >>> 3;
    const wireType = tag & 7;
    const handler = handlers[fieldNum];
    if (wireType === 0) {
      const [v, p2] = readVarint(buf, pos);
      pos = p2;
      if (handler) handler(v, 'varint');
    } else if (wireType === 1) {
      if (handler) handler(buf.subarray ? buf.subarray(pos, pos + 8) : buf.slice(pos, pos + 8), '64bit');
      pos += 8;
    } else if (wireType === 2) {
      const [len, p2] = readVarint(buf, pos);
      const e2 = p2 + len;
      if (handler) handler(buf, 'bytes', p2, e2);
      pos = e2;
    } else if (wireType === 5) {
      if (handler) handler(buf.subarray ? buf.subarray(pos, pos + 4) : buf.slice(pos, pos + 4), '32bit');
      pos += 4;
    } else {
      throw new Error(`unsupported wireType ${wireType}`);
    }
  }
}

function readString(buf, start, end) {
  if (typeof TextDecoder !== 'undefined') {
    return new TextDecoder('utf-8').decode(buf.subarray ? buf.subarray(start, end) : buf.slice(start, end));
  }
  // Node Buffer fallback
  return buf.slice(start, end).toString('utf8');
}

function decodeOnnxModel(bytes) {
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  const result = { nodes: [], initializers: [], inputs: [], outputs: [] };

  decodeMessage(buf, 0, buf.length, {
    7: (b, kind, s, e) => {
      // GraphProto
      decodeMessage(b, s, e, {
        1: (bb, k, ss, ee) => {
          // NodeProto: input=1, output=2, name=3, op_type=4
          let opType = '';
          const inputArr = [];
          const outputArr = [];
          let name = '';
          decodeMessage(bb, ss, ee, {
            1: (bbb, kk, sss, eee) => inputArr.push(readString(bbb, sss, eee)),
            2: (bbb, kk, sss, eee) => outputArr.push(readString(bbb, sss, eee)),
            3: (bbb, kk, sss, eee) => { name = readString(bbb, sss, eee); },
            4: (bbb, kk, sss, eee) => { opType = readString(bbb, sss, eee); }
          });
          result.nodes.push({ opType, name, in: inputArr, out: outputArr });
        },
        5: (bb, k, ss, ee) => {
          // TensorProto: dims=1 (repeated int64, may be packed), name=8
          const dims = [];
          let name = '';
          decodeMessage(bb, ss, ee, {
            1: (val, knd, sss, eee) => {
              if (knd === 'varint') {
                dims.push(val);
              } else if (knd === 'bytes') {
                // packed varints
                let p = sss;
                while (p < eee) {
                  const [v, pn] = readVarint(val, p);
                  dims.push(v);
                  p = pn;
                }
              }
            },
            8: (bbb, kk, sss, eee) => { name = readString(bbb, sss, eee); }
          });
          result.initializers.push({ name, dims });
        },
        11: (bb, k, ss, ee) => {
          // ValueInfoProto (input)
          let name = '';
          decodeMessage(bb, ss, ee, {
            1: (bbb, kk, sss, eee) => { name = readString(bbb, sss, eee); }
          });
          result.inputs.push(name);
        },
        12: (bb, k, ss, ee) => {
          // ValueInfoProto (output)
          let name = '';
          decodeMessage(bb, ss, ee, {
            1: (bbb, kk, sss, eee) => { name = readString(bbb, sss, eee); }
          });
          result.outputs.push(name);
        }
      });
    }
  });

  return result;
}

function countLinearUpstream(producer, initByName, startName, memo = new Map()) {
  if (!startName) return 0;
  if (memo.has(startName)) return memo.get(startName);
  memo.set(startName, 0); // guard against cycles
  const node = producer.get(startName);
  if (!node) return 0;
  let count = (node.opType === 'Gemm' || node.opType === 'MatMul') ? 1 : 0;
  let best = 0;
  for (const inp of node.in) {
    if (initByName.has(inp)) continue;
    if (!producer.has(inp)) continue;
    best = Math.max(best, countLinearUpstream(producer, initByName, inp, memo));
  }
  const total = count + best;
  memo.set(startName, total);
  return total;
}

function tracePathFrom(producer, initByName, startOutput) {
  const chain = [];
  const visited = new Set();
  const memo = new Map();
  let cursor = startOutput;
  let safety = 512;
  while (cursor && safety-- > 0) {
    const node = producer.get(cursor);
    if (!node) break;
    const key = node.name || node.out.join(',');
    if (visited.has(key)) break;
    visited.add(key);
    chain.unshift(node);
    // For each step back, choose the upstream input with the most Linear ops to follow.
    let bestNext = null;
    let bestScore = -1;
    for (const inp of node.in) {
      if (initByName.has(inp)) continue;
      if (!producer.has(inp)) continue;
      const score = countLinearUpstream(producer, initByName, inp, memo);
      if (score > bestScore) {
        bestScore = score;
        bestNext = inp;
      }
    }
    cursor = bestNext;
  }
  return chain;
}

function chainToLayers(chain, initByName) {
  const layers = [];
  let inputDim = null;
  let outputDim = null;
  for (const node of chain) {
    if (SKIP_OPS.has(node.opType)) continue;
    if (node.opType === 'Gemm' || node.opType === 'MatMul') {
      const weight = initByName.get(node.in[1]);
      if (!weight || weight.dims.length < 2) continue;
      const isGemm = node.opType === 'Gemm';
      const outDim = isGemm ? weight.dims[0] : weight.dims[1];
      const inDim = isGemm ? weight.dims[1] : weight.dims[0];
      if (inputDim == null) inputDim = inDim;
      layers.push({ kind: 'linear', inDim, outDim, name: node.name });
      outputDim = outDim;
    } else if (ACTIVATION_OPS.has(node.opType)) {
      layers.push({ kind: 'activation', op: node.opType, dim: outputDim ?? 0 });
    } else if (node.opType === 'LayerNormalization') {
      layers.push({ kind: 'layernorm', dim: outputDim ?? 0 });
    } else if (node.opType === 'Concat') {
      layers.push({ kind: 'concat', dim: 0 });
    }
  }
  for (let i = 0; i < layers.length; i++) {
    if (layers[i].kind === 'concat') {
      const next = layers.slice(i + 1).find((l) => l.kind === 'linear');
      if (next) layers[i].dim = next.inDim;
    }
  }
  return { layers, inputDim, outputDim };
}

/**
 * Trace the main MLP path by trying every graph output and picking the
 * one whose backward walk traverses the most Linear (Gemm/MatMul) ops.
 */
function traceMainPath(graph) {
  if (!graph.outputs.length || !graph.nodes.length) return null;

  const initByName = new Map(graph.initializers.map((init) => [init.name, init]));
  const producer = new Map();
  for (const node of graph.nodes) {
    for (const out of node.out) producer.set(out, node);
  }

  let best = null;
  let bestScore = -1;
  const seenStart = new Set();
  for (const startOutput of graph.outputs) {
    if (seenStart.has(startOutput)) continue;
    seenStart.add(startOutput);
    const chain = tracePathFrom(producer, initByName, startOutput);
    const built = chainToLayers(chain, initByName);
    const linearCount = built.layers.filter((l) => l.kind === 'linear').length;
    if (linearCount > bestScore) {
      bestScore = linearCount;
      best = built;
    }
  }

  if (!best || bestScore <= 0) return null;
  return {
    input: { dim: best.inputDim ?? best.layers[0]?.inDim ?? 0 },
    output: { dim: best.outputDim ?? 0 },
    layers: best.layers
  };
}

/**
 * Parse an ONNX model byte buffer and return a compact architecture description.
 * Returns null if parsing fails or no MLP-like main path is found.
 */
export function parseOnnxArchitecture(bytes) {
  try {
    const graph = decodeOnnxModel(bytes);
    return traceMainPath(graph);
  } catch (err) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('parseOnnxArchitecture failed:', err);
    }
    return null;
  }
}
