// 判断环境不是 prod 或者 preview 是 true 时，加载 mock 服务
if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
	// 使用同步加载依赖
	console.log('mock mounting')
	const Mock = require('mockjs2')
	require('./services/auth')
	require('./services/user')

	Mock.setup({
		timeout: 800 // setter delay time
	})
	console.log('mock mounted')
}
