<template>
  <h1>{{ msg }}</h1>
  <el-button @click="jumpClick">jumpClick</el-button>
</template>

<script lang="ts">
  import { ref, defineComponent, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'HelloWorld',
    props: {
      msg: {
        type: String,
        required: true
      }
    },
    setup: () => {
      const store = useStore()
      const router = useRouter()
      const jumpClick = (): void => {
        console.log('404')
        router.push('/404')
      }

      const jumpTest = (x: any, y: any, z: any): any => {
        return x + y + z
      }
      // store.commit('setTest', `ssss ${Math.random()}`)
      const count = ref(0)
      const test = reactive({
        name: undefined
      })
      // se.value="aehyok"
      console.log(test.name)
      return { count, jumpClick }
    }
  })
</script>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
</style>
