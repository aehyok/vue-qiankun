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
  import { onBeforeMount, ref } from 'vue';
  import { useRouter } from 'vue-router';
  const emits = defineEmits(['getList', 'update:pageModel']);
  const router = useRouter();
  const props = defineProps({
    pageModel: {
      type: Object,
      default: () => {},
    },
  });
  const state = {
    tabHeadList: ['全部', 'Java高级', '前端精讲', '全栈说法', '算法摘要'],
    offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
    nodata: false,
    active: 0,
  };

  const isRefresh = ref(false);
  const isFinished = ref(false);
  const isListLoading = ref(false);

  onBeforeMount(() => {
    emits('getList');
  });

  const refreshClick = () => {
    setTimeout(() => {
      isRefresh.value = false;
      isFinished.value = false; // 不写会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      isListLoading.value = false;
      // 通过接口调用数据
      console.log('调用接口成功');
      props.pageModel.page = 1;
      emits('getList');
    }, 500);
  };

  const onLoad = () => {
    console.log('onLoad--start', props.pageModel);
    props.pageModel.page = props.pageModel.page + 1;
    let model = {
      ...props.pageModel,
    };
    emits('update:pageModel', model);
    emits('getList');
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
