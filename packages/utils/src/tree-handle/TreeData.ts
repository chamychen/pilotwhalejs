import TreeDataStructureDescription from "./TreeDataStructureDescription"

/**
 * 树形数据
 */
export default class TreeData {
    data: Array<any>

    dataDescription: TreeDataStructureDescription

    constructor(data: Array<any>, dataDescription = new TreeDataStructureDescription()) {
        if (!data || data.length === 0) {
            data = null
        }
        this.data = data
        this.dataDescription = dataDescription
    }
}