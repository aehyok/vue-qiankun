import { useStorage } from '@vueuse/core'
import { encode, decode } from 'js-base64'
import { useStore } from 'vuex'
import { getVerifyCode, login } from '@/services/index'
import md5 from 'js-md5'
import { warnMessage } from '@/utils/message'

export function useLogin(loginForm: any, rememberPasCbox: any) {
  const store = useStore()
  const checkRememberPassword = () => {
    const loginRemInfo = localStorage.getItem('loginRemInfo')
    if (loginRemInfo) {
      const jsonInof = JSON.parse(decode(loginRemInfo))
      loginForm.account = jsonInof.account
      loginForm.password = jsonInof.password
      console.log(loginForm, 'loginFormloginFormloginForm')
      rememberPasCbox = true
    }
  }

  // 判断是否需要记住账号密码
  const checkNeedRememberPassword = () => {
    if (rememberPasCbox) {
      const info = {
        account: loginForm.account,
        password: loginForm.password
      }
      localStorage.setItem('loginRemInfo', encode(JSON.stringify(info)))
      // loginForm = useStorage('loginRemInfo', {...info})
    } else {
      localStorage.removeItem('loginRemInfo')
    }
  }

  const getImageVerifyCode = async () => {
    const res = await getVerifyCode()
    if (res.code === 200) {
      loginForm.captchaId = res.data.key
      loginForm.vcodeImg = res.data.b64s
    }
    console.log(res)
  }

  const submitLogin = async () => {
    console.log(md5(loginForm.password).toLocaleLowerCase())
    loginForm.loading = true

    // const res = await login({
    //   account: encode(loginForm.account),
    //   captchaValue: '0yta',
    //   password: md5(loginForm.password).toLocaleLowerCase(),
    //   captchaId: loginForm.captchaId
    // })
    const res = await login()
    loginForm.loading = false
    if (res?.code === 200) {
      const account = encode(loginForm.account)
      const password = md5(loginForm.password).toLocaleLowerCase()
      const result = res.data.find((item) => item.account === account && item.password === password)
      if (result?.success === '200') {
        localStorage.setItem(
          'token',
          JSON.stringify({
            ...result,
            account: loginForm.account
          })
        )
        localStorage.removeItem('vuex')
        store.dispatch('fetchSystemList')
      } else {
        warnMessage('用户名或密码输入有误，请重新输入')
      }
    } else {
      getImageVerifyCode()
    }
  }

  return {
    checkRememberPassword,
    checkNeedRememberPassword,
    getImageVerifyCode,
    submitLogin
  }
}
