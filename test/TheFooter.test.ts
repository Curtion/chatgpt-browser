import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import TheFooter from '../src/components/TheFooter.vue'

describe('TheFooter.vue', () => {
  it('should render', () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.text()).toContain('2023')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be interactive', async () => {
    const wrapper = mount(TheFooter)
    expect(wrapper.text()).toContain('2023')

    expect(wrapper.find('.inc').exists()).toBe(true)

    await wrapper.get('button').trigger('click')

    expect(wrapper.text()).toContain('1')
  })
})
