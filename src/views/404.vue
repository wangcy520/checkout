<template>
    <div class="min-h-screen flex flex-col items-center justify-start bg-[#fff] py-2 relative">
        <div class="bg"></div>
        <div class="relative w-full">
            <!-- Expired Header -->
            <div class="flex flex-col items-center space-y-2 pb-4">
                <div class="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-white text-3xl">×
                </div>
                <h1 class="text-xl font-bold text-blue-900">Expired Please Refresh</h1>
                <p class="text-sm text-[#d5d5d5] font-semibold mb-[9px]">order No:{{ orderNo }}</p>
            </div>

            <!-- Payment Box -->
            <div class="m-auto max-w-md">
                <div class="bg-img">
                    <p class="text-sm text-gray-500 text-center">Payment amount</p>
                    <p class="text-3xl font-bold text-blue-900 text-center mt-2">₹ {{ orderAmount }}</p>
                </div>
            </div>

            <!-- Secure Note -->
            <div class="mt-4 w-full bg-yellow-50 py-4 flex justify-center items-center space-x-2">
                <van-icon color="#47e405" size="25" name="shield-o" />
                <p class="text-sm text-gray-700 font-medium">100% Secure Payments Powered by UPI.</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const orderNo = ref('');
const orderAmount = ref(0);

orderAmount.value = sessionStorage.getItem('pay_meony') || 0;
orderNo.value = sessionStorage.getItem('pay_code') || '';
</script>

<style scoped>
.bg {
    position: absolute;
    width: 100%;
    height: 3.33333rem;
    background: linear-gradient(180deg, #fed99b, #fff);
    top: 0;
}

@media screen and (min-width: 600px) {
    .bg {
        height: 120PX;
    }
}

.bg-img {
    background: url('@/assets/bg.png') no-repeat center center;
    background-size: cover;
    padding: 2rem 0;
}
</style>
