<template>
  <!---登录和主页等没有layout--->
  <router-view v-if="!showLayout" />
  <layout v-show="showLayout" />
</template>
<script lang="ts">
import { defineComponent, watch, defineAsyncComponent, ref } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'App',
  components: {
    Layout: defineAsyncComponent(() => import('./layout/index.vue'))
  },
  setup() {
    const route = useRoute()
    const showLayout = ref(false)
    // 监测路由判断是主应用路由还是子应用路由
    watch(
      () => route.path,
      () => {
        if (['/home', '/login', '/', '/init-password'].includes(route.path)) {
          showLayout.value = false
        } else {
          showLayout.value = true
        }
      },
      {
        immediate: true
      }
    )
    return {
      showLayout
    }
  }
})
</script>
