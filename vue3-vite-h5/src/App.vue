<script lang="ts" setup>
import { Button as VanButton } from 'vant';

const onClick = () => {
  alert(1111)
}
</script>

<template>
  <div class="word-color">11111111</div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <van-button type="primary" @click="onClick">主要按钮</van-button>

</template>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
