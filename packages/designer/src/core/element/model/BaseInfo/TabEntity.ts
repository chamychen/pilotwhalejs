import 'reflect-metadata'
import ElementTypes from '@core/element/ElementTypes'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import DesignerDecoratorType from '@core/decorator'
import BaseEntity from '@core/element/model/BaseInfo/BaseEntity'

export default class TabEntity extends BaseEntity {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.combobox))
    items: string = null

    constructor(elementName: string, type: string, elementTypeName: string) {
        super(elementName, type, elementTypeName)
    }
}