import DesignerDecoratorType from '@core/decorator'
import ElementType from '@core/ElementType'
import LayoutTab from '@core/decorator/LayoutTab'
import LayoutForm from '@core/decorator/LayoutForm'
import FieldItemEntity from '@entity/FieldItemEntity'

export default class FieldListEntity {
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutTab(['fieldList']))
    fieldListTab = null

    /**
    *事件
    *
    * @type {FieldItemEntity}
    * @memberof FieldListEntity
    */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.table, 'fieldListTab', 'fieldList'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { model: 'selectedItem', itemKey: 'key', disablePagination: true })
    fieldList: FieldItemEntity = new FieldItemEntity()
}