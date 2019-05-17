import Vue from 'vue'
import { VNodeData } from 'vue/types/vnode'
import { consoleError } from '../../util/console'

function isCssColor(color?: string | false): boolean {
  return !!color && !!color.match(/^(#|(rgb|hsl)a?\()/)
}

export default Vue.extend({
  name: 'colorable',

  props: {
    color: String
  },

  methods: {
    setColor(color: string, colorAttr: string, data: VNodeData = {}): VNodeData {
      if (!data.style) {
        data.style = {}
      }
      if (!data.class) {
        data.class = {}
      }
      if (typeof data.style === 'string') {
        consoleError('style must be an object', this)
        return data
      }
      if (typeof data.class === 'string') {
        consoleError('class must be an object', this)
        return data
      }
      if (!color) {
        color = 'primary'
      }
      if (isCssColor(color)) {
        data.style[colorAttr] = `${color}`
      } else if (color) {
        data.class[color] = true
      }
      return data
    },

    setBackgroundColor(color?: string | false, data: VNodeData = {}): VNodeData {
      if (typeof data.style === 'string') {
        consoleError('style must be an object', this)
        return data
      }
      if (typeof data.class === 'string') {
        consoleError('class must be an object', this)
        return data
      }
      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'background-color': `${color}`,
          'border-color': `${color}`
        }
      } else if (color) {
        data.class = {
          ...data.class,
          [color]: true
        }
      }

      return data
    },

    setTextColor(color?: string | false, data: VNodeData = {}): VNodeData {
      if (typeof data.style === 'string') {
        consoleError('style must be an object', this)
        return data
      }
      if (typeof data.class === 'string') {
        consoleError('class must be an object', this)
        return data
      }
      if (isCssColor(color)) {
        data.style = {
          ...data.style,
          'color': `${color}`,
          'caret-color': `${color}`
        }
      } else if (color) {
        const [colorName, colorModifier] = color.toString().trim().split(' ', 2) as (string | undefined)[]
        data.class = {
          ...data.class,
          [colorName + '--text']: true
        }
        if (colorModifier) {
          data.class['text--' + colorModifier] = true
        }
      }
      return data
    }
  }
})
