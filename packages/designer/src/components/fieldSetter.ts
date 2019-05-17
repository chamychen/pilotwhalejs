import FieldSetterService from '@service/FieldSetterService'
import BaseDesigner from '@core/BaseDesigner'
import ElementTypes from '@core/element/ElementTypes'
import ElementFactory from '@core/element/ElementFactory'

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
  }
})