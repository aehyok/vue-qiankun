import { getDictionaryList } from '../services/common'
export function useMock() {

  const getDictionaryListApi = async(typeCode) => {
    console.log('queryList,', typeCode)
    const { code, data } = await getDictionaryList({
      typeCode: typeCode,
      limit: 999,
      status: 1
    });
    if(code === 200) {
      return data.docs
    } else {
      return []
    } 
};
  return {
    getDictionaryListApi
  }
}
