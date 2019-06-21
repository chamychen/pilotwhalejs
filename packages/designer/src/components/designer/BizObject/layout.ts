import ElementTypes from '@core/element/types'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DataColumn from './model/DataColumn'
import LayoutObject from './model/LayoutObject'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'
import BizObjectBaseinfo from './model/BizObjectBaseInfo'
import { bizObjectMainTabButtonGroups, bizObjectOtherTabButtonGroups, layoutObjectListButtonGroups, dataColumnListButtonGroups } from './buttonConfig'
import { TreeListDescribe } from '@assets/vuetify-types/TableModel'


export default class BizObjectLayout {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.tab, items: ['baseinfoTab'], buttonGroups: bizObjectMainTabButtonGroups })
    mainTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.tab, items: ['layoutStructureItemListTab', 'dataColumnListTab'], buttonGroups: bizObjectOtherTabButtonGroups })
    otherTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'mainTab', 'baseinfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseinfo: BizObjectBaseinfo = new BizObjectBaseinfo()

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'otherTab', 'layoutStructureItemListTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.treeGrid, model: 'layoutStructureItemListSelected', itemKey: 'layoutObjectId', treeListDescribe: new TreeListDescribe('layoutObjectName', 'layoutObjectId'), fixedLeftCols: 1, fixedRightCols: 1, buttonGroups: layoutObjectListButtonGroups })
    layoutStructureItemList: LayoutObject = new LayoutObject()

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'otherTab', 'dataColumnListTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.grid, model: 'dataColumnListSelected', itemKey: 'dataColumnId', fixedRightCols: 1, buttonGroups: dataColumnListButtonGroups })
    dataColumnList: DataColumn = new DataColumn()
}