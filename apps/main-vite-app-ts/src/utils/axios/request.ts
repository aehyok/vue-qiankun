import Axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, Canceler } from 'axios'
import { RequestType } from '.'

class Request implements RequestType {
  public instance: AxiosInstance

  private CancelToken = Axios.CancelToken

  private theQueue: {
    info: string
    c: Canceler
  }[] = []

  constructor(config: AxiosRequestConfig) {
    this.instance = this.genInstance(config)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  async request(config: AxiosRequestConfig) {
    return await this.instance.request(config)
  }

  private genInstance(config: AxiosRequestConfig) {
    return Axios.create({
      timeout: 1000 * 10,
      ...config
    })
  }

  // 添加请求拦截器
  private interceptorsRequest() {
    this.instance.interceptors.request.use(
      (config) => {
        config.cancelToken = new this.CancelToken((c) => {
          this.findInQueue({
            info: `${config.url}_${config.method}`,
            c
          })
          // 类似这种取消请求
          // 其实服务端是有收到的
          // 只是浏览器层面做了一层处理
        })
        return config
      },
      function (error) {
        // 对请求错误做些什么
        return Promise.reject(error)
      }
    )
  }

  // 添加响应拦截器
  private interceptorsResponse() {
    this.instance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const {config} = response
        this.removeQueue({
          info: `${config.url}_${config.method}`
        })
        // 对响应数据做点什么
        const { code = -1, data = {}, msg = '' } = response.data
        if (code === 0) {
          return Promise.resolve({
            ...response,
            code,
            data,
            status: response.status
          })
        }

        return Promise.reject({
          ...response,
          code,
          message: msg,
          status: response.status
        })
      },
      (error) => {
        // 遗留问题、超时时拿不到响应对象，就无法删除 theQueue 队列

        const config = (error.response && error.response.config) || {}
        this.removeQueue({
          info: `${config.url}_${config.method}`
        })
        const { status = 500, data = {} } = error.response || {}
        // 对响应错误做点什么
        return Promise.reject({
          code: -1,
          message: data.msg || error.message,
          status
        })
      }
    )
  }

  private findInQueue(requestInfo: any) {
    const index = this.theQueue.findIndex((request) => request.info === requestInfo.info)

    if (index >= 0) {
      this.theQueue[index].c('取消请求')
      this.theQueue.splice(index, 1)
    }
    this.theQueue.push(requestInfo)
  }

  private removeQueue(requestInfo: any) {
    const index = this.theQueue.findIndex((request) => request.info === requestInfo.info)
    if (index < 0) return
    this.theQueue.splice(index, 1)
  }
}

export default Request
