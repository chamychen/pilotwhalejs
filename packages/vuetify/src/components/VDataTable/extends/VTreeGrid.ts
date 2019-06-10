import { PropValidator } from 'vue/types/options'
import { TreeListDescribe } from '../mixins/model'
import { stringUtils, guidUtils } from 'pilotwhale-utils'
import { VNode } from 'vue'

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
            hiddenLongCodes: [],
            maxLevel: 10
        }
    },
    computed: {
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
        },
        /**
         * 新增树形节点
         * @param parentId 
         */
        addTreeNode(parentId?: string) {
            let newItem: any = {}
            let parent = null
            let parentChildCount = 0
            if (stringUtils.isEmpty(parentId)) {
                parentId = null
            }
            if (parentId) {
                parent = this.currentItems.find(i => i[this.treeListDescribe.idField] === parentId)
            }
            parentChildCount = this.currentItems.filter(i => i[this.treeListDescribe.parentIdField] === parentId).length
            newItem[this.treeListDescribe.idField] = guidUtils.newId()
            newItem[this.treeListDescribe.parentIdField] = parentId
            newItem[this.treeListDescribe.shortCodeField] = parentChildCount + 1
            newItem[this.treeListDescribe.longCodeField] = parent ? `${parent[this.treeListDescribe.longCodeField]}.${newItem[this.treeListDescribe.shortCodeField]}` : `${newItem[this.treeListDescribe.shortCodeField]}`
            newItem[this.treeListDescribe.levelField] = newItem[this.treeListDescribe.longCodeField].split('.').length
            newItem[this.treeListDescribe.leafField] = true
            newItem[this.treeListDescribe.sortNoField] = this.getSortNo(newItem[this.treeListDescribe.longCodeField])
            if (newItem[this.treeListDescribe.levelField] > this.maxLevel) {
                alert(`树形列表最大为${this.maxLevel}个层级`)
            } else {
                this.currentItems.push(newItem)
                if (parent && parent[this.treeListDescribe.leafField]) {
                    parent[this.treeListDescribe.leafField] = false
                }
            }
        },
        /**
         * 删除
         * @param id 
         */
        deleteTreeNode(id: string) {
            if (!stringUtils.isEmpty(id)) {
                let item = this.currentItems.find(i => i[this.treeListDescribe.idField] === id)
                if (item) {
                    let itemLongCode = item[this.treeListDescribe.longCodeField]
                    let regex = new RegExp(`^${itemLongCode}\\.`)
                    this.currentItems = this.currentItems.filter(i => !regex.test(i[this.treeListDescribe.longCodeField]) && i[this.treeListDescribe.longCodeField] !== itemLongCode)
                    let parentLongCode = this.getParentLongCode(itemLongCode)
                    let nextLongCode = parentLongCode ? parentLongCode + '.' + (item[this.treeListDescribe.shortCodeField] + 1) : `${(item[this.treeListDescribe.shortCodeField] + 1)}`
                    this.move(nextLongCode, -1)
                    if (parentLongCode) {
                        let parent = this.currentItems.find(i => i[this.treeListDescribe.longCodeField] === parentLongCode)
                        if (parent) {
                            let parentChildCount = this.currentItems.filter(i => i[this.treeListDescribe.parentIdField] === parent[this.treeListDescribe.idField]).length
                            if (parentChildCount === 0) {
                                parent[this.treeListDescribe.leafField] = true
                            }
                        }
                    }
                }
            }
        },
        /**
         * 获取父级长代码
         * @param longCode 
         */
        getParentLongCode(longCode: string): string {
            if (stringUtils.isEmpty(longCode)) {
                return null
            } else {
                if (longCode.indexOf('.') === -1) {
                    return null
                } else {
                    return longCode.substring(0, longCode.lastIndexOf('.'))
                }
            }
        },

        /**
         * 获取短代码
         * @param longCode 
         */
        getShortCode(longCode: string): number {
            if (stringUtils.isEmpty(longCode)) {
                return null
            } else {
                return parseInt(longCode.substring(longCode.lastIndexOf('.')).replace('.', ''))
            }
        },

        /**
         * 上移
         * @param item 
         */
        moveUp(item: any) {
            let oldShortCode = item[this.treeListDescribe.shortCodeField]
            if (oldShortCode === 1 || !this.currentItems) {
                return null
            } else {
                let oldLongCode = item[this.treeListDescribe.longCodeField]
                let oldParentLongCode = this.getParentLongCode(oldLongCode)
                let prevShortCode = oldShortCode - 1
                let prevLongCode = oldParentLongCode ? `${oldParentLongCode}.${prevShortCode}` : `${prevShortCode}`
                let prevItem = this.currentItems.find(i => i[this.treeListDescribe.longCodeField] === prevLongCode)
                if (prevItem) {
                    let prevList = this.reCalculateLongCode(prevItem, oldLongCode)
                    let itemList = this.reCalculateLongCode(item, prevLongCode)
                    let allList = prevList.concat(itemList)
                    allList.forEach(i => {
                        for (let j = 0; j < this.currentItems.length; j++) {
                            let item = this.currentItems[j]
                            if (i[this.treeListDescribe.idField] === item[this.treeListDescribe.idField]) {
                                this.context.$set(this.currentItems, j, i)
                                return false
                            }
                        }
                    })
                }
            }
        },

        /**
         * 下移
         * @param item 
         */
        moveDown(item: any) {
            let oldShortCode = item[this.treeListDescribe.shortCodeField]
            let oldLongCode = item[this.treeListDescribe.longCodeField]
            let oldParentLongCode = this.getParentLongCode(oldLongCode)
            let nextShortCode = oldShortCode + 1
            let nextLongCode = oldParentLongCode ? `${oldParentLongCode}.${nextShortCode}` : `${nextShortCode}`
            let nextItem = this.currentItems.find(i => i[this.treeListDescribe.longCodeField] === nextLongCode)
            if (nextItem) {
                let nextList = this.reCalculateLongCode(nextItem, oldLongCode)
                let itemList = this.reCalculateLongCode(item, nextLongCode)
                let allList = nextList.concat(itemList)
                allList.forEach(i => {
                    for (let j = 0; j < this.currentItems.length; j++) {
                        let item = this.currentItems[j]
                        if (i[this.treeListDescribe.idField] === item[this.treeListDescribe.idField]) {
                            this.context.$set(this.currentItems, j, i)
                            return false
                        }
                    }
                })
            }
        },

        /**
         * 左移
         * @param item 
         */
        moveLeft(item: any) {
            let oldLevel = item[this.treeListDescribe.levelField]
            if (oldLevel !== 1 && this.currentItems) {
                let oldLongCode = item[this.treeListDescribe.longCodeField]
                let oldParentLongCode = this.getParentLongCode(oldLongCode)
                let newParentLongCode = this.getParentLongCode(oldParentLongCode)
                let newShortCode = this.getShortCode(oldParentLongCode) + 1
                let newLongCode = newParentLongCode ? `${newParentLongCode}.${newShortCode}` : `${newShortCode}`
                this.moveItem(item, newLongCode)
                let regex = new RegExp(`^${oldParentLongCode}\\.`)
                let oldParentLongCodeIsLeaf = !this.currentItems.some(i => regex.test(i[this.treeListDescribe.longCodeField]))
                // 更新原父级的leaf属性
                if (oldParentLongCodeIsLeaf) {
                    for (let i = 0; i < this.currentItems.length; i++) {
                        let item = this.currentItems[i]
                        if (item[this.treeListDescribe.longCodeField] === oldParentLongCode) {
                            item[this.treeListDescribe.leafField] = true
                            this.context.$set(this.currentItems, i, item)
                            return false
                        }
                    }
                }
            }
        },

        /**
         * 右移
         * @param item 
         */
        moveRight(item: any) {
            let oldShortCode = item[this.treeListDescribe.shortCodeField]
            if (oldShortCode !== 1 && this.currentItems) {
                let oldLongCode = item[this.treeListDescribe.longCodeField]
                let oldParentLongCode = this.getParentLongCode(oldLongCode)
                let prevShortCode = oldShortCode - 1
                let prevLongCode = oldParentLongCode ? `${oldParentLongCode}.${prevShortCode}` : `${prevShortCode}`
                let prevItem = this.currentItems.find(i => i[this.treeListDescribe.longCodeField] === prevLongCode)
                if (prevItem) {
                    if (prevItem[this.treeListDescribe.levelField] === this.maxLevel) {
                        alert(`树形列表最大为${this.maxLevel}个层级`)
                    } else {
                        let prevItemChilds = this.currentItems.filter(i => i[this.treeListDescribe.parentIdField] === prevItem[this.treeListDescribe.idField])
                        let newShortCode = prevItemChilds.length + 1
                        let newLongCode = `${prevLongCode}.${newShortCode}`
                        this.moveItem(item, newLongCode)
                        let newParentLongCode = this.getParentLongCode(newLongCode)
                        // 更新新父级的leaf属性
                        if (newParentLongCode) {
                            for (let i = 0; i < this.currentItems.length; i++) {
                                let item = this.currentItems[i]
                                if (item[this.treeListDescribe.longCodeField] === newParentLongCode) {
                                    if (item[this.treeListDescribe.leafField] === true) {
                                        item[this.treeListDescribe.leafField] = false
                                        this.context.$set(this.currentItems, i, item)
                                    }
                                    return false
                                }
                            }
                        }
                    }
                }
            }
        },

        /**
         * 移动节点到某长代码
         * @param item 
         * @param newLongCode 
         */
        moveItem(item: any, newLongCode: string) {
            if (item) {
                let oldLongCode = item[this.treeListDescribe.longCodeField]
                if (oldLongCode !== newLongCode) {
                    let itemGroup = [item]
                    let descendantItems = this.getDescendantItems(item[this.treeListDescribe.longCodeField])
                    if (descendantItems) {
                        itemGroup = itemGroup.concat(descendantItems)
                    }
                    let itemGroupIds: Array<string> = []
                    itemGroup.forEach(i => {
                        itemGroupIds.push(i[this.treeListDescribe.idField])
                    })
                    this.currentItems = this.currentItems.filter(i => !itemGroupIds.includes(i[this.treeListDescribe.idField]))
                    let oldParentLongCode = this.getParentLongCode(oldLongCode)
                    let oldNextShortCode = item[this.treeListDescribe.shortCodeField] + 1
                    let oldNextLongCode = oldParentLongCode ? `${oldParentLongCode}.${oldNextShortCode}` : `${oldNextShortCode}`
                    this.move(oldNextLongCode, -1)
                    this.move(newLongCode, 1)
                    itemGroup.forEach(i => {
                        let thisLongCode: string = i[this.treeListDescribe.longCodeField]
                        let regex = new RegExp(`^${oldLongCode}`)
                        let thisNewLongCode = thisLongCode === oldLongCode ? newLongCode : thisLongCode.replace(regex, newLongCode)
                        let thisNewLevel = thisNewLongCode.split('.').length
                        let thisNewShortCode = this.getShortCode(thisNewLongCode)
                        i[this.treeListDescribe.longCodeField] = thisNewLongCode
                        i[this.treeListDescribe.shortCodeField] = thisNewShortCode
                        i[this.treeListDescribe.levelField] = thisNewLevel
                        i[this.treeListDescribe.sortNoField] = this.getSortNo(newLongCode)
                        if (thisNewLongCode === newLongCode) {
                            let newParentLongCode = this.getParentLongCode(newLongCode)
                            if (!newParentLongCode) {
                                i[this.treeListDescribe.parentIdField] = null
                            } else {
                                let parent = this.currentItems.find(i => i[this.treeListDescribe.longCodeField] === newParentLongCode)
                                i[this.treeListDescribe.parentIdField] = parent[this.treeListDescribe.idField]
                            }
                        }
                        this.currentItems.push(i)
                    })
                }
            }
        },


        /**
         * 获取item的所有子节点
         * @param longCode 
         */
        getChildItems(item: any) {
            let parentId = null
            if (!item) {
                parentId = item[this.treeListDescribe.idField]
            }
            return this.currentItems.filter(i => i[this.treeListDescribe.parentIdField] === parentId)
        },

        /**
         * 获取长代码的后代节点
         * @param longCode 
         */
        getDescendantItems(longCode: string) {
            if (stringUtils.isEmpty(longCode)) {
                return this.currentItems
            } else {
                let regex = new RegExp(`^${longCode}\\.`)
                let descedantNodes = this.currentItems.filter(i => regex.test(i[this.treeListDescribe.longCodeField]))
                return descedantNodes
            }
        },

        /**
         * 获取所有弟弟节点
         * @param longCode 
         */
        getYoungerBrothers(longCode: string) {
            if (this.currentItems) {
                if (stringUtils.isEmpty(longCode)) {
                    let items = this.currentItems.filter(i => i[this.treeListDescribe.leafField] === 1)
                    return items
                } else {
                    let longCodeLevel = longCode.split('.').length
                    let parentLongCode = this.getParentLongCode(longCode)
                    let shortCode = this.getShortCode(longCode)
                    let items = this.currentItems.filter(i => {
                        if (i[this.treeListDescribe.levelField] === longCodeLevel) {
                            if (!parentLongCode) {
                                if (parseInt(i[this.treeListDescribe.longCodeField]) > shortCode) {
                                    return true
                                }
                            } else {
                                let thisLongCode = i[this.treeListDescribe.longCodeField]
                                let thisParentLongCode = this.getParentLongCode(thisLongCode)
                                if (thisParentLongCode === parentLongCode) {
                                    let thisShortCode = this.getShortCode(thisLongCode)
                                    if (thisShortCode > shortCode) {
                                        return true
                                    }
                                }
                            }
                        }
                    })
                    return items
                }
            } else {
                return null
            }
        },

        /**
         * 移动某长代码
         * @param longCode 移动长代码
         * @param numberOfDigits 末级平移位数
         */
        move(longCode: string, numberOfDigits: number) {
            if (numberOfDigits === 0) return
            if (this.currentItems) {
                let item = this.currentItems.find(i => i[this.treeListDescribe.longCodeField] === longCode)
                if (item) {
                    let youngerBrothers = this.getYoungerBrothers(longCode)
                    let beMovingItems = [item]
                    if (youngerBrothers) {
                        beMovingItems = beMovingItems.concat(youngerBrothers)
                    }
                    if (numberOfDigits > 0) {
                        beMovingItems.sort((a, b) => b[this.treeListDescribe.shortCodeField] - a[this.treeListDescribe.shortCodeField])
                    } else if (numberOfDigits < 0) {
                        beMovingItems.sort((a, b) => a[this.treeListDescribe.shortCodeField] - b[this.treeListDescribe.shortCodeField])
                    }
                    beMovingItems.forEach(item => {
                        let thisLongCode = item[this.treeListDescribe.longCodeField]
                        let thisShortCode = item[this.treeListDescribe.shortCodeField]
                        let thisParentLongCode = this.getParentLongCode(thisLongCode)
                        // 后代节点                
                        let descendantItems = this.getDescendantItems(thisLongCode)
                        let newShortCode = thisShortCode + numberOfDigits
                        let newLongCode = thisParentLongCode ? `${thisParentLongCode}.${newShortCode}` : `${newShortCode}`
                        item[this.treeListDescribe.longCodeField] = newLongCode
                        item[this.treeListDescribe.shortCodeField] = newShortCode
                        item[this.treeListDescribe.levelField] = newLongCode.split('.').length
                        item[this.treeListDescribe.sortNoField] = this.getSortNo(newLongCode)
                        if (descendantItems) {
                            descendantItems.forEach(descendantItem => {
                                let descendantItemLongCode = descendantItem[this.treeListDescribe.longCodeField]
                                let regex = new RegExp(`^${thisLongCode}`)
                                let newDescendantItemLongCode = descendantItemLongCode.replace(regex, newLongCode)
                                descendantItem[this.treeListDescribe.longCodeField] = newDescendantItemLongCode
                                descendantItem[this.treeListDescribe.levelField] = newDescendantItemLongCode.split('.').length
                                descendantItem[this.treeListDescribe.sortNoField] = this.getSortNo(newDescendantItemLongCode)
                            })
                        }
                    })
                }
            }
        },


        /**
         * 重新计算长代码
         * @param item 
         * @param newLongCode 
         */
        reCalculateLongCode(item: any, newLongCode: string): Array<any> | null {
            if (item && !stringUtils.isEmpty(newLongCode)) {
                let allItems = [item]
                let oldLongCode = item[this.treeListDescribe.longCodeField]
                // 后代节点                
                let descendantItems = this.getDescendantItems(oldLongCode)
                if (descendantItems) {
                    allItems = allItems.concat(descendantItems)
                }
                let result = []
                allItems.forEach(yetItem => {
                    let thisItem = { ...yetItem } // 尝试复制
                    let thisOldLongCode = thisItem[this.treeListDescribe.longCodeField]
                    let regex
                    let thisNewLongCode
                    if (thisOldLongCode === oldLongCode) {
                        regex = new RegExp(`^${oldLongCode}`)
                        thisNewLongCode = thisOldLongCode.replace(regex, newLongCode)
                    } else {
                        regex = new RegExp(`^${oldLongCode}\\.`)
                        thisNewLongCode = thisOldLongCode.replace(regex, newLongCode + '.')
                    }
                    thisItem[this.treeListDescribe.longCodeField] = thisNewLongCode
                    thisItem[this.treeListDescribe.levelField] = thisNewLongCode.split('.').length
                    thisItem[this.treeListDescribe.sortNoField] = this.getSortNo(thisNewLongCode)
                    if (thisOldLongCode === oldLongCode) {
                        thisItem[this.treeListDescribe.shortCodeField] = this.getShortCode(thisNewLongCode)
                    }
                    result.push(thisItem)
                })
                return result
            } else {
                return null
            }
        },

        /**
         * 根据longCode获取sortNo
         * @param longCode 
         */
        getSortNo(longCode: string): string {
            // let maxLevelCount = 1000
            if (!stringUtils.isEmpty(longCode)) {
                let codes = longCode.split('.')
                let thisSortNo = ''
                for (let i = 0; i < this.maxLevel; i++) {
                    let levelNo = ''
                    if (i > codes.length - 1) {
                        levelNo += '000'
                    } else {
                        let thisCode = parseInt(codes[i])
                        if (thisCode < 10) {
                            levelNo += '00' + thisCode
                        } else if (thisCode < 100) {
                            levelNo += '0' + thisCode
                        } else {
                            levelNo += thisCode
                        }
                    }
                    thisSortNo += levelNo
                }
                return thisSortNo
            }
        }
    },
    created() {
        // 初始化显示层级
        this.initHiddenLongCodes()
    }
}