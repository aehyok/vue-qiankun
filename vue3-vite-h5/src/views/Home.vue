<script lang="ts" setup>
import 
{ 
    Button as VanButton,
    Sticky as VanSticky,
    NavBar  as VanNavBar,
} from 'vant'
import { useStore } from '../store'

const store = useStore()
const title = store.title
console.log(title, '--title--')
import style from '../styles/home.scss'
</script>

<template>
  <van-nav-bar title="积分明细" left-arrow fixed />
  <van-sticky :offset-top="50">
    <van-button type="primary">{{title}}</van-button>
    <div class="div-height">1</div>
    <van-button type="primary">9月份展示</van-button>
    <div class="div-height">1</div>
     <van-button type="primary">8月份展示</van-button>
    <div class="div-height">2</div>
     <van-button type="primary">月份展示</van-button>
    <div class="div-height">3</div>
     <van-button type="primary">月份展示</van-button>
    <div class="div-height">4</div>
  </van-sticky>
</template>

<style lang="scss" scoped>
.div-height {
  height: 500px;
  border: 1px solid blue;
}
</style>
