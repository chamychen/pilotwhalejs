import BaseDesigner from '@core/BaseDesigner'
import FieldEntity from '@dto/FieldEntity'
import BaseInfoEntity from '@entity/BaseInfoEntity'
import CssEntity from '@entity/CssEntity'
import EventEntity from '@entity/EventEntity'

export default ({
  mixins: [BaseDesigner],
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      uiEntity: new FieldEntity()
    }
  },
  computed: {
    currentValue: {
      get() {
        if (this.value) {
          let data = this.value
          let fieldEntity = new FieldEntity()
          fieldEntity.baseInfo = data as BaseInfoEntity
          fieldEntity.css = data as CssEntity
          fieldEntity.event = data as EventEntity
          return fieldEntity
        } else {
          return {}
        }
      },
      set(newValue) {
        this.$emit('input', newValue)
      }
    }
  }
})