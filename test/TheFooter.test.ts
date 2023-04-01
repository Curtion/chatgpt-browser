import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheFooter from '../src/components/TheFooter.vue'

describe('TheFooter.vue', () => {
  it('渲染', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.html()).toContain('i-carbon-send')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('发送信息测试', async () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.find('.i-carbon-send').exists()).toBe(true)
    expect(msgList.value.length).toBe(0)
    await wrapper.get('input').setValue('你好')
    await nextTick()
    await wrapper.get('.i-carbon-send').trigger('click')
    await nextTick()
    expect(wrapper.find('.i-carbon-close-outline').exists()).toBe(true)
    expect(msgList.value.length).toBe(1)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
