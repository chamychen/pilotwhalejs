import BaseInfoEntity from '../entity/BaseInfoEntity'
import CssEntity from '../entity/CssEntity'
import EventEntity from '../entity/EventEntity'
import DesignerDecoratorType from '../core/decorator'
import LayoutTab from '../core/decorator/LayoutTab'
import LayoutForm from '../core/decorator/LayoutForm'
import ElementType from '../core/ElementType'

export default class FieldEntity {
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutTab(['baseInfoTab', 'cssTab', 'eventTab']))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { vertical: true, verticalText: true })
    tabs = null

    /**
     *基本信息
     *
     * @type {BaseInfoEntity}
     * @memberof FieldEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.layout, 'tabs', 'baseInfoTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { height: 300 })
    baseInfo: BaseInfoEntity = new BaseInfoEntity()

    /**
     *样式
     *
     * @type {CssEntity}
     * @memberof FieldEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.layout, 'tabs', 'cssTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { height: 300 })
    css: CssEntity = new CssEntity()

    /**
     *事件
     *
     * @type {EventEntity}
     * @memberof FieldEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new LayoutForm(ElementType.table, 'tabs', 'eventTab'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { height: 300 })
    event: EventEntity = new EventEntity()
}
