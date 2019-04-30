import BaseInfoEntity from '../entity/BaseInfoEntity'
import CssEntity from '../entity/CssEntity'
import EventEntity from '../entity/EventEntity'
import DesignerDecoratorType from '../core/decorator'
import LayoutTab from '../core/decorator/LayoutTab'
import LayoutForm from '../core/decorator/LayoutForm'
import ElementType from '../core/ElementType'

export default class FieldEntity {
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutTab(['baseInfoTab', 'cssTab', 'eventTab']))
    tabs = null

    /**
     *基本信息
     *
     * @type {BaseInfoEntity}
     * @memberof FieldEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.layout, 'tabs', 'baseInfoTab'))
    baseInfo: BaseInfoEntity = new BaseInfoEntity()

    /**
     *样式
     *
     * @type {CssEntity}
     * @memberof FieldEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.layout, 'tabs', 'cssTab'))
    css: CssEntity = new CssEntity()

    /**
     *事件
     *
     * @type {EventEntity}
     * @memberof FieldEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.table, 'tabs', 'eventTab'))
    event: EventEntity = new EventEntity()
}
