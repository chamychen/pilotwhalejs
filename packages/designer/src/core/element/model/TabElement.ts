import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import TabCssEntity from '@core/element/model/CssInfo/TabCssEntity'
import TabEntity from '@core/element/model/BaseInfo/TabEntity'
import AbstractElement from './AbstractElement'

export default class TabElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {InputEntity}
     * @memberof TabElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: TabEntity

    /**
     *样式
     *
     * @type {TabCssEntity}
     * @memberof TabElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: TabCssEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new TabEntity(elementName, type, elementTypeName)
        this.css = new TabCssEntity()
    }
}
