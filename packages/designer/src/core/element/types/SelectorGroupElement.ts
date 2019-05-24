import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import InputCssInfoEntity from '@core/element/model/cssinfo/InputCssInfoEntity'
import SelectorGroupBaseInfoEntity from '@core/element/model/baseinfo/SelectorGroupBaseInfoEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class SelectorGroupElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {SelectorGroupBaseInfoEntity}
     * @memberof SelectorGroupElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseInfo: SelectorGroupBaseInfoEntity

    /**
     *样式
     *
     * @type {InputCssInfoEntity}
     * @memberof SelectorGroupElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    css: InputCssInfoEntity


    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new SelectorGroupBaseInfoEntity(elementType)
        this.css = new InputCssInfoEntity()
    }
}
