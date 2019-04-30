import './index.styl'
import BaseDesigner from '../../core/BaseDesigner'
import FieldEntity from '../../dto/FieldEntity'

export default ({
  mixins: [BaseDesigner],
  name: 'designer',
  props: {},
  data() {
    return {
      uiEntity: new FieldEntity(),
      formData: {
        baseInfo: { elementTypeName: 'text' }
      }
    }
  }
})