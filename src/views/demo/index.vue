<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-blue-50 p-4">
    <!-- Header with amount and timer -->
    <div class="flex justify-between items-center text-gray-700 mb-6">
      <div class="text-sm font-medium">Amount payable</div>
      <div class="bg-[#fff] px-4 py-2 rounded-[15px]  flex items-center">
        <div class="flex items-center text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ timeStr || '00:00' }}
        </div>
      </div>
    </div>

    <!-- Amount -->
    <div class="text-3xl font-bold text-blue-700 mb-6">₹{{ deepLinks.orderAmount }}</div>

    <!-- Payment Methods -->
    <div class="bg-white rounded-xl  p-4 space-y-4" v-if="types == 0">
      <h2 class="text-base font-semibold text-gray-800 mb-2">Select payment method</h2>
      <a :href="deepLinks.deepLink.paytm" v-if="deepLinks.deepLink && deepLinks.deepLink.paytm">
        <div
          class="flex justify-between items-center p-3 rounded-lg border border-[#4c9fe3] hover:text-blue-700 cursor-pointer transition-all">
          <div class="flex items-center space-x-3">
            <img src="@/assets/paytm.svg" alt="SVG Image" class="w-full h-auto" />
            <!-- <span class="font-medium text-gray-800">{{ name }}</span> -->
          </div>
          <img class="w-12 h-12" src="@/assets/long press.png" alt="">
        </div>
      </a>
      <a :href="deepLinks.deepLink.phonepe" v-if="deepLinks.deepLink && deepLinks.deepLink.phonepe" class="p-3">
        <div
          class="flex justify-between items-center p-3 rounded-lg border border-[#4c9fe3] hover:text-blue-700 cursor-pointer transition-all">
          <div class="flex items-center space-x-3">
            <img src="@/assets/PhonePe.svg" alt="SVG Image" class="w-full h-auto" />
            <!-- <span class="font-medium text-gray-800">{{ name }}</span> -->
          </div>
          <img class="w-12 h-12" src="@/assets/long press.png" alt="">
        </div>
      </a>

      <a :href="deepLinks.deepLink.upi" v-if="deepLinks.deepLink && deepLinks.deepLink.upi">
        <div
          class="flex justify-between items-center p-3 rounded-lg border border-[#4c9fe3] hover:text-blue-700 cursor-pointer transition-all">
          <div class="flex items-center space-x-3">
            <img src="@/assets/upi.svg" alt="SVG Image" class="w-full h-auto" />
            <!-- <span class="font-medium text-gray-800">{{ name }}</span> -->
          </div>
          <img class="w-12 h-12" src="@/assets/long press.png" alt="">
        </div>
      </a>
    </div>
    <div class="bg-white rounded-xl  p-4 space-y-4" v-if="types == 1">
      <h2 class="text-base font-semibold text-gray-800 mb-2">Select payment method</h2>
      <div class="flex justify-center items-center p-3 rounded-lg border">
        <div class=" w-40 h-40 border border-[#ccc] rounded-xl">
          <img :src="qrisContent" alt="">
        </div>
      </div>
      <div class="flex justify-center items-center">
        <van-button type="primary">sava</van-button>
      </div>
    </div>
    <div v-if="loading" class="__spinner-container">
      <van-loading size="50px" vertical>loading...</van-loading>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { payInr, statusTnr } from "@/api/mock";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const timeStr = ref('00:00');
let timer = null;
let statusTimer = null; // 新增定时器变量
let leftSeconds = ref(0);
const deepLinks = ref({});
const loading = ref(true);
const types = ref(0);
const qrisContent = ref('');

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};

onMounted(() => {
  let code = route.params.id;
  sessionStorage.setItem('pay_code', code);
  payInr(code).then((res) => {
    loading.value = false;
    if (res.code == 200) {
      sessionStorage.setItem('pay_meony', res.data.orderAmount);
      deepLinks.value = res.data;
      types.value = res.type || 0; // 默认类型为 0
      qrisContent.value = res.qrisContent;
      leftSeconds.value = Number(res.expire);
      timeStr.value = formatTime(leftSeconds.value);
      timer = setInterval(() => {
        if (leftSeconds.value > 0) {
          leftSeconds.value--;
          timeStr.value = formatTime(leftSeconds.value);
          if (leftSeconds.value === 5) {
            router.replace('/pay/expired');
          }
        } else {
          clearInterval(timer);
        }
      }, 1000);

      // 每两秒执行一次 statusTnr
      statusTimer = setInterval(() => {
        statusTnr(code).then((statusRes) => {
          // 这里可以处理 statusRes 的结果
          if (statusRes.status != null && statusRes.status == '2') {
            window.location.href = statusRes.returnUrl;
          }
        });
      }, 2000);
    } else if (res.code == 401) {
      router.replace('/pay/expired');
    } else if (res.code == null) {
      router.replace('/pay/error');
    }
  });
});

// 页面卸载时清除定时器
onUnmounted(() => {
  if (timer) clearInterval(timer);
  if (statusTimer) clearInterval(statusTimer);
});
</script>
<style scoped>
.__spinner-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  /* 黑色半透明背景 */
  z-index: 9999;
}
</style>
