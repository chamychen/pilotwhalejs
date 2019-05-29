import BaseDesigner from '@core/BaseDesigner'
import ClassCodeLayout from '@core/class-code/layout'
import ClassCodeButtons from './button'
import ClassCodeItem from '@core/class-code/model/ClassCodeItem'

export default ({
  mixins: [BaseDesigner],
  props: {
    value: {
      type: Object
    }
  },
  data() {
    return {
      uiEntity: new ClassCodeLayout(),
      currentValue: {},
      buttons: ClassCodeButtons,
      childSelectedItem: null
    }
  },
  methods: {
    addChildRow() {
      this.addTableRow('child', new ClassCodeItem())
    },
    delChildRow() {
      this.delTableRow('child')
    }
  },
  created() {

  }
})