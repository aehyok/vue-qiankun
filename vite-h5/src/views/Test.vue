<template>
  <van-nav-bar title="我的账单" left-arrow fixed @click-left="leftClick" />
  <div class="container">
    <template v-for="(item, index) in list">
      <van-sticky :offset-top="50" v-if="item % 10 === 1" :key="item">
        <div style="background: #07c160; width: 100px">
          {{ item }}
        </div>
      </van-sticky>
      <div class="item item-1" v-else-if="index === 1">{{ item }}</div>
      <div class="item" v-else>{{ item }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { NavBar as VanNavBar, Sticky as VanSticky } from 'vant';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  console.error('test');
  const list = ref<number[]>([]);

  for (let i = 0; i < 100; i++) {
    list.value.push(list.value.length + 1);
  }

  function leftClick() {
    router.push('/');
  }
  console.log(Test(121), '1344131');
  function Test(num: number): boolean {
    let nums: string = '';
    if (num >= 0) {
      nums = num.toString().split('').reverse().join('');
      if (num === parseInt(nums)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
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
