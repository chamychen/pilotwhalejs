import DesignerDecoratorType from '../core/decorator'
import ElementType from '../core/ElementType'
import LayoutTab from '../core/decorator/LayoutTab'
import LayoutForm from '../core/decorator/LayoutForm'
import FieldItemEntity from '../entity/FieldItemEntity'

export class FieldListEntity {

    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutTab(['fieldList',]))
    fieldListTab = null

    /**
    *事件
    *
    * @type {EventEntity}
    * @memberof FieldEntity
    */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.table, 'fieldListTab', 'fieldList'))
    event: FieldItemEntity = new FieldItemEntity()
}