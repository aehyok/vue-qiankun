import request from '@/utils/request'
export const getFormConfig = (data) => {
  console.log(data, 'data-----')
  return request(`/Form/getSystemForm?id=${data}`, {
    method: 'get',
    data
  })
}

export const getTableConfig = (data) => {
  console.timeLog('config')
  console.log('data11111111111111111111-----', new Date().getMilliseconds())
  return request(`/Guideline/GetGuidelineDefine?guideLineId=${data}`, {
    method: 'get',
    data
  })
}

export const getTableData = (data) => {
  console.timeLog('data')
  console.log('data22222222222222222222-----', new Date().getMilliseconds())
  return request(`/mdquery/GetGuidelineData`, {
    method: 'post',
    data
  })
}

export const getLogList = (data) => {
  console.timeLog('config')
  console.log('data11111111111111111111-----', new Date().getMilliseconds())
  return request(`/Log`, {
    method: 'get',
    data
  })
}
