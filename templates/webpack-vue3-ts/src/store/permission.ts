import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'

export interface IPermissionState {
	routes: RouteRecordRaw[]
	dynamicRoutes: RouteRecordRaw[]
}

const hasPermission = (roles: string[], route: RouteRecordRaw) => {
	if (route.meta && route.meta.roles) {
		return roles.some(role => {
			if (route.meta?.roles !== undefined) {
				return Array.isArray(route.meta.roles) ? route.meta.roles.includes(role) : false
			} else {
				return false
			}
		})
	} else {
		return true
	}
}

const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
	const res: RouteRecordRaw[] = []
	routes.forEach(route => {
		const r = { ...route }
		if (hasPermission(roles, r)) {
			if (r.children) {
				r.children = filterAsyncRoutes(r.children, roles)
			}
			res.push(r)
		}
	})
	return res
}

export const permissionStore = defineStore({
	id: 'permission',
	state: (): IPermissionState => {
		return {
			routes: [],
			dynamicRoutes: []
		}
	},
	actions: {
		/** 设置路由 */
		// setRoutes(roles: string[]) {
		// 	let accessedRoutes: RouteRecordRaw[]
		// 	if (roles.includes('admin')) {
		// 		accessedRoutes = asyncRoutes
		// 	} else {
		// 		accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
		// 	}
		// 	this.routes = constantRoutes.concat(accessedRoutes)
		// 	this.dynamicRoutes = accessedRoutes
		// }
	}
})
