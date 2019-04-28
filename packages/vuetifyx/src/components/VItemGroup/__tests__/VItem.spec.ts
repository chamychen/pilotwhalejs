// Libraries
import Vue from 'vue'

// Components
import VItem from '../VItem'

// Utilities
import {
  createLocalVue,
  mount,
  Wrapper
} from '@vue/test-utils'

import toHaveBeenWarnedInit from '../../../../test/util/to-have-been-warned'

const itemWarning = '[Vuetifyx] The v-item component must be used inside a v-item-group'

describe('VItem', () => {
  type Instance = ExtractVue<typeof VItem>
  let mountFunction: (options?: object) => Wrapper<Instance>
  let localVue: typeof Vue

  beforeEach(() => {
    localVue = createLocalVue()

    mountFunction = (options = {}) => {
      return mount(VItem, {
        localVue,
        ...options
      })
    }
  })

  toHaveBeenWarnedInit()

  it('should warn if missing default scopedSlot', () => {
    mountFunction()

    expect('v-item is missing a default scopedSlot').toHaveBeenTipped()
    expect(itemWarning).toHaveBeenTipped()
  })

  it('should warn if multiple elements', () => {
    const Mock = {
      name: 'test',

      render: h => h(VItem, {
        scopedSlots: {
          default: () => '<div>foo</div>'
        }
      })
    }

    mount(Mock)

    expect('v-item should only contain a single element').toHaveBeenTipped()
    expect(itemWarning).toHaveBeenTipped()
  })

  it('should match snapshot activeClass', async () => {
    const Mock = {
      name: 'test',

      render: h => h(VItem, {
        props: { activeClass: 'foo' },
        scopedSlots: {
          default: () => h('div')
        }
      })
    }

    const wrapper = mount(Mock)

    expect(wrapper.html()).toMatchSnapshot()

    wrapper.vm.$children[0].isActive = true

    await wrapper.vm.$nextTick()

    expect(wrapper.html()).toMatchSnapshot()
    expect(itemWarning).toHaveBeenTipped()
  })
})
