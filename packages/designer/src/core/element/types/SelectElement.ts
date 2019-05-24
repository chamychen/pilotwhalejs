import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import InputCssInfoEntity from '@core/element/model/cssinfo/InputCssInfoEntity'
import SelectBaseInfoEntity from '@core/element/model/baseinfo/SelectBaseInfoEntity'
import SelectEventEntity from '@core/element/model/eventinfo/SelectEventEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class SelectElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab', 'eventTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {SelectBaseInfoEntity}
     * @memberof SelectElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseInfo: SelectBaseInfoEntity

    /**
     *样式
     *
     * @type {InputCssInfoEntity}
     * @memberof SelectElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    css: InputCssInfoEntity

    /**
     *事件
     *
     * @type {InputEventEntity}
     * @memberof SelectElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'tabs', 'eventTab'))
    event: SelectEventEntity


    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new SelectBaseInfoEntity(elementType)
        this.css = new InputCssInfoEntity()
        this.event = new SelectEventEntity()
    }
}
