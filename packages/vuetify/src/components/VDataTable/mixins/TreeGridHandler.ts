import { stringUtils, guidUtils } from 'pilotwhale-utils'
import { TreeListDescribe } from './model'

export default class TreeGridHandler {
    private context: any

    /**
     *数据
     *
     * @private
     * @type {Array<any>}
     * @memberof TreeListHandler
     */
    private _data: Array<any>

    /**
     *树形数据描述
     *
     * @private
     * @type {TreeListDescribe}
     * @memberof TreeListHandler
     */
    private treeListDescribe: TreeListDescribe

    /**
     *各层级位数
     *
     * @private
     * @type {Array<number>}
     * @memberof TreeListHandler
     */
    private levelBits: Array<number>

    /**
     * 树形数据辅助类
     * @param data 数据
     * @param treeListDescribe 树形数据描述
     * @param levelBits 各层级位数
     */
    constructor(data: Array<any>, treeListDescribe: TreeListDescribe, context: any, levelBits?: Array<number>) {
        this.checkTreeListDescribe(treeListDescribe)
        this.treeListDescribe = treeListDescribe
        this._data = data && data.length > 0 ? data : []
        this.context = context
        this.levelBits = levelBits && levelBits.length > 0 ? levelBits : []
    }

    /**
     *获取数据
     *
     * @readonly
     * @memberof TreeListHandler
     */
    public get data() {
        return this._data
    }


    /**
     * 新增
     * @param parentId 
     */
    public add(parentId?: string) {
        let newItem: any = {}
        let parent = null
        let parentChildCount = 0
        if (stringUtils.isEmpty(parentId)) {
            parentId = null
        }
        if (parentId) {
            parent = this._data.find(i => i[this.treeListDescribe.idField] === parentId)
        }
        parentChildCount = this._data.filter(i => i[this.treeListDescribe.parentIdField] === parentId).length
        newItem[this.treeListDescribe.idField] = guidUtils.newId()
        newItem[this.treeListDescribe.parentIdField] = parentId
        newItem[this.treeListDescribe.shortCodeField] = parentChildCount + 1
        newItem[this.treeListDescribe.longCodeField] = parent ? `${parent[this.treeListDescribe.longCodeField]}.${newItem[this.treeListDescribe.shortCodeField]}` : `${newItem[this.treeListDescribe.shortCodeField]}`
        newItem[this.treeListDescribe.levelField] = newItem[this.treeListDescribe.longCodeField].split('.').length
        newItem[this.treeListDescribe.leafField] = true
        newItem[this.treeListDescribe.sortNoField] = this.getSortNo(newItem[this.treeListDescribe.longCodeField])
        this._data.push(newItem)
        if (parent && parent[this.treeListDescribe.leafField]) {
            parent[this.treeListDescribe.leafField] = false
        }
    }

    /**
     * 删除
     * @param id 
     */
    public delete(id: string) {
        if (!stringUtils.isEmpty(id)) {
            let item = this._data.find(i => i[this.treeListDescribe.idField] === id)
            if (item) {
                let itemLongCode = item[this.treeListDescribe.longCodeField]
                let regex = new RegExp(`^${itemLongCode}\\.`)
                this._data = this._data.filter(i => !regex.test(i[this.treeListDescribe.longCodeField]) && i[this.treeListDescribe.longCodeField] !== itemLongCode)
                let parentLongCode = this.getParentLongCode(itemLongCode)
                let nextLongCode = parentLongCode ? parentLongCode + '.' + (item[this.treeListDescribe.shortCodeField] + 1) : `${(item[this.treeListDescribe.shortCodeField] + 1)}`
                let nextItem = this._data.find(i => i[this.treeListDescribe.longCodeField] === nextLongCode)
                if (nextItem) {
                    this.moveItem(nextItem, itemLongCode)
                }
            }
        }
    }

    /**
     * 获取父级长代码
     * @param longCode 
     */
    public getParentLongCode(longCode: string): string {
        if (stringUtils.isEmpty(longCode)) {
            return null
        } else {
            if (longCode.indexOf('.') === -1) {
                return null
            } else {
                return longCode.substring(0, longCode.lastIndexOf('.'))
            }
        }
    }

    /**
     * 获取短代码
     * @param longCode 
     */
    public getShortCode(longCode: string): number {
        if (stringUtils.isEmpty(longCode)) {
            return null
        } else {
            return parseInt(longCode.substring(longCode.lastIndexOf('.')).replace('.', ''))
        }
    }

