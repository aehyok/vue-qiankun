// 引入axios
 import axios from 'axios'

 // 内容类型
export const getContentTypeList = () => {
  return axios('/get/contentType')
}

// 灾情类型
export const getPestTypeList = () => {
  return axios('/get/pestTypeList')
}

// 灾情等级
export const getPestLevelList = () => {
  return axios('/get/pestLevelList')
}

export const getTableAuditStatus=()=>{
    return axios('/get/table/auditStatus')
 }
