// 通过字典类型 code获取数据
// code为数值类型
export const getDictionary = (code) => {
  return JSON.parse(localStorage.getItem('dictionary'))
    .filter(item => item.code === code)
    .map(item => {
    return { 
      value: item.id + '', 
      label: item.name
    }
  })
}
