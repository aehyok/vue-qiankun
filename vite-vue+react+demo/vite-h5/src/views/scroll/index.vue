<template>
  <div style="width:100%;height:500px;overflow-y: scroll;" ref="refList">
    <template v-for="item in 100">
      <div style="height: 50px;">{{item}}</div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue'

  const refList = ref(null)
  onMounted(() => {
    console.log(refList.value, refList.value.scrollTop, 'refList.value-----')
  })
</script>
