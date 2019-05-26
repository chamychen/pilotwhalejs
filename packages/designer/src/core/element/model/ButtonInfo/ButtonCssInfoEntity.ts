import 'reflect-metadata'
import ElementTypes from '@core/element/types'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import DesignerDecoratorType from '@core/element/decorator'
import ElementGroup from '@core/element/decorator/ElementGroup'
import ElementClassCode, { ClassCodeType } from '@core/element/decorator/ElementClassCode'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'

export default class ButtonCssInfoEntity {
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('whGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    buttonMinWidth: number = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('whGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer, [6]))
    buttonMinHeight: number = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select, [6]))
    @Reflect.metadata(DesignerDecoratorType.ClassCode, new ElementClassCode(ClassCodeType.Code, 'D-BPS'))
    buttonSize: string = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colorGroup', 1, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.color, null, true))
    buttonColor = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('colorGroup', 2, null, [6]))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, null, true))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { noLabel: true })
    buttonDark: boolean = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select))
    @Reflect.metadata(DesignerDecoratorType.ClassCode, new ElementClassCode(ClassCodeType.Code, 'D-BS'))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, ElementPropsTmpl.singleSelect)
    buttonStyle = null

    /**
     * 边框为outline
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('borderGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    buttonOutline: boolean = null

    /**
     * 边框为圆角
     */
    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('borderGroup', 2))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    buttonRound: boolean = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.checkbox, [6]))
    buttonLoading: boolean = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    buttonStaticClass: string = null

    constructor() {
    }
}
