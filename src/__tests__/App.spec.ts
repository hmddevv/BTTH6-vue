import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders one row per product', () => {
    const wrapper = mount(App)
    const rows = wrapper.findAll('tbody tr')

    expect(rows).toHaveLength(5)
    expect(rows[0]?.text()).toContain('Leaf Rake')
    expect(rows[4]?.find('img').attributes('src')).toBe('/images/xbox-controller.svg')
  })
})
