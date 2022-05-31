import store from 'vue-ls'

interface storeItem {
	get(key: string): string
	set(key: string, value: string, time?: number): void
	remove(key: string): void
}
const options = {
	namespace: 'vuejs__', // key prefix
	name: 'ls', // name variable Vue.[ls] or this.[$ls],
	storage: 'local' // storage name session, local, memory
}
const { ls } = store.useStorage(options)

const storage: storeItem = {
	get(key) {
		return ls.get(key)
	},
	/**
	 * @param key
	 * @param value
	 * @param time 过期时间
	 */
	set(key, value, time) {
		ls.set(key, value)
	},
	remove(key) {
		ls.remove(key)
	}
}

export default storage
