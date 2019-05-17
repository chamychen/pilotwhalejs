import BaseEntity from './BaseEntity'
import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import ElementTypes from '@core/element/ElementTypes'
import ElementGroup from '@core/decorator/ElementGroup'

export default class SingleSelectorEntity extends BaseEntity {
    /**
    *禁用模式：1默认2禁用3只读
    *
    * @type {string}
    * @memberof SingleSelectorEntity
    */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.radioList))
    disableMode: string = null

    /**
     *验证方法名
     *
     * @type {Array<string>}
     * @memberof InputEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.singleSelect))
    validMethods: Array<string> = null

    /**
     *前置图标
     *
     * @type {string}
     * @memberof SingleSelectorEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iconGroup', 1, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, null, true))
    prependIcon: string = null



    /**
     *后置图标
     *
     * @type {string}
     * @memberof SingleSelectorEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iconGroup', 2, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, null, true))
    appendIcon: string = null


    /**
     *是否采用禁用样式
     *
     * @type {boolean}
     * @memberof SingleSelectorEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('indeterminateGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    indeterminate: boolean = false

    /**
     *禁用样式图标
     *
     * @type {string}
     * @memberof SingleSelectorEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('indeterminateGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [6]))
    indeterminateIcon: string = '$vuetify.icons.checkboxIndeterminate'

    /**
     *提示信息
     *
     * @type {string}
     * @memberof SingleSelectorEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hintGroup', 1))
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

    constructor(elementName: string, type: string, elementTypeName: string) {
        super(elementName, type, elementTypeName)
    }
}