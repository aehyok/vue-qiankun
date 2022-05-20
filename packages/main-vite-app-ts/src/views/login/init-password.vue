<template>
  <div class="login-page">
    <main class="content-wrapper">
      <div class="right" v-if="show">
        <h3 class="project-name">{{ projectName }}</h3>
        <h5 class="project-title">重置用户密码</h5>
        <el-form :model="loginForm" :rules="rules" ref="form" size="large" @submit.native.prevent>
          <el-form-item prop="account">
            <el-input
              type="text"
              placeholder="用户名"
              name="username"
              auto-complete="off"
              v-model="loginForm.account"
            />
          </el-form-item>
          <el-form-item class="smbot" prop="verifCode">
            <div class="form-row">
              <el-input
                placeholder="短信验证码"
                name="inputDom"
                v-model="loginForm.captchaValue"
                style="flex: 1"
              />
            </div>
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              type="password"
              name="inputDom"
              placeholder="输入密码（6位以上）"
              auto-complete="new-password"
              v-model="loginForm.password"
            />
          </el-form-item>
          <el-button
            size="large"
            type="primary"
            style="width: 100%; margin-top: 20px; height: 50px"
            @click="submitForm"
            :loading="loading"
            native-type="submit"
          >
            初 始 化 用 户
          </el-button>
        </el-form>
      </div>
      <div class="no-show" v-if="!show" style="margin-top: 150px"> 密码重置成功，请重新登录。 </div>
    </main>
  </div>
</template>

<script>
  import { changedForAccount } from '../../services/index'
  import md5 from 'js-md5'
  import { useRoute } from 'vue-router'
  import { defineComponent, reactive, toRefs, ref, onMounted } from 'vue'
  export default defineComponent({
    name: 'InitPass',
    components: {},
    setup() {
      const route = useRoute()
      let form = ref(null)
      const validatePass = (_rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (state.loginForm.account !== '') {
            form.value.validateField('account')
          }
          callback()
        }
      }

      const validateAccount = (_rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        } else {
          callback()
        }
      }

      const validatorVerCode = (_rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      }

      const state = reactive({
        projectName: '杨陵区数字乡村综合服务平台',
        loginImage: 'images/login/systhetic.jpg',
        loading: false,
        show: true,
        loginForm: {
          account: '',
          password: '',
          captchaValue: ''
        },
        rules: {
          pass: [{ validator: validatePass, trigger: ['blur', 'change'] }],
          account: [{ validator: validateAccount, trigger: ['blur', 'change'] }],
          verifCode: [{ validator: validatorVerCode, trigger: ['blur', 'change'] }]
        }
      })

      onMounted(() => {
        state.loginForm.account = route.query.user
        state.loginForm.captchaValue = route.query.code
      })

      const submitForm = () => {
        form.value.validate((valid) => {
          if (valid) {
            initPass()
          }
        })
      }

      // 验证登录
      const initPass = async () => {
        state.loading = true
        const res = await changedForAccount({
          account: state.loginForm.account,
          codeVal: state.loginForm.captchaValue,
          password: md5(state.loginForm.password).toLocaleLowerCase()
        })

        state.loading = false
        if (res?.code === 200) {
          state.show = false
        }
      }

      return {
        ...toRefs(state),
        initPass,
        submitForm,
        validatorVerCode,
        validatePass,
        validateAccount,
        form
      }
    }
  })
</script>

<style lang="scss" scoped>
  @media screen and (min-width: 320px) and (max-width: 1156px) {
    .login-page .left {
      display: none;
    }
  }

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
    margin-top: 40px;
    margin-bottom: 90px;
  }

  .project-title {
    text-align: center;
    font-size: 20px;
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
      margin-top: 90px;
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

  .no-show {
    margin: 0 auto;
  }
</style>
