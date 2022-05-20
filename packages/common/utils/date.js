import { format } from 'date-fns'

// 转换为日期
export const convertDate = (data) => {
  return data ? format(new Date(data), 'yyyy-MM-dd') : ''
}

// 转换为时间
export const convertDateTime = (data) => {
  return data ? format(new Date(data), 'yyyy-MM-dd HH:mm:ss') : ''
}

// 转换为时间
export const convertDateFormat = (data, dataFormat) => {
  return data ? format(new Date(data), dataFormat) : ''
}
