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
  import { onBeforeMount, ref, PropType } from 'vue';
  import { PageModel } from '/@/types/models';
  const emits = defineEmits(['getList', 'update:pageModel']);
  const props = defineProps({
    pageModel: {
      type: Object as PropType<PageModel>,
      default: () => {},
    },
  });
  const state = {
    offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
    nodata: false,
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
      isFinished.value = false;
      isListLoading.value = false;
      // 通过接口调用数据
      console.log('调用接口成功');
      props.pageModel.page = 1;
      emits('getList');
    }, 500);
  };

  const onLoad = () => {
    if (props.pageModel.page + 1 > props.pageModel.pages) {
      return;
    } else {
      props.pageModel.page = props.pageModel.page + 1;
    }

    let model = {
      ...props.pageModel,
    };
    emits('update:pageModel', model);
    emits('getList');
  };
</script>
