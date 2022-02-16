<template>
  <!-- vue3.0配置 -->
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <component :is="Component" :key="Component" v-if="!$route.meta.keepAlive" />
  </router-view>
</template>
<script lang="ts" setup>

  console.log('App', window.location.href);
</script>
