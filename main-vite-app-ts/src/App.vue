<template>
  <el-container style="height: 100vh" v-if="showLayout">
    <el-header class="app-header">
      <Header />
    </el-header>
    <el-container style="overflow: auto">
      <el-aside style="box-shadow: 0 2px 10px #f1f1f1; width: 250px">
        <SideMenu />
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
  import { defineComponent, watch, nextTick, reactive, toRefs } from "vue"
  import Header from "./layout/Header.vue"
  import SideMenu from "./layout/SideMenu.vue"
  import { useRoute } from "vue-router"

  export default defineComponent({
    name: "App",
    components: {
      Header,
      SideMenu
    },
    setup() {
      const route = useRoute()
      const state = reactive({
        showLayout: true,
        main: false // 是否为主应用的菜单
      })
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
