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
    getItemsWithClassCode() {
      return FieldSetterService.getItemsWithClassCode()
    },
    /**
     * 获取分类码类型
     */
    getItemsWithClassCodeType() {
      return FieldSetterService.getItemsWithClassCodeType()
    }
  },
  created() {
    this.registerClassCodeMethod('getItemsWithClassCode')
    this.registerClassCodeMethod('getItemsWithClassCodeType')
  }
})