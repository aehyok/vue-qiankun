import request from "../utils/request.js";

/**
 * 获取验证码
*/
export const getVerifyCode = () => {
    return request('/api/getVerifyCode', {
      method: "get",
    });
  };

/**
 *  登录暂存用户列表
*/
export const login = () => {
  return request('/api/login', {
    method: "get",
  });
};

/**
* 获取版本号
*/
export const getVersion = () => {
    return request('/api/version', {
      method: "get"
    });
  };

/**
* 退出登录
*/
export const logout = () => {
  return request('/api/logout', {
    method: "post"
  });
};



/**
* 发送手机验证码
*/
export const sendMobileValidateCode = (data) => {
  return request('/sso/auth/sendMobileValidateCode', {
    method: "post",
    data
  })
};

/**
* 重置密码
*/
export const changedForMobile = (data) => {
  return request('/basic/console/user/password/changedForMobile', {
    method: "post",
    data
  });
};

/**
* 初始化密码
*/
export const changedForAccount = (data) => {
  return request('/basic/console/user/password/changedForAccount', {
    method: "post",
    data
  });
};

/**
* 当前用户修改密码
*/
export const changedSelf = (data) => {
  return request('/basic/console/user/password/changedSelf', {
    method: "post",
    data
  });
};

/**
* 查询接收公文列表
*/
export const getReceievedDocumentList = (data) => {
  return request('/digital/console/document/getReceievedDocumentList', {
    method: 'post',
    data,
  })
}

// 获取行政区域树
export const getRegionTree = (data) => {
  return request('/basic/console/area/getAreaTree', {
    method: 'post',     
    data,
  })
}

// 人口概况 男女比例
export const getPopuSexPer = (data) => {
  return request('/village/console/statistics/GetPopuSexPer', {
    method: 'get',     
    data,
  })
}

// 人口概况 人口类型
export const GetPopulationTypeBar = (data) => {
  return request('/village/console/statistics/GetPopulationTypeBar', {
    method: 'get',     
    data,
  })
}

// 农村居民平均年收入
export const GetYearIncome = (data) => {
  return request('/village/console/statistics/GetYearIncome', {
    method: 'get',     
    data,
  })
}
// 乡村治理荣誉
export const GetVillageHonor = (data) => {
  return request('/village/console/statistics/GetVillageHonor', {
    method: 'get',     
    data,
  })
}
// 外出务工情况
export const GetOutWorkInfo = (data) => {
  return request('/village/console/statistics/GetOutWorkInfo', {
    method: 'get',     
    data,
  })
}
// 乡村治理居民参与情况 男女
export const GetVillagePartakeSex = (data) => {
  return request('/village/console/statistics/GetVillagePartakeSex', {
    method: 'get',     
    data,
  })
}
// 乡村治理居民参与情况 年龄段
export const GetVillagePartakeAge = (data) => {
  return request('/village/console/statistics/GetVillagePartakeAge', {
    method: 'get',     
    data,
  })
}
// 农作物占耕地统计
export const countAreaByPlant = (data) => {
  return request('/digital/console/farm-land/countAreaByPlant', {
    method: 'get',     
    data,
  })
}
// 随手拍事件分类统计  
export const statisticByType = (data) => {
  return request('/cons/console/PhotoAnywhere/statisticByType', {
    method: 'post',
    data,
  })
}
// 随手拍办理情况统计
export const statisticByeTypeMonth = (data) => {
  return request('/cons/console/PhotoAnywhere/statisticByeTypeMonth', {
    method: 'post',
    data,
  })
}
