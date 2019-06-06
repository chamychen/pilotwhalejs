import { TableMode, TreeListDescribe } from './../mixins/model'
import { VNode } from 'vue/types/vnode'
import { TableHeader } from '../mixins/header'
import { CreateElement } from 'vue'
import { stringUtils } from 'pilotwhale-utils'
import VDefaultRowPC from './VDefaultRowPC'
import { VSimpleCheckbox } from '../../VCheckbox'
import { getPrefixedScopedSlots } from '../../../util/helpers'

export default ({
    mixins: [VDefaultRowPC],
    props: {
    },
    data() {
        return {
            rtl: this.$vuetify.rtl,
            currentItems: this.items,
            currentItemsCount: this.items ? this.items.length : 0,
            currentEditRowId: null, // 当前编缉行id
            currentTableMode: this.tableMode,
            currentMobileTableMode: this.mobileTableMode ? this.mobileTableMode : this.tableMode,
            currentItemSlots: []
        }
    },
    methods: {
        genRow(h: CreateElement, item: any, rowIndex: number) {
            let isEdit = false
            let id = item[this.itemKey]
            let limitCells = null
            if (this.tableMode === TableMode.MULTI_LINE || (this.tableMode === TableMode.SINGLE_LINE && stringUtils.compare(id, this.currentEditRowId))) {
                let limitEditMethodValue: Array<string> | boolean = this.getLimitCells(item)
                if (limitCells === true) {
                    isEdit = false
                } else {
                    if (Array.isArray(limitCells) && limitCells.length > 0) {
                        limitCells = limitEditMethodValue
                    } else {
                        isEdit = true
                    }
                }
            }
            if (this.isMobile) {
                return this.genMobileRow(h, item, rowIndex, isEdit, limitCells)
            } else {
                return this.genPcRow(h, item, rowIndex, isEdit, limitCells)
            }
        },
        /**
         * 获取限制输入的单元格
         * 返回true则表示整行不可编缉
         * 返回数组则表示数组内的列不可编缉
         */
        getLimitCells(item: any): boolean | Array<string> {
            let limitCells: Array<string> | boolean = true
            if (this.limitEditMethod) {
                if (!this.context) {
                    throw new Error('VDataTableItems props [context] not be null')
                } else {
                    let method = this.context[this.limitEditMethod]
                    if (method) {
                        limitCells = <Array<string> | boolean>method(item)
                    } else {
                        throw new Error(`VDataTableItems props [context] without ${this.limitEditMethod} method`)
                    }
                }
            } else {
                limitCells = false
            }
            return limitCells
        },
        /**
         * 生成编缉控件
         * @param h 
         * @param header 
         * @param item 
         * @param itemId 
         * @param rowIndex 
         */
        genEditor(h: CreateElement, header: TableHeader, item: any, itemId: string, rowIndex: number): VNode {
            let element: VNode = null
            if (header.editor && item) {
                let fieldName = header.value
                let editorConfig = Object.assign({}, header.editor)
                editorConfig.key = editorConfig.ref = `${itemId}_${fieldName}`
                editorConfig.model = {
                    value: item[fieldName],
                    callback: value => {
                        item[fieldName] = value
                        if (this.valid && this.valid.$each && this.valid.$each[rowIndex]) {
                            let validProp = this.valid.$each[this.rowIndex][fieldName]
                            validProp.$touch()
                        }
                    }
                }
                element = h(editorConfig.props.elementName, editorConfig)
                return element
            }
        },
        getItemScopedSlots(item: any, rowIndex: number) {
            const scopedSlots = getPrefixedScopedSlots('item.', this.$scopedSlots)
            this.genSelectorSlot(item, scopedSlots)
            this.genRowNoSlot(item, scopedSlots)
            return scopedSlots
        },
        genSelectorSlot(item: any, scopedSlots: any) {
            if (this.showSelect) {
                const data = {
                    props: {
                        value: this.isSelected(item)
                    },
                    on: {
                        click: (e) => {
                            let isSelected = this.isSelected(item)
                            this.select(item, !isSelected)
                            e.stopPropagation()
                        }
                    }
                }
                scopedSlots['column.data-table-select'] = () =>
                    this.$createElement(VSimpleCheckbox, {
                        staticClass: 'v-data-table__checkbox',
                        ...data
                    })
            }
        },
        // 生成行号模板
        genRowNoSlot(item: any, scopedSlots: any) {
            if (this.showSelect) {
                scopedSlots['column.data-table-rowNo'] = (rowNo: number) =>
                    this.$createElement('span', {
                        staticClass: 'v-data-table__rowNo'
                    }, [rowNo])
            }
        },
        // 生成item的树形层级结构线&按钮
        genTreeButton(item: any, fieldName: string): Array<VNode> {
            let treeListDescribe: TreeListDescribe = this.treeListDescribe
            if (treeListDescribe && stringUtils.compare(fieldName, treeListDescribe.expandField)) {
                let id = item[this.itemKey]
                let result = []
                let level = item[treeListDescribe.levelField]
                let levelWidth = 24
                let leftWidth = levelWidth * (level - 1)
                let isLeaf = item[treeListDescribe.leafField]
                for (let i = 0; i < level; i++) {
                    if (i === level - 1) {
                        // 非叶节点的最后一个层级，渲染出展开/收缩按钮
                        if (!isLeaf) {
                            // 默认展开
                            if ((treeListDescribe.extendLevel > 0 && level <= treeListDescribe.extendLevel) || treeListDescribe.extendLevel <= 0) {
                                // 收起按钮
                                let icon = this.$createElement('VIcon', {
                                    key: `${id}_expand`,
                                    class: 'primary--text',
                                    domProps: {
                                        innerHTML: this.expandIcon
                                    },
                                    style: {
                                        paddingLeft: !treeListDescribe.showLine ? leftWidth + 'px' : undefined,
                                        position: 'relative',
                                        top: '4px'
                                    }
                                })
                                result.push(icon)
                            } else { // 默认收起
                                // 展开按钮
                                let icon = this.$createElement('VIcon', {
                                    key: `${id}_shirnk`,
                                    class: 'primary--text',
                                    domProps: {
                                        innerHTML: this.shirnkIcon
                                    },
                                    style: {
                                        paddingLeft: !treeListDescribe.showLine ? leftWidth + 'px' : undefined,
                                        position: 'relative',
                                        top: '4px'
                                    }
                                })
                                result.push(icon)
                            }
                        } else {
                            if (i !== 0) {
                                // 叶节点处理
                                if (treeListDescribe.showLine) {
                                    let icon = this.$createElement('VIcon', {
                                        key: `${id}_line${i + 1}`,
                                        domProps: { innerHTML: 'mdi-dots-horizontal' },
                                        style: {
                                            color: '#bcbdc0',
                                            fontSize: '16px',
                                            paddingLeft: '4px',
                                            paddingRight: '4px'
                                        }
                                    })
                                    result.push(icon)
                                } else {
                                    let icon = this.$createElement('span', {
                                        key: `${id}_levelSlot`,
                                        style: {
                                            width: leftWidth + levelWidth + 'px',
                                            display: 'inline-block'
                                        }
                                    })
                                    result.push(icon)
                                }
                            }
                        }
                    } else {
                        if (treeListDescribe.showLine) {
                            let icon = this.$createElement('VIcon', {
                                key: `${id}_line${i + 1}`,
                                // domProps: { innerHTML: 'mdi-dots-horizontal' },
                                domProps: { innerHTML: 'mdi-dots-vertical' },
                                // domProps: { innerHTML: 'mdi-power-on' },
                                style: {
                                    color: '#bcbdc0',
                                    fontSize: '16px',
                                    paddingLeft: '4px',
                                    paddingRight: '4px'
                                }
                            })
                            result.push(icon)
                        }
                    }
                }
                return result
            }
        }
    }
})