import ElementTypes, { ElementType } from '@core/element/types'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import { stringUtils } from 'pilotwhale-utils'

export default class CommonBaseInfoEntity {
    /**
      *控件id
      *
      * @type {string}
      * @memberof BaseInfoEntity
      */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    key: string = null

    /**
     * 元素类型名称
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    elementTypeName: string = null

    /**
     * 组件名称
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    elementName: string = null

    /**
     * 父级key
     */
    parentKey: string = null

    /**
     * 一般为input的输入类型或其他
     */
    type: string = null

    /**
     *默认值
     *
     * @type {*}
     * @memberof CommonBaseInfoEntity
     */
    defaultValue: any = null

    /**
     *排序号
     *
     * @type {number}
     * @memberof CommonBaseInfoEntity
     */
    sortNo: number = null

    /**
     *占位符
     *
     * @type {string}
     * @memberof CommonBaseInfoEntity
     */
    slot: string = null


    constructor(elementType: ElementType) {
        if (elementType) {
            this.elementTypeName = elementType.elementTypeName
            this.elementName = elementType.elementName
            this.type = elementType.type
        } else {
            throw new Error('CommonBaseInfoEntity constructor [elementType] Can not be null')
        }
    }
}