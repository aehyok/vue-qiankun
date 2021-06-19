import request from "../utils/request.js";


/**
 * 获取验证码
*/
export const loginList = () => {
  return request('/api/login', {
    method: "get",
  });
};