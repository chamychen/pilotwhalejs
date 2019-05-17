import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import TableCssEntity from '@core/element/model/CssInfo/TableCssEntity'
import TableEntity from '@core/element/model/BaseInfo/TableEntity'
import AbstractElement from './AbstractElement'

export default class TableElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['baseInfoTab', 'cssTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {TableEntity}
     * @memberof TableElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    baseInfo: TableEntity

    /**
     *样式
     *
     * @type {TableCssEntity}
     * @memberof TableElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.layout, 'tabs', 'cssTab'))
    css: TableCssEntity

    constructor(elementName: string, type: string, elementTypeName: string) {
        super()
        this.baseInfo = new TableEntity(elementName, type, elementTypeName)
        this.css = new TableCssEntity()
    }
}
