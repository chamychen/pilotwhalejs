import FieldListEntity from '@dto/fieldList'
import BaseDesigner from '@core/BaseDesigner'
import FieldEntity from '@dto/FieldEntity'
import DefaultElementGenerator from '@core/process/DefaultElementGenerator'

export default ({
  mixins: [BaseDesigner],
  props: ['value'],
  data() {
    return {
      uiEntity: new FieldListEntity()
    }
  },
  computed: {
    currentValue() {
      return {
        fieldList: new DefaultElementGenerator(new FieldEntity()).getInitElements()
      }
    },
    selectedItem: {
      get() {
        return this.value ? [this.value] : null
      },
      set(newValue) {
        this.$emit('input', newValue[0])
      }
    }
  }
})