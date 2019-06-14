/**
 * 通用树模型
 */
export default abstract class CommonTreeModel {
    parentId: string = null

    shortCode: number = null

    longCode: string = null

    level: number = null

    linkName: string = null

    leaf: boolean = null

    sortNo: string = null
}