<template>
  <div class="banner">
    <van-swipe
      class="home-swipe"
      :show-indicators="true"
      :autoplay="4000"
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang="ts" setup>
  import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from 'vant';
  const bannerList = [
    { imageUrl: '/images/banner/image.png' },
    { imageUrl: '/images/banner/image.png' },
  ];
</script>
<style lang="scss" scoped>
   .banner {
    position: relative;
    width: 100%;
    .home-swipe {
      display: inline-block;
      width: 100%;
      border-radius: 10px;
      margin-top: 8px;
    }
  }
  .home-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    width: 100%;

    img {
      padding: 0 -20px;
      display: block;
      width: 100%;
      height: 120px;
    }
  }
</style>
