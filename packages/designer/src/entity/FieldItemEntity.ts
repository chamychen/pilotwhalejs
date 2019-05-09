import DesignerDecoratorType from '../core/decorator'
import CommonElementDecorator from '../core/decorator/CommonElement'
import ElementType from '../core/ElementType'

export default class FieldItemEntity {
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElementDecorator(ElementType.text))
    key: string = null

    // @Reflect.metadata(DesignerDecoratorType.Element, new CommonElementDecorator(ElementType.text))
    // elementTypeName: string = null
}