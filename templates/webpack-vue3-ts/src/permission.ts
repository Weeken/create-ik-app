import router from './router'
// import storage from '@utils/storage'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
// import { ACCESS_TOKEN } from '@/router/global'
// import { permissionStore } from '@/store/permission'
// NProgress.configure({ showSpinner: false })
const allowList = ['login', 'register', 'registerResult']
const loginRoutePath = '/login'
const defaultRoutePath = '/'

router.beforeEach(async (to, from, next) => {
	// NProgress.start()
	// if (storage.get(ACCESS_TOKEN)) {
	// 	if (to.path === loginRoutePath) {
	// 		next({ path: defaultRoutePath })
	// 	} else {
	// 		const { roles, setRoles } = userStore()
	// 		if (roles.length === 0) {
	// 			const { setRoutes } = permissionStore()
	// 			setRoutes(['admin'])
	// 			setRoles(['admin'])
	// 			asyncRoutes.forEach(route => {
	// 				router.addRoute(route)
	// 			})
	// 			// 设置 replace: true, 因此导航将不会留下历史记录
	// 			next({ ...to, replace: true })
	// 		} else {
	// 			next()
	// 		}
	// 	}
	// } else {
	// 	if (allowList.includes(to.name as string)) {
	// 		// 在免登录名单，直接进入
	// 		next()
	// 	} else {
	// 		next({ path: loginRoutePath, query: { redirect: to.fullPath } })
	// 		NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
	// 	}
	// }
})
