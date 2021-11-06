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
  <div class="tab">
    <van-tabs v-model="state.active" @click-tab="clickTabs" swipe-threshold="4">
      <van-tab v-for="(item, index) in state.tabHeadList" :title="item" :key="index">
        <list-view></list-view>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts" setup>
  import { NavBar as VanNavBar, Tab as VanTab, Tabs as VanTabs } from 'vant';
  import listView from './list-view.vue';
  import { useRouter } from 'vue-router';
  const state = {
    tabHeadList: ['全部', '三务公开', '党建宣传', '精神文明', '便民信息'],
    refreshing: false,
    loading: false,
    page: 1,
    limit: 15,
    finished: false, // 上拉加载完毕
    offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
    total: 0,
    nodata: false,
    active: 0,
  };
  const router = useRouter();
  const onClickLeft = () => {
    console.log('////');
    router.push('/');
  };

  const clickTabs = () => {
    console.log('/-/-/-/');
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
