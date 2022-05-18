<template>
  <div class="login-page">
    <div class="left-login"></div>
    <div class="right-login"></div>
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
          <img src="../../../public/images/login/icon-1.png" />
          <el-input type="text" placeholder="用户名" v-model="loginForm.account" />
        </el-form-item>
        <el-form-item prop="password">
          <img src="../../../public/images/login/icon-2.png" />
          <el-input type="password" placeholder="密码" v-model="loginForm.password" />
        </el-form-item>
        <el-form-item class="smbot" prop="captchaValue">
          <div class="form-row">
            <img src="../../../public/images/login/icon-2.png" />
            <el-input placeholder="验证码" v-model="loginForm.captchaValue" style="flex: 1" />
            <div class="verCodeImg">
              <img :src="loginForm.vcodeImg" />
              <!-- <div class="svgbox" v-html="vcodeImg"></div> -->
              <span @click="getImageVerifyCode" style="margin-left: 20px; cursor: pointer">
                换一张
              </span>
            </div>
          </div>
        </el-form-item>
        <div class="form-row">
          <el-checkbox v-model="rememberPasCbox" size="large"> 记住用户名和密码 </el-checkbox>
          <el-button type="default"  text @click="dialogVisible = true" style="color: #0091ff"> 忘记密码 </el-button>
        </div>
        <el-button
          size="large"
          type="primary"
          class="btn-class"
          @click="submitForm"
          :loading="loading"
          native-type="submit"
        >
          登 录
        </el-button>
      </el-form>
    </div>
    <find-password v-model="dialogVisible" @cancel="cancel" />
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import { encode, decode } from 'js-base64'
  import { defineComponent, onBeforeMount, reactive, toRefs, ref } from 'vue'
  import { useStore } from 'vuex'
  import FindPassword from './find-password.vue'
  import { warnMessage } from '@/utils/message'
  import { getVerifyCode, login } from '@/services/index'
  import { useLogin } from '@/hooks/useLogin'

  export default defineComponent({
    name: 'Login',
    components: {
      FindPassword
    },
    setup() {
      const form = ref(null)
      const store = useStore()

      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (state.loginForm.account !== '') {
            form.value.validateField('account')
          }
          callback()
        }
      }

      const validateAccount = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }

      const validatorVerCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }

      const rememberPasCbox = ref(false)

      const state = reactive({
        projectName: 'qiankun综合服务平台',
        imgUrl: '',
        loginImage: 'images/login/systhetic.jpg',
        // rememberPasCbox: false,
        loading: false,
        loginForm: {
          account: 'admin',
          password: '123456',
          captchaValue: 'oyta',
          captchaId: '',
          vcodeImg: '',
          loading: false,
        },
        dialogVisible: false,
        rules: {
          password: [{ validator: validatePass, trigger: ['blur', 'change'] }],
          account: [{ validator: validateAccount, trigger: ['blur', 'change'] }],
          captchaValue: [{ validator: validatorVerCode, trigger: ['blur', 'change'] }]
        }
      })

      const  { checkRemPass, checkNeedRemPass, getImageVerifyCode, adminLogin } = useLogin(state.loginForm, rememberPasCbox)

      onBeforeMount(() => {
        checkRemPass()
        getImageVerifyCode()
      })

      const submitForm = () => {
        console.log(rememberPasCbox.value, 'rember')
        form.value.validate((valid) => {
          if (valid) {
            checkNeedRemPass()
            adminLogin()
          }
        })
      }

      const cancel = () => {
        state.dialogVisible = false
      }

      return {
        ...toRefs(state),
        rememberPasCbox,
        getImageVerifyCode,
        submitForm,
        checkNeedRemPass,
        checkRemPass,
        validatorVerCode,
        cancel,
        form
      }
    }
  })
</script>

<style lang="scss" scoped>
  .login-page {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
    background: url("../../../public/images/login/bg.png");
    background-size: 100% 100%;
    .left-login {
      width: 1110px;
      height: 100vh;
      max-height: 1081px;
      background: url("../../../public/images/login/bg_left.png");
      background-size: 100% 100%;
    }
    .right-login {
      width: 426px;
      height: 100vh;
      max-height: 1081px;
      background: url("../../../public/images/login/bg_right.png");
      background-size: 100% 100%;
    }
  }
  .content-wrapper {
    position: absolute;
    top: 50%;
    right: 120px;
    transform: translate(0, -50%);
    background: url("../../../public/images/login/bg_login.png");
    background-size: 100% 100%;
    width: 561px;
    height: 898px;
    padding-top: 180px;
    box-sizing: border-box;
    .project-name {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      color: #0091ff;
      line-height: 33px;
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
      padding: 72px 90px;
    }
    :deep(.el-input__inner) {
      height: 50px;
      border: none;
      background: none;
      &::placeholder {
        color: #0091ff;
      }
    }
    :deep(.el-form-item__content) {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #0091ff;
    }
    .form-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #0091ff;
    }
    .el-checkbox {
      color: #0091ff;
    }
    .btn-class {
      width: 100%;
      margin-top: 20px;
      height: 50px;
      background: linear-gradient(180deg, #00b3ff 0%, #007cff 100%);
    }
    :deep(input:-webkit-autofill) {
      box-shadow: 0 0 1000px 0 #071b5a inset !important;
      -webkit-text-fill-color: #fff;
    }
  }
</style>