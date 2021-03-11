<template>
  <div id="app">
    <el-container style="height: 100vh;">
      <el-header class="app-header">
        <Header />
      </el-header>
      <el-container style="overflow: auto;">
        <el-aside style="box-shadow: 0 2px 10px #f1f1f1; width: 250px;">
          <SideMenu />
        </el-aside>
        <el-main class="layoutbox">
          <div  class="main-wrapper" style="position:relative; height:100%;">
            <router-view></router-view>
            <div id="mainwrapper"></div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Header from './layout/Header'
import SideMenu from './layout/SideMenu'

export default {
  components: {
    Header,
    SideMenu
  },
  data () {
    return {}
  }
}
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
.appContainer{
  background: #ccc;
  padding: 20px;
}
</style>
