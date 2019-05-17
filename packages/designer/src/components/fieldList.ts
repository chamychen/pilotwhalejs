import BaseDesigner from '@core/BaseDesigner'
import FieldListDto from '@entity/FieldList'

export default ({
  mixins: [BaseDesigner],
  props: {
    value: {
      type: Object
    },
    dataList: {
      type: Array
    }
  },
  data() {
    return {
      currentValue: { fieldList: this.dataList },
      uiEntity: new FieldListDto()
    }
  },
  computed: {
    selectedItem: {
      get() {
        return [this.value]
      },
      set(newVal) {
        this.$emit('input', newVal[0])
      }
    }
  }
})