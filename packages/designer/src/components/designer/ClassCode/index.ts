import BaseDesigner from '@core/BaseDesigner'
import ClassCodeLayout from '@core/class-code/layout'
import ClassCodeButtons from './button'

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
      buttons: ClassCodeButtons
    }
  },
  methods: {
    addChild() {
      alert(1)
    }
  },
  created() {

  }
})