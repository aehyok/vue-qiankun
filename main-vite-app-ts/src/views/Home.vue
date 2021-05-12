<template>
  <div>Home</div>
  <HelloWorld msg="msg" />
  <!-- <el-button type="primary" @click="set">测试setGlobal函数</el-button> -->
</template>
<script lang="ts">
  import { ref, reactive } from 'vue'
  import actions from '../actions'
  import HelloWorld from '../components/HelloWorld.vue'

  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    setup() {
      const msg = ref('')
      const message = 'ssss'
      // console.log(message)
      msg.value = 'Hello in the World'
      // const set = () => {
      //   const state = reactive({
      //     name: 'aehyok',
      //     token: 'abcdefg-hijklmn'
      //   })
      //   const { token } = state
      //   console.log(token, 'token')

      //   actions.onGlobalStateChange((state, prevState) => {
      //     // state: 变更后的状态; prevState: 变更前的状态
      //     console.log('主应用前值', prevState.token)
      //     console.log('主应用当前值', state.token)
      //   })

      //   actions.setGlobalState({
      //     token
      //   })
      // }
      return {}
    }
  }
</script>
