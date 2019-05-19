import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import TabCssInfoEntity from '@core/element/model/CssInfo/TabCssInfoEntity'
import TabBaseInfoEntity from '@core/element/model/BaseInfo/TabBaseInfoEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class TabElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {InputBaseInfoEntity}
     * @memberof TabElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: TabBaseInfoEntity

    /**
     *样式
     *
     * @type {TabCssInfoEntity}
     * @memberof TabElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: TabCssInfoEntity

    constructor(elementType: ElementType) {        
        super()
        this.baseInfo = new TabBaseInfoEntity(elementType)
        this.css = new TabCssInfoEntity()
    }
}
