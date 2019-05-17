import 'reflect-metadata'
import ElementTypes from '@core/element/ElementTypes'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import DesignerDecoratorType from '@core/decorator'
import ElementGroup from '@core/decorator/ElementGroup'
import BaseEntity from '@core/element/model/BaseInfo/BaseEntity'

export default class TableEntity extends BaseEntity {
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

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.singleSelect, null, true))
    groupBy: Array<string> = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    isTreeGrid: boolean = false

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.singleSelect, null, true))
    treeGridParnetField: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.singleSelect, null, true))
    treeGridExpandField: string = null

    constructor(elementName: string, type: string, elementTypeName: string) {
        super(elementName, type, elementTypeName)
    }
}