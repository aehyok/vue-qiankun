<template>
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
          <div id="mainwrapper"><router-view></router-view></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Header from './Header'
import SideMenu from './SideMenu'

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
</style>
