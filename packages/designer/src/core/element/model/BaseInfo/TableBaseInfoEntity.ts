import 'reflect-metadata'
import ElementTypes, { ElementType } from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementGroup from '@core/element/decorator/ElementGroup'
import CommonBaseInfoEntity from '@core/element/model/baseinfo/CommonBaseInfoEntity'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'

export default class TableBaseInfoEntity extends CommonBaseInfoEntity {
    items: any = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('selGroups', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    showSelect: boolean = true

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('selGroups', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    singleSelect: boolean = true

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('disableGroups', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    disablePagination: boolean = true

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('disableGroups', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    disableSort: number = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('fixedGroups', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    fixedLeftCols: number = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('fixedGroups', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    fixedRightCols: number = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    groupBy: Array<string> = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    isTreeGrid: boolean = false

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    treeGridParnetField: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    treeGridExpandField: string = null

    constructor(elementType: ElementType) {
        super(elementType)
    }
}