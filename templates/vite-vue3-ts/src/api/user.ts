import request from '@/utils/axios'

/**
 * 登录
 * @param data
 */
const userApi = {
	Login: '/auth/login',
	Logout: '/auth/logout'
}
export function login(parameter: object) {
	return request({
		url: userApi.Login,
		method: 'post',
		data: parameter
	})
}
