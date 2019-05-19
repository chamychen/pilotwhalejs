import CommonBaseInfoEntity from './CommonBaseInfoEntity'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementTypes, { ElementType } from '@core/element/types'
import ElementGroup from '@core/element/decorator/ElementGroup'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'

export default class SelectorGroupBaseInfoEntity extends CommonBaseInfoEntity {
    /**
    *禁用模式：1默认2禁用3只读
    *
    * @type {string}
    * @memberof SelectorGroupBaseInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.radioList))
    disableMode: string = null

    /**
     *选项code
     *
     * @type {Array<any>}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('itemsGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    items: string = null

    /**
     *是否多选
     *
     * @type {boolean}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('itemsGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    multiple: boolean = false

    /**
     *对应选择项中选项文本的属性名称
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    itemText: string = 'text'

    /**
     *对应选择项中选项值的属性名称
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    itemValue: string = 'value'

    /**
        *最大输入长度
        *
        * @type {number}
        * @memberof SelectorGroupBaseInfoEntity
        */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('counterGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, null, true))
    maxlength: number = 50

    /**
     *显示输入/已选字符数
     *
     * @type {boolean}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('counterGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { noLabel: true })
    counter: boolean = true

    /**
     *验证方法名
     *
     * @type {Array<string>}
     * @memberof InputBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    validMethods: Array<string> = null

    /**
     *前置外部图标
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('preIconGroup', 1, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, null, true))
    prependIcon: string = null

    /**
     *是否内部图标
     *
     * @type {boolean}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('preIconGroup', 2, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { noLabel: true })
    isPrependInnerIcon: boolean = false

    /**
     *后置内部图标
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('appendIconGroup', 1, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, null, true))
    appendIcon: string = null

    /**
     *是否后置外部图标
     *
     * @type {boolean}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('appendIconGroup', 2, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { noLabel: true })
    isAppendOuterIcon: boolean = false

    /**
     *前置文字
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iconTextGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    prefix: string = null

    /**
     *后置文本
    *
    * @type {string}
    * @memberof SelectorGroupBaseInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iconTextGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    suffix: string = null

    /**
     *格式掩码
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    mask: string = null


    /**
     *提示信息
     *
     * @type {string}
     * @memberof SelectorGroupBaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hph', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, null, true))
    hint: string = null

    /**
     *默认显示提示
     *
     * @type {boolean}
     * @memberof BaseEditProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hph', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { noLabel: true })
    persistentHint: boolean = false

    constructor(elementType: ElementType) {
        super(elementType)
    }
}