import { format } from 'date-fns'

const useDate = () => {
  // 转换为日期
  const convertDate = (data) => {
    return data ? format(new Date(data), 'yyyy-MM-dd') : ''
  }

  // 转换为时间
  const convertDateTime = (data) => {
    return data ? format(new Date(data), 'yyyy-MM-dd HH:mm:ss') : ''
  }

  // 转换为时间
  const convertDateFormat = (data, dataFormat) => {
    return data ? format(new Date(data), dataFormat) : ''
  }

  return {
    convertDate,
    convertDateTime,
    convertDateFormat
  }
}

export default useDate
