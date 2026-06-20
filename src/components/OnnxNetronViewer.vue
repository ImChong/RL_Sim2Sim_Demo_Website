<template>
  <div class="onnx-netron-viewer">
    <p v-if="!viewerUrl" class="text-caption text-medium-emphasis onnx-netron-empty">
      {{ emptyLabel }}
    </p>
    <iframe
      v-else
      :key="viewerUrl"
      class="onnx-netron-frame"
      :src="viewerUrl"
      :title="frameTitle"
      referrerpolicy="same-origin"
      loading="lazy"
    />
  </div>
</template>

<script>
import { buildNetronViewerUrl } from '@/utils/resolveModelAssetUrl.js';

export default {
  name: 'OnnxNetronViewer',
  props: {
    modelPath: {
      type: String,
      default: ''
    },
    language: {
      type: String,
      default: 'zh'
    }
  },
  computed: {
    viewerUrl() {
      return buildNetronViewerUrl(this.modelPath);
    },
    frameTitle() {
      return this.language === 'en' ? 'ONNX model architecture (Netron)' : 'ONNX 模型架构（Netron）';
    },
    emptyLabel() {
      return this.language === 'en'
        ? 'No ONNX model path is available yet.'
        : '尚未加载 ONNX 模型路径。';
    }
  }
};
</script>

<style scoped>
.onnx-netron-viewer {
  flex: 1 1 auto;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.onnx-netron-empty {
  padding: 12px 4px;
}

.onnx-netron-frame {
  flex: 1 1 auto;
  width: 100%;
  min-height: 280px;
  border: 0;
  border-radius: 10px;
  background: rgb(var(--v-theme-surface));
}
</style>