    /**
     * 上移
     * @param item 
     */
    public moveUp(item: any) {
        let oldShortCode = item[this.treeListDescribe.shortCodeField]
        if (oldShortCode === 1 || !this._data) {
            return null
        } else {
            let oldLongCode = item[this.treeListDescribe.longCodeField]
            let oldParentLongCode = this.getParentLongCode(oldLongCode)
            let prevShortCode = oldShortCode - 1
            let prevLongCode = oldParentLongCode ? `${oldParentLongCode}.${prevShortCode}` : `${prevShortCode}`
            let prevItem = this._data.find(i => i[this.treeListDescribe.longCodeField] === prevLongCode)
            if (prevItem) {
                let prevList = this.reCalculateLongCode(prevItem, oldLongCode)
                let itemList = this.reCalculateLongCode(item, prevLongCode)
                let allList = prevList.concat(itemList)
                allList.forEach(i => {
                    for (let j = 0; j < this._data.length; j++) {
                        let item = this._data[j]
                        if (i[this.treeListDescribe.idField] === item[this.treeListDescribe.idField]) {
                            this.context.$set(this._data, j, i)
                            return false
                        }
                    }
                })
            }
        }
    }

    /**
     * 下移
     * @param item 
     */
    public moveDown(item: any) {
        let oldShortCode = item[this.treeListDescribe.shortCodeField]
        let oldLongCode = item[this.treeListDescribe.longCodeField]
        let oldParentLongCode = this.getParentLongCode(oldLongCode)
        let nextShortCode = oldShortCode + 1
        let nextLongCode = oldParentLongCode ? `${oldParentLongCode}.${nextShortCode}` : `${nextShortCode}`
        let nextItem = this._data.find(i => i[this.treeListDescribe.longCodeField] === nextLongCode)
        if (nextItem) {
            let nextList = this.reCalculateLongCode(nextItem, oldLongCode)
            let itemList = this.reCalculateLongCode(item, nextLongCode)
            let allList = nextList.concat(itemList)
            allList.forEach(i => {
                for (let j = 0; j < this._data.length; j++) {
                    let item = this._data[j]
                    if (i[this.treeListDescribe.idField] === item[this.treeListDescribe.idField]) {
                        this.context.$set(this._data, j, i)
                        return false
                    }
                }
            })
        }
    }

    /**
     * 左移
     * @param item 
     */
    public moveLeft(item: any) {
        let oldLevel = item[this.treeListDescribe.levelField]
        if (oldLevel !== 1 && this._data) {
            let oldLongCode = item[this.treeListDescribe.longCodeField]
            let oldParentLongCode = this.getParentLongCode(oldLongCode)
            let newParentLongCode = this.getParentLongCode(oldParentLongCode)
            let newShortCode = this.getShortCode(oldParentLongCode) + 1
            let newLongCode = newParentLongCode ? `${newParentLongCode}.${newShortCode}` : `${newShortCode}`
            this.moveItem(item, newLongCode)
            let regex = new RegExp(`^${oldParentLongCode}\\.`)
            let oldParentLongCodeIsLeaf = !this._data.some(i => regex.test(i[this.treeListDescribe.longCodeField]))
            // 更新原父级的leaf属性
            if (oldParentLongCodeIsLeaf) {
                for (let i = 0; i < this._data.length; i++) {
                    let item = this._data[i]
                    if (item[this.treeListDescribe.longCodeField] === oldParentLongCode) {
                        item[this.treeListDescribe.leafField] = true
                        this.context.$set(this._data, i, item)
                        return false
                    }
                }
            }
        }
    }

    /**
     * 右移
     * @param item 
     */
    public moveRight(item: any) {
        let oldShortCode = item[this.treeListDescribe.shortCodeField]
        if (oldShortCode !== 1 && this._data) {
            let oldLongCode = item[this.treeListDescribe.longCodeField]
            let oldParentLongCode = this.getParentLongCode(oldLongCode)
            let prevShortCode = oldShortCode - 1
            let prevLongCode = oldParentLongCode ? `${oldParentLongCode}.${prevShortCode}` : `${prevShortCode}`
            let prevItem = this._data.find(i => i[this.treeListDescribe.longCodeField] === prevLongCode)
            if (prevItem) {
                let prevItemChilds = this._data.filter(i => i[this.treeListDescribe.parentIdField] === prevItem[this.treeListDescribe.idField])
                let newShortCode = prevItemChilds.length + 1
                let newLongCode = `${prevLongCode}.${newShortCode}`
                this.moveItem(item, newLongCode)
                let newParentLongCode = this.getParentLongCode(newLongCode)
                // 更新新父级的leaf属性
                if (newParentLongCode) {
                    for (let i = 0; i < this._data.length; i++) {
                        let item = this._data[i]
                        if (item[this.treeListDescribe.longCodeField] === newParentLongCode) {
                            if (item[this.treeListDescribe.leafField] === true) {
                                item[this.treeListDescribe.leafField] = false
                                this.context.$set(this._data, i, item)
                            }
                            return false
                        }
                    }
                }
            }
        }
    }

