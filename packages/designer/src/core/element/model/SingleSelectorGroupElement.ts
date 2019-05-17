import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import InputCssEntity from '@core/element/model/CssInfo/InputCssEntity'
import SingleSelectorGroupEntity from '@core/element/model/BaseInfo/SingleSelectorGroupEntity'
import AbstractElement from './AbstractElement'

export default class SingleSelectorGroupElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {SingleSelectorGroupEntity}
     * @memberof SingleSelectorGroupElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: SingleSelectorGroupEntity

    /**
     *样式
     *
     * @type {InputCssEntity}
     * @memberof SingleSelectorGroupElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: InputCssEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new SingleSelectorGroupEntity(elementName, type, elementTypeName)
        this.css = new InputCssEntity()
    }
}
