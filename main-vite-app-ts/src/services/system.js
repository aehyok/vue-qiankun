import request from "../utils/request.js";
// 人口概况 男女比例
export const getList = () => {
    return request('/api/getSystemList', {
      method: 'get',
    })
  }