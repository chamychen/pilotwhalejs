import FieldSetterService from '@service/FieldSetterService'
import BaseDesignerComponent from '@core/BaseDesignerComponent'

export default ({
  mixins: [BaseDesignerComponent],
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      uiEntity: this.getUiEntity(),
      currentValue: {}
    }
  },
  methods: {
    getUiEntity() {
      let data = JSON.parse(localStorage.getItem('currentDesignData'))
      return data
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
  }
})