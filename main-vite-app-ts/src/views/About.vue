<template>
  Test
  <!-- <test /> 1111-->
  <h1>{{ double }}</h1>
  <el-button type="primary" @click="test">test</el-button>
</template>
<script>
  import { checkPhoneFun } from "../../../common/init.js"
  import { getCurrentInstance, defineComponent, computed } from "vue"
  import { useStore, mapGetters } from "vuex"

  export default defineComponent({
    setup(props, context) {
      console.log(props)
      const { proxy } = getCurrentInstance()
      proxy.$filters.currencyUSD("sssss")
      let phone = "18620342685"
      let check = checkPhoneFun(phone)
      console.log(check, "手机号检测")

      const store = useStore()

      console.log(store.state.toDoList, "store.state.toDoList")

      console.log(store.getters.getTodo(2), "22222")

      console.log(store.getters.baseInfo[0].text, "baseInfo")

      const test = () => {
        store.commit("increment", 10)
      }
      return {
        test,
        double: computed(() => store.state.count)
      }
    }
  })
</script>
