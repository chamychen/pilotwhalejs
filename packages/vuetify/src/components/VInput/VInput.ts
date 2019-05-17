// Styles
import '../../stylus/components/_inputs.styl'

// Components
import VIcon from '../VIcon'
import VLabel from '../VLabel'
import VMessages from '../VMessages'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'
import Validatable from '../../mixins/validatable'

// Utilities
import {
  convertToUnit,
  kebabCase
} from '../../util/helpers'
import { deprecate } from '../../util/console'
import mixins, { ExtractVue } from '../../util/mixins'

// Types
import Vue, { VNode, VNodeData } from 'vue'
interface options extends Vue {
  /* eslint-disable-next-line camelcase */
  $_modelEvent: string
}

export default mixins<options &
  /* eslint-disable indent */
  ExtractVue<[
    typeof Colorable,
    typeof Themeable,
    typeof Validatable
  ]>
/* eslint-enable indent */
>(
  Colorable,
  Themeable,
  Validatable
  /* @vue/component */
).extend({
  name: 'v-input',

  props: {
    appendIcon: String,
    /** @deprecated */
    appendIconCb: Function,
    backgroundColor: {
      type: String,
      default: ''
    },
    height: [Number, String],
    hideDetails: Boolean,
    hint: String,
    label: String,
    loading: Boolean,
    persistentHint: Boolean,
    prependIcon: String,
    /** @deprecated */
    prependIconCb: Function,
    outline: Boolean,
    outlineExpand: Boolean,
    isSubheader: Boolean,
    subheaderWidth: [Number, String],
    value: { required: false }
  },

  data() {
    return {
      labelWidth: 0,
      prefixWidth: 0,
      prependWidth: 0,
      attrsInput: {},
      lazyValue: this.value as any,
      hasMouseDown: false
    }
  },

  computed: {
    classes: () => ({}),
    classesInput(): object {
      return {
        ...this.classes,
        'v-input--has-state': this.hasState,
        'v-input--hide-details': this.hideDetails,
        'v-input--is-label-active': this.isLabelActive,
        'v-input--is-dirty': this.isDirty,
        'v-input--is-disabled': this.disabled,
        'v-input--is-outlineExpand': this.outline && this.outlineExpand,
        'v-input--is-focused': this.isFocused,
        'v-input--is-loading': this.loading !== false && this.loading !== undefined,
        'v-input--is-readonly': this.readonly,
        'v-input--outline': this.outline,
        ...this.themeClasses
      }
    },
    directivesInput() {
      return []
    },
    hasHint() {
      return !this.hasMessages &&
        this.hint &&
        (this.persistentHint || this.isFocused)
    },
    hasLabel() {
      return Boolean(this.$slots.label || this.label)
    },
    // Proxy for `lazyValue`
    // This allows an input
    // to function without
    // a provided model
    internalValue: {
      get() {
        return this.lazyValue
      },
      set(val: any) {
        this.lazyValue = val
        this.$emit(this.$_modelEvent, val)
      }
    },
    isDirty() {
      return !!this.lazyValue
    },
    isDisabled() {
      return Boolean(this.disabled || this.readonly)
    },
    isLabelActive() {
      return this.isDirty
    }
  },

  watch: {
    value(val) {
      this.lazyValue = val
    }
  },

  beforeCreate() {
    // v-radio-group needs to emit a different event
    // https://github.com/vuetifyjs/vuetify/issues/4752
    this.$_modelEvent = (this.$options.model && this.$options.model.event) || 'input'
  },

  methods: {
    genContent() {
      return [
        this.genPrependSlot(),
        this.genControl(),
        this.genAppendSlot()
      ]
    },
    genControl() {
      return this.$createElement('div', {
        staticClass: 'v-input__control'
      }, [
          this.genInputSlot(),
          this.genMessages()
        ])
    },
    genDefaultSlot() {
      return [
        this.genLabel(),
        this.$slots.default
      ]
    },
    // TODO: remove shouldDeprecate (2.0), used for clearIcon
    genIcon(
      type: string,
      cb?: (e: Event) => void,
      shouldDeprecate = true
    ) {
      const icon = (this as any)[`${type}Icon`]
      const eventName = `click:${kebabCase(type)}`
      cb = cb || (this as any)[`${type}IconCb`]

      if (shouldDeprecate && type && cb) {
        deprecate(`:${type}-icon-cb`, `@${eventName}`, this)
      }

      const data: VNodeData = {
        props: {
          color: this.validationState,
          dark: this.dark,
          disabled: this.disabled,
          light: this.light
        },
        on: !(this.$listeners[eventName] || cb)
          ? undefined
          : {
            click: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()

              this.$emit(eventName, e)
              cb && cb(e)
            },
            // Container has mouseup event that will
            // trigger menu open if enclosed
            mouseup: (e: Event) => {
              e.preventDefault()
              e.stopPropagation()
            }
          }
      }

      return this.$createElement('div', {
        staticClass: `v-input__icon v-input__icon--${kebabCase(type)}`,
        key: `${type}${icon}`
      }, [
          this.$createElement(
            VIcon,
            data,
            icon
          )
        ])
    },
    genInputSlot() {
      return this.$createElement('div', this.setBackgroundColor(this.backgroundColor, {
        staticClass: 'v-input__slot',
        style: { height: convertToUnit(this.height) },
        directives: this.directivesInput,
        on: {
          click: this.onClick,
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp
        },
        ref: 'input-slot'
      }), [this.genDefaultSlot()])
    },
    genFieldset() {
      if (!this.outline) return null
      let data = {
        attrs: {
          'aria-hidden': true
        }
      }
      // if (this.validationState) {
      //   Colorable.options.methods.setColor(this.color, 'border-color', data)
      // }
      // Colorable.options.methods.setColor(this.color, 'border-color', data)
      return this.$createElement('fieldset', data, [this.genLegend()])
    },
    genLegend() {
      let width = 0
      if (this.outlineExpand) {
        width = this.labelWidth ? this.labelWidth : (this.labelValue ? this.labelWidth : 0)
      } else {
        width = !this.singleLine && (this.labelValue || this.isDirty) ? this.labelWidth : 0
      }
      const span = this.$createElement('span', {
        domProps: { innerHTML: '&#8203;' }
      })

      return this.$createElement('legend', {
        style: {
          width: convertToUnit(width)
        }
      }, [span])
    },
    genLabel() {
      if (!this.hasLabel) return null

      return this.$createElement(VLabel, {
        props: {
          color: this.validationState,
          dark: this.dark,
          focused: this.hasState,
          for: this.$attrs.id,
          light: this.light
        }
      }, this.$slots.label || this.label)
    },
    genMessages() {
      if (this.hideDetails) return null

      const messages = this.hasHint
        ? [this.hint]
        : this.validations

      return this.$createElement(VMessages, {
        props: {
          color: this.hasHint ? '' : this.validationState,
          dark: this.dark,
          light: this.light,
          value: (this.hasMessages || this.hasHint) ? messages : []
        }
      })
    },
    genSlot(
      type: string,
      location: string,
      slot: (VNode | VNode[])[]
    ) {
      if (!slot.length) return null

      const ref = location ? `${type}-${location}` : type

      return this.$createElement('div', {
        staticClass: `v-input__${ref}`,
        ref
      }, slot)
    },
    genPrependSlot() {
      const slot = []
      if (this.isSubheader && this.label) {
        let subheader = this.$createElement('VSubheader', {
          staticClass: `v-input__subheader`,
          props: {
            color: this.validationState,
            dark: this.dark,
            disabled: this.disabled,
            light: this.light,
            value: this.label
          },
          domProps: {
            innerHTML: this.label
          },
          style: {
            width: convertToUnit(this.subheaderWidth)
          }
        })
        slot.push(subheader)
      }
      if (this.$slots.prepend) {
        slot.push(this.$slots.prepend)
      } else if (this.prependIcon) {
        slot.push(this.genIcon('prepend'))
      }

      return this.genSlot('prepend', 'outer', slot)
    },
    genAppendSlot() {
      const slot = []

      // Append icon for text field was really
      // an appended inner icon, v-text-field
      // will overwrite this method in order to obtain
      // backwards compat
      if (this.$slots.append) {
        slot.push(this.$slots.append)
      } else if (this.appendIcon) {
        slot.push(this.genIcon('append'))
      }

      return this.genSlot('append', 'outer', slot)
    },
    onClick(e: Event) {
      this.$emit('click', e)
    },
    onMouseDown(e: Event) {
      this.hasMouseDown = true
      this.$emit('mousedown', e)
    },
    onMouseUp(e: Event) {
      this.hasMouseDown = false
      this.$emit('mouseup', e)
    },
    setLabelWidth() {
      if (!this.outline || !this.$refs.label) return
      this.labelWidth = this.$refs.label.offsetWidth * 0.75 + 6
    },
    setPrefixWidth() {
      if (!this.$refs.prefix) return
      this.prefixWidth = this.$refs.prefix.offsetWidth
    },
    setPrependWidth() {
      if (!this.outline || !this.$refs['prepend-inner']) return
      this.prependWidth = this.$refs['prepend-inner'].offsetWidth
    }
  },
  mounted() {
    this.setLabelWidth()
    this.setPrefixWidth()
    this.setPrependWidth()
  },
  render(h): VNode {
    return h('div', this.setTextColor(this.validationState, {
      staticClass: 'v-input',
      attrs: this.attrsInput,
      'class': this.classesInput
    }), this.genContent())
  }
})
