import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import CommonCssInfoEntity from '@core/element/model/CssInfo/CommonCssInfoEntity'
import SingleSelectorBaseInfoEntity from '@core/element/model/BaseInfo/SingleSelectorBaseInfoEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class SingleSelectorElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {SingleSelectorBaseInfoEntity}
     * @memberof SingleSelectorElementDto
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: SingleSelectorBaseInfoEntity

    /**
     *样式
     *
     * @type {CommonCssInfoEntity}
     * @memberof SingleSelectorElementDto
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: CommonCssInfoEntity


    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new SingleSelectorBaseInfoEntity(elementType)
        this.css = new CommonCssInfoEntity()
    }
}
