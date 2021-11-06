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
          v-for="(item, index) in state.dataList"
          :key="index"
          @click="goDetails(item.id)"
        >
          <div :class="!item.imageFiles[0] ? 'itemCollagen' : 'itemCollagenSeventy'">
            <p>{{ item.messageName }}</p>
            <span
              ><span :class="item.createdByDeptName ? 'createdByDeptName' : ''">{{
                item.createdByDeptName ? item.createdByDeptName : ''
              }}</span
              >{{ item.createdAt }}</span
            >
          </div>
          <div v-if="item.imageFiles[0]">
            <img :src="item.imageFiles[0].url" alt="" />
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
  onBeforeMount(() => {
    state.dataList = list.docs;
  });
  const list = {
    docs: [
      {
        id: 74,
        messageName: '长图片',
        messageText:
          '<p>阿时候给客户在持续空间真不愧是是客家话是就成了执行力考试必过卡萨阿士大夫客家话打扫房间不是采集卡西安办发卡机把</p><p><img src="http://dvs-dev.sunlight-tech.com/sundfs/9/f/9fef4b8c241f771c6e5bc8347a6ede8a.png" style="max-width:100%;" contenteditable="false"/></p><p>奥斯卡分公司看得到更好方式垦利街道廊坊市科技</p><p>爱斯达克高阶函数康</p><p>开始大Viuyhcxzohaas 凯撒奖后付款书</p><p><br/></p><p><img src="http://dvs-dev.sunlight-tech.com/sundfs/3/5/35a7fb4d658dff6e84aa9171984a3c35.jpg" style="max-width:100%;" contenteditable="false"/></p>',
        type: 2,
        images: '1352',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 50,
        createdAt: '2021-07-27T17:06:19',
        createdBy: 91,
        updatedAt: '2021-09-16T18:00:13',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 1352,
            originName: '坂井泉水.jpg',
            byteSize: '63603',
            relativePath: '/6/7/6724a3e148de9d05ccf166ce5dae17a3.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '79be0afa8f38dbe941bb3b3fad9c1e06',
            thumbnailId: 0,
            thumbnailRelativePath: '/6/7/6724a3e148de9d05ccf166ce5dae17a3.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 71,
        messageName: '小心哦哦奥',
        messageText: ' <p>发一个什么什么贵</p>',
        type: 1,
        images: '1331',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 22,
        createdAt: '2021-07-26T14:15:44',
        createdBy: 91,
        updatedAt: '2021-10-28T11:20:41',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 1331,
            originName: '垃圾中转站.png',
            byteSize: '187320',
            relativePath: '/0/c/0ca00de3f7c936e5f3f70e46f10dad97.png',
            extensionName: '.png',
            fileType: 1,
            md5: '64d23d8e5caa77203562a7e4225501df',
            thumbnailId: 0,
            thumbnailRelativePath: '/0/c/0ca00de3f7c936e5f3f70e46f10dad97.png',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 70,
        messageName: '11111',
        messageText: ' <p>什么</p>',
        type: 1,
        images: '1330',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 2,
        createdAt: '2021-07-26T14:08:33',
        createdBy: 91,
        updatedAt: '2021-09-16T17:59:19',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 1330,
            originName: 'icon_direction wind@2x.png',
            byteSize: '1095',
            relativePath: '/5/6/56b1e6c57214e6c7de59b22997097c12.png',
            extensionName: '.png',
            fileType: 1,
            md5: '1a305578763fd18138ff96bae21f399e',
            thumbnailId: 0,
            thumbnailRelativePath: '/5/6/56b1e6c57214e6c7de59b22997097c12.png',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 69,
        messageName: '11133',
        messageText: '<p>11133</p>',
        type: 1,
        images: '1290',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 0,
        createdAt: '2021-07-22T11:13:28',
        createdBy: 67,
        updatedAt: '2021-07-22T11:13:28',
        updatedBy: 67,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '',
        updatedByName: '',
        imageFiles: [
          {
            id: 1290,
            originName: '4ab887f617c1b3ccb8b823aace75bc63.jpg',
            byteSize: '7555',
            relativePath: '/1/c/1ca1fa8e300dba77d089c56424b52898.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '529727a92f16529a7984ac2b9030be6c',
            thumbnailId: 0,
            thumbnailRelativePath: '/1/c/1ca1fa8e300dba77d089c56424b52898.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 68,
        messageName: '22',
        messageText: '<p>222</p>',
        type: 1,
        images: '1289',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 0,
        createdAt: '2021-07-22T11:12:58',
        createdBy: 67,
        updatedAt: '2021-07-22T11:12:58',
        updatedBy: 67,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '',
        updatedByName: '',
        imageFiles: [
          {
            id: 1289,
            originName: '下载.png',
            byteSize: '96569',
            relativePath: '/b/d/bd3d2f06534e5906f935954205386d3b.png',
            extensionName: '.png',
            fileType: 1,
            md5: 'bdc76d897b06852a181b21f594e0daae',
            thumbnailId: 0,
            thumbnailRelativePath: '/b/d/bd3d2f06534e5906f935954205386d3b.png',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 64,
        messageName: '123',
        messageText: '<p>3333</p>',
        type: 1,
        images: '1185',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 1,
        createdAt: '2021-07-19T10:00:16',
        createdBy: 91,
        updatedAt: '2021-07-19T10:23:05',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 1185,
            originName: '好运连连.png',
            byteSize: '923822',
            relativePath: '/9/6/96015b29ca42f7106aca799a02038970.png',
            extensionName: '.png',
            fileType: 1,
            md5: 'f161e2b0a3ae988d9eb291057ba74422',
            thumbnailId: 0,
            thumbnailRelativePath: '/9/6/96015b29ca42f7106aca799a02038970.png',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 62,
        messageName: 'ddddd',
        messageText: '<p>dddd</p>',
        type: 3,
        images: '595',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 25,
        createdAt: '2021-06-18T20:20:55',
        createdBy: 91,
        updatedAt: '2021-09-16T18:00:15',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 595,
            originName: '1304667532.jpg',
            byteSize: '10825',
            relativePath: '/b/8/b8fda44d7acf227ae1639204baa66f5a.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: 'defb3c821096a82e3281bfc1fd313515',
            thumbnailId: 0,
            thumbnailRelativePath: '/b/8/b8fda44d7acf227ae1639204baa66f5a.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 61,
        messageName: 'asdfasdfa',
        messageText: '<p>sadfsdafsdafsdaf</p>',
        type: 1,
        images: '594',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 2,
        createdAt: '2021-06-18T20:14:30',
        createdBy: 91,
        updatedAt: '2021-06-19T15:48:39',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 594,
            originName: '1304667650.jpg',
            byteSize: '3802',
            relativePath: '/2/e/2e3a9e6b2b5055b20cf33fa11827b2b4.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '699ae08500c7d7f0e77c979ce52dfdc2',
            thumbnailId: 0,
            thumbnailRelativePath: '/2/e/2e3a9e6b2b5055b20cf33fa11827b2b4.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 59,
        messageName: 'asdfasf',
        messageText: '<p>asfasdfsdafasd</p>',
        type: 2,
        images: '582,584',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 15,
        createdAt: '2021-06-18T11:45:02',
        createdBy: 91,
        updatedAt: '2021-07-19T10:23:01',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 582,
            originName: '1304667387.jpg',
            byteSize: '9808',
            relativePath: '/1/8/18b576cc2791de68dde275c35edf9aef.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '2f7c465b6479c5cf30a7892baa918cb0',
            thumbnailId: 0,
            thumbnailRelativePath: '/1/8/18b576cc2791de68dde275c35edf9aef.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
          {
            id: 584,
            originName: '1.png',
            byteSize: '208015',
            relativePath: '/d/5/d5f60d626bb0af4f0c4e8ace593f2d8d.png',
            extensionName: '.png',
            fileType: 1,
            md5: 'e8251bb4be719d7f9011ed8a935c490f',
            thumbnailId: 0,
            thumbnailRelativePath: '/d/5/d5f60d626bb0af4f0c4e8ace593f2d8d.png',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 58,
        messageName: '神舟12号发射成功',
        messageText: '<p>神舟12号发射成功</p>',
        type: 2,
        images: '594',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 2,
        createdAt: '2021-06-17T11:54:09',
        createdBy: 91,
        updatedAt: '2021-07-08T15:51:14',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [
          {
            id: 594,
            originName: '1304667650.jpg',
            byteSize: '3802',
            relativePath: '/2/e/2e3a9e6b2b5055b20cf33fa11827b2b4.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '699ae08500c7d7f0e77c979ce52dfdc2',
            thumbnailId: 0,
            thumbnailRelativePath: '/2/e/2e3a9e6b2b5055b20cf33fa11827b2b4.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 56,
        messageName: '444444444',
        messageText: '<p>4444444444444</p>',
        type: 1,
        images: '',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 1,
        createdAt: '2021-06-17T10:30:56',
        createdBy: 91,
        updatedAt: '2021-06-17T18:22:48',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [],
        areaName: null,
      },
      {
        id: 53,
        messageName: '学习防疫医务工作者忘我工作精神',
        messageText: '<p>学习防疫医务工作者忘我工作精神</p>',
        type: 3,
        images: '',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 3,
        createdAt: '2021-06-16T19:25:01',
        createdBy: 91,
        updatedAt: '2021-07-27T17:29:42',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [],
        areaName: null,
      },
      {
        id: 51,
        messageName: '神舟12号发射',
        messageText: '<p>神舟12号发射</p>',
        type: 2,
        images: '',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 0,
        createdAt: '2021-06-16T18:46:24',
        createdBy: 91,
        updatedAt: '2021-06-16T18:46:24',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [],
        areaName: null,
      },
      {
        id: 50,
        messageName: '11111haaaahhhaaaaa',
        messageText: '<p>sdgfsdgsdfgsdf</p>',
        type: 4,
        images: '',
        status: 0,
        createdByDeptId: 0,
        areaId: 23,
        viewcnt: 23,
        createdAt: '2021-06-16T18:39:17',
        createdBy: 91,
        updatedAt: '2021-07-27T18:10:53',
        updatedBy: 91,
        isDeleted: 0,
        createdByDeptName: '田西村',
        createdByName: '夏先生',
        updatedByName: '夏先生',
        imageFiles: [],
        areaName: null,
      },
    ],
  };

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
