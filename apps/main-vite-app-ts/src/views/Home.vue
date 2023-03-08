<template>
  <div class="main">
    <!-- 顶部 -->
    <div class="header">
      <div class="header-left">
        <img :src="headerSetting.logoUrl" class="login-image" @click="homeClick" />
        <div class="left-title">aehyok</div>
      </div>
      <div class="right-center">
        <template v-for="(item, index) in modeuleList" :key="index">
          <div
            @click="jumpChildSystem(item)"
            class="module-system"
            :class="item.systemId == activeModule ? 'active-module' : ''"
            @mouseover="activeModule = item.systemId"
            @mouseleave="activeModule = ''"
          >
            <img :src="item.systemId == activeModule ? item.selected : item.normal" />
          </div>
        </template>
      </div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <!-- 详情 -->
      <chat />
    </div>
    <UpdatePassword v-model="updateDialogVisible" @cancel="close" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, getCurrentInstance, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemMenu } from '@/store'
import { formSave } from '../services'
import Chat from './chat/index.vue'
import UpdatePassword from '../components/update-password.vue'

function useModuleSetting(router: any, store: any, proxy: any) {
  const modeuleList = reactive(store.systemList)
  const jumpChildSystem = (child: any) => {
    // console.log(child, 'jumpChildSystem')
    // store.commit('changeSystem', child.systemId)
    store.changeSystem(child.systemId)
    if (child.path) {
      router.push(child.path)
    } else {
      proxy.$alert('请联系管理员，配置相关子系统！')
    }
  }
  return {
    modeuleList,
    jumpChildSystem
  }
}

// install Swiper modules
export default defineComponent({
  components: {
    UpdatePassword,
    Chat
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const store = useSystemMenu()
    const state = reactive({
      showHome: true,
      updateDialogVisible: false,
      headerSetting: {
        // 顶部导航
        logoUrl: 'images/home/icon_logo.png',
        hornUrl: 'images/home/icon_horn.png'
      },
      activeModule: '' // 系统模块
    })
    // 获取下拉框数据
    const getTreeData = async () => {}
    // 模块列表
    // eslint-disable-next-line no-use-before-define
    const { modeuleList, jumpChildSystem } = useModuleSetting(router, store, proxy)

    onMounted(() => {
      getTreeData()
    })

    const close = () => {
      console.log('close')
    }
    const homeClick = () => {
      formSave({
        FormId: 'aehyok',
        data: {
          name: 'aehyok',
          age: 11,
          type: 2
        }
      }).then((res: any) => {
        console.log(res, 'res----res----res')
      })
    }
    return {
      ...toRefs(state),
      modeuleList,
      jumpChildSystem,
      homeClick,
      close
    }
  }
})
</script>
<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}
.header {
  background-color: #0e0e1a;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  color: #fff;
  img {
    // width: 76px;
    // height: 76px;
  }
  .header-left {
    display: flex;
    align-items: center;
  }
  .left-title {
    color: white;
    margin-left: 18px;
    font-size: 24px;
    font-weight: bold;
  }

  .right-center {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
  }

  .login-image {
    width: 116px;
    height: 36px;
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
      display: flex;
      margin-right: 15px;
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
        background: url('../images/home/meinfo.png');
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
