import { stringUtils } from 'pilotwhale-utils'
import './CTab.sass'
import { VNode } from 'vue'
import TabItemDefine from './TabItemDefine'
import xbutton from '../../mixins/xbutton'

/* @vue/component */
export default {
  name: 'c-tab',
  mixins: [xbutton],
  props: {
    items: {
      type: Array
    },
    value: {
      type: String
    },
    color: {
      type: String
    },
    backgroundColor: {
      type: String,
      default: '#f5f5f5'
    },
    sliderColor: {
      type: String,
      default: 'primary'
    },
    tabMaxWidth: {
      type: [String]
    },
    height: {
      type: [String],
      default: '48'
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
    },
    // 垂直tab
    vertical: Boolean,
    // 垂直tab且文字垂直对齐
    verticalText: Boolean,
    // tab居中对齐
    centered: Boolean,
    // tab右对齐
    right: Boolean,
    app: {
      type: Boolean,
      default: false
    },
    contextClass: {
      type: String
    },
    contextHeight: {
      type: [String]
    },
    contextMaxHeight: {
      type: [String]
    },
    contextMinHeight: {
      type: [String]
    },
    contextMaxWidth: {
      type: [String]
    },
    contextMinWidth: {
      type: [String]
    },
    contextMarginTop: {
      type: [String, Number]
    },
    contextBackgroundColor: {
      type: [String],
      default: 'white'
    }
  },
  data() {
    return {
      currentValue: this.value,
      currentVertical: this.vertical,
      currentVerticalText: this.vertical && this.verticalText,
      currentContextHeight: this.contextHeight
    }
  },
  computed: {
    classes(): object {
      return {
        'c-tab': true,
        'c-tab-vertical': this.currentVertical,
        'c-tab-vertical-text': this.currentVerticalText
      }
    },
    btnCompenents(): object {
      return this.genButtons(this.currentValue)
    }
  },
  methods: {
    updateValue() {
      this.$emit('change', this.thisValue)
    },
    genToolbar(h) {
      if (this.currentVertical) {
        return this.genTabs(h)
      } else {
        let tabContext = this.genTabContext(h)
        let tabs = this.genTabs(h)
        let spacer = h('VSpacer')
        let classes = this.classes ? `${this.classes} v-toolbar-complex` : 'v-toolbar-complex'
        let toolbar = h('VToolbar', {
          class: classes,
          props: {
            color: this.backgroundColor,
            flat: this.flat,
            dark: this.dark,
            height: this.height,
            fixed: this.fixed,
            app: this.app
          }
        }, [...tabs, spacer, this.$slots.btn || this.btnCompenents])
        return h('div', [toolbar, tabContext])
      }
    },
    genTabs(h) {
      let childs = this.genTab(h)
      if (this.currentVertical) {
        let tabContext = this.genTabContext(h)
        childs = childs.concat(tabContext)
      }
      let tabMaxWidth = !stringUtils.isEmpty(this.tabMaxWidth) ? this.tabMaxWidth.trim() : null
      return h('VTabs', {
        class: this.classes,
        style: tabMaxWidth && this.$slots.btn ? (!isNaN(tabMaxWidth) ? `max-width:${tabMaxWidth}px;` : `max-width:${tabMaxWidth};`) : `max-width:100%;`,
        props: {
          color: this.color,
          backgroundColor: this.backgroundColor,
          sliderColor: this.sliderColor,
          dark: this.dark,
          vertical: this.currentVertical,
          height: this.height,
          centered: this.centered,
          right: this.right
        },
        model: {
          value: this.currentValue,
          callback: (value) => {
            this.$set(this, 'currentValue', value)
          }
        }
      }, childs)
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
        let contextHeight = !stringUtils.isEmpty(this.currentContextHeight) ? this.currentContextHeight.trim() : null
        let contextMinWidth = !stringUtils.isEmpty(this.contextMinWidth) ? this.contextMinWidth.trim() : null
        let contexMaxWidth = !stringUtils.isEmpty(this.contextMaxWidth) ? this.contextMaxWidth.trim() : null
        let contextMinHeight = !stringUtils.isEmpty(this.contextMinHeight) ? this.contextMinHeight.trim() : null
        let contextMaxHeight = !stringUtils.isEmpty(this.contextMaxHeight) ? this.contextMaxHeight.trim() : null

        let contentStyle = {
          height: contextHeight ? (!isNaN(contextHeight) ? `${contextHeight}px` : contextHeight) : null,
          minWidth: contextMinWidth ? (!isNaN(contextMinWidth) ? `${contextMinWidth}px` : contextMinWidth) : null,
          maxWidth: contexMaxWidth ? (!isNaN(contexMaxWidth) ? `${contexMaxWidth}px` : contexMaxWidth) : null,
          minHeight: contextMinHeight ? (!isNaN(contextMinHeight) ? `${contextMinHeight}px` : contextMinHeight) : null,
          maxHeight: contextMaxHeight ? (!isNaN(contextMaxHeight) ? `${contextMaxHeight}px` : contextMaxHeight) : null,
          backgroundColor: this.contextBackgroundColor,
          marginTop: this.contextMarginTop ? this.contextMarginTop : (this.app && !this.vertical ? '70px' : null)
          // overflow: 'auto'
        }
        let tab = h('VTabsItems', { props: { value: this.currentValue, activeClass: this.contextClass }, style: contentStyle }, arr)
        return tab
      }
    }
  },
  render(h): VNode {
    return this.genToolbar(h)
  },
  monted() {
    if (!this.currentValue && this.items && this.items.length > 0) {
      this.currentValue = this.items[0].key
    }
  }
}
