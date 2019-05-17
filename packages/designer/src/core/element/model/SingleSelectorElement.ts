import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import CommonCssEntity from '@core/element/model/CssInfo/CommonCssEntity'
import SingleSelectorEntity from '@core/element/model/BaseInfo/SingleSelectorEntity'
import AbstractElement from './AbstractElement'

export default class SingleSelectorElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {SingleSelectorEntity}
     * @memberof SingleSelectorElementDto
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: SingleSelectorEntity

    /**
     *样式
     *
     * @type {CommonCssEntity}
     * @memberof SingleSelectorElementDto
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: CommonCssEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new SingleSelectorEntity(elementName, type, elementTypeName)
        this.css = new CommonCssEntity()
    }
}
