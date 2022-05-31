import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Todo from "@/components/Todo.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("Todo.vue", () => {
  it("update 'msg' correctly", () => {
    const wrapper = shallowMount(Todo);
    // 点击 button
    wrapper.find("button").trigger("click");
    // 可以立即获取 msg 最新的值，不再需要 wrapper.vm.$nextTick();
    expect(wrapper.find("h1").text()).toMatch("new message");
  });
});
