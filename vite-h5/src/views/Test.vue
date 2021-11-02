<template>
  <van-nav-bar title="积分明细" left-arrow fixed />
  <div class="container">
    <template v-for="(item, index) in list">
      <van-sticky :offset-top="50" v-if="item % 10 === 1" :key="index">
        <div style="background: #07c160; width: 100px">
          {{ item }}
        </div>
      </van-sticky>
      <div class="item item-1" v-else-if="index === 1" :key="index + 1">{{ item }}</div>
      <div class="item" v-else>{{ item }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { NavBar as VanNavBar, Sticky as VanSticky } from 'vant';

  const list = ref<number[]>();
  const ei: number = 10;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 100; i++) {
    list.value?.push(list.value?.length + 1);
  }
</script>

<style lang="scss" scoped>
  .item {
    border: 1px solid red;
  }
  .item-1 {
    margin-top: 50px;
  }
</style>
