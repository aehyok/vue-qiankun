<template>
  <div class="qrcode-panel">
    <div class="head">
      <div class="title">博客列表</div>
      <div class="more" @click="goto">更多<img src="/images/newslist/btn_more.png" /></div>
    </div>
    <div class="main">
      <van-list
        v-model="state.loading"
        :finished="state.finished"
        :offset="state.offset"
        finished-text="暂无更多"
        :immediate-check="false"
        @load="load"
      >
        <!-- @load="getData" -->
        <div
          class="flex"
          v-for="(item, index) in list.docs"
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
      </van-list>
      <van-empty description="没有数据" v-if="state.nodata" />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { List as VanList, Empty as VanEmpty } from 'vant';
  const state = reactive({
    Datalist: [],
    page: 1,
    limit: 15,
    total: 0,
    offset: 5, // 滚动条与底部距离小于 offset 时触发load事件
    loading: false, // 上拉加载
    finished: false, // 上拉加载完毕
    nodata: false,
  });
  const router = useRouter();
  const goto = () => {
    console.log(`/news`);
    router.push('/news');
  };

  const load = () => {};
  const goDetails = (item: any) => {
    console.log(item);
  };
  const list = {
    docs: [
      {
        id: 693,
        messageName: '20211027发布',
        messageText: '<p>内容详情</p>',
        type: 2,
        images: '2837',
        status: 0,
        createdByDeptId: 0,
        areaId: 15,
        viewcnt: 2,
        createdAt: '2021-10-27T14:50:54',
        createdBy: 465,
        updatedAt: '2021-11-06T10:40:17',
        updatedBy: 465,
        isDeleted: 0,
        createdByDeptName: '五泉镇村',
        createdByName: '李小红',
        updatedByName: '李小红',
        imageFiles: [
          {
            id: 2837,
            originName: '城市风3.jpg',
            byteSize: '87121',
            relativePath: '/e/e/ee086b07d686a5f689184837481ec9e1.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '7219b83e9967c5137f6e3ebed33deedc',
            thumbnailId: 0,
            thumbnailRelativePath: '/e/e/ee086b07d686a5f689184837481ec9e1.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
            thumbnailUrl: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 683,
        messageName: '2021-10-20',
        messageText: '<p>2021-10-20</p>',
        type: 1,
        images: '',
        status: 0,
        createdByDeptId: 0,
        areaId: 15,
        viewcnt: 2,
        createdAt: '2021-10-20T11:19:15',
        createdBy: 465,
        updatedAt: '2021-10-28T10:44:27',
        updatedBy: 465,
        isDeleted: 0,
        createdByDeptName: '五泉镇村',
        createdByName: '李小红',
        updatedByName: '李小红',
        imageFiles: [],
        areaName: null,
      },
      {
        id: 477,
        messageName: '便民信息',
        messageText: '<p>内容详情</p>',
        type: 4,
        images: '2193',
        status: 0,
        createdByDeptId: 0,
        areaId: 15,
        viewcnt: 0,
        createdAt: '2021-09-23T14:44:13',
        createdBy: 465,
        updatedAt: '2021-09-23T14:44:13',
        updatedBy: 465,
        isDeleted: 0,
        createdByDeptName: '五泉镇村',
        createdByName: '李小红',
        updatedByName: '李小红',
        imageFiles: [
          {
            id: 2193,
            originName: '杭州景点4.jpg',
            byteSize: '383338',
            relativePath: '/8/c/8ceda5f6523d43917e3feff0df2a228f.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: 'c0099dd579eb2edd5ef0c8dcf4144f91',
            thumbnailId: 0,
            thumbnailRelativePath: '/8/c/8ceda5f6523d43917e3feff0df2a228f.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
            thumbnailUrl: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 475,
        messageName: '精神文明',
        messageText: '<p>内容详情</p>',
        type: 3,
        images: '2191',
        status: 0,
        createdByDeptId: 0,
        areaId: 15,
        viewcnt: 1,
        createdAt: '2021-09-23T14:43:40',
        createdBy: 465,
        updatedAt: '2021-10-13T10:05:01',
        updatedBy: 465,
        isDeleted: 0,
        createdByDeptName: '五泉镇村',
        createdByName: '李小红',
        updatedByName: '李小红',
        imageFiles: [
          {
            id: 2191,
            originName: '杭州景点2.jpg',
            byteSize: '612389',
            relativePath: '/b/e/beca5793339c9bfe1fba64f485325d8a.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '4e0ab032dda4fd40fa61c8682940c55a',
            thumbnailId: 0,
            thumbnailRelativePath: '/b/e/beca5793339c9bfe1fba64f485325d8a.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
            thumbnailUrl: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 473,
        messageName: '党建宣传',
        messageText: '<p>内容详情</p>',
        type: 2,
        images: '2189',
        status: 0,
        createdByDeptId: 0,
        areaId: 15,
        viewcnt: 0,
        createdAt: '2021-09-23T14:43:19',
        createdBy: 465,
        updatedAt: '2021-09-23T14:43:19',
        updatedBy: 465,
        isDeleted: 0,
        createdByDeptName: '五泉镇村',
        createdByName: '李小红',
        updatedByName: '李小红',
        imageFiles: [
          {
            id: 2189,
            originName: '城市风1.jpg',
            byteSize: '54857',
            relativePath: '/5/2/5233503c33623af2ff1c635cf24b8a4e.jpg',
            extensionName: '.jpg',
            fileType: 1,
            md5: '9e205aab50bbea7a87481746afb2eb2f',
            thumbnailId: 0,
            thumbnailRelativePath: '/5/2/5233503c33623af2ff1c635cf24b8a4e.jpg',
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
            thumbnailUrl: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
      {
        id: 471,
        messageName: '三务公开',
        messageText: '<p>内容详情</p>',
        type: 1,
        images: '2187',
        status: 0,
        createdByDeptId: 0,
        areaId: 15,
        viewcnt: 0,
        createdAt: '2021-09-23T14:43:01',
        createdBy: 465,
        updatedAt: '2021-09-23T14:43:01',
        updatedBy: 465,
        isDeleted: 0,
        createdByDeptName: '五泉镇村',
        createdByName: '李小红',
        updatedByName: '李小红',
        imageFiles: [
          {
            id: 2187,
            originName: '标准图.jpg',
            byteSize: '507355',
            extensionName: '.jpg',
            thumbnailId: 0,
            used: false,
            isMaterial: false,
            url: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
            thumbnailUrl: 'http://vue.tuokecat.com/cdn/h5/newslist.jpg',
          },
        ],
        areaName: null,
      },
    ],
  };
</script>

<style lang="scss" scoped>
  .qrcode-panel {
    // padding-bottom: 10px;
    margin-top: 10px;
    background: #fff;
    padding: 10px;
    border-radius: 8px;
    .head {
      margin-bottom: 1px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin: 10px 0;
    }
    .title {
      font-size: 18px;
      font-weight: 700;
      color: #2c2d2e;
      line-height: 4.33333vw;
      border-bottom: 8px solid rgba(0, 145, 255, 0.3);
    }
    .more {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      cursor: pointer;
      height: 20px;
      line-height: 20px;
      img {
        margin-bottom: -3px;
      }
    }
    .main {
      .flex {
        display: flex;
        border-bottom: 1px solid #e5e7eb;
        .itemCollagen {
          width: 100%;
        }
        .itemCollagenSeventy {
          width: 78%;
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
          }
          span {
            font-weight: 400;
            color: #909399;
            font-size: 12px;
            line-height: 23px;
          }
        }
        div:nth-child(2) {
          width: 22%;
          margin: 10px;
          margin-left: 0;
          margin-top: 3.2vw;
          img {
            width: 17vw;
            height: 17vw;
            border-radius: 6px;
          }
        }
      }
    }
  }
  .createdByDeptName {
    display: inline-block;
    margin-bottom: 25px;
    margin-right: 10px;
    font-size: 11px;
  }
</style>
