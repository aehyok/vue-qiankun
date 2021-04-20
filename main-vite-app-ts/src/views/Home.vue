<template>
  <div>Home</div>
  <HelloWorld msg="msg" />
</template>
<script lang="ts">
  import { ref } from 'vue'
  import HelloWorld from '../components/HelloWorld.vue'

  export default {
    name: 'Home',
    components: {
      HelloWorld
    },
    setup() {
      const msg = ref('')
      const message = 'ssss'
      console.log(message)
      msg.value = 'Hello in the World'
    }
  }
</script>
