import { getDictionaryList } from '../services/common'
export function useMock() {

  const getDictionaryListApi = async(type) => {
    console.log('queryList,', type)
    const { data } = await getDictionaryList({
      code: type
    })
    return data
  }
  return {
    getDictionaryListApi
  }
}
