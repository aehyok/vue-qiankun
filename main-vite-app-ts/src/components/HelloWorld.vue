<template>
  <h1>{{ msg }}</h1>
  <el-button @click="jumpClick">jumpClick</el-button>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank">
      Vetur
    </a>
    or
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    (if using
    <code>&lt;script setup&gt;</code>)
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
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
      const jumpClick = () => {
        console.log('404')
        router.push('/404')
      }
      store.commit('setTest', 'ssss' + Math.random())
      const count = ref(0)
      const add = (a, b) => {
        return a + b
      }
      const se = ref(undefined)
      const test = reactive({
        name: undefined
      })
      // se.value="aehyok"
      console.log(test.name)

      if (test.name === undefined) {
      }
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
