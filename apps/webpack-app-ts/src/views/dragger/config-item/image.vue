<template>
  <img :src="imageUrl" alt="" class="img-class" />
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const imageUrl = ref('http://vue.tuokecat.com/cdn/h5/newslist.jpg')
</script>
<style lang="scss" scoped>
.img-class {
  width: 100%;
  height: 100%;
}
</style>
