import 'reflect-metadata'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementGroup from '@core/element/decorator/ElementGroup'

export default abstract class AbstractCssInfoEntity {
    noFlex: boolean = null

    /**
     *小屏布局样式
     *
     * @type {number}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('flexGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [4]))
    smallFlex: number = null

    /**
     *中屏布局样式
     *
     * @type {number}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('flexGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [4]))
    middleFlex: number = null

    /**
     *大屏布局样式
     *
     * @type {number}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('flexGroup', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [4]))
    largeFlex: number = null

    /**
     *控件排序号（在同一层级有效）
     *
     * @type {number}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('sortGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    sortNo: number = null

    /**
     *高度
     *
     * @type {[number, string]}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('sortGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    height: [number, string] = null

    /**
   *前景色
   *
   * @type {string}
   * @memberof CssEntity
   */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colors', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.color, [4]))
    color: string = null

    /**
     *背景色
     *
     * @type {string}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colors', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.color, [4]))
    backgroundColor: string = null

    /**
     *是否反色
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colors', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [4]))
    dark: boolean = false

    constructor() { }
}
