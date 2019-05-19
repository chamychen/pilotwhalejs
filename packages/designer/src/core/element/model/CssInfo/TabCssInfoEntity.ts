import AbstractCssInfoEntity from '@core/element/model/CssInfo/AbstractCssInfoEntity'
import 'reflect-metadata'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementGroup from '@core/element/decorator/ElementGroup'

export default class TabCssInfoEntity extends AbstractCssInfoEntity {
    /**
     *选中颜色
     *
     * @type {number}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colorGroup2', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.color, [4]))
    sliderColor: string = null

    /**
     *tab最大宽度
     *
     * @type {[number, string]}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colorGroup2', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [4]))
    tabMaxWidth: [number, string] = null

    /**
     *context高度
     *
     * @type {[number, string]}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colorGroup2', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [4]))
    contextHeight: [number, string] = null

    /**
    *context最小高度
    *
    * @type {[number, string]}
    * @memberof TabCssInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mhGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    contextMinHeight: [number, string] = null

    /**
    *context最大高度
    *
    * @type {[number, string]}
    * @memberof TabCssInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mhGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    contextMaxHeight: [number, string] = null

    /**
    *context最大宽度
    *
    * @type {[number, string]}
    * @memberof TabCssInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mwGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    contextMinWidth: [number, string] = null

    /**
    *context最大宽度
    *
    * @type {[number, string]}
    * @memberof TabCssInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mwGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    contextMaxWidth: [number, string] = null


    /**
     *app
     *
     * @type {boolean}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('tabStyleGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [4]))
    app: boolean = false

    /**
     *flat
     *
     * @type {boolean}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('tabStyleGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [4]))
    flat: boolean = false

    /**
     *fixed
     *
     * @type {boolean}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('tabStyleGroup', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [4]))
    fixed: boolean = false

    /**
     *显示输入/已选字符数
     *
     * @type {boolean}
     * @memberof InputBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('verticalGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    vertical: boolean = false


    /**
     *显示输入/已选字符数
     *
     * @type {boolean}
     * @memberof InputBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('verticalGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    verticalText: boolean = false


    /**
     *显示输入/已选字符数
     *
     * @type {boolean}
     * @memberof InputBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('alignGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    centered: boolean = false

    /**
     *显示输入/已选字符数
     *
     * @type {boolean}
     * @memberof InputBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('alignGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    right: boolean = false


    /**
     *css class
     *
     * @type {string}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    contextClass: string = null

    /**
     *css class
     *
     * @type {string}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    class: string = null

    /**
     *css
     *
     * @type {string}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.textarea))
    style: string = null

    constructor() {
        super()
    }
}
