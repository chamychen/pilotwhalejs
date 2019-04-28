// Libraries
import Vue from 'vue'

// Components
import VBottomNavigation from '../VBottomNavigation'
import VBtn from '../../VBtn/VBtn'

// Utilities
import {
  mount,
  Wrapper
} from '@vue/test-utils'

function createBtn (val = null) {
  const options = {
    attrs: {},
    props: { text: true }
  }
  if (val) options.attrs = { value: val }

  return Vue.component('test', {
    render (h) {
      return h(VBtn, options)
    }
  })
}

describe('VBottomNavigation.ts', () => {
  type Instance = InstanceType<typeof VBottomNavigation>
  let mountFunction: (options?: object) => Wrapper<Instance>

  beforeEach(() => {
    mountFunction = (options = {}) => {
      return mount(VBottomNavigation, {
        mocks: {
          $vuetifyx: {
            application: {
              bottom: 0,
              register: () => {},
              unregister: () => {}
            }
          }
        },
        ...options
      })
    }
  })

  it('should be visible with a true value', () => {
    const wrapper = mountFunction({
      propsData: { inputValue: true },
      slots: {
        default: [VBtn, VBtn]
      }
    })

    expect(wrapper.vm.styles).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()

    wrapper.setProps({ inputValue: false })

    expect(wrapper.vm.styles).toMatchSnapshot()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should update application when height or inputValue changes', () => {
    const wrapper = mountFunction({
      propsData: {
        app: true
      },
      slots: {
        default: [VBtn, VBtn]
      }
    })

    const spy = jest.spyOn(wrapper.vm, 'updateApplication')

    wrapper.setProps({ height: 80 })

    expect(spy).toHaveBeenCalled()

    wrapper.setProps({ inputValue: false })

    expect(spy).toHaveBeenCalledTimes(2)
  })

  // deprecated
  it('should emit update when active changes', async () => {
    const update = jest.fn()
    const wrapper = mountFunction({
      slots: {
        default: [VBtn, VBtn]
      }
    })

    wrapper.vm.$on('update:active', update)

    const btn = wrapper.find('.v-btn')
    btn.trigger('click')

    await wrapper.vm.$nextTick()
    expect(update).toHaveBeenCalledWith(0)
  })
})
