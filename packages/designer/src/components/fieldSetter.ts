import FieldSetterService from '@service/FieldSetterService'
import BaseDesigner from '@core/BaseDesigner'
import ElementTypes from '@core/element/types'
import ElementFactory from '@core/element/types/ElementFactory'

export default ({
  mixins: [BaseDesigner],
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      updateWithChange: true
    }
  },
  computed: {
    uiEntity() {
      return this.value ? ElementFactory.createElement(ElementTypes[this.value.elementTypeName]) : null
    },
    currentValue: {
      get() {
        if (this.value && this.value.elementTypeName) {
          let fieldEntity = ElementFactory.createElement(ElementTypes[this.value.elementTypeName]).mergeProps(this.value)
          return fieldEntity
        } else {
          return {}
        }
      },
      set(newValue) {
        this.$emit('saveField', newValue.toProps())
      }
    }
  },
  methods: {
    /**
     * 设置tab的高度
     */
    setTabContextHeight() {
      let height = 0
      let bodyHeight = window.innerHeight
      let appBar = document.getElementById('appBar')
      if (appBar) {
        let appBarHeight = appBar.children[0].clientHeight
        height = bodyHeight - appBarHeight
      } else {
        height = bodyHeight
      }
      this.$refs.tabs.currentContextHeight = height + 'px'
    },
    /**
     * 获取分类码选项
     */
    getItemsWithClassificationCode() {
      return FieldSetterService.getItemsWithClassificationCode()
    },
    /**
     * 获取分类码类型
     */
    getItemsWithClassificationCodeType() {
      return FieldSetterService.getItemsWithClassificationCodeType()
    }
  },
  created() {
    this.registerClassificationCodeMethod('getItemsWithClassificationCode')
    this.registerClassificationCodeMethod('getItemsWithClassificationCodeType')
  },
  mounted() {
    this.setTabContextHeight()
    window.onresize = this.setTabContextHeight
  }
})