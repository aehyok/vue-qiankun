<!--博客列表-->
<template>
  <van-nav-bar
    title="博客列表"
    fixed
    placeholder
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
  />
  <!-- tab切换区 -->
  <keep-alive include="tabIndex">
    <component :is="tabIndex"></component>
  </keep-alive>
</template>

<script lang="ts" setup>
  import { NavBar as VanNavBar } from 'vant';
  import { useRouter } from 'vue-router';
  // import { ref } from 'vue';
  import tabIndex from './tab-index.vue';
  const router = useRouter();

  // const componentName = ref('tabIndex');
  // const componentName = 'tabIndex';
  const onClickLeft = () => {
    console.log('////');
    router.push('/');
  };
</script>

<style lang="scss" scoped>
  .tab {
    position: relative;
    width: 100%;
    margin: 0 0 3px 0;
    min-height: 93.3vh;
    background: #f5f7fa;
  }
  .createdByDeptName {
    margin-right: 10px;
    font-size: 11px;
  }
  v-deep .van-tabs__nav--line {
    width: 100% !important;
  }
</style>
