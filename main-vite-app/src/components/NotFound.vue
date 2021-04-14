<template>
  <div class="not-found">
    <h1>404 not found!</h1>
    <el-button @click="backHome">返回首页</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods:{
    backHome(){
      console.log(this.$route, 'displayMenuTree')
      try
      {
        this.$router.push({})
      }
      catch {
        this.$router.push({ name: 'login' })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.not-found {
  text-align: center;
  h1 {
    font-size: 42px;
    font-style: italic;
    color: $theme-color;
    padding: 10% 0 20px 0;
  }
}
</style>
