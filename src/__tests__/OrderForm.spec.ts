import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import OrderForm from '../components/OrderForm.vue'

describe('OrderForm', () => {
  it('updates total when items are chosen and returned', async () => {
    const wrapper = mount(OrderForm)
    const items = wrapper.findAll('li')
    const total = () => wrapper.find('.total span').text()

    expect(items).toHaveLength(4)
    expect(total()).toBe('$0.00')

    await items[0]!.trigger('click')
    await items[1]!.trigger('click')
    expect(total()).toBe('$119.00')
    expect(items[0]!.classes()).toContain('active')

    await items[2]!.trigger('click')
    expect(total()).toBe('$159.00')

    // Trả món Cà Phê Sữa -> trừ lại tiền, chuyển về màu hồng
    await items[2]!.trigger('click')
    expect(total()).toBe('$119.00')
    expect(items[2]!.classes()).not.toContain('active')
  })

  it('checks out a bill and starts a new order', async () => {
    const wrapper = mount(OrderForm)
    const checkout = wrapper.find('button')

    // Chưa chọn món thì không cho thanh toán
    expect(checkout.attributes('disabled')).toBeDefined()

    const items = wrapper.findAll('li')
    await items[0]!.trigger('click')
    await items[2]!.trigger('click')
    await wrapper.find('button').trigger('click')

    expect(wrapper.findAll('.bill tbody tr')).toHaveLength(2)
    expect(wrapper.find('.total-row').text()).toContain('$109.00')

    const confirm = () => wrapper.findAll('button').find((b) => b.text() === 'Xác nhận')!
    await wrapper.find('input').setValue(100)
    expect(wrapper.text()).toContain('Chưa đủ tiền')
    expect(confirm().attributes('disabled')).toBeDefined()

    await wrapper.find('input').setValue(120)
    expect(wrapper.text()).toContain('$11.00')
    await confirm().trigger('click')
    expect(wrapper.text()).toContain('Thanh toán thành công')

    await wrapper.findAll('button').find((b) => b.text() === 'Đơn mới')!.trigger('click')
    expect(wrapper.find('.total span').text()).toBe('$0.00')
    expect(wrapper.findAll('li.active')).toHaveLength(0)
  })
})
