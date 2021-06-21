<template>
  <div class="not-found">
    <h1>404 not found!</h1>
    <el-button @click="backHome">{{ message }}</el-button>
  </div>
</template>
<script lang="ts">
  import { onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useStore } from 'vuex'

  export default {
    setup() {
      const route = useRoute()
      const router = useRouter()
      const store = useStore()
      onMounted(() => {
        console.log(store.state.test, 'store.state.test')
      })
      const message = ref('')
      message.value = '返回首页'

      const backHome = () => {
        try {
          router.push('/')
        } catch {
          router.push({ name: 'login' })
        }
      }
      return {
        message,
        backHome
      }
    }
  }
</script>
<style lang="scss" scoped>
  .not-found {
    text-align: center;
    h1 {
      font-size: 42px;
      font-style: italic;
      color: $theme-color;
      padding: 10% 0 20px 0;
    }
  }
</style>
