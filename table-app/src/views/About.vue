<template>
  <div class="about">
    <h1>This is a form app about page</h1>
    <button @click="test">清除token</button>
    <button @click="getToken">token</button>
  </div>
</template>
<script>
import actions from '../Actions'
export default {
  data () {
    return {

    }
  },
  created () {
    console.log('created')
    actions.onGlobalStateChange(state => {
      const { token } = state
      // 未登录 - 返回主页
      if (!token) {
        this.$message.error('未检测到登录信息！')
        // return this.$router.push('/')
      }
      this.getUserInfo(token)
    }, true)
  },
  methods: {
    getUserInfo (token) {
      console.log('根据token获取到了用户信息', token)
    },
    getToken () {
      actions.setGlobalState({
        token: '12345678910-table'
      })
    },
    test () {
      actions.setGlobalState({
        token: ''
      })
    }
  }

}
</script>
