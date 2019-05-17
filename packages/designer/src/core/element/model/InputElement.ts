import SimpleElementCreator from '@core/element/SimpleElementCreator'
import DesignerDecoratorType from '@core/decorator'
import ElementTypes from '@core/element/ElementTypes'
import InputEntity from '@core/element/model/BaseInfo/InputEntity'
import InputCssEntity from '@core/element/model/CssInfo/InputCssEntity'
import InputEventEntity from '@core/element/model/Event/InputEventEntity'
import AbstractElement from './AbstractElement'

export default class InputElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab', 'eventTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {InputEntity}
     * @memberof InputElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: InputEntity

    /**
     *样式
     *
     * @type {CommonCssEntity}
     * @memberof InputElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: InputCssEntity

    /**
     *事件
     *
     * @type {InputEventEntity}
     * @memberof InputElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.table, 'tabs', 'eventTab'))
    event: InputEventEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new InputEntity(elementName, type, elementTypeName)
        this.css = new InputCssEntity()
        this.event = new InputEventEntity()
    }
}
