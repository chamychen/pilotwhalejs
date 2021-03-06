import { CreateElement, VNode } from 'vue'
import { TableHeader } from '../mixins/header'
import { getTextAlignment } from '../../../util/helpers'

export default {
    methods: {
        genPcRow(h: CreateElement, item: any, rowIndex: number, isEdit: boolean, limitCells?: Array<string>, isHiddenRow?: boolean) {
            if (!h || !item) {
                return
            }
            let id = item[this.itemKey]
            let scopedSlots = this.getItemScopedSlots(item)
            const columns: VNode[] = this.computedHeaders.map((header: TableHeader, index: number) => {
                if (isHiddenRow && index > 4) {
                    return h('td')
                } else {
                    const classes = {
                        [getTextAlignment(header.align, this.rtl)]: true
                    }
                    let isEditTd = false
                    if (isEdit && header.editor) {
                        isEditTd = !limitCells || limitCells.indexOf(header.value) === -1
                    }
                    let tdKey = `${id}_${header.value}_td`
                    let tdConfig = null
                    let treeElements: Array<VNode> = this.isTreeGrid ? this.genTreeElements(item, header.value) : null
                    let children: Array<VNode> = !treeElements ? [] : treeElements
                    if (!isEditTd) {
                        let element = null
                        let elementVal = item[header.value]
                        const slotName = `column.${header.value}`
                        const scopedSlot = scopedSlots && scopedSlots[slotName]
                        if (scopedSlot) {
                            if (slotName === 'column.data-table-rowNo') {
                                element = scopedSlot(rowIndex + 1)
                            } else {
                                element = scopedSlot({ item, header, value: elementVal })
                            }
                        } else {
                            element = this.getItemText(header, elementVal)
                        }
                        children.push(element)
                        tdConfig = {
                            key: tdKey,
                            class: classes,
                            style: header.fixedStyle
                        }
                    } else {
                        let editor = this.genEditor(h, header, item, id, rowIndex)
                        if (editor) {
                            children.push(editor)
                        }
                        tdConfig = {
                            key: tdKey,
                            class: classes,
                            style: header.fixedStyle,
                            on: {
                                click: e => {
                                    e.stopPropagation()
                                }
                            }
                        }
                    }
                    let btnList = this.genButtons(header.value, item, rowIndex)
                    if (btnList && btnList.length > 0) {
                        children = children.concat(btnList)
                    }
                    if (isEditTd) {
                        // 主要是强制内容在同一行
                        children = [h('VLayout', children)]
                    }
                    return h('td', tdConfig, children)
                }
            })
            let on = null
            if (this.isRowClickForSelect) {
                on = {
                    click: (e) => {
                        let isSelected = this.isSelected(item)
                        this.select(item, !isSelected)
                        e.stopPropagation()
                    }
                }
            }
            return h('tr', { key: id, on }, columns)
        }
    }
}