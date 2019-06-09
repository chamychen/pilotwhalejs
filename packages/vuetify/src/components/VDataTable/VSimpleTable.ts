import './VSimpleTable.sass'

import { convertToUnit } from '../../util/helpers'
import Themeable from '../../mixins/themeable'
import mixins from '../../util/mixins'
import { VNode } from 'vue'
import { ScrollData } from './mixins/model'

export default mixins(Themeable).extend({
  name: 'v-simple-table',

  props: {
    fixedHeader: Boolean,
    height: [Number, String],
    dense: Boolean,
    isMobile: Boolean,
    // add by chamy
    hasFixedCols: Boolean
  },

  computed: {
    classes(): Record<string, boolean> {
      return {
        'v-data-table--dense': this.dense,
        'v-data-table--fixed-height': !!this.height && !this.fixedHeader,
        'v-data-table--fixed-header': this.fixedHeader,
        ...this.themeClasses
      }
    }
  },
  data() {
    return {
      // 待提交滚动条数据
      toSubmitScrollData: null
    }
  },
  methods: {
    genWrapper() {
      return (
        this.$slots.wrapper ||
        this.$createElement(
          'div',
          {
            staticClass: 'v-data-table__wrapper',
            style: {
              height: convertToUnit(this.height)
            },
            on: {
              scroll: (e) => {
                let obj = new ScrollData()
                obj.scrollWidth = e.target.scrollWidth
                obj.scrollHeight = e.target.scrollHeight
                obj.scrollLeft = e.target.scrollLeft
                obj.scrollTop = e.target.scrollTop
                this.$set(this, 'toSubmitScrollData', obj)
                // 此处用于确定滚动条滚动终止才触发更新
                setTimeout(() => {
                  if (obj === this.toSubmitScrollData) {
                    let dataComponent = this.$parent
                    dataComponent.$emit('changeScroll', obj)
                  }
                }, 200)
              }
            }
          },
          [this.$createElement('table', {
            style: !this.isMobile && this.hasFixedCols ? 'table-layout:fixed;' : ''
          }, this.$slots.default)]
        )
      )
    }
  },

  render(h): VNode {
    return h(
      'div',
      {
        staticClass: 'v-data-table',
        class: this.classes
      },
      [this.$slots.top, this.genWrapper(), this.$slots.bottom]
    )
  }
})
