<!--首页六个板块-->
<template>
  <div class="collection">
    <div class="paddingEdge">
      <van-image
        v-for="(item, index) in data"
        :key="index"
        class="vanImage"
        @click="jumpTo(item)"
        style="display: block"
        :src="item.backGroundUrl"
      >
        <div class="leftText">
          <span
            :class="
              item.title == '我发布的form表单' ||
              item.title == '已读form表单' ||
              item.title == '待处form表单'
                ? 'odd'
                : 'even'
            "
            style="font-size: 22px; font-weight: bold"
            >{{ item.numOrIntro }}</span
          >
          <span
            :class="
              item.title == '我发布的form表单' ||
              item.title == '已读form表单' ||
              item.title == '待处form表单'
                ? 'odd'
                : 'even'
            "
            class="garyFont"
            >{{ item.title }}</span
          >
        </div>
      </van-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { Image as VanImage } from 'vant';
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  const jumpTo = (item: any) => {
    console.log('11111111', item);
  };

  const data = [
    {
      title: '我发布的form表单',
      numOrIntro: '0',
      backGroundUrl: '/images/collection/bg_1.png',
      jumpLink: '/products?type=0', // jumpLink 是跳转到另外项目
    },
    {
      title: '待审核村民认证',
      numOrIntro: '1',
      backGroundUrl: '/images/collection/bg_3.png',
      pushLink: '/villagersCertification', // pushLink 是跳转本地路由
    },
    {
      title: '未读form表单',
      numOrIntro: '2',
      backGroundUrl: '/images/collection/bg_4.png',
      pushLink: '/documentList?activeName=0',
    },
    {
      title: '已读form表单',
      numOrIntro: '3',
      backGroundUrl: '/images/collection/bg_6.png',
      pushLink: '/documentList?activeName=1',
    },
    {
      title: '待处form表单',
      numOrIntro: '0',
      backGroundUrl: '/images/collection/bg_2.png',
      jumpLink: '/residentsDemands?activeName=0&type=0',
    },
    {
      title: '已处理form表单',
      numOrIntro: '0',
      backGroundUrl: '/images/collection/bg_5.png',
      jumpLink: '/residentsDemands?activeName=1&type=0',
    },
  ];
</script>

<style lang="scss" scoped>
  .collection {
    width: 100%;
    .paddingEdge {
      width: 100%;
      box-sizing: border-box;
      // background-color: white;
      display: flex;
      flex-wrap: wrap;
      border-radius: 10px;
      justify-content: space-between;
      .vanImage {
        width: 49%;
        margin-bottom: 10px;
      }
    }
  }
  :deep(.leftText) {
    position: absolute;
    display: flex;
    flex-direction: column;
    padding: 5px;
    top: 50%;
    left: 10%;
    transform: translate(-10%, -50%);
    .garyFont {
      color: #1d77d0;
      font-size: 14px;
      font-weight: 400;
    }
  }
  .odd {
    color: #1d77d0;
  }
  .even {
    color: #3d5aca;
  }
</style>
