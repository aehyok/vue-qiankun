import axios from 'axios'
import { ElMessage as Message, ElMessageBox as MessageBox } from 'element-plus'

const service = axios.create({
  baseURL: process.env.NODE_ENV === "development"
  // ? "http://139.9.184.171:10088/"
  ? "http://rap2api.taobao.org/app/mock/283135/"
  : 'http://rap2api.taobao.org/app/mock/283135/',
  timeout: 5000,
  withCredentials: true // send cookies when cross-domain requests
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    config
    const token = localStorage.token
      ? JSON.parse(localStorage.token)
      : {};
    if(Object.keys(token)){
      config.headers = {
        "Authorization": token.authorization || '',
        "Content-Type": "application/json",
      };
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: success
    // code == 50001: invalid access token
    // code == 50002: already login in other place
    // code == 50003: access token expired
    // code == 50004: invalid user (user not exist)
    // code == 50005: username or password is incorrect
    // You can change this part for your own usage.
    const res = response.data
    if (res.code !== 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          // UserModule.ResetToken()
          location.reload() // To prevent bugs from vue-router
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response.data
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
