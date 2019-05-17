import DesignerDecoratorType from '@core/decorator'
import ElementTypes from '@core/element/ElementTypes'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
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
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createSlotElement(ElementTypes.table, 'fieldListTab', 'fieldList'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'selectedItem', itemKey: 'key', disablePagination: true })
    fieldList: FieldItem = new FieldItem()
}