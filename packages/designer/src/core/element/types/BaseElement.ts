import CommonBaseInfoEntity from '@core/element/model/baseinfo/CommonBaseInfoEntity'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import CommonCssInfoEntity from '@core/element/model/cssinfo/CommonCssInfoEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class BaseElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {CommonBaseInfoEntity}
     * @memberof BaseElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseInfo: CommonBaseInfoEntity

    /**
     *样式
     *
     * @type {CommonCssInfoEntity}
     * @memberof BaseElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    css: CommonCssInfoEntity

    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new CommonBaseInfoEntity(elementType)
        this.css = new CommonCssInfoEntity()
    }
}
