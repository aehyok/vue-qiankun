<template>
  <div>Home {{id}}</div>
  <el-button @click="jumpClick">test</el-button>
  <HelloWorld msg="msg" />
  
  <!-- <el-button type="primary" @click="set">测试setGlobal函数</el-button> -->
</template>
<script lang="ts">

  import { ref, reactive, defineComponent, toRefs } from 'vue'
  import { useRouter } from 'vue-router'
  import actions from '../actions'
  import HelloWorld from '@/components/hello-world.vue'
  import { ToDoInfo } from '#/store'
  export default  defineComponent({
    name: 'Home',
    components: {
      HelloWorld
    },
    setup() {
      const router = useRouter()
      const msg = ref('')
      const state = reactive<ToDoInfo>({
        id:"aehyok"
      })
      console.log(state, 'state11111111111111111111111111111111111111')
      const message = 'ssss'
      // console.log(message)
      msg.value = 'Hello in the World'
      const jumpClick = () => {
        router.push('/dvs-village/household-code')
      }
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
      return {
        ...toRefs(state),
        jumpClick
      }
    }
  })
</script>
