import 'reflect-metadata'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import InputEventEntity from './InputEventEntity'

export default class SelectEventEntity extends InputEventEntity {
    /**
     *select专用事件() => string = null
     *
     * @type {string}
     * @memberof SelectEventEntity
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    update_search$input: string = null
}
