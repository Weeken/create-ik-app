import axios from 'axios'
import { isNotEmpty } from '@/utils'

/*
options: {
  baseURL: string,
  timeout: number,
  contentType: string,
  requestInterceptors: function(config),
  responseInterceptors: function(response)
}
*/

class Fetch {
  constructor(options) {
    //
    this.baseURL = options.baseURL || window.SYSTEM_CONFIG.ApiUrl
    //
    this.timeout = options.timeout || 60 * 1000 * 5
    // 要自定义的header
    this.headers = options.headers || {}
    // 请求拦截器
    this.requestInterceptors = options.requestInterceptors || (config => config)
    // 响应拦截器
    this.responseInterceptors = options.responseInterceptors || (response => response)
  }

  // 设置请求头
  setHeaders(headers) {
    const _headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...this.headers
    }
    return { ...headers, ..._headers }
  }

  // 初始化请求配置
  initConfig(config) {
    config.headers = this.setHeaders(config.headers)
    return this.requestInterceptors(config)
  }

  // 错误处理
  errorHandler(err) {
    const result = {
      status: err && err.response && isNotEmpty(err.response.status)
        ? err.response.status
        : err && isNotEmpty(err.data.result_code)
          ? err.data.result_code
          : err && isNotEmpty(err.data.resultCode)
            ? err.data.resultCode
            : 0,
      message: err && err.message ? err.message : err && err.response && err.response.data && err.response.data.message ? err.response.data.message : null,
      info: err
    }
    if (!result.message) {
      switch (result.status) {
        case 400:
          result.message = '请求错误'
          break
        case 401:
          result.message = '未授权，请重新登录'
          break
        case 403:
          result.message = '拒绝访问'
          break
        case 404:
          result.message = '请求出错'
          break
        case 408:
          result.message = '请求超时'
          break
        case 500:
          result.message = '服务器错误'
          break
        case 501:
          result.message = '服务未实现'
          break
        case 502:
          result.message = '网络错误'
          break
        case 503:
          result.message = '服务不可用'
          break
        case 504:
          result.message = '网络超时'
          break
        case 505:
          result.message = 'HTTP版本不受支持'
          break
      }
    }
    return result
  }

  // 响应处理
  responseHandler(response) {
    return this.responseInterceptors(response)
  }

  // 创建axios实例
  createInstance() {
    const instance = axios.create({
      baseURL: this.baseURL,
      timeout: this.timeout
    })
    // 请求拦截
    instance.interceptors.request.use(config => {
      return this.initConfig(config)
    }, error => {
      return Promise.reject(this.errorHandler(error))
    })
    // 响应拦截
    instance.interceptors.response.use(response => {
      return this.responseHandler(response)
    }, error => {
      return Promise.reject(this.errorHandler(error))
    })

    return instance
  }
}

export default Fetch
