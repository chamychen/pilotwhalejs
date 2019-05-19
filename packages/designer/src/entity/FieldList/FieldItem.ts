import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementTypes from '@core/element/types'

export default class FieldItem {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    key: string = null
}