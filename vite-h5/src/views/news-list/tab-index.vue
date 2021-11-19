<template>
  <div class="tab">
    <van-tabs v-model="state.active" @click-tab="clickTabs" swipe-threshold="4">
      <van-tab v-for="(item, index) in state.tabHeadList" :title="item" :key="index">
        <list-view @getList="getList" v-model:pageModel="pageModel">
          <item-view :dataList="dataList"></item-view>
        </list-view>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts" setup>
  import { Tab as VanTab, Tabs as VanTabs } from 'vant';
  import listView from '../../components/list/index.vue';
  import itemView from './item-view.vue';
  import { list } from './data.d';
  import { onMounted, onUnmounted, onActivated, onDeactivated, reactive, ref } from 'vue';
  import type { NewsModel, PageModel } from '../../types/models/index.d';
  const state = {
    tabHeadList: ['全部', '三务公开', '党建宣传', '精神文明', '便民信息'],
    active: 0,
  };

  const dataList = ref<NewsModel[]>();

  const pageModel = reactive<PageModel>({
    page: 1,
    limit: 15,
    total: list.length,
    pages: Math.round(list.length / 15),
  });

  const obj: NewsModel | undefined = list.find((item) => item.id === 85);
  console.log(obj, 'obj');
  obj?.id;

  const getListApi = () => {
    let start = pageModel.limit * (pageModel.page - 1);
    let end = pageModel.limit * pageModel.page;
    let tempList = list.slice(start, end);
    return tempList;
  };

  const getList = () => {
    if (pageModel.page === 1) {
      dataList.value = getListApi();
    } else {
      let tempList = getListApi();
      tempList.forEach((item) => {
        dataList.value?.push(item);
      });
    }
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
    // display: none;
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
