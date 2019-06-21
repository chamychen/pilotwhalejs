/**
 * 默认表格事件
 */
export enum DefaultTableEventType {
  ADD = '@@add',
  EDIT = '@@edit',
  DEL = '@@del',
  MOVE_UP = '@@moveUp',
  MOVE_DOWN = '@@moveDown',
  MOVE_LEFT = '@@moveLeft',
  MOVE_RIGHT = '@@moveRight',
}

/**
 * 编缉模式
 */
export enum TableType {
  DEFAULT = 1,
  GROUP,
  TREE
}

/**
 * 编缉模式
 */
export enum TableMode {
  // 查看
  VIEW = 1,
  // 单行编缉
  SINGLE_LINE,
  // 多行编缉
  MULTI_LINE,
  // popup弹层编缉
  POPUP
}

/**
 * 排序方式
 */
export enum SortMethod {
  ASC = 1,
  DESC
}

export interface EditControlModel {
  edit: boolean
  editMode?: TableMode
  control?: (rowKey: string, rowData: any) => { canEdit: Boolean, limitCells: Array<String> }
}


/**
 * 表格分组字段
 */
export class GroupField {
  /**
   *字段名称
   *
   * @type {string}
   * @memberof GroupField
   */
  field: string

  /**
   *分组标题模板
   *
   * @type {string}
   * @memberof GroupField
   */
  groupTitleTmpl: string

  /**
   *分组前景色
   *
   * @type {string}
   * @memberof GroupField
   */
  groupColor: string


  /**
   *分组背景色
   *
   * @type {string}
   * @memberof GroupField
   */
  groupBackgroundColor: string

  /**
   *排序方式
   *
   * @type {SortMethod}
   * @memberof GroupField
   */
  sortMethod: SortMethod

  /**
   *排序优先级
   *
   * @type {number}
   * @memberof GroupField
   */
  sortPriority: number
}

/**
 * 树形数据描述
 */
export class TreeListDescribe {
  showLine: boolean = true
  extendLevel: number
  idField: string = 'id'
  parentIdField: string = 'parentId'
  levelField: string = 'level'
  leafField: string = 'leaf'
  shortCodeField: string = 'shortCode'
  longCodeField: string = 'longCode'
  nameField: string = 'name'
  linkNameField: string = 'linkName'
  sortNoField: string = 'sortNo'
  expandField: string = 'longCode'

  constructor(nameField?: string, idField?: string) {
    if (idField) {
      this.idField = idField
    }
    if (nameField) {
      this.nameField = nameField
      this.expandField = nameField
    }
  }
}

/**
 * 滚动条数据
 */
export class ScrollData {
  scrollWidth: number
  scrollHeight: number
  scrollTop: number
  scrollLeft: number
}

export class Button {
  key: string

  event: string

  icon: string

  text: string

  color: string

  tips?: string

  /**
   * 控制元素的key
   *
   * @type {string}
   * @memberof Button
   */
  scope?: string

  /**
   * 新增对象的初始数据
   * 默认方法为新增时使用
   *
   * @type {string}
   * @memberof Button
   */
  initData?: string
}