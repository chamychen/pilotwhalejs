import BaseEntity from '@core/element/model/BaseInfo/BaseEntity'
import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import CommonCssEntity from '@core/element/model/CssInfo/CommonCssEntity'
import AbstractElement from './AbstractElement'

export default class BaseElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {BaseEntity}
     * @memberof BaseElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: BaseEntity

    /**
     *样式
     *
     * @type {CommonCssEntity}
     * @memberof BaseElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: CommonCssEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new BaseEntity(elementName, type, elementTypeName)
        this.css = new CommonCssEntity()
    }
}
