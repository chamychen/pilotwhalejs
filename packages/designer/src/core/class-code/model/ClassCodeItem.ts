import 'reflect-metadata'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementTypes from '@core/element/types'


/**
 * 分类码单项
 */
export default class ClassCodeItem {
    id: string = null

    parentId: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    text: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    value: any = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.textCoulumn))
    linkName: string = null

    sortNo: number = null

    treeNo: number = null

    /**
     *说明
     *
     * @type {string}
     * @memberof ClassCodeItem
     */
    desc: string = null
}