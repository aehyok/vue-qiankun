<template>
  <div class="container">
    <van-nav-bar title="H5 Vant App" placeholder fixed />
    <router-view />
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route :placeholder="true" class="bottom-tab">
      <van-tabbar-item replace to="/home">
        <span class="active-color">首页</span>
        <template #icon="props">
          <img :src="active == 0 || active == 1 ? home.active : home.inactive" alt="" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item class="scan" :icon="'/images/main/btn-scan.png'" to="/scan">
      </van-tabbar-item>
      <van-tabbar-item to="/mine" replace>
        <span>我的</span>
        <template #icon="props">
          <img :src="active == 2 ? mine.active : mine.inactive" alt="" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts" setup>
  import { NavBar as VanNavBar, Tabbar as VanTabbar, TabbarItem as VanTabbarItem } from 'vant';
  import { useRouter } from 'vue-router';
  import useStore from '../store';

  const router = useRouter();
  const store = useStore();
  const { title } = store;
  console.log(title, '--title--');
  const active = 0;

  const home = {
    active: '/images/main/btn-home-selected.png',
    inactive: '/images/main/btn-home-normal.png',
  };
  const mine = {
    active: '/images/main/btn-mine-selected.png',
    inactive: '/images/main/btn-mine-normal.png',
  };
  const scan = () => {
    console.log('scan');
    router.push('/scan');
  };
</script>
<style lang="scss" scoped>
  :deep(.van-nav-bar) {
    height: 12.26667vw;
  }
  :deep(.van-nav-bar__title) {
    font-size: 4.8vw;
    font-weight: 600;
    color: rgb(48, 49, 51);
    line-height: 20vw;
  }

  .bottom-tab .scan :deep(.van-icon__image) {
    height: 2.5em;
    width: 2.5em;
    // margin-top: -6.5vw;
    position: absolute;
    top: -42.5px;
    left: -7vw;
    z-index: 1;
  }

  .container {
    background-color: #f5f7fa;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    padding: 0 4vw;
  }
</style>
