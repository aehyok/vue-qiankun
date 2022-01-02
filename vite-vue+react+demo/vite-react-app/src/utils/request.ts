import { message } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';


const BASE_URL = '/api';

const instance = axios.create({
  baseURL: BASE_URL,
});

// // 请求拦截
// axios.interceptors.request.use((request) => {
//   // 添加token、应用信息等
//   request.headers = {
//     ...request.headers,
//     token: sessionStorage.getItem('x-viteApp-token') || '',
//   };
//   return request;
// });

// 对返回的结果做处理
instance.interceptors.response.use(
  (response) => {
    const res = response.data;

    if (res.code === 3) {
      message.error('登录超时，请重新登录');
      sessionStorage.removeItem('userinfo');
      // history.replace('/');
      return null;
    }
    return res;
  },
  (err) => {
    console.log('err', err);
  },
);

const request = <T>(reqConfig: AxiosRequestConfig): Promise<T> => {
  return instance.request<T, T>(reqConfig);
};

export default request;
export type { AxiosInstance, AxiosResponse };