import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ClassCodeItem from './model/ClassCodeItem'
import ClassCode from './model/ClassCode'
import DesignerDecoratorType from '@core/element/decorator'
import ClassCodeButtons from './button'

/**
 * 分类码
 */
export default class ClassCodeLayout {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['main'] })
    classCodeMainTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['child'], buttons: ClassCodeButtons.childTab })
    classCodeChildTab = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.layout, 'classCodeMainTab', 'main'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { class: 'row wrap' })
    main: ClassCode = new ClassCode()

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'classCodeChildTab', 'child'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'selectedItem', itemKey: 'key', disablePagination: true })
    child: ClassCodeItem = new ClassCodeItem()
}