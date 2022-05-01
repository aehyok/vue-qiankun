<template>
  <Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <AsyncComponent />

    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback>
      <div>
        <van-skeleton title :row="3" />
        <van-skeleton title :row="3" />
        <van-skeleton title :row="3" />
        <van-skeleton title :row="3" />
        <van-skeleton title :row="3" />
        <van-skeleton title :row="3" />
      </div>
      <!-- <van-skeleton title avatar :row="3" :loading="loading">
  <div>实际内容</div>
</van-skeleton> -->
    </template>
  </Suspense>
</template>

<script lang="ts" setup>

// https://juejin.cn/post/6854573214547312654
// https://juejin.cn/post/7055098445467484167
import { defineAsyncComponent, Suspense, onMounted, ref } from 'vue';
import { Skeleton as VanSkeleton } from 'vant'
const AsyncComponent = defineAsyncComponent(() =>
  import('./async-component.vue')
)

// const loading = ref(true)
onMounted(() => {
  // loading.value = false
  console.log('Father onMounted');

})
</script>
