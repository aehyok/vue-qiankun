<template>
  about
</template>
<script>
import { getCurrentInstance} from 'vue';
export default {
  setup(props, context) {
    console.log(props)
    const {ctx } = getCurrentInstance();
      ctx.$filters.currencyUSD('sssss')

  },
}
</script>
