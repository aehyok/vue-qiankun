<template>
  <div class="main">
    <!-- 顶部 -->
    <div class="header">
      <div class="header-left">
        <img :src="headerSetting.logoUrl" />
        <div class="left-title">qiankun综合服务平台</div>
      </div>
      <div class="right-notice">
        <img :src="headerSetting.hornUrl" class="new-img" />
        <div class="new-con">
          <el-carousel
            height="36px"
            direction="vertical"
            :autoplay="true"
            indicator-position="none"
          >
            <el-carousel-item
              v-for="item in newList"
              :key="item"
              class="carousel-class"
              @click="goNewinfo(item.id)"
            >
              <div class="top-title">{{ item.title }}</div>
              <div>{{ item.createdAt.split(" ")[0] }}</div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <div class="con-top">
        <!-- indicator-position="outside" -->
        <el-carousel height="420px">
          <el-carousel-item v-for="item in swiperImageList" :key="item">
            <img :src="item" class="con-top-img" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 子系统模块 -->
      <div class="system" v-if="showHome">
        <swiper class="mySwiper" :slidesPerView="5" :navigation="true">
          <swiper-slide v-for="(item, index) in modeuleList" :key="index">
            <div
              @click="jumpChildSystem(item)"
              class="module-system"
              :class="item.systemId == activeModule ? 'active-module' : ''"
              @mouseover="activeModule = item.systemId"
              @mouseleave="activeModule = ''"
            >
              <img :src="item.systemId == activeModule ? item.selected : item.normal" />
              <div class="module-title">{{ item.title }}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
      <!-- 详情 -->
    </div>
    <UpdatePassword v-model="updateDialogVisible" @cancel="close" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted } from "vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import "swiper/swiper.scss"
import "swiper/components/pagination/pagination.min.css"
import "swiper/components/navigation/navigation.min.css"
import { useRouter } from "vue-router"
import { useStore } from "vuex"
import { logout } from "../services"
import UpdatePassword from "../components/update-password.vue"
import SwiperCore, { Pagination, Navigation } from "swiper/core"
// install Swiper modules
SwiperCore.use([Pagination, Navigation])
export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    UpdatePassword
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      showHome: true,
      updateDialogVisible: false,
      avator: "images/home/icon-avator.png",
      nickName: JSON.parse(localStorage.getItem("token") || "{}").nickName, // 账户名称
      newList: [], // 顶部消息列表
      swiperCenterImage: "images/home/swiper-title.png",
      closeImage: "images/home/close.png",
      swiperImageList: [
        // 轮播图片列表
        "images/home/banner-01.png"
        // "images/home/banner-02.png",
        // "images/home/banner-03.png"
      ],
      introduceList: [
        // 轮播图片列表
        "images/home/introduce-01.png"
      ],
      headerSetting: {
        // 顶部导航
        logoUrl: "images/home/icon_logo.png",
        hornUrl: "images/home/icon_horn.png"
      },
      activeModule: "", // 系统模块
      treeData: {},
      area: "", // 区域
      areaOptions: [], // 区域数据
      town: "", // 镇
      townOptions: [], // 镇数据
      village: "", // 村
      villageOptions: [], // 村数据
      echartsNum: 0,
      chartsData1: [], // 人口概况 男女比例
      chartsData2: [], // 人口概况 人口类型
      chartsData3: [], // 农村居民平均年收入
      chartsData4: [], // 乡村治理荣誉
      chartsData5: [], // 随手拍事件分类统计
      chartsData6: [], // 随手拍办理情况统计
      chartsData7: [], // 外出务工情况
      chartsData8: [], // 农作物占耕地统计
      chartsData9: [], // 乡村治理居民参与情况 男女
      chartsData10: [] // 乡村治理居民参与情况 年龄段
    })
    // 获取下拉框数据
    const getTreeData = async () => {}
    // 模块列表
    const { modeuleList, jumpChildSystem } = useModuleSetting(router, store, proxy)
    const updatePasswordClick = () => {
      // console.log('updatePassword')
      state.updateDialogVisible = true
    }
    // 获取echart数据
    const getChartData = () => {
      state.echartsNum++
    }
    onMounted(() => {
      getTreeData()
      getNews()
    })
    // 获取顶部的消息滚动
    const getNews = async () => {}
    // // 查看详情
    const goInfo = () => {
      state.showHome = false
      window.scroll(0, 0)
    }
    const close = () => {
      state.updateDialogVisible = false
    }
    // echarts 统计报表
    const { logoutClick } = useEchartsSetting(proxy, router)
    return {
      ...toRefs(state),
      logoutClick,
      modeuleList,
      jumpChildSystem,
      updatePasswordClick,
      goInfo,
      getTreeData,
      getChartData,
      close
    }
  }
})

