import BaseDesigner from '@core/BaseDesigner'
import ClassCodeLayout from '@core/class-code/layout'

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
      currentValue: {}
    }
  },
  methods: {
  },
  created() {

  }
})