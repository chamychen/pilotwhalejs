import 'reflect-metadata'
import AbstractCssEntity from '@core/element/model/CssInfo/AbstractCssEntity'
import ElementTypes from '@core/element/ElementTypes'
import SimpleElementCreator from '@core/element/SimpleElementCreator'
import DesignerDecoratorType from '@core/decorator'

export default class CommonCssEntity extends AbstractCssEntity {
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
