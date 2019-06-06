import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ClassCodeItem from './model/ClassCodeItem'
import ClassCode from './model/ClassCode'
import DesignerDecoratorType from '@core/element/decorator'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'
import ClassCodeButtonGroups from './ClassCodeButtonGroups'

/**
 * 分类码
 */
export default class ClassCodeLayout {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['main'], app: true, ...ElementPropsTmpl.tab, buttonGroups: ClassCodeButtonGroups.mainTab })
    classCodeMainTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['child'], ...ElementPropsTmpl.tab, buttonGroups: ClassCodeButtonGroups.childTab })
    classCodeChildTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'classCodeMainTab', 'main'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    main: ClassCode = new ClassCode()

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'classCodeChildTab', 'child'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'childSelectedItem', itemKey: 'id', tableMode: 2, singleSelect: false, disablePagination: true })
    child: ClassCodeItem = new ClassCodeItem()
}