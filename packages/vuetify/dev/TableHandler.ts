import { stringUtils, guidUtils } from 'pilotwhale-utils'

export default class {
    private context: any

    constructor(context: any) {
        this.context = context
    }

    addTableRow(tableName: string) {
        if (!stringUtils.isEmpty(tableName) && this.context.currentValue) {
            let table = this.context.$refs[tableName]
            if (table) {
                let tableKeyField = table.itemKey
                if (tableKeyField) {
                    let data = this.context.currentValue[tableName] ? this.context.currentValue[tableName] : []
                    let newItem = {}
                    newItem[tableKeyField] = guidUtils.newId()
                    data.push(newItem)
                    this.context.$set(this.context.currentValue, tableName, data)
                }
            }
        }
    }

    editRow(tableName: string, item: any) {
        if (!stringUtils.isEmpty(tableName) && item) {
            let table = this.context.$refs[tableName]
            if (table) {
                let tableKeyField = table.itemKey
                if (tableKeyField) {
                    let id = item[tableKeyField]
                    if (id) {
                        table.$set(table, 'currentEditRowId', id)
                    }
                }
            }
        }
    }

    delTableRowByItem(tableName: string, item: any) {
        if (!stringUtils.isEmpty(tableName) && item) {
            let table = this.context.$refs[tableName]
            if (table) {
                let tableKeyField = table.itemKey
                if (tableKeyField) {
                    let id = item[tableKeyField]
                    if (id) {
                        this.delTableRow(tableName, id)
                    }
                }
            }
        }
    }

    delTableRow(tableName: string, id?: string) {
        if (!stringUtils.isEmpty(tableName)) {
            let table = this.context.$refs[tableName]
            if (table) {
                let data: Array<any> = this.context.currentValue[tableName]
                let selectedData = []
                if (id) {
                    let tableKeyField = table.itemKey
                    if (tableKeyField) {
                        if (data) {
                            let item = data.filter(i => stringUtils.compare(i[tableKeyField], id))
                            if (item) {
                                selectedData = selectedData.concat(item)
                            }
                        }
                    }
                } else {
                    if (table.$attrs.modelName) {
                        selectedData = this.context[table.$attrs.modelName]
                    }
                }
                if (selectedData && selectedData.length > 0) {
                    selectedData.forEach(item => {
                        let itemIndex = data.indexOf(item)
                        data.splice(itemIndex, 1)
                    })
                    this.context.$set(this.context.currentValue, tableName, data)
                }
            }
        }
    }
}