import ElementTypes from '@core/element/types'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import CommonTreeModel from '@entity/Base/CommonTreeModel'

export default class ButtonItem extends CommonTreeModel {
    buttonId: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    scopeName: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    buttonName: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    icon: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.color))
    color: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    event: string = null
}