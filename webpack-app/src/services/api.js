import request from '../utils/request'
export const getFormConfig = (data) => {
    console.log(data, 'data-----')
    return request(`/Form/getSystemForm?id=${data}`, {
        method: 'get',
        data,
    })
}

export const getTableConfig = (data) => {
    console.log(data, 'data-----')
    return request(`/Guideline/GetGuidelineDefine?guideLineId=${data}`, {
        method: 'post',
        data,
    })
}