<template>
  <van-pull-refresh
    v-model="isRefresh"
    @refresh="refreshClick"
    :loading-text="'正在请求数据'"
    success-text="刷新成功"
  >
    <van-list
      v-model="isListLoading"
      :finished="isFinished"
      :offset="state.offset"
      finished-text="暂无更多"
      :immediate-check="false"
      @load="onLoad"
    >
      <div class="main">
        <div
          class="flex"
          v-for="item: NewsModel in state.dataList"
          :key="item.id"
          @click="goDetails(item.id)"
        >
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
    </van-list>
  </van-pull-refresh>
  <van-empty description="没有数据" v-if="state.nodata" />
</template>
<script lang="ts" setup>
  import { PullRefresh as VanPullRefresh, List as VanList, Empty as VanEmpty } from 'vant';
  import { onBeforeMount, ref } from 'vue';
  import type { NewsModel } from '/@/types/models';
  // export interface NewsModel {
  //   id: number;
  //   messageName: string;
  //   url?: string;
  //   createdAt: string;
  //   createdByDeptName: string;
  // }

  const state = {
    tabHeadList: ['全部', '三务公开', '党建宣传', '精神文明', '便民信息'],
    page: 1,
    limit: 5,
    offset: 6, // 滚动条与底部距离小于 offset 时触发load事件
    total: 14,
    nodata: false,
    active: 0,
    dataList: {},
  };

  const isRefresh = ref(false);
  const isFinished = ref(false);
  const isListLoading = ref(false);
  const images = 'http://vue.tuokecat.com/cdn/h5/newslist.jpg';
  let list: NewsModel[] = [
    {
      id: 74,
      messageName: '长图片',
      createdAt: '2021-07-27T17:06:19',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 71,
      messageName: '小心哦哦奥',
      createdAt: '2021-07-26T14:15:44',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 70,
      messageName: '11111',
      createdAt: '2021-07-26T14:08:33',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 69,
      messageName: '11133',
      createdAt: '2021-07-22T11:13:28',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 68,
      messageName: '22',
      createdAt: '2021-07-22T11:12:58',

      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 64,
      messageName: '123',
      createdAt: '2021-07-19T10:00:16',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 62,
      messageName: 'ddddd',
      createdAt: '2021-06-18T20:20:55',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 61,
      messageName: 'asdfasdfa',
      createdAt: '2021-06-18T20:14:30',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 59,
      messageName: 'asdfasf',

      createdAt: '2021-06-18T11:45:02',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 58,
      messageName: '神舟12号发射成功',
      createdAt: '2021-06-17T11:54:09',
      createdByDeptName: '田西村',
      url: images,
    },
    {
      id: 56,
      messageName: '444444444',
      createdAt: '2021-06-17T10:30:56',
      createdByDeptName: '田西村',
    },
    {
      id: 53,
      messageName: '学习防疫医务工作者忘我工作精神',
      createdAt: '2021-06-16T19:25:01',
      createdByDeptName: '田西村',
    },
    {
      id: 51,
      messageName: '神舟12号发射',
      createdAt: '2021-06-16T18:46:24',
      createdByDeptName: '田西村',
    },
    {
      id: 50,
      messageName: '11111haaaahhhaaaaa',
      createdAt: '2021-06-16T18:39:17',
      createdByDeptName: '田西村',
    },
  ];

  onBeforeMount(() => {
    state.dataList = list;
  });

  const refreshClick = () => {
    console.log('onRefresh', 'ssss----ssfds', isRefresh.value);
    setTimeout(() => {
      isRefresh.value = false;
      isFinished.value = false; // 不写会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      isListLoading.value = false;
      // 通过接口调用数据
      console.log('调用接口成功');
    }, 500);
  };

  const onLoad = () => {
    console.log('onLoad--start');
  };

  const goDetails = (item: any) => {};
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
