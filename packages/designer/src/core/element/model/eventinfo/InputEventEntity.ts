import 'reflect-metadata'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'

export default class InputEventEntity {
    /**
     *(val: any) => void = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    input: string = null

    /**
     *(value: any) => any
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    change: string = null

    /**
     *() => boolean = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    update_error: string = null
    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    click_append: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    click_append$outer: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    click_clear: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    click_prepend: string = null

    /**
     *() => any = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    click_prepend$inner: string = null

    /**
     *select专用事件() => string = null
     *
     * @type {string}
     * @memberof EventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    update_search$input: string = null
}
