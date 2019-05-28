// Styles
import './VBtnToggle.sass'

// Mixins
import ButtonGroupInstance from '../../mixins/button-group'

/* @vue/component */
export default ButtonGroupInstance.extend({
  name: 'v-btn-toggle',

  props: {
    activeClass: {
      type: String,
      default: 'v-btn--active'
    },
    rounded: Boolean
  },

  computed: {
    classes (): object {
      return {
        ...ButtonGroupInstance.options.computed.classes.call(this),
        'v-btn-toggle': true,
        'v-btn-toggle--rounded': this.rounded
      }
    }
  }
})
