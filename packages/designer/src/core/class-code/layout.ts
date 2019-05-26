import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ClassCodeItem from './model/ClassCodeItem'
import ClassCode from './model/ClassCode'
import DesignerDecoratorType from '@core/element/decorator'
import ClassCodeButtons from './button'
import ClassCodeData from '@core/security-button/data'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'

/**
 * 分类码
 */
export default class ClassCodeLayout {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['main'], ...ElementPropsTmpl.tab, buttonAreas: ClassCodeButtons.mainTab, buttons: ClassCodeData })
    classCodeMainTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['child'], ...ElementPropsTmpl.tab, buttonAreas: ClassCodeButtons.childTab, buttons: ClassCodeData })
    classCodeChildTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'classCodeMainTab', 'main'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    main: ClassCode = new ClassCode()

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'classCodeChildTab', 'child'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'selectedItem', itemKey: 'key', disablePagination: true })
    child: ClassCodeItem = new ClassCodeItem()
}