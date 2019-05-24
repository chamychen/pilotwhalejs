import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementTypes, { ElementType } from '@core/element/types'
import InputBaseInfoEntity from '@core/element/model/baseinfo/InputBaseInfoEntity'
import InputCssInfoEntity from '@core/element/model/cssinfo/InputCssInfoEntity'
import InputEventEntity from '@core/element/model/eventinfo/InputEventEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class InputElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab', 'eventTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {InputBaseInfoEntity}
     * @memberof InputElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseInfo: InputBaseInfoEntity

    /**
     *样式
     *
     * @type {CommonCssInfoEntity}
     * @memberof InputElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    css: InputCssInfoEntity

    /**
     *事件
     *
     * @type {InputEventEntity}
     * @memberof InputElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'tabs', 'eventTab'))
    event: InputEventEntity

    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new InputBaseInfoEntity(elementType)
        this.css = new InputCssInfoEntity()
        this.event = new InputEventEntity()
    }
}
