import { mount } from '@vue/test-utils'
import HelloWorld from '../../src/components/HelloWorld.vue'
import Todo from '../../src/components/Todo.vue'
import { nextTick } from '@vue/composition-api'

test('HelloWorld.vue', async () => {
	expect(HelloWorld).toBeTruthy()
	// it('renders props.msg when passed', async () => {
	// 	const msg = 'new message'
	// 	const wrapper = mount(HelloWorld, {
	// 		propsData: { msg }
	// 	})
	// 	expect(wrapper.text()).toMatch(msg)
	// })
	const msg = 'new message'
	const wrapper = mount(HelloWorld, {
		propsData: { msg }
	})

	await nextTick()

	expect(wrapper.text()).toMatch(msg)
})

// test('Todo.vue', () => {
// 	it("update 'msg' correctly", () => {
// 		const wrapper = mount(Todo)
// 		// 点击 button
// 		wrapper.find('button').trigger('click')
// 		// 可以立即获取 msg 最新的值，不再需要 wrapper.vm.$nextTick();
// 		expect(wrapper.find('h1').text()).toMatch('new message')
// 	})
// })
