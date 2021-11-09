<!--通知公告详情-->
<template>
  <div class="detail">
    <van-nav-bar title="详情" left-text="" left-arrow fixed placeholder @click-left="goBack" />
    <div class="content">
      <div class="con-top">
        <div class="title-top">{{ objData.messageName }}</div>
        <div class="sub">
          <span>{{ objData.createdByDeptName }}</span>
          <span>&nbsp;&nbsp;{{ objData.createdAt }}</span>
        </div>
      </div>
      <van-divider />
      <div class="info-middle">
        <div v-html="objData.messageText" class="text"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { format } from 'date-fns';
  import { onMounted, reactive } from 'vue';
  import { NavBar as VanNavBar, Divider as VanDivider } from 'vant';
  import { useRouter } from 'vue-router';
  console.log('detail');
  const timer = (val) => {
    return format(new Date(val), 'yyyy-MM-dd HH:mm:ss');
  };

  const router = useRouter();
  const goBack = () => {
    console.log('goBack--');
    router.push('/news-list');
  };

  const objData = reactive({
    id: 54,
    messageName: '绵绵秋雨中，他们默默筑起“安全堤”',
    messageText:
      '<p>国庆假期</p ><p>大多数人都选择与家人团聚</p ><p>或走亲访友</p ><p>或外出旅游</p ><p>但有这么一群人</p ><p>依然默默地坚守在防汛一线</p ><p>全力保障人民群众生命和财产安全</p ><p>10月5日，秋雨绵绵，记者来到杨陵区下川口村附近，受持续强降雨影响，连接杨凌与武功的南店桥已经坍塌，周围也拉起了警戒线，目前已无法正常通行。&nbsp;</p ><p><img src="https://dvs-yangling.sunlight-tech.com/sundfs/f/0/f05a4c6029b6df9677ebb7a0cbfa5a23.png" style="max-width:100%;" contenteditable="false"/></p ><p>“你看，上一次来，还不是很严重，这次桥都悬空了，你看这边上行道树都连根拔起了！”正在现场和同事进行防汛排查工作的杨陵区水务局工作人员王科宁指着桥梁说。&nbsp; &nbsp;</p ><p>王科宁告诉记者，受持续强降雨影响，漆水河柴家咀桥、南店桥接连出现57立方米/秒的流量，为切实做好各项防御工作，确保广大群众生命和财产安全，自9月30号开始，杨陵区水务局工作人员全部放弃休假，全身心地投入到4座危险地段桥梁的防汛一线。</p ><p>杨凌渭河景区工作人员王浩告诉记者：“我们这监控室是全天候24小时值班，要通过在园区内的75个摄像头随时观察水位变化和安全隐患，确保汛期河道和景区安全。”<br/></p ><p>“此次强降雨，我们景区共安排了26名安保人员，24小时轮流值班，过去我们一天巡逻8次，现在每天巡逻15次，在6.8公里的景区内，几乎每小时巡查一次，及时观察防汛水面水情，制止游客靠近水面，及时避免发生安全事故。”刘小波说。<br/></p ><p><img src="https://dvs-yangling.sunlight-tech.com/sundfs/b/3/b3c6a7d2215ea358e66664335490f211.png" style="max-width:100%;" contenteditable="false"/></p >',
    type: 3,
    images: '',
    status: 0,
    createdByDeptId: 0,
    areaId: 8,
    viewcnt: 23,
    createdAt: timer('2021-10-08T17:33:57'),
    createdBy: 24,
    updatedAt: '2021-11-09T13:53:42',
    updatedBy: 24,
    isDeleted: 0,
    createdByDeptName: '田西村',
    createdByName: '凯文',
    updatedByName: '凯文',
    imageFiles: [],
    areaName: null,
  });
  onMounted(() => {
    console.log('ss-dd-cc');
  });
</script>

<style lang="scss" scoped>
  // .detail {
  //   background: #ebedf0;
  // }
  .content {
    min-height: calc(100vh - 12.26667vw);
    padding: 3.2vw 4vw 28vw;
    box-sizing: border-box;
    font-size: 3.6vw;
    position: relative;
    .con-top {
      line-height: 7.2vw;
      text-align: left;
      margin-bottom: 1.5vw;
      .title-top {
        font-size: 4.2vw;
        font-weight: 700;
      }
      .sub {
        color: #d9d9d9;
      }
    }
    .info-middle {
      overflow: hidden;
      .img {
        width: 100vw;
      }
      .text {
        ::v-deep p {
          margin: 0;
        }
      }
    }
  }
  .bottom-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 5vw 5%;
    box-sizing: border-box;
    .btn {
      width: 47%;
      height: 10vw;
      margin-right: 6%;
      border-radius: 1.6vw;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
</style>
