import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElNotification } from 'element-plus'

// 创建 axios 实例
const request = axios.create({
	baseURL: window.SYSTEM_CONFIG.ApiUrl,
	timeout: 5000,
	headers: { 'Content-Type': 'application/json' }
})

// 异常拦截处理器
const errorHandler = (error: any) => {
	if (error.response) {
		const data = error.response.data
		// 从 localstorage 获取 token
		// const token = storage.get(ACCESS_TOKEN)
		if (error.response.status === 403) {
			ElNotification.error({
				title: 'Forbidden',
				message: data.message
			})
		}
		if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
			ElNotification.error({
				title: 'Unauthorized',
				message: 'Authorization verification failed'
			})
		}
	}
	return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config: AxiosRequestConfig) => {
	// const token = storage.get(ACCESS_TOKEN)
	// 如果 token 存在
	// 让每个请求携带自定义 token 请根据实际情况自行修改
	// if (token) {
	//     config.headers['Access-Token'] = token
	// }
	return config
}, errorHandler)

// response interceptor
request.interceptors.response.use((response: AxiosResponse) => {
	return response.data
}, errorHandler)

export default request
