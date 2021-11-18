<template>
  <div class="tab">
    <van-tabs v-model="state.active" @click-tab="clickTabs" swipe-threshold="4">
      <van-tab v-for="(item, index) in state.tabHeadList" :title="item" :key="index">
        <list-view>
          <item-view :dataList="list"></item-view>
        </list-view>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { Tab as VanTab, Tabs as VanTabs } from 'vant';
  import listView from './list-view.vue';
  import itemView from './item-view.vue';
  import { list } from './data.d';
  import { onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
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
  // const dataList = [];
  const clickTabs = () => {
    console.log('/-/-/-/');
  };

  onMounted(() => {
    console.log('onMounted');
  });

  onUnmounted(() => {
    console.log('onUnmounted');
  });
  onActivated(() => {
    console.log('onActived');
  });
  onDeactivated(() => {
    console.log('onDeactivated');
  });
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
