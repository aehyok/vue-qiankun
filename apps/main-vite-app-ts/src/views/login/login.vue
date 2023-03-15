<template>
  <div class="login-page">
    <div class="left-login"></div>
    <!-- <div class="right-login"></div> -->
    <div class="content-wrapper">
      <div class="project-name">{{ projectName }}</div>
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="form"
        class="form-class"
        @submit.native.prevent
      >
        <el-form-item prop="account">
          <el-input type="text" placeholder="登录账号" v-model="loginForm.account" width="100%">
            <template #prefix>
              <img
                class="project-img"
                :src="
                  loginForm.account.length == 0
                    ? '/images/login/icon-one.png'
                    : '/images/login/icon-onel.png'
                "
              />
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input type="password" placeholder="登录密码" v-model="loginForm.password">
            <template #prefix>
              <img
                class="project-img"
                :src="
                  loginForm.password.length == 0
                    ? '/images/login/icon-two.png'
                    : '/images/login/icon-twol.png'
                "
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="smbot" prop="captchaValue">
          <div class="form-row">
            <el-input placeholder="验证码" v-model="loginForm.captchaValue" style="flex: 1" />

            <div class="verCodeImg">
              <img :src="loginForm.vcodeImg" />
              <span @click="getImageVerifyCode" style="margin-left: 20px; cursor: pointer">
                换一张
              </span>
            </div>
          </div>
        </el-form-item>
        <div class="form-row">
          <el-checkbox v-model="rememberPasCbox" size="large"> 记住用户名和密码 </el-checkbox>
          <el-button @click="forgotClick"> 忘记密码? </el-button>
        </div>
        <el-button
          size="large"
          type="primary"
          class="btn-class"
          @click="submitForm"
          :loading="loginForm.loading"
          native-type="submit"
        >
          登 录
        </el-button>
      </el-form>
    </div>
    <find-password v-model="dialogVisible" @cancel="cancelClick" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import FindPassword from './find-password.vue'
import { useLogin } from '@/hooks/useLogin'
import { LoginState } from '@/types/models'

const form = ref(null)

const projectName = 'OpenAI ChatMe'
const rememberPasCbox = ref(false)
const dialogVisible = ref(false)
const rules = {
  password: [{ required: true, message: '请输入密码', trigger: ['blur', 'change'] }],
  account: [{ required: true, message: '请输入账号', trigger: ['blur', 'change'] }],
  captchaValue: [{ required: true, message: '请输入验证码', trigger: ['blur', 'change'] }]
}
const loginForm = reactive<LoginState>({
  account: 'admin',
  password: '123456',
  captchaValue: 'oyta',
  captchaId: '',
  vcodeImg: '',
  loading: false
})

const { checkRememberPassword, checkNeedRememberPassword, getImageVerifyCode, submitLogin } =
  useLogin(loginForm, rememberPasCbox)

checkRememberPassword()
getImageVerifyCode()

const submitForm = () => {
  console.log(rememberPasCbox.value, 'rember')
  form.value.validate((valid) => {
    if (valid) {
      checkNeedRememberPassword()
      submitLogin()
    }
  })
}

const cancelClick = () => {
  dialogVisible.value = false
}

const forgotClick = () => {
  dialogVisible.value = true
}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-between;
  background: url('../../../public/images/login/bg.png');
  background-size: 100% 100%;
  .left-login {
    width: 50vw;
    height: 82vh;
    max-height: 1081px;
    background: url('../../../public/images/login/bg_nav.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-top: 40px;
    margin-left: 39px;
  }
  .right-login {
    width: 426px;
    height: 100vh;
    max-height: 1081px;
    background: url('../../../public/images/login/bg_right.png');
    background-size: 100% 100%;
  }
  .smbot {
    border: none;
  }
}
.content-wrapper {
  position: absolute;
  top: 50%;
  right: 12vw;
  transform: translate(0, -50%);
  // background: url("../../../public/images/login/bg_login.png");
  background-size: 100% 100%;
  // width: 561px;
  // height: 898px;
  // padding-top: 180px;
  width: 390px;
  height: 413px;
  background: #ffffff;
  border-radius: 12px;
  opacity: 0.95;
  box-sizing: border-box;
  .project-name {
    text-align: center;
    font-size: 24px;
    margin-top: 40px;
    margin-bottom: 30px;
    font-weight: 600;
    color: #1c63f0;
  }
  .project-img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  .verCodeImg {
    margin-left: 10px;
    display: flex;
    align-items: center;
    .svgbox {
      position: relative;
      top: 6px;
    }
    img {
      height: 100%;
    }
  }
  .form-class {
    // padding: 72px 90px;
  }
  :deep(.el-input__inner) {
    height: 40px;
    border: none;
  }

  .smbot :deep(.el-input__inner) {
    height: 40px;
    // border-radius: 2px;
    // border: 1px solid #9EA7B4;
  }

  :deep(.el-form-item__content) {
    width: 350px;
    height: 40px;
    display: flex;
    align-items: center;
    border-radius: 5px;
    border: 1px solid rgba(158, 167, 180, 1);
    background: rgba(243, 246, 249, 0.2);
    // :focus{
    //   border: 1px solid #1C63F0;
    // background: rgba(243, 246, 249, 0.2);
    // }
  }
  .smbot :deep(.el-form-item__content) {
    border: none;
    // :focus{
    //   border: 1px solid #1C63F0;
    // }
  }
  .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 400;
    color: #657180;
  }
  .el-checkbox {
    font-size: 14px;
    font-weight: 400;
    color: #657180;
  }
  .el-button {
    font-size: 14px;
    font-weight: 400;
    color: #657180;
  }
  .btn-class {
    width: 100%;
    margin-top: 10px;
    height: 40px;
    background: #1c63f0;
    border-radius: 2px;
    font-size: 16px;
    font-weight: 400;
    color: #ffffff;
    margin-bottom: 50px;
  }
  :deep(input:-webkit-autofill) {
    //   box-shadow: 0 0 1000px 0 #071b5a inset !important;
    //   -webkit-text-fill-color: #fff;
  }
  :deep(.el-form-item) {
    margin-bottom: 15px !important;
  }
  :deep(.el-form.form-class) {
    padding: 0 20px;
  }
}
</style>
