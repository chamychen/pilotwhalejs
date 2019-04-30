// Styles
import '../../styles/components/_selection-controls.sass'
import '../../stylus/components/_radio-group.styl'

// Components
import VInput from '../VInput'

// Mixins
import Comparable from '../../mixins/comparable'
import { provide as RegistrableProvide } from '../../mixins/registrable'
import { getPropertyFromItem } from '../../util/helpers'

/* @vue/component */
export default VInput.extend({
  name: 'v-radio-group',

  mixins: [Comparable, RegistrableProvide('radio')],

  model: {
    prop: 'value',
    event: 'change'
  },

  provide() {
    return {
      radio: this
    }
  },

  props: {
    column: {
      type: Boolean,
      default: false
    },
    height: {
      type: [Number, String],
      default: 'auto'
    },
    mandatory: {
      type: Boolean,
      default: true
    },
    name: String,
    row: { type: Boolean, default: true },
    // If no value set on VRadio
    // will match valueComparator
    // force default to null
    value: {
      default: null
    },
    type: {
      // 'checkbox' | 'switch' | 'radio'
      type: String,
      default: 'checkbox'
    },
    items: {
      type: Array,
      default: () => []
    },
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    itemHideDetails: {
      type: Boolean,
      default: true
    }
  },

  data: () => ({
    internalTabIndex: -1,
    radios: []
  }),

  computed: {
    classes() {
      return {
        // 'v-input--selection-controls v-input--radio-group': true,
        'v-radio-roup': true, // chamy add
        'v-input--radio-group--column': this.column && !this.row,
        'v-input--radio-group--row': this.row
      }
    }
  },

  watch: {
    hasError: 'setErrorState',
    internalValue: 'setActiveRadio'
  },

  mounted() {
    this.setErrorState(this.hasError)
    if (this.type.toLowerCase() === 'radio') {
      this.setActiveRadio()
    }
  },

  methods: {
    genDefaultSlot() {
      const group = this.$createElement(
        'div',
        {
          staticClass: 'v-input--radio-group__input',
          attrs: {
            role: 'radiogroup'
          }
        },
        VInput.options.methods.genDefaultSlot.call(this)
      )
      if (this.items) {
        let tag = 'VCheckbox'
        if (this.type && this.type.toLowerCase() === 'switch') {
          tag = 'VSwitch'
        } else if (this.type && this.type.toLowerCase() === 'radio') {
          tag = 'VRadio'
        }
        this.items.forEach((item, index) => {
          group.children.push(
            this.$createElement(tag, {
              key: this.$vnode.key + '_' + this.type + index,
              model:
                this.type.toLowerCase() !== 'radio'
                  ? {
                      value: this.internalValue,
                      callback: value => {
                        let input = this.internalValue
                        if (!Array.isArray(input)) {
                          input = []
                          input.push(value)
                        } else {
                          input = value
                        }
                        this.internalValue = input
                      }
                    }
                  : null,
              props: {
                label: !this.itemHideDetails ? null : this.getText(item),
                value: this.getValue(item),
                disabled: this.getDisabled(item),
                hideDetails: this.itemHideDetails,
                hint: this.itemHideDetails ? null : this.getText(item),
                persistentHint: this.itemHideDetails ? null : true
              }
            })
          )
        })
      }
      return group
    },
    onRadioChange(value) {
      if (this.disabled) return

      this.hasInput = true
      this.internalValue = value
      this.setActiveRadio()
      this.$nextTick(this.validate)
    },
    onRadioBlur(e) {
      if (!e.relatedTarget || !e.relatedTarget.classList.contains('v-radio')) {
        this.hasInput = true
        this.$emit('blur', e)
      }
    },
    register(radio) {
      radio.isActive = this.valueComparator(this.internalValue, radio.value)
      radio.$on('change', this.onRadioChange)
      radio.$on('blur', this.onRadioBlur)
      this.radios.push(radio)
    },
    setErrorState(val) {
      for (let index = this.radios.length; --index >= 0;) {
        this.radios[index].parentError = val
      }
    },
    setActiveRadio() {
      for (let index = this.radios.length; --index >= 0;) {
        const radio = this.radios[index]
        radio.isActive = this.valueComparator(this.internalValue, radio.value)
      }
    },
    unregister(radio) {
      radio.$off('change', this.onRadioChange)
      radio.$off('blur', this.onRadioBlur)

      const index = this.radios.findIndex(r => r === radio)

      /* istanbul ignore else */
      if (index > -1) this.radios.splice(index, 1)
    },
    getDisabled(item) {
      return getPropertyFromItem(item, this.itemDisabled, false)
    },
    getText(item) {
      return getPropertyFromItem(item, this.itemText, item)
    },
    getValue(item) {
      return getPropertyFromItem(item, this.itemValue, this.getText(item))
    }
  }
})
