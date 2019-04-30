/**
 * 编缉模式
 */
export enum RowEditMode {
  inline = 1,
  popup
}

export interface EditControlModel {
  edit: boolean
  editMode?: RowEditMode
  control?: (rowKey: string, rowData: any) => { canEdit: Boolean, limitCells: Array<String> }
}
