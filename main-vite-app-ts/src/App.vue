<template>
  <el-container style="height: 100vh" v-if="showLayout">
    <el-header class="app-header">
      <Header />
    </el-header>
    <el-container style="overflow: auto">
      <el-aside style="box-shadow: 0 2px 10px #f1f1f1; width: 250px" v-if="!showLeft">
        <side-menu />
      </el-aside>
      <el-main class="layoutbox">
        <div class="main-wrapper" style="position: relative; height: 100%">
          <router-view v-show="main"></router-view>
          <div id="mainwrapper" v-show="!main"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
  <router-view v-if="!showLayout" />
</template>
<script lang="ts">
  import { defineComponent, watch, reactive, toRefs } from "vue"
  import Header from "./layout/header.vue"
  import SideMenu from "./layout/side-menu.vue"
  import { useRoute } from "vue-router"
  import { useStore } from "vuex"

  export default defineComponent({
    name: "App",
    components: {
      Header,
      SideMenu
    },
    setup() {
      const route = useRoute()
      const store = useStore()
      const state = reactive({
        showLayout: true,
        showLeft: true, // 暂时为true则不显示左侧菜单
        main: false // 是否为主应用的菜单
      })
      // 监测路由判断是主应用路由还是子应用路由
      watch(
        () => route.path,
        (newValue, oldValue) => {
          route.path.includes("login") ? (state.showLayout = false) : (state.showLayout = true)
          console.log(newValue, oldValue, route, "App.path")
          state.main = route.meta.main ? true : false
        },
        {
          immediate: true
        }
      )

      // 监测左侧菜单是否展示
      watch(
        () => store.state.headerMenu,
        (newValue) => {
          if (newValue) {
            const menu = store.state.menuList.find((item) => item.path === newValue)
            console.log(menu.source.showLeft)
            state.showLeft = menu.source.showLeft
          }
        },
        {
          immediate: true,
          deep: true
        }
      )
      return {
        ...toRefs(state)
      }
    }
  })
</script>
<style lang="scss" scoped>
  .app-header {
    background: $theme-color;
  }
  .layoutbox {
    &::-webkit-scrollbar {
      height: 12px;
    }
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  .appContainer {
    background: #ccc;
    padding: 20px;
  }
</style>
