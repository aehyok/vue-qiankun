<template>
  <van-grid :border="false" :column-num="4" class="module">
    <van-grid-item :icon="state.newIcon1" text="form表单" @click="jumpRouter('test')" />

    <van-grid-item :icon="state.newIcon2" text="动态列表" @click="jumpRouter('test')" />

    <van-grid-item :icon="state.newIcon3" text="图文消息" @click="jumpRouter('test')" />

    <van-grid-item :icon="state.newIcon4" text="我的账单" @click="jumpRouter('my-bill')" />

    <van-grid-item :icon="state.newIcon8" text="动态列表" @click="jumpRouter('test')" />

    <van-grid-item :icon="state.newIcon7" text="动态列表" @click="jumpRouter('test')" />

    <van-grid-item :icon="state.newIcon5" text="动态列表" @click="jumpRouter('test')" />

    <van-grid-item :icon="state.newIcon6" text="slot插槽" @click="jumpRouter('slot')" />
  </van-grid>
</template>
<script lang="ts" setup>
  import { Grid as VanGrid, GridItem as VanGridItem } from 'vant';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const state = reactive({
    // 新版图标
    newIcon1: '/images/module/btn-1.png',
    newIcon2: '/images/module/btn-4.png',
    newIcon3: '/images/module/btn-3.png',
    newIcon4: '/images/module/btn-5.png',
    newIcon5: '/images/module/btn-2.png',
    newIcon6: '/images/module/btn-6.png',
    newIcon7: '/images/module/btn-7.png',
    newIcon8: '/images/module/btn-8.png',
  });

  //跳转到对应的Page
  const jumpRouter = (pageRouter: any) => {
    console.log(`/${pageRouter}`);
    router.push(`/${pageRouter}`);
  };
</script>
<style lang="scss" scoped>
  :deep(.van-grid-item) {
    .van-grid-item__text {
      font-size: 12px;
    }
  }

  :deep(.van-grid-item__content) {
    padding: 2vw 0vw;
    background: none;
  }

  .module {
    border-radius: 10px;
    margin: 10px 0;
    border-radius: 1.06667vw;
  }

  .module :deep(.van-icon__image) {
    width: 1.5em;
    height: 1.5em;
  }
</style>
