<template>
  <div class="menu-container">
    <el-scrollbar class="scroll-wrap" :noresize="false" view-style="{ height: '100%' }">
      <el-menu
        :default-active="activeMenu"
        :unique-opened="true"
        router
        background-color="#2c303b"
        text-color="#fff"
      >
        <template v-for="m in displayMenuTree">
          <el-submenu :index="m.path">
            <template #title>
              <i class="el-icon-location"></i>
              <span>{{ m.source.title }}</span>
            </template>
            <el-menu-item
              style="border: 0; float: left; width: 100%"
              :index="sub.path"
              :key="sub.name"
              v-for="sub in m.children"
            >
              {{ sub.source.title }}
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-scrollbar>
    <div class="version">V{{ version }}[2]</div>
  </div>
</template>
<script lang="ts">
  import { nextTick } from 'process'
  import { reactive, computed, onMounted, defineComponent, toRefs, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useStore } from 'vuex'

  export default defineComponent({
    setup() {
      const store = useStore()
      const state = reactive({
        displayMenuTree: [],
        version: ''
      })
      // TODO watch store
      watch(
        () => store.state.headerMenu,
        (val, old) => {
          // nextTick(() => {
          state.displayMenuTree = store.state.menuList.filter(
            (item) => item.path === store.state.headerMenu
          )
          // })
          console.log(val, old, state.displayMenuTree, 'displayMenuTree')
        },
        {
          immediate: true,
          deep: true
        }
      )
      const activeMenu = computed(() => {
        const route = useRoute()
        console.log(route, 'this.$route')
        const meta = route.meta
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return ''
      })
      const getVersion = () => {
        const res = {
          code: 200,
          message: 'success',
          data: { code: '1.3.0.001', updateDate: '2020.10.20', description: '' }
        }
        state.version = res.data.code
      }
      onMounted(() => {
        getVersion()
      })
      return {
        ...toRefs(state),
        activeMenu
      }
    }
  })
</script>
<style lang="scss" scoped>
  .scroll-wrap {
    overflow: hidden;
    height: 100%;
    :deep(.el-scrollbar__view) {
      position: relative;
    }
  }
  .menu-container {
    position: relative;
    height: calc(100vh - 60px);
    display: flex;
    flex-direction: column;
    background: #2c303b;
    :deep(.el-scrollbar__wrap) {
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
