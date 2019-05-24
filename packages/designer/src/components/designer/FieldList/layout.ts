import DesignerDecoratorType from '@core/element/decorator'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import FieldItem from '@entity/fieldlist/FieldItem'

export default class FieldListLayout {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.tab))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { items: ['fieldList'] })
    fieldListTab = null

    /**
    *事件
    *
    * @type {FieldItem}
    * @memberof FieldListLayout
    */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'fieldListTab', 'fieldList'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'selectedItem', itemKey: 'key', disablePagination: true })
    fieldList: FieldItem = new FieldItem()
}