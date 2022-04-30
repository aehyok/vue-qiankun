<template>
<Suspense>
  <!-- 具有深层异步依赖的组件 -->
  <Dashboard />

  <!-- 在 #fallback 插槽中显示 “正在加载中” -->
  <template #fallback>
    Loading...
  </template>
</Suspense>
</template>

<script lang="ts" setup>
// https://juejin.cn/post/6854573214547312654
// https://juejin.cn/post/7055098445467484167
import { Suspense } from 'vue'
</script>
