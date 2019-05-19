import AbstractCssInfoEntity from '@core/element/model/CssInfo/AbstractCssInfoEntity'
import 'reflect-metadata'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'

export default class TableCssInfoEntity extends AbstractCssInfoEntity {
    /**
     *展开图标icon
     *
     * @type {string}
     * @memberof TabCssInfoEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    expandIcon: string = null

    /**
     *折叠图标icon
     *
     * @type {string}
     * @memberof TabCssInfoEntity
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
