import { PropValidator } from 'vue/types/options'
import { TreeListDescribe } from '../mixins/model'
import { stringUtils } from 'pilotwhale-utils'
import { VNode } from 'vue'
import TreeGridHandler from '../mixins/TreeGridHandler'

export default {
    props: {
        // 是否树形表格
        isTreeGrid: {
            type: Boolean,
            default: false
        },
        // 树形数据描述
        treeListDescribe: {
            type: Object
        } as PropValidator<TreeListDescribe>,
        // 树形层级最大位数
        levelBits: {
            type: Array
        } as PropValidator<number[]>,
        // 展开/收缩按钮颜色
        extendIconColor: {
            type: String,
            default: 'primary'
        },
        // 层级线颜色
        levelLineIconColor: {
            typs: String,
            default: 'grey'
        },
        // 普通层级线icon
        levelLineIcon: {
            type: String,
            default: 'mdi-dots-vertical' // 'mdi-dots-horizontal','mdi-power-on'
        },
        // 最末级层级线icon
        levelLineLastIcon: {
            type: String,
            default: 'mdi-dots-horizontal'
        }
    },
    data() {
        return {
            hiddenLongCodes: []
        }
    },
    computed: {
        treeGridHandler() {
            return this.isTreeGrid ? new TreeGridHandler(this.items, this.treeListDescribe, this.context, this.levelBits) : null
        }
    },
    methods: {
        // 生成item的树形层级结构线&按钮
        genTreeElements(item: any, fieldName: string): Array<VNode> {
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
                            if (!this.hiddenLongCodes || this.hiddenLongCodes.indexOf(item[this.treeListDescribe.longCodeField]) === -1) {
                                // 收起按钮
                                let icon = this.genTreeExpandButton(item, true, leftWidth)
                                result.push(icon)
                            } else { // 默认收起
                                // 展开按钮
                                let icon = this.genTreeExpandButton(item, false, leftWidth)
                                result.push(icon)
                            }
                        } else {
                            if (i !== 0) {
                                // 叶节点处理
                                if (treeListDescribe.showLine) {
                                    let icon = this.genLevelLineIcon(id, i + 1, true)
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
                            let icon = this.genLevelLineIcon(id, i + 1, false)
                            result.push(icon)
                        }
                    }
                }
                return result
            }
        },
        // 生成树形展开/收缩图标按钮
        genTreeExpandButton(item: any, isExpand: boolean, paddingLeft?: number) {
            let iconData = {
                key: `${item[this.treeListDescribe.idField]}_${isExpand ? 'expand' : 'shirnk'}`,
                domProps: {
                    innerHTML: isExpand ? this.shirnkIcon : this.expandIcon
                },
                style: {
                    paddingLeft: !this.treeListDescribe.showLine ? paddingLeft + 'px' : undefined
                }
            }
            this.setTextColor(this.extendIconColor, iconData)
            let icon = this.$createElement('VIcon', iconData)
            let btn = this.$createElement('VBtn', {
                props: {
                    text: true,
                    icon: true
                },
                on: {
                    click: e => {
                        this.toggleExpand(item)
                        e.stopPropagation()
                    }
                }
            }, [icon])
            return btn
        },
        // 生成树形层级线图标
        genLevelLineIcon(itemId: string, level: number, isLast: boolean): VNode {
            let iconData = {
                key: `${itemId}_line${level}`,
                domProps: { innerHTML: isLast ? this.levelLineLastIcon : this.levelLineIcon },
                style: {
                    fontSize: '16px',
                    paddingLeft: '4px',
                    paddingRight: '4px'
                }
            }
            this.setTextColor(this.levelLineIconColor, iconData)
            let icon = this.$createElement('VIcon', iconData)
            return icon
        },
        // 展开/收缩树形节点
        toggleExpand(item) {
            let longCode = item[this.treeListDescribe.longCodeField]
            if (this.hiddenLongCodes.indexOf(longCode) > -1) {
                let hiddenLongCodes = this.hiddenLongCodes.filter(i => i !== longCode)
                this.$set(this, 'hiddenLongCodes', hiddenLongCodes)
            } else {
                let hiddenLongCodes = [...this.hiddenLongCodes]
                hiddenLongCodes.push(longCode)
                this.$set(this, 'hiddenLongCodes', hiddenLongCodes)
            }
        },
        // 初始化显示层级
        initHiddenLongCodes() {
            if (this.items && this.treeListDescribe && this.treeListDescribe.extendLevel && this.treeListDescribe.extendLevel > 0) {
                let hiddenLongCodes = []
                this.items.forEach(item => {
                    let itemLevel = item[this.treeListDescribe.extendLevel]
                    if (itemLevel > this.treeListDescribe.extendLevel) {
                        hiddenLongCodes.push(item[this.treeListDescribe.longCodeField])
                    }
                })
                this.$set(this, 'hiddenLongCodes', hiddenLongCodes)
            }
        }
    },
    created() {
        // 初始化显示层级
        this.initHiddenLongCodes()
    }
}