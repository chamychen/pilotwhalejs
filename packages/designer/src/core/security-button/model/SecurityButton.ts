import ElementClassCode, { ClassCodeType } from '@core/element/decorator/ElementClassCode'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementTypes from '@core/element/types'
import { guidUtils } from 'pilotwhale-utils'

/**
 * 权限按钮
 */
export default class SecurityButton {
    id: string = guidUtils.newId()

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    code: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    text: string = null

    /**
     *与fab互斥
     *
     * @type {boolean}
     * @memberof SecurityButton
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox))
    icon: boolean = null

    /**
     *与icon互斥
     *
     * @type {boolean}
     * @memberof SecurityButton
     */
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox))
    fab: boolean = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    iconClass: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.color))
    color: string = null


    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox))
    dark: boolean = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox))
    outlined: boolean = null


    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    @Reflect.metadata(DesignerDecoratorType.ClassCode, new ElementClassCode(ClassCodeType.METHOD, 'D-BPS'))
    sizes: string = null

    /**
     *说明
     *
     * @type {string}
     * @memberof ClassCodeItem
     */
    desc: string = null
}