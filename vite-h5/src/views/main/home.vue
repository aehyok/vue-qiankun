<template>
  <div class="home-container">
    <banner></banner>

    <module></module>

    <collection-data></collection-data>

    <news-list></news-list>

    <van-button type="primary" @click="jump">测试跳转</van-button>
    <div :class="classes.homered">Home</div>
    <div :class="$style.hometwo">Home</div>
    <div class="homethree">Home</div>
  </div>
</template>
<script lang="ts" setup>
  import { Button as VanButton } from 'vant';
  import { useRouter } from 'vue-router';
  import { onMounted } from 'vue';
  import banner from '../home/banner.vue';
  import module from '../home/module.vue';
  import collectionData from '../home/collection-data.vue';
  import newsList from '../home/news-list.vue';
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

  .home-container {
    background-color: #f5f7fa;
    min-height: 100vh;
    width: 100%;
    box-sizing: border-box;
    // padding: 0 4vw;
  }
</style>
