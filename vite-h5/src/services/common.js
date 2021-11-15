import request from "/@/utils/request";

// 字典表访问
export const getDictionaryList = (data) => {
    console.log(data, 'data-----')
    data= {
      ...data,
      limit: 999,
      status: 1
    }
    return request(`/basic/console/dictionary/getDictionaryList`, {
        method: 'post',
        data,
    })
}

// 字典表访问
export const getBasicDictionaryList = (data) => {
    return request('/basic/console/dictionary/getMoreDictionaryList', {
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

// 获取地图参数列表
export const getMapConfigList = (data) => {
    return request(`/basic/console/mapConf/list/${data.areaId}`, {
        method: 'get',
    })
}


// 获取打点列表数据(乡村治理首页和数字农业首页)
export const getVillagePlotList = (data) => {
  return request('/gis/console/plotitem/area/list', {
    method: 'post',
    data,
  })
}
