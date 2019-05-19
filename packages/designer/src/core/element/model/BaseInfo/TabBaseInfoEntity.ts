import 'reflect-metadata'
import ElementTypes, { ElementType } from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import CommonBaseInfoEntity from '@core/element/model/BaseInfo/CommonBaseInfoEntity'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'

export default class TabBaseInfoEntity extends CommonBaseInfoEntity {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.combobox))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.multiCombobox)
    items: string = null

    constructor(elementType: ElementType) {
        super(elementType)
    }
}