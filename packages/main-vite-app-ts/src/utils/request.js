import axios from 'axios'
import { ElMessage } from 'element-plus'
export const baseUrl =
  process.env.NODE_ENV === 'development'
    // ? "http://139.9.184.171:10088/"
    ? "/infra/"
    : 'http://rap2api.taobao.org/app/mock/283135/';

// const origin = window.location.origin
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 60000,
});

instance.interceptors.request.use(
  (request) => {
    const token = localStorage.token
      ? JSON.parse(localStorage.token)
      : 'aehyok';
    request.headers = {
      "Authorization": token.authorization || '',
      "Content-Type": "application/json", // 便民服务子系统
    };
    return request;
  },
  (error) => Promise.reject(error)
);
instance.interceptors.response.use(
  (response) => {
    // token
    if (response.data.code === -2) {   
      // token失效
      ElMessage({
        message: "身份认证无效，请重新登录",
        type: "warning",
      });
      localStorage.clear(); // 清除缓存
      window.location.href = "/";
      return false;
    }
    if (response.data.code !== 200) {
      return Promise.reject(new Error(response.data.message));
    }

    return response.data;
  },
  (error) => {
    const errorString = error.toString();

    if (errorString.includes("timeout")) {
      return Promise.reject(new Error("接口请求超时"));
    }

    if(errorString.includes('Token invalid')) {
      // token失效
      ElMessage({
        message: "身份认证无效，请重新登录",
        type: "warning",
      });
      localStorage.clear(); // 清除缓存
      window.location.href = "/";
      return false;
    }
    if (error.response.status >= 500) {
      ElMessage.error("请求失败，服务器异常");
    }
    return Promise.reject(error.response.data.message);
  }
);

const request = (url, options = {}) => {
  // post 请求
  if(options.method == 'post'){
    return instance.request({
      url: url,
      ...options,
    }).catch((err) => {
      ElMessage.error(err.message)
    })
  }
   // 乡村治理 便民服务  get请求  
  return instance.request(url, {            
    params: {...options.data}       
  }).catch((err) => {
    ElMessage.error(err.message)
  })
};
export default request;