    /**
     * 移动节点到某长代码
     * @param item 
     * @param newLongCode 
     */
    public moveItem(item: any, newLongCode: string) {
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
                this._data = this._data.filter(i => !itemGroupIds.includes(i[this.treeListDescribe.idField]))
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
                            let parent = this._data.find(i => i[this.treeListDescribe.longCodeField] === newParentLongCode)
                            i[this.treeListDescribe.parentIdField] = parent[this.treeListDescribe.idField]
                        }
                    }
                    this._data.push(i)
                })
            }
        }
    }


    /**
     * 获取item的所有子节点
     * @param longCode 
     */
    public getChildItems(item: any) {
        let parentId = null
        if (!item) {
            parentId = item[this.treeListDescribe.idField]
        }
        return this._data.filter(i => i[this.treeListDescribe.parentIdField] === parentId)
    }

    /**
     * 获取长代码的后代节点
     * @param longCode 
     */
    public getDescendantItems(longCode: string) {
        if (stringUtils.isEmpty(longCode)) {
            return this._data
        } else {
            let regex = new RegExp(`^${longCode}\\.`)
            let descedantNodes = this._data.filter(i => regex.test(i[this.treeListDescribe.longCodeField]))
            return descedantNodes
        }
    }

    /**
     * 获取所有弟弟节点
     * @param longCode 
     */
    public getYoungerBrothers(longCode: string) {
        if (this._data) {
            if (stringUtils.isEmpty(longCode)) {
                let items = this._data.filter(i => i[this.treeListDescribe.leafField] === 1)
                return items
            } else {
                let longCodeLevel = longCode.split('.').length
                let parentLongCode = this.getParentLongCode(longCode)
                let shortCode = this.getShortCode(longCode)
                let items = this._data.filter(i => {
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
    }

    /**
     * 移动某长代码
     * @param longCode 移动长代码
     * @param numberOfDigits 末级平移位数
     */
    private move(longCode: string, numberOfDigits: number) {
        if (numberOfDigits === 0) return
        if (this._data) {
            let item = this._data.find(i => i[this.treeListDescribe.longCodeField] === longCode)
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
    }


    /**
     * 重新计算长代码
     * @param item 
     * @param newLongCode 
     */
    private reCalculateLongCode(item: any, newLongCode: string): Array<any> | null {
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
                if (thisOldLongCode === oldLongCode) {
                    thisItem[this.treeListDescribe.shortCodeField] = this.getShortCode(thisNewLongCode)
                }
                result.push(thisItem)
            })
            return result
        } else {
            return null
        }
    }

    /**
     * 根据longCode获取sortNo
     * @param longCode 
     */
    private getSortNo(longCode: string): number {
        if (!stringUtils.isEmpty(longCode)) {
            let sortNo = ''
            let codes = longCode.split('.')
            codes.forEach((code, index) => {
                if (!/\d+/.test(code)) {
                    throw new Error('longCode is must be integer group')
                }
                let codeLength = code.length
                if (this.levelBits && this.levelBits[index]) {
                    if (codeLength >= this.levelBits[index]) {
                        this.levelBits[index] = codeLength
                        sortNo += code
                    } else {
                        let diffLength = this.levelBits[index] - codeLength
                        let coverPosition = ''
                        for (let j = 0; j < diffLength; j++) {
                            coverPosition += '0'
                        }
                        sortNo += coverPosition + code
                    }
                } else {
                    this.levelBits[index] = codeLength
                    sortNo += code
                }
            })
            return parseFloat(sortNo)
        } else {
            throw new Error('longCode is not be null or empty')
        }
    }

    /**
     * 检查树形数据描述是否正确
     * @param treeListDescribe 
     */
    private checkTreeListDescribe(treeListDescribe: TreeListDescribe) {
        if (!treeListDescribe) {
            throw new Error('treeListDescribe is not be null')
        }
        if (stringUtils.isEmpty(treeListDescribe.idField)) {
            throw new Error('treeListDescribe.longCodeField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.parentIdField)) {
            throw new Error('treeListDescribe.parentIdField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.leafField)) {
            throw new Error('treeListDescribe.leafField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.levelField)) {
            throw new Error('treeListDescribe.levelField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.linkNameField)) {
            throw new Error('treeListDescribe.linkNameField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.longCodeField)) {
            throw new Error('treeListDescribe.longCodeField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.expandField)) {
            treeListDescribe.expandField = treeListDescribe.longCodeField
        }
        if (stringUtils.isEmpty(treeListDescribe.nameField)) {
            throw new Error('treeListDescribe.nameField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.shortCodeField)) {
            throw new Error('treeListDescribe.shortCodeField is not be null or empty')
        }
        if (stringUtils.isEmpty(treeListDescribe.sortNoField)) {
            throw new Error('treeListDescribe.sortNoField is not be null or empty')
        }
    }
}