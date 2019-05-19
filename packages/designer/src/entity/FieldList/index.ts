import DesignerDecoratorType from '@core/element/decorator'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import FieldItem from '@entity/FieldList/FieldItem'

export default class FieldListDto {
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createTabElement(['fieldList']))
    fieldListTab = null

    /**
    *事件
    *
    * @type {FieldItem}
    * @memberof FieldListDto
    */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createContainerElement(ElementTypes.table, 'fieldListTab', 'fieldList'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'selectedItem', itemKey: 'key', disablePagination: true })
    fieldList: FieldItem = new FieldItem()
}