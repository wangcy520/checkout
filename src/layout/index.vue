<script setup>
import tabbar from "@/components/Tabbar/index.vue";
import NavBar from "@/components/NavBar/index.vue";
import { useDarkMode } from "@/hooks/useToggleDarkMode";
import { useCachedViewStoreHook } from "@/store/modules/cachedView";
import { computed } from "vue";

const cachedViews = computed(() => {
  return useCachedViewStoreHook().cachedViewList;
});
</script>

<template>
  <div class="app-wrapper">
    <van-config-provider :theme="useDarkMode() ? 'dark' : 'light'">
      <!-- <nav-bar /> -->
      <router-view v-slot="{ Component }">
        <keep-alive :include="cachedViews">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <!-- <tabbar /> -->
    </van-config-provider>
  </div>
</template>

<style lang="less" scoped>
@import "@/styles/mixin.less";

.app-wrapper {
  .clearfix();
  position: relative;
  height: 100%;
  width: 100%;
}

#app,
body,
html {
  font-family: PingFangSC-Semibold, PingFang SC;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  display: flex;
  justify-content: center;

}

@media screen and (min-width:600px) {

  #app,
  body,
  html {
    background-color: #ccc
  }

  .app-wrapper {
    width: 600PX
  }
}
</style>
