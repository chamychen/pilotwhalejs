import 'reflect-metadata'
import AbstractCssInfoEntity from '@core/element/model/CssInfo/AbstractCssInfoEntity'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementGroup from '@core/element/decorator/ElementGroup'

export default class InputCssInfoEntity extends AbstractCssInfoEntity {
    /**
     *label转换为普通标题
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes1', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    isSubheader: boolean = false

    /**
     *盒子阴影样式
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes1', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    box: boolean = false


    /**
     *去除下划线
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes2', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    solo: boolean = false


    /**
     *突出四边框
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes2', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    outline: boolean = false

    /**
     *突出四边框
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes2', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    outlineExpand: boolean = false


    /**
     *Solo的反色样式
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes3', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    soloInverted: boolean = false

    /**
     *移除solo or solo-inverted属性添加到元素中的阴影
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes3', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    flat: boolean = false


    /**
     *单行显示，默认label显示在placeholder位置，如有placeholder则不显示label
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes4', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    singleLine: boolean = false


    /**
     *隐藏提示和错误信息
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes4', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    hideDetails: boolean = false

    /**
     *label转换为普通标题
     *
     * @type {boolean}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes5', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    subheaderWidth: string = null


    /**
     *css class
     *
     * @type {string}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    class: string = null

    /**
     *css
     *
     * @type {string}
     * @memberof InputCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.textarea))
    style: string = null

    constructor() {
        super()
    }
}
