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
    <div class="text-3xl font-bold text-blue-700 mb-6">₹{{ deepLink.orderAmount }}</div>

    <!-- Payment Methods -->
    <div class="bg-white rounded-xl  p-4 space-y-4">
      <h2 class="text-base font-semibold text-gray-800 mb-2">Select payment method</h2>
      <div
        class="flex justify-between items-center p-3 rounded-lg border border-[#4c9fe3] hover:text-blue-700 cursor-pointer transition-all"
        @click="toPage('phonepe')">
        <div class="flex items-center space-x-3">
          <img src="@/assets/PhonePe.svg" alt="SVG Image" class="w-full h-auto" />
          <span class="font-medium text-gray-800">{{ name }}</span>
        </div>
        <img class="w-12 h-12" src="@/assets/long press.png" alt="">
      </div>
      <div
        class="flex justify-between items-center p-3 rounded-lg border border-[#4c9fe3] hover:text-blue-700 cursor-pointer transition-all"
        @click="toPage('paytm')">
        <div class="flex items-center space-x-3">
          <img src="@/assets/paytm.svg" alt="SVG Image" class="w-full h-auto" />
          <span class="font-medium text-gray-800">{{ name }}</span>
        </div>
        <img class="w-12 h-12" src="@/assets/long press.png" alt="">
      </div>
      <div
        class="flex justify-between items-center p-3 rounded-lg border border-[#4c9fe3] hover:text-blue-700 cursor-pointer transition-all"
        @click="toPage('upi')">
        <div class="flex items-center space-x-3">
          <img src="@/assets/upi.svg" alt="SVG Image" class="w-full h-auto" />
          <span class="font-medium text-gray-800">{{ name }}</span>
        </div>
        <img class="w-12 h-12" src="@/assets/long press.png" alt="">
      </div>
    </div>

    <!-- <div class="bg-white rounded-xl  p-4 space-y-4">
      <h2 class="text-base font-semibold text-gray-800 mb-2">Select payment method</h2>
      <div class="flex justify-center items-center p-3 rounded-lg border">
        <div class=" w-40 h-40 border border-[#ccc] rounded-xl"></div>
      </div>
      <div class="flex justify-center items-center">
        <van-button type="primary">sava</van-button>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { payInr } from "@/api/mock";
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const timeStr = ref('00:00');
let timer = null;
let leftSeconds = ref(0);
const deepLink = ref({});


const toPage = (code) => {
  if (code == 'phonepe') {
    window.location.href(deepLink.value.deepLink.phonepe);
  } else if (code == 'paytm') {
    window.location.href(deepLink.value.deepLink.paytm);
  } else if (code == 'upi') {
    window.location.href(deepLink.value.deepLink.upi);
  }
};

const formatTime = (seconds) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
};


onMounted(() => {
  timeStr.value = formatTime(300);
  timer = setInterval(() => {
    if (leftSeconds.value > 0) {
      leftSeconds.value--;
      timeStr.value = formatTime(leftSeconds.value);
    } else {
      clearInterval(timer);
    }
  }, 1000);
  let code = route.params.id;
  payInr(code).then((res) => {
    if (res.code == 200) {
      deepLink.value = res.data;
      timeStr.value = formatTime(300); // 转换时间
    }
  });

});
</script>
<style scoped></style>
