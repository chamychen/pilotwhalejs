import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import TableCssInfoEntity from '@core/element/model/cssinfo/TableCssInfoEntity'
import TableBaseInfoEntity from '@core/element/model/baseinfo/TableBaseInfoEntity'
import AbstractElement from './AbstractElement'
import ElementPropsTmpl from '../decorator/ElementPropsTmpl'

export default class TableElement extends AbstractElement {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.verticalTextTab, items: ['baseInfoTab', 'cssTab'] })
    tabs = null

    /**
     *基本信息
     *
     * @type {TableBaseInfoEntity}
     * @memberof TableElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    baseInfo: TableBaseInfoEntity

    /**
     *样式
     *
     * @type {TableCssInfoEntity}
     * @memberof TableElement
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    css: TableCssInfoEntity


    constructor(elementType: ElementType) {
        super()
        this.baseInfo = new TableBaseInfoEntity(elementType)
        this.css = new TableCssInfoEntity()
    }
}
