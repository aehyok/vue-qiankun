<template>
  <div class="login-page">
    <main class="content-wrapper">
      <div class="left">
        <img :src="loginImage" alt="" />
      </div>

      <div class="right">
        <h3 class="project-name">{{projectName}}</h3>
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="form"
          size="large"
          @submit.native.prevent
        >
          <el-form-item prop="account">
            <el-input
              type="text"
              placeholder="用户名"
              v-model="loginForm.account"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              placeholder="密码"
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-form-item class="smbot" prop="captchaValue">
            <div class="form-row">
              <el-input
                placeholder="验证码"
                v-model="loginForm.captchaValue"
                style="flex: 1;"
              />
              <div class="verCodeImg">
                <img :src="vcodeImg" />
                <!-- <div class="svgbox" v-html="vcodeImg"></div> -->
                <span
                  @click="getImageVerifyCode"
                  style="margin-left: 20px; cursor: pointer;"
                >
                  换一张
                </span>
              </div>
            </div>
          </el-form-item>
          <div class="form-row">
            <el-checkbox v-model="rememberPasCbox" size="large">
              记住用户名和密码
            </el-checkbox>
            <el-button type="text" @click="dialogVisible = true">
              忘记密码
            </el-button>
          </div>
          <el-button
            size="large"
            type="primary"
            style="width: 100%;margin-top: 20px;height: 50px;"
            @click="submitForm"
            :loading="loading"
            native-type="submit"
          >
            登 录
          </el-button>
        </el-form>
      </div>
      <find-password v-model="dialogVisible" @cancel="cancel" />
    </main>
  </div>
</template>

<script>
import { getVerifyCode, login }  from '../../services/index'  
import md5 from 'js-md5'
import { encode, decode} from 'js-base64'
import { defineComponent, onBeforeMount, reactive, toRefs, ref } from 'vue'
import FindPassword from './find-password.vue'
import { warnMessage } from '../../utils/message'
export default defineComponent({
  name:'Login',
  components: {
    FindPassword 
  }, 
  setup() {
    let form = ref(null)
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

    const state = reactive({
      projectName: 'qiankun综合服务平台',
      vcodeImg: '',
      imgUrl: '',
      loginImage: 'images/login/systhetic.jpg',
      rememberPasCbox: false,
      loading: false,
      loginForm: {
        account: 'admin',
        password: '123456',
        captchaValue: 'oyta',
        captchaId: ''
      },
      dialogVisible: false,
      rules: {
        password: [{ validator: validatePass, trigger: ['blur', 'change'] }],
        account: [{ validator: validateAccount, trigger: ['blur', 'change'] }],
        captchaValue: [
          { validator: validatorVerCode, trigger: ['blur', 'change'] },
        ],
      },
    })

    onBeforeMount(() => {
      checkRemPass()
      getImageVerifyCode()
    })

    
    // 判断是否已缓存账号密码
    const checkRemPass = () => {
      const loginRemInfo = localStorage.getItem('loginRemInfo')
      if (loginRemInfo) {
        const jsonInof = JSON.parse(decode(loginRemInfo))
        state.loginForm.account = jsonInof.account
        state.loginForm.password = jsonInof.password
        state.rememberPasCbox = true
      }
    }

    // 判断是否需要记住账号密码
    const checkNeedRemPass = () => {
      if (state.rememberPasCbox) {
        const info = {
          account: state.loginForm.account,
          password: state.loginForm.password, 
        }
        localStorage.setItem('loginRemInfo', encode(JSON.stringify(info)))
      } else {
        localStorage.removeItem('loginRemInfo')
      }
    }

    const submitForm = () => {
      form.value.validate(valid => {
        if (valid) {
          checkNeedRemPass()
          adminLogin()
        }
      })
    }

    // 获取验证码
    const getImageVerifyCode = async() => {
      const res = await getVerifyCode()
      if (res.code === 200) {
        state.loginForm.captchaId = res.data.key
        state.vcodeImg = res.data.b64s
      }
      console.log(res)
    }

    // 验证登录
    const adminLogin = async() => {
      console.log(md5(state.loginForm.password).toLocaleLowerCase())
      state.loading = true
      const res = await login({
        account: encode(state.loginForm.account),
        captchaValue: '0yta',  //state.loginForm.captchaValue,
        password: md5(state.loginForm.password).toLocaleLowerCase(),
        captchaId: state.loginForm.captchaId,
      })
      state.loading = false
      if (res?.code === 200) {
        let account = encode(state.loginForm.account)
        let password = md5(state.loginForm.password
          ).toLocaleLowerCase()
        let result = res.data.find(
          item=> item.account=== account && 
          item.password === password)
        if(result?.success === "200"){
          localStorage.setItem('token', JSON.stringify({
            ...result,
            account:state.loginForm.account
          }))
          window.location.href="/"
        }else {
          warnMessage('用户名或密码输入有误，请重新输入')
        }
      } else {
        getImageVerifyCode()
      }
    }

    const cancel = () => {
      state.dialogVisible = false
    }
    
    return {
      ...toRefs(state),
      adminLogin,
      getImageVerifyCode,
      submitForm,
      checkNeedRemPass,
      checkRemPass,
      validatorVerCode,
      validatePass,
      validateAccount,
      cancel,
      form
    }
  }
})
</script>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background: url('../../../public/images/login/bg.jpg');

  :deep(.el-input) {
    font-size: 16px;
  }

  :deep(.el-input__inner) {
    height: 50px;
  }
}

.project-name {
  text-align: center;
  font-size: 27px;
  font-weight: 600;
  color: #099e45;
  margin-bottom: 90px;
}

.content-wrapper {
  display: flex;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 88%;
  height: 794px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .left {
    flex: 0 0 56.5%;

    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .right {
    flex: 1;
    padding: 7% 7% 0;
  }
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
.form-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}
</style>
