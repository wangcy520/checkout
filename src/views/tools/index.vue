<template>
  <div class="container mx-auto p-4">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 class="text-xl font-bold mb-4 text-center">二维码下载</h2>

      <div class="mb-4">
        <label for="qrContent" class="block text-sm font-medium text-gray-700 mb-1">二维码内容</label>
        <input type="text" id="qrContent" v-model="qrContent"
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="输入网址或文本">
      </div>

      <div class="flex justify-center mb-6">
        <!-- 修改：将div容器改为canvas元素，并添加ref -->
        <canvas ref="qrcodeCanvas" class="w-64 h-64 border border-gray-200 rounded-md p-4"></canvas>
      </div>

      <div class="flex justify-center">
        <button @click="downloadQrcode"
          class="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center">
          <i class="fa fa-download mr-2"></i> 下载二维码
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import QRCode from 'qrcode';

const qrContent = ref('https://www.example.com');
// 修改：使用ref绑定canvas元素
const qrcodeCanvas = ref(null);

onMounted(() => {
  generateQrcode();
});

watch(qrContent, () => {
  generateQrcode();
});

const generateQrcode = async () => {
  try {
    // 修改：直接使用ref获取canvas元素
    const canvas = qrcodeCanvas.value;
    if (!canvas) return;

    // 修改：不需要清空内容，QRCode会直接渲染到canvas上
    await QRCode.toCanvas(canvas, qrContent.value, {
      width: 256,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
  } catch (error) {
    console.error('生成二维码失败:', error);
  }
};

const downloadQrcode = () => {
  // 修改：直接使用ref获取canvas元素
  const canvas = qrcodeCanvas.value;
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = `qrcode-${new Date().getTime()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
};
</script>

<style scoped>
:root {
  --primary: #165DFF;
}
</style>