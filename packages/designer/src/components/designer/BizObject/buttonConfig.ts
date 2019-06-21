import ElementButtonArea from '@core/security-button/model/ElementButtonArea'
import { Button } from '@assets/vuetify-types/TableModel'
import { LayoutObjectType } from './model/LayoutObjectType'


const bizObjectButtons: Array<Button> = [
    {
        key: 'B-Save',
        text: 'Save',
        icon: 'mdi-content-save',
        color: 'black',
        event: null
    },
    {
        key: 'B-LayoutObject-Add',
        text: 'Add',
        icon: 'mdi-plus',
        color: 'black',
        event: '@@add',
        scope: 'layoutStructureItemList',
        initData: JSON.stringify({ layoutObjectType: LayoutObjectType.TAB })
    },
    {
        key: 'B-LayoutObject-AddTab',
        text: 'AddTab',
        icon: 'mdi-tab-plus',
        color: 'primary',
        event: '@@add',
        scope: 'layoutStructureItemList',
        initData: JSON.stringify({ layoutObjectType: LayoutObjectType.TAB })
    },
    {
        key: 'B-LayoutObject-AddTabItem',
        text: 'AddTabItem',
        icon: 'mdi-server-plus',
        color: 'primary',
        event: '@@add',
        scope: 'layoutStructureItemList',
        initData: JSON.stringify({ layoutObjectType: LayoutObjectType.TAB_ITEM })
    },
    {
        key: 'B-LayoutObject-AddForm',
        text: 'AddForm',
        icon: 'mdi-file-plus',
        color: 'primary',
        event: '@@add',
        scope: 'layoutStructureItemList',
        initData: JSON.stringify({ layoutObjectType: LayoutObjectType.FORM })
    },
    {
        key: 'B-LayoutObject-AddGrid',
        text: 'AddGrid',
        icon: 'mdi-table-plus',
        color: 'primary',
        event: '@@add',
        scope: 'layoutStructureItemList',
        initData: JSON.stringify({ layoutObjectType: LayoutObjectType.GRID })
    },
    {
        key: 'B-LayoutObject-Edit',
        text: 'Edit',
        icon: 'mdi-pencil',
        color: 'warning',
        event: '@@edit',
        scope: 'layoutStructureItemList'
    },
    {
        key: 'B-LayoutObject-Del',
        text: 'Delete',
        icon: 'mdi-delete',
        color: 'error',
        event: '@@del',
        scope: 'layoutStructureItemList'
    },
    {
        key: 'B-LayoutObject-MoveUp',
        text: 'Move Up',
        icon: 'mdi-gesture-swipe-up',
        color: 'green',
        event: '@@moveUp',
        scope: 'layoutStructureItemList'
    },
    {
        key: 'B-LayoutObject-MoveDown',
        text: 'Move Down',
        icon: 'mdi-gesture-swipe-down',
        color: 'green',
        event: '@@moveDown',
        scope: 'layoutStructureItemList'
    },
    {
        key: 'B-LayoutObject-MoveLeft',
        text: 'Move Left',
        icon: 'mdi-gesture-swipe-left',
        color: 'green',
        event: '@@moveLeft',
        scope: 'layoutStructureItemList'
    },
    {
        key: 'B-LayoutObject-MoveRight',
        text: 'Move Right',
        icon: 'mdi-gesture-swipe-right',
        color: 'green',
        event: '@@moveRight',
        scope: 'layoutStructureItemList'
    },
    {
        key: 'B-DataColumn-Add',
        text: 'AddCustomField',
        icon: 'mdi-plus',
        color: 'primary',
        event: '@@add',
        scope: 'dataColumnList'
    },
    {
        key: 'B-DataColumn-Edit',
        text: 'Edit',
        icon: 'mdi-pencil',
        color: 'warning',
        event: '@@edit',
        scope: 'dataColumnList'
    },
    {
        key: 'B-DataColumn-Del',
        text: 'Delete',
        icon: 'mdi-delete',
        color: 'error',
        event: '@@del',
        scope: 'dataColumnList'
    }
]

const bizObjectMainTabButtonGroups = [
    new ElementButtonArea('baseinfoTab', ['B-Save'], null, null, true)
]
const bizObjectOtherTabButtonGroups = [
    new ElementButtonArea('layoutStructureItemListTab', ['B-LayoutObject-Add'], null, null, true),
    new ElementButtonArea('dataColumnListTab', ['B-DataColumn-Add'], null, null, true)]
const layoutObjectListButtonGroups = [
    new ElementButtonArea('actions', ['B-LayoutObject-AddTab', 'B-LayoutObject-AddTabItem', 'B-LayoutObject-AddForm', 'B-LayoutObject-AddGrid'], 'Add', 'mdi-playlist-plus', true, 'primary'),
    new ElementButtonArea('actions', ['B-LayoutObject-Edit', 'B-LayoutObject-Del']),
    new ElementButtonArea('actions', ['B-LayoutObject-MoveUp', 'B-LayoutObject-MoveDown', 'B-LayoutObject-MoveLeft', 'B-LayoutObject-MoveRight'], 'move', 'mdi-cursor-move', false, 'green--text')
]
const dataColumnListButtonGroups = [
    new ElementButtonArea('actions', ['B-DataColumn-Edit', 'B-DataColumn-Del'])
]

export { bizObjectMainTabButtonGroups, bizObjectOtherTabButtonGroups, layoutObjectListButtonGroups, dataColumnListButtonGroups }
export default bizObjectButtons