<template>
  <div id="vvv">
    <!-- 列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in state.list" :key="item">
      <!-- 固定部分 -->
        <van-sticky offset-top="50px" v-if="item % 10 == 0">
          <!-- 固定内容 -->
          <div style="background: #07c160">
            {{ index }}
          </div>
        </van-sticky>
        <van-cell :title="item" />
      </div>
    </van-list>
  </div>
</template>
 
<script lang="ts" setup>
import {  reactive,ref } from 'vue'
import {
    List as VanList,
    Sticky as VanSticky,
    Cell as VanCell
} from 'vant'

const loading = ref(false)
const finished = ref(false)
let state = reactive({
    list: []
})

const onLoad = () => {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    for (let i = 0; i < 100; i++) {
        state.list.push(state.list.length + 1 )
    }
}

</script>

<style lang="scss" scoped>
.van-cell__title {
  padding: 50px;
}
.van-sticky{
  >div{
     padding: 50px;
  }
}
</style>