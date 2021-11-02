<template>
  <div style="height: 200px; border: 1px solid red">Home</div>
  <van-button type="primary" @click="jump">测试跳转</van-button>
  <div style="height: 200px; border: 1px solid red">Home</div>
</template>
<script lang="ts" setup>
  import { Button as VanButton } from 'vant';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  console.log('test');
  const jump = () => {
    console.log('jump--jump');
    router.push('/test');
  };
</script>
