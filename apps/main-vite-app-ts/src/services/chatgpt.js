import request from '../utils/request.js'

export const getChatCompletions = (data) => {
  return request('/openai/getChatCompletions', {
    method: 'post',
    data
  })
}
