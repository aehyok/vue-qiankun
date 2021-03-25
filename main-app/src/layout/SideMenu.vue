<template>
  <div class="menu-container">
    <el-scrollbar
      class="scroll-wrap"
      :noresize="false"
      :view-style="{ height: '100%' }"
    >
      <el-menu
        :default-active="activeMenu"
        unique-opened
        router
        background-color="#2c303b"
        text-color="#fff"
        style="border: 0;float:left;width:100%;"
      >
        <template v-for="m in displayMenuTree">
          <el-menu-item
            :index="m.path"
            :key="m.name"
            v-if="!m.children || !m.children.length"
            >{{ m.meta.title }}</el-menu-item
          >
          <el-submenu :index="m.path" v-else :key="m.name">
            <span style="border: 0;float:left;"  slot="title">{{ m.meta.title }}</span>
            <el-menu-item
              style="border: 0;float:left;width:100%;"
              :index="sub.path"
              :key="sub.name"
              v-for="sub in m.children"
              >{{ sub.meta.title }}</el-menu-item
            >
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
    <div class="version">V{{ version }}[2]</div>
  </div>
</template>
<script>
// import { getVersion } from '@/services'
// import { mapGetters, mapState } from 'vuex'
export default {
  data () {
    return {
      menuList: [],
      version: '',
      displayMenuTree: [
        {
          path: '/form-app',
          name: 'form-app',
          meta: {
            title: 'form-app',
            hidden: false,
            permissions: 7
          },
          children: [
            {
              path: '/form-app',
              name: 'form-app-dynamic',
              meta: {
                title: 'form-app-dynamic',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/form-app/about',
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
          path: '/me-app',
          name: '/me-app',
          meta: {
            title: 'me-app',
            hidden: false,
            permissions: 7
          },
          children: [
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
            }
          ]
        },
        {
          path: '/table-app',
          name: 'table-app',
          meta: {
            title: 'table-app',
            hidden: false,
            permissions: 1543
          },
          children: [
            {
              path: '/table-app',
              name: 'table-dynamic',
              meta: {
                title: 'table-dynamic',
                hidden: false,
                permissions: 10
              }
            },
            {
              path: '/table-app/about',
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
    }
  },
  computed: {
    // ...mapState('permission', ['leftMenus']),
    activeMenu () {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  created () {
    this.getVersion()
  },
  methods: {
    async getVersion () {
      const res = {
        code: 200,
        message: 'success',
        data: { code: '1.3.0.001', updateDate: '2020.10.20', description: '' }
      }
      // await getVersion()
      this.version = res.data.code
    }
  }
}
</script>
<style lang="scss" scoped>
.scroll-wrap {
  overflow: hidden;
  height: 100%;
  ::v-deep .el-scrollbar__view {
    position: relative;
  }
}

.menu-container {
  position: relative;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  background: #2c303b;

  ::v-deep .el-scrollbar__wrap {
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
