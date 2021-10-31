<template>
  <van-nav-bar title="积分明细" left-arrow fixed />
  <div class="container">
    <template v-for="(item, index) in state.list " :key="item">
      <van-sticky :offset-top="50" v-if="item % 10 === 1">
        <div style="background: #07c160;width: 100px;">{{ item }}</div>
      </van-sticky>
      <div class="item item-1" v-else-if="index === 1">{{ item }}</div>
      <div class="item" v-else>{{ item }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import {
  NavBar as VanNavBar,
  Sticky as VanSticky,
} from 'vant'
let state = reactive({
  list: []
})

for (let i = 0; i < 100; i++) {
  state.list.push(state.list.length + 1)
}
</script>

<style lang="scss" scoped>
.item {
  border: 1px solid red;
}
.item-1 {
  margin-top: 50px;
}
</style>
