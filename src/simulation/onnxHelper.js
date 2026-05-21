import * as ort from 'onnxruntime-web';
import { readResponseBodyWithProgress } from './fetchWithProgress.js';

export class ONNXModule {
  constructor(config) {
    this.modelPath = config.path;
    this.metaData = config.meta;
    this.isRecurrent = config.meta.in_keys.includes("adapt_hx");
    this._onnxInput = {};
    this._result = {};
    this._carry = {};
    this._emptyCarry = {};
    console.log("isRecurrent", this.isRecurrent);
  }

  /**
   * @param {(ratio: number) => void} [onProgress] ratio in [0,1] for download + WASM session init
   */
  async init(onProgress) {
    const modelResponse = await fetch(this.modelPath);
    if (!modelResponse.ok) {
      throw new Error(`Failed to fetch ONNX model ${this.modelPath}: ${modelResponse.status}`);
    }
    const bytes = await readResponseBodyWithProgress(modelResponse, (r) => {
      onProgress?.(0.82 * r);
    });
    const modelArrayBuffer = bytes.slice().buffer;

    this.inKeys = this.metaData["in_keys"];
    this.outKeys = this.metaData["out_keys"];

    onProgress?.(0.88);
    this.session = await ort.InferenceSession.create(modelArrayBuffer, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all'
    });
    onProgress?.(1);

    console.log('ONNX model loaded successfully');
    console.log("inKeys", this.inKeys);
    console.log("outKeys", this.outKeys);

    console.log("inputNames", this.session.inputNames);
    console.log("outputNames", this.session.outputNames);
  }

  initInput() {
    if (this.isRecurrent) {
      if (!this._isInitTrue) {
        this._isInitTrue = new ort.Tensor('bool', [true], [1]);
        this._isInitFalse = new ort.Tensor('bool', [false], [1]);
      }
      return {
        is_init: this._isInitTrue,
        adapt_hx: new ort.Tensor('float32', new Float32Array(128), [1, 128])
      };
    }
    return {};
  }

  async runInference(input) {
    const onnxInput = this._onnxInput;
    for (let i = 0; i < this.inKeys.length; i++) {
      onnxInput[this.session.inputNames[i]] = input[this.inKeys[i]];
    }
    const onnxOutput = await this.session.run(onnxInput);
    const result = this._result;
    for (let i = 0; i < this.outKeys.length; i++) {
      result[this.outKeys[i]] = onnxOutput[this.session.outputNames[i]];
    }
    if (this.isRecurrent) {
      this._carry.is_init = this._isInitFalse;
      this._carry.adapt_hx = result['next,adapt_hx'];
      return [result, this._carry];
    }
    return [result, this._emptyCarry];
  }
}
