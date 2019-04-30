import 'reflect-metadata'
import ElementType, { ElementTypeGroup } from '../core/ElementType'
import CommonElement from '../core/decorator/CommonElement'
import DesignerDecoratorType from '../core/decorator'
import ElementFilter from '../core/decorator/ElementFilter'
import ElementGroup from '../core/decorator/ElementGroup'

export default class CssEntity {
    /**
     *控件排序号（在同一层级有效）
     *
     * @type {number}
     * @memberof BaseProps
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.natural_number))
    sortNo: number = null

    /**
     *是否采用禁用样式
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iiii', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.checkbox.elementTypeName], 1))
    indeterminate: boolean = false

    /**
     *禁用样式图标
     *
     * @type {string}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('iiii', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([ElementType.checkbox.elementTypeName], 1))
    indeterminateIcon: string = '$vuetify.icons.checkboxIndeterminate'

    /**
     *前景色
     *
     * @type {string}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colors', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [4]))
    color: string = null

    /**
     *背景色
     *
     * @type {string}
     * @memberof BaseEditProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colors', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [4]))
    backgroundColor: string = null

    /**
     *是否反色
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colors', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [4]))
    dark: boolean = false

    /**
   *高度
   *
   * @type {[number, string]}
   * @memberof BaseEditProps
   */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hhd', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.natural_number, [6]))
    height: [number, string] = null

    /**
     *隐藏提示和错误信息
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('hhd', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.switch, [6]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    hideDetails: boolean = false

    /**
     *label转换为普通标题
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes1', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    isSubHeader: boolean = false

    /**
     *去除下划线
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes1', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    solo: boolean = false

    /**
     *Solo的反色样式
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes1', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    soloInverted: boolean = false

    /**
     *移除solo or solo-inverted属性添加到元素中的阴影
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes2', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    flat: boolean = false

    /**
     *盒子阴影样式
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes2', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    box: boolean = false

    /**
     *突出四边框
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes2', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    outline: boolean = false

    /**
     *单行显示，默认label显示在placeholder位置，如有placeholder则不显示label
     *
     * @type {boolean}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes3', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.layout], 2))
    singleLine: boolean = false

    /**
     *是否需要清空按钮
     *
     * @type {boolean}
     * @memberof TextProps
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes3', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.checkbox, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.text, ...ElementTypeGroup.date, ElementType.select.elementTypeName], 1))
    clearable: boolean = true

    /**
     *清空按钮图标
     *
     * @type {string}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('boxes3', 3))
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text, [12, 4]))
    @Reflect.metadata(DesignerDecoratorType.ElementFilter, new ElementFilter([...ElementTypeGroup.text, ...ElementTypeGroup.date, ElementType.select.elementTypeName], 1))
    clearIcon: string = 'mdi-close-circle'

    /**
     *样式
     *
     * @type {string}
     * @memberof BaseProps
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    class: string = null

    /**
     *css
     *
     * @type {string}
     * @memberof BaseEditProps
     */
    @Reflect.metadata(DesignerDecoratorType.Element, new CommonElement(ElementType.text))
    style: string = null
}
