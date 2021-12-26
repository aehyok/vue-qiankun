/* eslint-disable no-unused-vars */
import request from '../utils/request';

enum Api {
  USER_Login = '/api/login',
  USER_INFP = '/api/user',
}

interface ResProps {
  code: 0 | -1;
  data: any;
}

export const login = (data: { username: string; password: string }): Promise<ResProps> =>
//   request({ url: Api.USER_Login, method: 'POST', data });
{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                code: 0,
                data: {
                    id: 1,
                    username: 'admin',
                    password: '123456',
                    phone: '13600000000',
                    desc: '超级管理员',
                    roles: [1, 2, 3],
                    token: 'this_is_a_token'
                }
            })
        }, 2000)
    })
}

export const getUserInfo = () => request({ url: Api.USER_INFP, method: 'GET' });