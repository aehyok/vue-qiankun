<template>
  <view class="index">

    <nut-button type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumberClick" @bindgetphonenumber="getPhoneNumberClick">11111111111111111111</nut-button>
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

  <nut-tabbar :bottom="true">
  <nut-tabbar-item tab-title="首页" href="" icon="home"></nut-tabbar-item>
  <nut-tabbar-item tab-title="我i村" icon="category"></nut-tabbar-item>
  <nut-tabbar-item
    tab-title="我i家"
    href="https://m.jd.com"
    icon="cart"
  ></nut-tabbar-item>
  <nut-tabbar-item
    tab-title="我的"
    href="######"
    icon="my"
  ></nut-tabbar-item>
</nut-tabbar>
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

  const getPhoneNumberClick = (e) => {
    console.log(e, 'getPhoneNumber-getPhoneNumber')
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
  }

const router = useRouter()

const accountInfo = Taro.getAccountInfoSync();
console.log(accountInfo.miniProgram.appId) // 小程序 appId
console.log(accountInfo.miniProgram.envVersion ) // 小程序 环境


const handleClick = (type, msg, cover = false) => {
  state.show = true;
  state.msg2 = msg;
  state.type = type;
  state.cover = cover;
  
  
  Taro.checkSession({
    success: function () {
      //session_key 未过期，并且在本生命周期一直有效
      console.log('success,,,,')
    },
    fail: function () {
      // session_key 已经失效，需要重新执行登录流程
      console.log('fail,,,,')
    }
  })
      
  // router.push(`/pages/me/index`)
  Taro.login({
    success: function (res) {
      if (res.code) {
        console.log(res, 'res')
        try {
          Taro.setStorageSync('token--ss', res)
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
        router.push(`/pages/me/index`)
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
