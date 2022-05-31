/**
 * 部署所属环境dev uat gray product
 * Url 前端访问地址
 * apiUrl  Api访问地址
 * LoginIn  SSO登录地址
 * StatisticApiUrl 数据统计java api
 */
(function (root, factory) {
	'use strict'
	if (typeof module === 'object' && module.exports) {
		module.exports = factory()
	} else if (typeof define === 'function' && define.amd) {
		define(factory)
	} else {
		root.SYSTEM_CONFIG = factory(root)
	}
})(this, function (root) {
	var host = {
		dev: {
			Url: 'http://ew.dev.aiagain.com/system',
			ApiUrl: 'https://ptapi.ew.dev.aiagain.com',
			LoginIn:
				'https://login.sso.dev.aiagain.com/html/EnterpriseWeChat/scan-login.html?redirect_uri={redirect_uri}&client_id=test_app_key_EnterpriseWeChat',
			StatisticApiUrl: 'https://datastat-ew-uat.aiduoke.cn',
			UnitPermission: true,
			StorageKey: 'EwPlatform'
		},
		uat: {
			Url: 'https://web.ew.uat.aiagain.com/system',
			ApiUrl: 'https://ptapi.ew.uat.aiagain.com',
			LoginIn:
				'https://login-sso-uat.aiagain.com/html/EnterpriseWeChat/scan-login.html?redirect_uri={redirect_uri}&client_id=test_app_key_EnterpriseWeChat',
			StatisticApiUrl: 'https://datastat-ew-uat.aiduoke.cn',
			UnitPermission: true,
			StorageKey: 'EwPlatform'
		}
	}
	// 发布请修改此地方
	var config = { type: 'uat', proxy: true }
	host = host[config.type]
	if (config.proxy) {
		host.Proxy = host.ApiUrl
		host.ApiUrl = '/dev-api'
		host.StatisticProxy = host.StatisticApiUrl
		host.StatisticApiUrl = '/statistical-api'
	}

	return host
})
