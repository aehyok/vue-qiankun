import request from '../utils/request.js'

export const formSave = (data) => {
  return request('/Form/Save', {
    method: 'post',
    data
  })
}
/**
 * 获取验证码
 */
export const getVerifyCode = () => {
  return {
    code: 200,
    message: 'success',
    data: {
      b64s: 'data:image/png;base64,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',
      key: 'JfKbjyogMmVtGcqB6HUh'
    }
  }
}

/**
 *  获取系统子模块列表
 */
export const getSystemList = async () => {
  return {
    data: [
      {
        systemId: 'webpack-app',
        name: 'webpack-app',
        productionEntry: '/child/webpack-app/',
        developmentEntry: '//127.0.0.1:4000/',
        title: 'webpack-app',
        path: '/webpack-app/about',
        normal: 'images/module/dvs-farm-normal.png',
        selected: 'images/module/dvs-farm-selected.png',
        enabled: true
      },
      {
        systemId: 'map-app',
        name: 'map-app',
        productionEntry: '/child/map-app/',
        developmentEntry: '//127.0.0.1:5000/',
        title: 'map-app',
        path: '/map-app/about',
        normal: 'images/module/dvs-village-normal.png',
        selected: 'images/module/dvs-village-selected.png',
        enabled: true
      }
    ],
    code: 200
  }
}

/**
 *  登录暂存用户列表
 */
export const login = (data) => {
  return {
    data: [
      {
        account: 'YWRtaW4=',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        success: '200',
        nickName: 'admin'
      },
      {
        account: 'YWVoeW9r',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        success: '200',
        nickName: 'aehyok'
      }
    ],
    code: 200,
    message: 'success'
  }
}

/**
 * 获取版本号
 */
export const getVersion = () => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('执行完成Promise')
      resolve({
        code: 200,
        message: 'success',
        data: {
          dvs20: {
            'webpack-app': {
              version: ['2.3.0.001']
            },
            'map-app': {
              version: ['2.3.0.001']
            }
          }
        }
      })
    }, 1)
  })
}

/**
 * 退出登录
 */
export const logout = () => {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log('执行完成Promise')
      resolve({
        code: 200,
        message: '注销登录',
        data: {}
      })
    }, 1)
  })
}

/**
 * 发送手机验证码
 */
export const sendMobileValidateCode = (data) => {
  return request('/sso/auth/sendMobileValidateCode', {
    method: 'post',
    data
  })
}

/**
 * 重置密码
 */
export const changedForMobile = (data) => {
  return request('/basic/console/user/password/changedForMobile', {
    method: 'post',
    data
  })
}

/**
 * 初始化密码
 */
export const changedForAccount = (data) => {
  return request('/basic/console/user/password/changedForAccount', {
    method: 'post',
    data
  })
}

/**
 * 当前用户修改密码
 */
export const changedSelf = (data) => {
  return request('/basic/console/user/password/changedSelf', {
    method: 'post',
    data
  })
}

/**
 * 查询接收公文列表
 */
export const getReceievedDocumentList = (data) => {
  return request('/digital/console/document/getReceievedDocumentList', {
    method: 'post',
    data
  })
}

// 获取行政区域树
export const getRegionTree = (data) => {
  return request('/basic/console/area/getAreaTree', {
    method: 'post',
    data
  })
}

// 人口概况 男女比例
export const getPopuSexPer = (data) => {
  return request('/village/console/statistics/GetPopuSexPer', {
    method: 'get',
    data
  })
}

// 人口概况 人口类型
export const GetPopulationTypeBar = (data) => {
  return request('/village/console/statistics/GetPopulationTypeBar', {
    method: 'get',
    data
  })
}

// 农村居民平均年收入
export const GetYearIncome = (data) => {
  return request('/village/console/statistics/GetYearIncome', {
    method: 'get',
    data
  })
}
// 乡村治理荣誉
export const GetVillageHonor = (data) => {
  return request('/village/console/statistics/GetVillageHonor', {
    method: 'get',
    data
  })
}
// 外出务工情况
export const GetOutWorkInfo = (data) => {
  return request('/village/console/statistics/GetOutWorkInfo', {
    method: 'get',
    data
  })
}
// 乡村治理居民参与情况 男女
export const GetVillagePartakeSex = (data) => {
  return request('/village/console/statistics/GetVillagePartakeSex', {
    method: 'get',
    data
  })
}
// 乡村治理居民参与情况 年龄段
export const GetVillagePartakeAge = (data) => {
  return request('/village/console/statistics/GetVillagePartakeAge', {
    method: 'get',
    data
  })
}
// 农作物占耕地统计
export const countAreaByPlant = (data) => {
  return request('/digital/console/farm-land/countAreaByPlant', {
    method: 'get',
    data
  })
}
// 随手拍事件分类统计
export const statisticByType = (data) => {
  return request('/cons/console/PhotoAnywhere/statisticByType', {
    method: 'post',
    data
  })
}
// 随手拍办理情况统计
export const statisticByeTypeMonth = (data) => {
  return request('/cons/console/PhotoAnywhere/statisticByeTypeMonth', {
    method: 'post',
    data
  })
}
