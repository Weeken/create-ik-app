import store from 'vue-ls'

const options = {
	namespace: 'vuejs__', // key prefix
	name: 'ls', // name variable Vue.[ls] or this.[$ls],
	storage: 'local' // storage name session, local, memory
}
const { ls } = store.useStorage(options)

const storage = {
	get(key) {
		return ls.get(key)
	},
	/**
	 * @param key
	 * @param value
	 * @param time 过期时间
	 */
	set(key, value, time) {
		ls.set(key, value, time)
	},
	remove(key) {
		ls.remove(key)
	}
}

export default storage
