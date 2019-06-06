import { getTextAlignment } from '@util/helpers'
import { CreateElement, VNode } from 'vue'
import { TableHeader } from '../mixins/header'
export default {
    methods: {
        genPcRow(h: CreateElement, item: any, rowIndex: number, isEdit: boolean, limitCells?: Array<string>) {
            if (!h || !item) {
                return
            }
            let id = item[this.itemKey]
            const columns: VNode[] = this.headers.map((header: TableHeader, index: number) => {
                const classes = {
                    [getTextAlignment(header.align, this.rtl)]: true
                }
                let isEditTd = false
                if (isEdit && header.editor) {
                    isEditTd = !limitCells || limitCells.indexOf(header.value) === -1
                }
                let tdKey = `${id}_${header.value}_td`
                if (!isEditTd) {
                    return h('td', {
                        key: tdKey,
                        class: classes,
                        style: header.fixedStyle,
                        domProps: {
                            innerHTML: item[header.value]
                        }
                    })
                } else {
                    let editor = this.genEditor(h, header, item, id, rowIndex)
                    return h('td', {
                        key: tdKey,
                        class: classes,
                        style: header.fixedStyle,
                        on: {
                            click: e => {
                                e.stopPropagation()
                            }
                        }
                    }, editor ? [editor] : null)
                }
            })
            let on = null
            if (this.isRowClickForSelect) {
                on = {
                    click: (e) => {
                        let isSelected = this.tableContext.isSelected(this.item)
                        this.tableContext.select(this.item, !isSelected)
                        e.stopPropagation()
                    }
                }
            }
            return h('tr', { on }, columns)
        }
    }
}