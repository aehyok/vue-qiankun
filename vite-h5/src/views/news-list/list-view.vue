<template>
  <van-pull-refresh
    v-model="isRefresh"
    @refresh="refreshClick"
    :loading-text="'正在请求数据'"
    success-text="刷新成功"
  >
    <van-list
      v-model="isListLoading"
      :finished="isFinished"
      :offset="state.offset"
      finished-text="数据已加载完毕"
      :immediate-check="false"
      @load="onLoad"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
  <van-empty description="没有数据" v-if="state.nodata" />
</template>
<script lang="ts" setup>
  import { PullRefresh as VanPullRefresh, List as VanList, Empty as VanEmpty } from 'vant';
  import { onBeforeMount, ref, reactive } from 'vue';
  import type { NewsModel } from '../../types/models';
  import { list } from './data.d';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const state = {
    tabHeadList: ['全部', 'Java高级', '前端精讲', '全栈说法', '算法摘要'],
    offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
    nodata: false,
    active: 0,
  };
  const dataList = ref<NewsModel[]>();

  const pageSetting = reactive({
    page: 1,
    limit: 15,
    total: list.length,
    pages: Math.round(list.length / 15),
  });

  const isRefresh = ref(false);
  const isFinished = ref(false);
  const isListLoading = ref(false);

  onBeforeMount(() => {
    getList();
  });

  const getList = () => {
    let start = pageSetting.limit * (pageSetting.page - 1);
    let end = pageSetting.limit * pageSetting.page;
    let tempList = list.slice(start, end);
    console.log(tempList, 'tempList');
    if (pageSetting.page === pageSetting.pages) {
      isFinished.value = true;
    } else {
      isFinished.value = false;
    }

    if (pageSetting.page === 1) {
      dataList.value = tempList;
    } else {
      tempList.forEach((item) => {
        dataList.value?.push(item);
      });
      console.log(dataList.value, 'dataList.value', dataList.value?.length);
    }
  };

  const refreshClick = () => {
    setTimeout(() => {
      isRefresh.value = false;
      isFinished.value = false; // 不写会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      isListLoading.value = false;
      // 通过接口调用数据
      console.log('调用接口成功');
      pageSetting.page = 1;
      getList();
    }, 500);
  };

  const onLoad = () => {
    console.log('onLoad--start', pageSetting);
    pageSetting.page = pageSetting.page + 1;
    getList();
  };

  const goDetails = (item: number) => {
    console.log(item, 'data');
    router.push('./news-detail');
  };
</script>

<style lang="scss" scoped>
  .main {
    padding: 0 15px;
    .flex {
      display: flex;
      background: #fff;
      padding: 5px 12px;
      margin: 10px 0;
      border-radius: 3px;
      .itemCollagen {
        width: 100%;
      }
      .itemCollagenSeventy {
        width: 80%;
      }
      .itemCollagen,
      .itemCollagenSeventy {
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          margin: 15px 0;
        }
        span {
          font-weight: 400;
          display: inline-block;
          margin-bottom: 5px;
          color: #909399;
          font-size: 12px;
        }
      }
      div:nth-child(2) {
        width: 20%;
        margin-top: 10px;
        text-align: right;
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
</style>
