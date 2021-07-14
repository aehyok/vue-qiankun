// import Request from '@/utils/axios/index'
import request from "../utils/request.js";
export const getSystemList = () => {
    return request('/api/getSystemList',{
      method: 'get',     
    })
  };
