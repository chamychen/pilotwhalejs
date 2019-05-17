import AbstractCssEntity from '@core/element/model/CssInfo/AbstractCssEntity'
import 'reflect-metadata'
import ElementTypes from '@core/element/ElementTypes'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import DesignerDecoratorType from '@core/decorator'
import ElementGroup from '@core/decorator/ElementGroup'

export default class TableCssEntity extends AbstractCssEntity {
    /**
     *展开图标icon
     *
     * @type {string}
     * @memberof TabCssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    expandIcon: string = null

    /**
     *折叠图标icon
     *
     * @type {string}
     * @memberof TabCssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    shrinkIcon: string = null


    /**
     *css class
     *
     * @type {string}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    class: string = null
    
    /**
     *css
     *
     * @type {string}
     * @memberof CssEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.textarea))
    style: string = null

    constructor() {
        super()
    }
}
