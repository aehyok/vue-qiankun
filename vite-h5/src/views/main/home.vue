<template>
  <div :class="classes.homered">Home</div>
  <van-button type="primary" @click="jump">测试跳转</van-button>
  <div :class="$style.hometwo">Home</div>
  <div class="homethree">Home</div>
</template>
<script lang="ts" setup>
  import { Button as VanButton } from 'vant';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  const router = useRouter();
  console.log('test');
  const jump = () => {
    console.log('jump--jump');
    router.push('/test');
  };

  const theme = {
    height: '200px',
    border: '1px solid green',
  };

  onMounted(() => {
    console.log('11-22-33');
    console.timeEnd('11');
  });
</script>

<style module="classes">
  .red {
    color: red;
  }
  .homered {
    height: 200px;
    border: 1px solid red;
  }
</style>

<style module>
  .hometwo {
    height: 200px;
    border: 1px solid blue;
  }
</style>
<style lang="scss" scoped>
  .homethree {
    height: v-bind('theme.height');
    border: v-bind('theme.border');
  }
</style>
