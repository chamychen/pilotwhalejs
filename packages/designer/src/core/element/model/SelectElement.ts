import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import InputCssEntity from '@core/element/model/CssInfo/InputCssEntity'
import SelectEntity from '@core/element/model/BaseInfo/SelectEntity'
import SelectEventEntity from '@core/element/model/Event/SelectEventEntity'
import AbstractElement from './AbstractElement'

export default class SelectElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab', 'eventTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {SelectEntity}
     * @memberof SelectElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: SelectEntity

    /**
     *样式
     *
     * @type {InputCssEntity}
     * @memberof SelectElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: InputCssEntity

    /**
     *事件
     *
     * @type {InputEventEntity}
     * @memberof SelectElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.table, 'tabs', 'eventTab'))
    event: SelectEventEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new SelectEntity(elementName, type, elementTypeName)
        this.css = new InputCssEntity()
        this.event = new SelectEventEntity()
    }
}
