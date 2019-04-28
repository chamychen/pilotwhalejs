import { VNode } from 'vue'
import TabItemDefine from './TabItemDefine'

/* @vue/component */
export default {
  name: 'c-tab',
  props: {
    items: {
      type: Array
    },
    value: {
      type: String
    },
    color: {
      type: String,
      default: 'white'
    },
    sliderColor: {
      default: 'primary'
    },
    tabMaxWidth: {
      type: [String, Number]
    },
    height: {
      type: [String, Number],
      default: 48
    },
    dark: {
      type: Boolean,
      defalut: false
    },
    flat: {
      type: Boolean,
      default: true
    },
    // 是否固定在顶部，不被滚动条移动
    fixed: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    classes(): object {
      return {
        'c-tab': true
      }
    }
  },
  methods: {
    updateValue() {
      this.$emit('change', this.thisValue)
    },
    genToolbar(h) {
      let tabs = this.genTabs(h)
      let spacer = h('VSpacer')
      return h('VToolbar', {
        class: this.classes,
        props: {
          color: this.color,
          flat: this.flat,
          dark: this.dark,
          height: this.height,
          fixed: this.fixed
        }
        // style: 'margin-bottom:25px'
      }, [...tabs, spacer, this.$slots.btn])
    },
    genTabs(h) {
      return h('VTabs', {
        class: this.classes,
        style: this.tabMaxWidth && this.$slots.btn ? `max-width:${this.tabMaxWidth};` : `max-width:100%;`,
        props: {
          backgroundColor: this.color,
          sliderColor: this.sliderColor,
          dark: this.dark
        },
        model: {
          value: this.currentValue,
          callback: (value) => {
            this.$set(this, 'currentValue', value)
          }
        }
      }, this.genTab(h))
    },
    genTab(h) {
      if (this.items) {
        let arr = []
        this.items.forEach((item: TabItemDefine) => {
          if (!item.hide) {
            let tab = h('VTab', {
              key: item.key,
              props: {
                href: `#${item.key}`,
                disabled: item.disabled
              },
              domProps: {
                innerHTML: item.name
              }
            })
            arr.push(tab)
          }
        })
        return arr
      }
    },
    genTabContext(h) {
      if (this.items) {
        let arr = []
        this.items.forEach((item: TabItemDefine, index) => {
          if (!item.hide) {
            let key = `${item.key}_box`
            let tabItem = h('VTabItem', {
              key,
              props: {
                value: item.key
              }
            }, this.$slots[item.key] || this.$slots[item.key.toLowerCase()])
            arr.push(tabItem)
          }
        })
        let tab = h('VTabsItems', { props: { value: this.currentValue } }, arr)
        return tab
      }
    }
  },
  render(h): VNode {
    let toolbar = this.genToolbar(h)
    let tabContext = this.genTabContext(h)
    return h('div', [toolbar, tabContext])
  },
  monted() {
    if (!this.currentValue && this.items && this.items.length > 0) {
      this.currentValue = this.items[0].key
    }
  }
}
