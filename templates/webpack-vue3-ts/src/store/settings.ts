import { defineStore } from 'pinia'

export interface ISettingsState {
	showSettings: boolean
	showTagsView: boolean
	fixedHeader: boolean
	showSidebarLogo: boolean
	showThemeSwitch: boolean
	showScreenfull: boolean
}

export const settingsStore = defineStore({
	id: 'settings',
	state: (): ISettingsState => {
		return {
			/** 控制 settings panel 显示 */
			showSettings: true,
			/** 控制 tagsview 显示 */
			showTagsView: true,
			/** 如果为真，将固定 header */
			fixedHeader: false,
			/** 控制 siderbar logo 显示 */
			showSidebarLogo: true,
			/** 控制 换肤按钮 显示 */
			showThemeSwitch: true,
			/** 控制 全屏按钮 显示 */
			showScreenfull: true
		}
	},
	actions: {
		//...................................................................修改状态
		changeSetting(payload: { key: string; value: any }) {
			this.$patch(state => {
				const { key, value } = payload
				switch (key) {
					case 'fixedHeader':
						state.fixedHeader = value
						break
					case 'showSettings':
						state.showSettings = value
						break
					case 'showSidebarLogo':
						state.showSidebarLogo = value
						break
					case 'showTagsView':
						state.showTagsView = value
						break
					case 'showThemeSwitch':
						state.showThemeSwitch = value
						break
					case 'showScreenfull':
						state.showScreenfull = value
						break
					default:
						break
				}
			})
		}
	}
})
