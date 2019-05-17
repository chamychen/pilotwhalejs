import ElementTypes from '@core/element/ElementTypes'
import DesignerDecoratorType from '@core/decorator'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import { stringUtils } from 'pilotwhale-utils'

export default class BaseEntity {
    /**
      *控件id
      *
      * @type {string}
      * @memberof BaseInfoEntity
      */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    key: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    elementTypeName: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    elementName: string = null

    parentKey: string = null

    type: string = null

    /**
     *默认值
     *
     * @type {*}
     * @memberof BaseEntity
     */
    defaultValue: any = null

    /**
     *排序号
     *
     * @type {number}
     * @memberof BaseEntity
     */
    sortNo: number = null

    /**
     *占位符
     *
     * @type {string}
     * @memberof BaseEntity
     */
    slot: string = null


    constructor(elementName: string, type: string, elementTypeName: string) {
        if (!stringUtils.isEmpty(elementName)) {
            this.elementName = elementName.trim()
            this.type = type ? type.trim() : null
        } else {
            throw new Error('BaseEntity constructor [elementName] Can not be empty')
        }
        if (!stringUtils.isEmpty(elementTypeName)) {
            this.elementTypeName = elementTypeName.trim()
        } else {
            throw new Error('BaseEntity constructor [elementTypeName] Can not be empty')
        }
    }
}