function useModuleSetting(router: any, store: any, proxy: any) {
  const modeuleList = reactive(store.state.systemList)
  const jumpChildSystem = (child: any) => {
    // console.log(child, 'jumpChildSystem')
    store.commit("changeSystem", child.systemId)
    if (child.path) {
      router.push(child.path)
    } else {
      proxy.$alert("请联系管理员，配置相关子系统！")
    }
  }
  return {
    modeuleList,
    jumpChildSystem
  }
}

function useEchartsSetting(proxy: any, router: any) {
  const logoutClick = () => {
    proxy
      .$confirm("请问是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        logout().then((res: any) => {
          console.log("登出成功", res)
          localStorage.clear()
          router.push("/login")
        })
      })
      .catch(() => {
        return false
      })
  }
  return {
    logoutClick
  }
}
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
.header {
  width: 1280px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
  line-height: 40px;
  color: #fff;
  margin: 10px auto;
  img {
    width: 76px;
    height: 76px;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .left-title {
    color: #666;
    margin-left: 18px;
    font-size: 28px;
    font-weight: bold;
  }
  // 顶部消息样式
  .right-notice {
    display: flex;
    align-items: center;
    width: 460px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #666666;
    background: rgba(204, 204, 204, 0.2);
    border-radius: 16px;
    .new-img {
      width: 20px;
      height: 20px;
      margin: 0 6px 0 8px;
    }
    .new-con {
      flex: 1;
      .carousel-class {
        display: flex;
        cursor: pointer;
        .top-title {
          width: 336px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
// 内容样式
.content {
  .con-top {
    position: relative;
    width: 100%;
    margin: 0 auto;
    .banner-center {
      width: 459px;
      height: 71px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 99;
    }
  }
  .con-top-img {
    width: 100%;
    height: 100%;
  }
  .system {
    background: #2f48b8;
    .mySwiper {
      width: 1280px;
      padding: 0 40px 0 0;
      box-sizing: border-box;
    }
    :deep(.swiper-button-prev) {
      left: 0;
    }
    :deep(.swiper-button-next) {
      right: 0;
    }
    .module-system {
      width: 206px;
      height: 116px;
      border-radius: 6px;
      color: #fff;
      background: #486bec;
      margin: 36px 42px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        align-items: center;
        width: 60px;
        height: 60px;
      }
    }
    .module-system:hover {
      background: #f7b500;
    }
  }
}
.echarts {
  background-color: #102585;
  .center {
    margin: 0 auto;
    width: 1200px;
    padding: 30px 0 100px;
    display: flex;
    color: #fff;
    .left {
      flex: 2;
      margin-right: 16px;
      .select-div {
        background: #2f48b8;
        padding: 10px;
        border-radius: 3px;
        .select-btn {
          background-color: #f7b500;
          border-color: #f7b500;
        }
        .select-btn1 {
          background-color: rgba(255, 255, 255, 0);
          border-color: #f7b500;
          color: #f7b500;
        }
      }
      .select {
        margin-left: 10px;
        width: 156px;
      }
    }
    .right {
      flex: 1;
      .me-info {
        display: flex;
        align-items: center;
        background: url("../images/home/meinfo.png");
        background-size: 100% 100%;
        .me-avator {
          margin: 20px;
          .me-avator-img {
            width: 60px;
            height: 60px;
          }
        }
        .me-name {
          flex: 1;
        }
      }
      .intro {
        margin-top: 12px;
        padding: 0 16px 16px;
        box-sizing: border-box;
        background: #2f48b8;
        color: #fff;
        border-radius: 6px;
        &-title {
          padding: 16px 0 6px;
          color: #506ffe;
          font-weight: 700;
          font-size: 18px;
        }
        &-content {
          font-size: 14px;
          line-height: 28px;
          margin: 16px 0 26px;
          font-family: PingFang-SC-Medium, PingFang-SC;
        }
        &-button {
          text-align: center;
          margin-bottom: 30px;
        }
      }
    }
  }
}
:deep(.el-carousel__indicators--outside) {
  background-color: #102585;
}
.leftecharts {
  width: 100%;
  background: #102585;
  color: white;
}
:deep(.select .el-input__inner) {
  background: #4b68ec;
  color: #fff;
  height: 36px;
  border: none;
}
.select:nth-child(3) {
  padding-right: 10px;
}
// 详情样式
.info-class {
  background: #102585;
  padding-bottom: 20px;
  .info {
    width: 1080px;
    background: #2f48b8;
    position: relative;
    margin: 0 auto;
    color: #fff;
    padding: 0 20px 10px;
    border-radius: 6px;
    font-size: 14px;
    .info-close-img {
      position: absolute;
      top: 6px;
      right: 6px;
      cursor: pointer;
    }
    .info-list {
      margin-bottom: 16px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.7);
    }
    .sub-title {
      font-weight: 700;
      margin-right: 20px;
      color: #fff;
    }
    .info-title {
      text-align: center;
      font-size: 20px;
      line-height: 70px;
    }
  }
}
</style>
