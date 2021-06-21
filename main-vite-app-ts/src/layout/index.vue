<template>
  <el-container style="height: 100vh">
    <el-header class="app-header">
      <Header />
    </el-header>
    <el-container style="overflow: auto">
      <el-aside style="box-shadow: 0 2px 10px #f1f1f1; width: 250px" v-if="showLeft">
        <side-menu />
      </el-aside>
      <el-main class="layoutbox">
        <div class="main-wrapper" style="position: relative; height: 100%">
          <router-view v-show="main"></router-view>
          <div id="mainwrapper"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script lang="ts">
  import { defineComponent, watch, reactive, toRefs ,defineAsyncComponent, onMounted} from 'vue';
  import { start } from "qiankun"
  import { useStore } from "vuex"
  import { useRoute } from 'vue-router'
  export default defineComponent({
    name:'Layout',
    components: {
      Header: defineAsyncComponent(() => import("./header.vue")),
      SideMenu: defineAsyncComponent(() => import("./side-menu.vue")),
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const state = reactive({
          showLeft: false, // 暂时为true则不显示左侧菜单
          main: false // 是否为主应用的菜单
        })

      onMounted(()=> {
        console.log('start loading')
        start({
          prefetch: 'all',
          sandbox: {
            // strictStyleIsolation: true,
            experimentalStyleIsolation: true
          }
        })
      })

       // 监测路由判断是主应用路由还是子应用路由
       watch(
        () => route.path,
        () => {
          state.showLeft = (route.query.pageType !=="1")  // 等于1 传递此参数代表不需要显示左侧菜单
          state.main = route.meta.main ? true : false
        },
        {
          immediate: true
        }
      )  
      // 监测左侧菜单是否展示
      watch(
        () => store.state.systemId,
        (newValue) => {
          if (newValue) {
            const menu = store.state.menuList.find((item) => item.path === newValue)
            if(menu && menu.source){
              state.showLeft = menu.source.showLeft
            }
          }
        },
        {
           immediate: true
        })
      return {
        ...toRefs(state)
      }  
    }
  })
</script>
<style lang="scss" scoped>
  .app-header {
    // background: $theme-color;
    background: #093A9B;
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
