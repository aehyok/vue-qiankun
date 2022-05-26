<template>
  <div class="app-header">
    <div class="app-header-left">
      <img :src="logoImage" alt="" />
      <span class="app-header-title">{{ systemInfo.title }}</span>
      <el-icon @click="collapseClick"><Fold /></el-icon>
    </div>
    <div class="header-right">
      <div class="common-right color" @click="backHome">返回主页</div>
      <div class="common-right">
        <el-dropdown @command="changeSystem">
          <span class="color" style="display: flex; align-items: center; justify-content: center">
            切换系统<el-icon><ArrowRight /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="child in childSystemList" :command="child" :key="child">{{
                child.title
              }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <div class="common-right">
        <img
          :src="avatorImage"
          alt=""
          style="width: 18.5pt; height: 18.5pt; padding-right: 5px; border-radius: 4px"
        />
        <el-dropdown @command="handleCommand">
          <span class="color" style="display: flex; align-items: center; justify-content: center">
            {{ userName }}
            <el-icon><ArrowRight /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="a">修改密码</el-dropdown-item>
              <el-dropdown-item command="c">版本信息</el-dropdown-item>
              <el-dropdown-item command="b">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <update-password v-model="updateDialogVisible" @cancel="close" />
    <Version v-model="versionDialogVisible" @cancel="closeVersion" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs, getCurrentInstance, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSystemMenu } from '@/store'
import { SystemInfo } from '../../types/models'
import { logout } from '../services'
import UpdatePassword from '../components/update-password.vue'
import Version from '../components/version.vue'
import { headerProp } from './headerProp'

export default defineComponent({
  name: 'Header',
  components: {
    UpdatePassword,
    Version
  },
  setup() {
    const { proxy } = getCurrentInstance()
    const router = useRouter()
    const store = useSystemMenu()
    let nickName: string = ''
    const json = localStorage.getItem('token')
    if (json != null) {
      nickName = JSON.parse(json).nickName
    }

    const collapseClick = () => {
      console.log('collapse')
    }
    const updateForm = ref(null)
    const state: headerProp = reactive({
      updateDialogVisible: false,
      logoImage: 'images/home/icon_logo.png',
      avatorImage: 'images/avator.png',
      userName: nickName,
      versionDialogVisible: false
    })

    state.systemInfo = store.currentSystem

    const childSystemList = store.systemList

    // 顶部切换系统
    const changeSystem = (item: SystemInfo) => {
      // store.commit('changeSystem', item.systemId)
      store.changeSystem(item.systemId)
      state.systemInfo = item
      router.push(item.path)
      console.log(store.systemId, 'store.systemId')
    }

    // 返回主页
    const backHome = () => {
      router.push('/home')
    }

    // const headList = store.headerMenuList

    // 退出登录
    const loginOutApi = async () => {
      logout().then((res: any) => {
        if (res.code === 200) {
          localStorage.clear()
          router.push('/login')
        }
      })
    }

    // 退出二次确认框
    const checkLoginOut = () => {
      proxy
        .$confirm('请问是否退出登录?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          loginOutApi()
        })
        .catch(() => {
          return false
        })
    }

    const handleCommand = (command: any) => {
      if (command === 'a') {
        state.updateDialogVisible = true
      } else if (command === 'c') {
        state.versionDialogVisible = true
      } else {
        checkLoginOut()
      }
    }

    const close = () => {
      state.updateDialogVisible = false
    }

    const closeVersion = () => {
      state.versionDialogVisible = false
    }

    const selectMenu = (e: any) => {
      store.commit('header', e)
    }

    watch(
      () => store.currentSystem,
      (newValue) => {
        state.systemInfo = newValue
      },
      {
        // immediate: true,
        deep: true
      }
    )

    return {
      ...toRefs(state),
      childSystemList,
      changeSystem,
      backHome,
      close,
      closeVersion,
      checkLoginOut,
      handleCommand,
      selectMenu,
      // headList,
      updateForm,
      collapseClick
    }
  }
})
</script>
<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  height: 60px;
  &-left {
    display: flex;
    align-items: center;
    line-height: 40px;
    color: #fff;
    font-size: 18px;
    img {
      width: 30px;
      height: 30px;
    }
  }
  &-title {
    margin-left: 10px;
  }
  .header-right {
    display: flex;
    line-height: 60px;
    .common-right {
      margin-left: 45px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .color {
      font-size: 14px;
      color: #fff;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
  }
}
:deep(.el-icon svg) {
  height: 3em;
  width: 3em;
}
.app-header-title {
  padding-right: 10px;
}
</style>
