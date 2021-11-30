<template>
  <view class="index">
    <view>
      <img src="" alt="" />
    </view>
    {{ state.msg }}
    <view class="btn">
      <nut-button type="primary" @click="handleClick('text', state.msg2, true)"
        >点我</nut-button
      >
    </view>
    <nut-toast
      :msg="state.msg"
      v-model:visible="state.show"
      :type="state.type"
      :cover="state.cover"
    />
  </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import Taro from '@tarojs/taro';
import { useRouter } from '../../utils/router'
const state = reactive({
  msg: "欢迎使用 NutUI3.0 开发小程序",
  msg2: "你成功了～",
  type: "text",
  show: false,
  cover: false,
});

const router = useRouter()


const handleClick = (type, msg, cover = false) => {
  state.show = true;
  state.msg2 = msg;
  state.type = type;
  state.cover = cover;
  router.push(`/pages/me/index`)
  Taro.login({
    success: function (res) {
      if (res.code) {
        console.log(res, 'res')
        try {
          Taro.setStorageSync('token', res)
        } catch (e) { }
        //发起网络请求
        Taro.request({
          url: 'https://dvs-dev.sunlight-tech.com/api/sso/auth/getVerifyCode',
          data: {
            code: res.code
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
  // navigateTo()
};
</script>

<style lang="scss">
.index {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
