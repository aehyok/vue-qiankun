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
        style="border: 0;"
      >
        <template v-for="m in displayMenuTree">
          <el-menu-item
            :index="m.path"
            :key="m.name"
            v-if="!m.children || !m.children.length"
            >{{ m.meta.title }}</el-menu-item
          >
          <el-submenu :index="m.path" v-else :key="m.name">
            <span slot="title">{{ m.meta.title }}</span>
            <el-menu-item
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
import { mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      menuList: [],
      version: '',
    }
  },
  computed: {
    ...mapGetters('permission', ['displayMenuTree']),
    ...mapState('permission', ['leftMenus']),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
  },
  created() {
    this.getVersion()
  },
  methods: {
    async getVersion() {
      const res = {
        code: 200,
        message: 'success',
        data: { code: '1.3.0.001', updateDate: '2020.10.20', description: '' },
      }
      // await getVersion()
      this.version = res.data.code
    },
  },
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
