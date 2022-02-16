<template>
  <van-pull-refresh
    v-model="isRefresh"
    @refresh="refreshClick"
    :loading-text="'正在请求数据'"
    success-text="数据刷新成功"
  >
    <van-list
      v-model:loading="isListLoading"
      :finished="isFinished"
      :offset="state.offset"
      finished-text="数据已加载完毕"
      :immediate-check="false"
      @load="onLoad"
    >
      <slot></slot>
    </van-list>
  </van-pull-refresh>
  <div v-if="state.nodata === true">
    <van-empty description="没有数据" />
  </div>
</template>
<script lang="ts" setup>
import { PullRefresh as VanPullRefresh, List as VanList, Empty as VanEmpty } from 'vant';
import { onBeforeMount, ref, PropType, watch } from 'vue';
import { PageModel } from '/@/types/models';
const emits = defineEmits(['getList', 'update:pageModel', 'update:dataList']);
const props = defineProps({
  pageModel: {
    type: Object as PropType<PageModel>,
    default: () => { },
  },
  dataList: {
    type: [Array],
    default: () => []
  },
  getListApi: {
    type: Function,
    default: () => { }
  }
});

const state = {
  offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
  nodata: false,
};

// 控制下拉刷新的状态，如果为true则会显示，则为一直处于加载中，到请求接口成功手动设置false,则代表刷新成功
const isRefresh = ref(false);

// 可以判断如果是上拉加载的最后一页的时候，加载成功设置为true,再上拉则不会进行加载了
const isFinished = ref(false);

// 是否在加载过程中，如果是true则不会继续出发onload事件
const isListLoading = ref(false);

onBeforeMount(() => {
  // emits('getList');
  console.log('getList')
  getList()
});

const refreshClick = () => {
  isRefresh.value = false;
  isFinished.value = false;
  isListLoading.value = true;
  // 通过接口调用数据
  console.log('调用接口成功');
  props.pageModel.page = 1;
  emits('update:pageModel', props.pageModel)
  // emits('getList');
  getList()
};

const onLoad = () => {
  isListLoading.value = true
  if (props.pageModel.page + 1 > props.pageModel.pages) {
    isFinished.value = true
    isListLoading.value = false
    console.warn('数据页面已超出最大页，不能再进行请求了')
    return;
  } else {
    props.pageModel.page = props.pageModel.page + 1;
  }
  emits('update:pageModel', props.pageModel)
  // emits('getList');
  getList()
};
const dataList: any = ref([]);
const getList = () => {
  props.getListApi(props.pageModel.limit, props.pageModel.page).then((result: any) => {
    console.log(result, 'ssssssssssssss')
    let tempList: [] = result.data.docs
    props.pageModel.limit = result.data.limit
    props.pageModel.page = result.data.page
    props.pageModel.pages = result.data.pages
    props.pageModel.total = result.data.total
    isListLoading.value = false
    isRefresh.value = false
    if (props.pageModel.page === 1) {
      dataList.value = tempList
    } else {
      dataList.value = [...props.dataList, ...tempList]
    }
    emits('update:dataList', dataList.value)
    emits('update:pageModel', props.pageModel)
  })
};

// 判断是否有数据
watch(() => props.pageModel.total, (newValue, oldValue) => {
  console.log('watch', newValue > 0, oldValue)
  state.nodata = !(newValue > 0)
})
</script>
