import { CreateElement, VNode } from 'vue'
import { TableHeader } from '../mixins/header'
import { PropValidator } from 'vue/types/options'

export default {
    props: {
        mobileRenderMethod: {
            type: Function
        } as PropValidator<(h: CreateElement, headers: TableHeader[], item: any, itemKey: string, rowIndex: Number) => VNode>
    },
    data() {
        return { showBottomSheetButton: false }
    },
    methods: {
        genMobileRow(h: CreateElement, item: any, rowIndex: number, isEdit: boolean, limitCells?: Array<string>) {
            if (!h || !item) {
                return
            }
            let rowElement: VNode = null
            if (this.mobileRenderMethod) {
                rowElement = this.mobileRenderMethod(h, this.headers, item, this.itemKey, rowIndex)
            } else {
                rowElement = this.genMobileDefaultRow(h, item, rowIndex)
            }
            let buttons = []
            this.headers.map((header: TableHeader, index: number) => {
                let colButtons = this.genTableMobileButtons(header.value, item, rowIndex)
                if (colButtons) {
                    buttons = buttons.concat(colButtons)
                }
            })
            // 生成移动端按钮
            if (buttons && buttons.length > 0) {
                let buttonList = h('VList', { props: { dense: true }, style: { background: 'none' } }, buttons)
                let thisElement = rowElement
                rowElement = h('VBottomSheet', {
                    props: {},
                    model: {
                        value: this.showBottomSheetButton,
                        expression: null,
                        callback: (newVal) => {
                            this.$set(this, 'showBottomSheetButton', newVal)
                        }
                    }
                }, [thisElement, buttonList])
            }
            let rowListItem = h('VListItem', {
                on: {
                    click: e => { }
                }
            }, [rowElement])
            return rowListItem
        },
        /**
         * 生成移动端默认查看行
         * @param h 
         * @param item 
         * @param rowIndex 
         */
        genMobileDefaultRow(h: CreateElement, item: any, rowIndex: number): VNode {
            if (!h || !item) {
                return
            }
            let columns: VNode[] = this.headers.map((header: TableHeader, index: number) => {
                if (!header.mobileHidden) {
                    let title = header.text
                    let titleTd = h('VListItemIcon', [title])
                    let value = item[header.value]
                    value = this.getItemText(header, value)
                    let spacer = h('VSpacer')
                    let valueTd = h('VListItemContent', { style: { color: 'grey' } }, [spacer, value])
                    let listItem = h('VListItem', [titleTd, valueTd])
                    return listItem
                }
            })
            let rowContentList = h('VList', { class: 'v-datatable-mobile-row', props: { dense: true }, slot: 'activator' }, columns)
            return rowContentList
        }
    }
}