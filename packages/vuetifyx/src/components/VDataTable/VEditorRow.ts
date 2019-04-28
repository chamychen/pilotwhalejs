// Types
import Vue, { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'
import { TableHeader } from './mixins/header'
import { RowEditMode } from './mixins/control'

// Utils
import { getObjectValueByPath, getTextAlignment } from '../../util/helpers'

export default Vue.extend({
  name: 'v-editor-row',
  props: {
    headers: Array as PropValidator<TableHeader[]>,
    item: Object,
    rtl: Boolean,
    rowIndex: Number,
    valid: Object,
    itemKey: String,
    limitCells: Array as PropValidator<string[]>,
    editMode: {} as PropValidator<RowEditMode>,
    scopedSlots: Object
  },
  data() {
    return {
      currentItem: this.item,
      currentHeaders: this.headers
    }
  },
  methods: {
    // 生成编缉
    genEditor(header: TableHeader, index: number): VNode | null {
      const isLimit = this.limitCells && this.limitCells.indexOf(header.value) > -1
      if (header.editor && !isLimit) {
        const editor = header.editor
        if (!editor.type) {
          editor.type = 'v-text-field'
        }
        const control = this.$createElement(editor.type, {
          key: header.value,
          model: {
            value: this.currentItem[header.value],
            callback: value => {
              this.currentItem[header.value] = value
            }
          },
          props: {
            appendIcon: 'person',
            errorMessages: this.getErrorMessage(this.rowIndex, header.value)
          },
          on: {
            input: (value: any) => {
              this.valid.$each[this.rowIndex][header.value].$touch()
            }
          }
        })
        return control
      } else {
        return null
      }
    },
    getErrorMessage(rowIndex: number, name: string) {
      const currentValid = this.valid.$each[rowIndex][name]
      const errors = []
      if (!currentValid.$dirty) return errors
      !currentValid.required && errors.push('Name is required.')
      return errors
    }
  },
  render(h): VNode {
    const columns: VNode[] = this.currentHeaders.map((header: TableHeader, index: number) => {
      const classes = {
        [getTextAlignment(header.align, this.rtl)]: true
      }

      const children = []
      const value = getObjectValueByPath(this.currentItem, header.value)

      if (header.editor) {
        const editor = this.genEditor(header, index)
        if (editor) {
          children.push(editor)
        } else {
          children.push(value)
        }
      } else {
        const slotName = `column.${header.value}`
        const scopedSlot = this.scopedSlots && this.scopedSlots[slotName]
        if (scopedSlot) {
          children.push(scopedSlot({ item: this.currentItem, header, value }))
        } else {
          children.push(value)
        }
      }

      return h(
        'td',
        {
          key: `${this.itemKey ? this.itemKey : index}_${header.value}_td`,
          class: classes,
          style: header.fixedStyle
        },
        children
      )
    })
    return h('tr', columns)
  }
})
