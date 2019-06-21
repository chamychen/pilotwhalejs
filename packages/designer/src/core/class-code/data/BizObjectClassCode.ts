import ClassCodeDTO from '@core/class-code/model'
import ClassCode from '@core/class-code/model/ClassCode'
import ClassCodeItem from '@core/class-code/model/ClassCodeItem'
import { LayoutObjectType } from '../../../components/designer/BizObject/model/LayoutObjectType'

// 业务对象类型
const bizObjectType = new ClassCodeDTO()
bizObjectType.main = new ClassCode()
bizObjectType.main.id = bizObjectType.main.code = 'D-BizObjectType'
bizObjectType.main.name = 'Biz Object Type'
bizObjectType.child = [
    {
        id: 'D-BizObjectType-List',
        text: 'List',
        value: 'list',
        sortNo: 1,
        treeNo: 1
    } as ClassCodeItem,
    {
        id: 'D-BizObjectType-Form',
        text: 'Form',
        value: 'form',
        sortNo: 2,
        treeNo: 2
    } as ClassCodeItem
]


const layoutObjectTypeC = new ClassCodeDTO()
layoutObjectTypeC.main = new ClassCode()
layoutObjectTypeC.main.id = layoutObjectTypeC.main.code = 'D-LayoutObjectType'
layoutObjectTypeC.main.name = 'Layout Object Type'
layoutObjectTypeC.child = [
    {
        id: 'D-LayoutObjectType-Tab',
        text: 'Tab',
        value: LayoutObjectType.TAB,
        sortNo: 1,
        treeNo: 1
    } as ClassCodeItem,
    {
        id: 'D-LayoutObjectType-TabItem',
        text: 'TabItem',
        value: LayoutObjectType.TAB_ITEM,
        sortNo: 2,
        treeNo: 2
    } as ClassCodeItem,
    {
        id: 'D-LayoutObjectType-Form',
        text: 'Form',
        value: LayoutObjectType.FORM,
        sortNo: 3,
        treeNo: 3
    } as ClassCodeItem,
    {
        id: 'D-LayoutObjectType-Grid',
        text: 'Grid',
        value: LayoutObjectType.GRID,
        sortNo: 4,
        treeNo: 4
    } as ClassCodeItem
]


const BizObjectClassCode = [
    bizObjectType, layoutObjectTypeC
]

export default BizObjectClassCode