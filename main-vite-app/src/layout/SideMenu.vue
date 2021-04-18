<template>
  <div class="menu-container">
    <el-scrollbar
      class="scroll-wrap"
      :noresize="false"
      view-style="{ height: '100%' }"
    >
      <el-menu
        :default-active="activeMenu"
        unique-opened
        router
        background-color="#2c303b"
        text-color="#fff"
      >
        <div v-for="m in state.displayMenuTree" :key="m.id">
          <el-submenu :index="m.path" >
            <template #title>
              <i class="el-icon-location"></i>
              <span>{{ m.meta.title }}</span>
            </template>
            <el-menu-item
              style="border: 0;float:left;width:100%;"
              :index="sub.path"
              :key="sub.name"
              v-for="sub in m.children"
              >{{ sub.meta.title }}</el-menu-item
            >
          </el-submenu>
        </div>
      </el-menu>
    </el-scrollbar>
    <div class="version">V{{ state.version }}[2]</div>
  </div>
</template>
<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router'
  const state = reactive({
    displayMenuTree:[],
    version: ''
  })
  state.displayMenuTree = [
        {
          id: 1,
          path: '/form-app',
          name: 'form-app',
          meta: {
            title: 'form-app',
            hidden: false,
            permissions: 7
          },
          children: [
            {
              path: '/form-app/#/',
              name: 'form-app-dynamic',
              meta: {
                title: 'form-app-dynamic',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/form-app/#/form',
              name: 'aehyok-form',
              meta: {
                title: 'form',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/form-app/#/about',
              name: 'form-app-about',
              meta: {
                title: 'form-app-about',
                hidden: false,
                permissions: 10
              }
            }
          ]
        },
        {
          id:2,
          path: '/me-app',
          name: '/me-app',
          meta: {
            title: 'me-app',
            hidden: false,
            permissions: 7
          },
          children: [
            {
              path: '/editor',
              name: 'editor',
              meta: {
                title: 'wangeditor',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/me-app',
              name: 'me-app-dynamic',
              meta: {
                title: 'me-app-dynamic',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/me/about',
              name: 'me-app-about',
              meta: {
                title: 'me-app-about',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/ffmpeg',
              name: 'ffmpeg',
              meta: {
                title: 'ffmpeg',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/video',
              name: 'video',
              meta: {
                title: 'video',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/cesium',
              name: 'me-app-cesium',
              meta: {
                title: 'me-app-cesium',
                hidden: false,
                permissions: 10
              }
            }
          ]
        },
        {
          id: 3,
          path: '/table-app',
          name: 'table-app',
          meta: {
            title: 'table-app',
            hidden: false,
            permissions: 1543
          },
          children: [
            {
              path: '/table-app/#/',
              name: 'table-dynamic',
              meta: {
                title: 'table-dynamic',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/table-app/#/about',
              name: 'table-app-about',
              meta: {
                title: 'about',
                hidden: false,
                permissions: 10
              }
            }
          ]
        }
      ]
  const activeMenu = computed(() => {
      const route = useRoute()
      // console.log(route, 'this.$route');
      const { meta, path } = route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
    })
    onMounted(()=>{
      getVersion()
    })
    const getVersion = () => {
      const res = {
        code: 200,
        message: 'success',
        data: { code: '1.3.0.001', updateDate: '2020.10.20', description: '' }
      }
      state.version = res.data.code
    }
</script>
<style lang="scss" scoped>
.scroll-wrap {
  overflow: hidden;
  height: 100%;
  :deep(.el-scrollbar__view)  {
    position: relative;
  }
}
.menu-container {
  position: relative;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: #2c303b;
  :deep(.el-scrollbar__wrap)  {
    overflow-x: hidden;
  }
}
.version {
  color: #fff;
  width: 100%;
  text-align: center;
  color: #bcbcbc;
  flex: 0;
  line-height: 30px;
}
</style>
