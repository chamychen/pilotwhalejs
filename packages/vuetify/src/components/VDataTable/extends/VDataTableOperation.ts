import { stringUtils, guidUtils } from 'pilotwhale-utils'

export default {
    methods: {
        /**
         * 默认表格事件
         * @param eventName 事件名称
         * @param item 
         * @param rowIndex 
         * @param initData 
         */
        runDefaultEvent(eventName: string, item?: any, rowIndex?: number, initData?: any) {
            switch (eventName) {
                case 'add':
                    this.addRow(item && this.itemKey ? item[this.itemKey] : null, initData)
                    break
                case 'edit':
                    this.editRow(item)
                    break
                case 'del':
                    this.delRow(item)
                    break
                case 'moveUp':
                    this.moveUp(item)
                    break
                case 'moveDown':
                    this.moveDown(item)
                    break
                case 'moveLeft':
                    this.moveLeft(item)
                    break
                case 'moveRight':
                    this.moveRight(item)
                    break
            }
        },
        /**
         * 新增行
         * @param parentId 树形表格时传入
         * @param data 初始数据
         */
        addRow(parentId?: string, data?: Object) {
            if (this.isTreeGrid) {
                let id = this.addTreeNode(parentId, data)
                if (id) {
                    this.$set(this, 'currentEditRowId', id)
                }
            } else {
                let tableKeyField = this.itemKey
                if (tableKeyField) {
                    let id = guidUtils.newId()
                    let newItem = !data ? {} : data
                    newItem[tableKeyField] = id
                    this.currentItems.push(newItem)
                    this.$set(this, 'currentEditRowId', id)
                }
            }
        },
        /**
         * 
         * @param item 开启编缉
         */
        editRow(item: any) {
            if (this.itemKey && item) {
                let id = item[this.itemKey]
                if (id) {
                    this.$set(this, 'currentEditRowId', id)
                }
            }
        },
        /**
         * 删除行
         * @param tableName 
         * @param item 
         */
        delRow(item?: any) {
            let id = this.itemKey && item ? item[this.itemKey] : null
            if (this.isTreeGrid) {
                if (id) {
                    this.deleteTreeNode(id)
                }
            } else {
                let selectedData = []
                if (id) {
                    let tableKeyField = this.itemKey
                    if (tableKeyField) {
                        let item = this.currentItems && this.currentItems.filter(i => stringUtils.compare(i[tableKeyField], id))
                        if (item) {
                            selectedData = selectedData.concat(item)
                        }
                    }
                } else {
                    if (this.$attrs.modelName) {
                        selectedData = this.context[this.$attrs.modelName]
                    }
                }
                if (selectedData && selectedData.length > 0) {
                    selectedData.forEach(item => {
                        let itemIndex = this.currentItems.indexOf(item)
                        this.currentItems.splice(itemIndex, 1)
                    })
                }
            }
        }
    }
}