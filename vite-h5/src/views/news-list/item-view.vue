<template>
  <div class="main">
    <div class="flex" v-for="item: any in dataList" :key="item.id" @click="goDetails(item.id)">
      <div :class="!item.url ? 'itemCollagen' : 'itemCollagenSeventy'">
        <p>{{ item.messageName }}</p>
        <span
          ><span :class="item.createdByDeptName ? 'createdByDeptName' : ''">{{
            item.createdByDeptName ? item.createdByDeptName : ''
          }}</span
          >{{ item.createdAt }}</span
        >
      </div>
      <div v-if="item.url">
        <img :src="item.url" alt="" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  defineProps({
    dataList: {
      type: [Array],
      default: () => {},
    },
  });

  const router = useRouter();
  const goDetails = (item) => {
    console.log(item);
    router.push('/news-detail');
  };
</script>
<style lang="scss" scoped>
  .main {
    padding: 0 15px;
    .flex {
      display: flex;
      background: #fff;
      padding: 5px 12px;
      margin: 10px 0;
      border-radius: 3px;
      .itemCollagen {
        width: 100%;
      }
      .itemCollagenSeventy {
        width: 80%;
      }
      .itemCollagen,
      .itemCollagenSeventy {
        p {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          margin: 15px 0;
        }
        span {
          font-weight: 400;
          display: inline-block;
          margin-bottom: 5px;
          color: #909399;
          font-size: 12px;
        }
      }
      div:nth-child(2) {
        width: 20%;
        margin-top: 10px;
        text-align: right;
        img {
          width: 60px;
          height: 60px;
        }
      }
    }
  }
</style>
