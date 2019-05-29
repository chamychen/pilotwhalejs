import { guidUtils, stringUtils } from 'pilotwhale-utils'

export default {
    methods: {
        addTableRow(tableName: string, newItem: Object) {
            if (!stringUtils.isEmpty(tableName) && newItem && this.currentValue) {
                let table = this.$refs[tableName]
                if (table) {
                    let tableKeyField = table.itemKey
                    if (tableKeyField) {
                        let data = this.currentValue[tableName] ? this.currentValue[tableName] : []
                        newItem[tableKeyField] = guidUtils.newId()
                        data.push(newItem)
                        this.$set(this.currentValue, tableName, data)
                    }
                }
            }
        },
        delTableRow(tableName: string, id?: string) {
            if (!stringUtils.isEmpty(tableName)) {
                let table = this.$refs[tableName]
                if (table) {
                    let data: Array<any> = this.currentValue[tableName]
                    let selectedData = []
                    if (id) {
                        let tableKeyField = table.itemKey
                        if (tableKeyField) {
                            if (data) {
                                let item = data.filter(i => stringUtils.compare(i[tableKeyField], id))
                                if (item) {
                                    selectedData.push(item)
                                }
                            }
                        }
                    } else {
                        if (table.$attrs.modelName) {
                            selectedData = this[table.$attrs.modelName]
                        }
                    }
                    if (selectedData && selectedData.length > 0) {
                        selectedData.forEach(item => {
                            let itemIndex = data.indexOf(item)
                            data.splice(itemIndex, 1)
                        })
                        this.$set(this.currentValue, tableName, data)
                    }
                }
            }
        }
    }
}
