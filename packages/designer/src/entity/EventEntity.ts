import 'reflect-metadata'
import ElementType, { ElementTypeGroup } from '../core/ElementType'
import CommonElement from '../core/decorator/CommonElement'
import DesignerDecoratorType from '../core/decorator'
import ElementFilter from '../core/decorator/ElementFilter'

export default class EventEntity {
    /**
     *(val: any) => void = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    input: string = null

    /**
     *(value: any) => any
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    change: string = null

    /**
     *() => boolean = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    update_error: string = null
    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    click_append: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    click_append$outer: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    click_clear: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    click_prepend: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    click_prepend$inner: string = null

    /**
     *select专用事件() => string = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.textarea))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.select.elementTypeName], 1))
    update_search$input: string = null
}
