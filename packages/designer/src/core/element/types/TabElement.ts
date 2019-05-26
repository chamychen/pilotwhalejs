import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import TabCssInfoEntity from '@core/element/model/cssinfo/TabCssInfoEntity'
import TabBaseInfoEntity from '@core/element/model/baseinfo/TabBaseInfoEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'
import ButtonCssInfoEntity from '../model/ButtonInfo/ButtonCssInfoEntity'

export default class TabElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab', 'buttonTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {InputBaseInfoEntity}
     * @memberof TabElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseInfo: TabBaseInfoEntity

    /**
     *样式
     *
     * @type {TabCssInfoEntity}
     * @memberof TabElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    css: TabCssInfoEntity

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'buttonTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    button: ButtonCssInfoEntity

    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new TabBaseInfoEntity(elementType)
        this.css = new TabCssInfoEntity()
        this.button = new ButtonCssInfoEntity()
    }
}
