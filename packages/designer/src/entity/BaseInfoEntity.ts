import 'reflect-metadata'
import ElementType, { ElementTypeGroup } from '../core/ElementType'
import CommonElement from '../core/decorator/CommonElement'
import DesignerDecoratorType from '../core/decorator'
import ElementFilter from '../core/decorator/ElementFilter'
import ElementGroup from '../core/decorator/ElementGroup'

export default class BaseInfoEntity {
    /**
     *组件类型
     *
     * @type {string}
     * @memberof BaseProps
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    elementTypeName: string = null

    elementName: string = null

    type: string = null

    parentKey: string = null

    defaultValue: any = null

    sortNo: number = null

    smallFlex: number = null

    /**
     *内置class
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    sysClass: string = null

    /**
     *控件id
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    key: string = null

    /**
     *是否多选
     *
     * @type {boolean}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.multiSelect], 1))
    multiple: boolean = false

    /**
     *选项
     *
     * @type {Array<any>}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iimt', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.multiSelect, ...ElementTypeGroup.singleSelect], 1))
    items: Array<any> = null

    /**
     *选项获取方式
     *
     * @type {Array<any>}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iimt', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.select, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.multiSelect, ...ElementTypeGroup.singleSelect], 1))
    itemsMethodType: Array<any> = null

    /**
     *选项文本
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mitiv', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.multiSelect, ...ElementTypeGroup.singleSelect], 1))
    itemText: string = null

    /**
     *选项值
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mitiv', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.multiSelect, ...ElementTypeGroup.singleSelect], 1))
    itemValue: string = null


    /**
     *已选项包裹
     *
     * @type {boolean}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('chipsSet', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.switch, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.select.elementTypeName], 1))
    chips: boolean = true

    /**
     *已选项包裹添加删除功能
     *
     * @memberof SelectProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('chipsSet', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.switch, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.select.elementTypeName], 1))
    deletableChips: boolean = true

    /**
     *小型化已选项包裹
     *
     * @type {boolean}
     * @memberof SelectProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('chipsSet', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.switch, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.select.elementTypeName], 1))
    smallChips: boolean = true



    /**
     *前置文字
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iconText', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    prefix: string = null

    /**
     *后置文本
    *
    * @type {string}
    * @memberof BaseInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iconText', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    suffix: string = null

    /**
     *前置外部图标
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('pipii', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    prependIcon: string = null

    /**
     *是否内部图标
     *
     * @type {boolean}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('pipii', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    isPrependInnerIcon: boolean = false

    /**
     *后置内部图标
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('aiiaoi', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    appendIcon: string = null

    /**
     *是否后置外部图标
     *
     * @type {boolean}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('aiiaoi', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    isAppendOuterIcon: boolean = false


    /**
     *提示信息
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hph', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    hint: string = null

    /**
     *默认显示提示
     *
     * @type {boolean}
     * @memberof BaseEditProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hph', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.switch, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    persistentHint: boolean = false


    /**
     *占位符
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.text.elementTypeName], 1))
    placeholder: string = null


    /**
     *无数据的显示文本
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.select.elementTypeName], 1))
    noDataText: string = null


    /**
    *格式掩码
    *
    * @type {string}
    * @memberof BaseInfoEntity
    */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.text.elementTypeName], 1))
    mask: string = null

    /**
     *最大输入长度
     *
     * @type {number}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mc', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.text], 1))
    maxlength: number = 50


    /**
     *显示输入/已选字符数
     *
     * @type {boolean}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('mc', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.text, ElementType.select.elementTypeName], 1))
    counter: boolean = true

    /**
     *禁用模式：1默认2禁用3只读
     *
     * @type {string}
     * @memberof BaseInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.radioList))
    disableMode: string = null

    /**
    *中屏布局样式
    *
    * @type {string}
    * @memberof BaseProps
    */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('flex', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.natural_number, [6]))
    middleFlex: number = null

    /**
     *超大屏布局样式
     *
     * @type {string}
     * @memberof BaseProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('flex', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.natural_number, [6]))
    largeFlex: number = null
}