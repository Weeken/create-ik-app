import { shallowMount } from '@vue/test-utils'
import Todo from '../../src/components/Todo.vue'

describe('Todo.vue', () => {
	it("update 'msg' correctly", () => {
		const wrapper = shallowMount(Todo)
		// 点击 button
		wrapper.find('button').trigger('click')
		// 可以立即获取 msg 最新的值，不再需要 wrapper.vm.$nextTick();
		expect(wrapper.find('h1').text()).toMatch('new message')
	})
})
