import ElementClassCode, { ClassCodeType } from '@core/element/decorator/ElementClassCode'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'
import 'reflect-metadata'
import ElementGroup from '@core/element/decorator/ElementGroup'
import ElementTypes from '@core/element/types'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'

export default class BizObjectBaseinfo {
    bizObjectId: string = null

    creatorId: string = null

    lastUpdatorId: string = null

    @Reflect.metadata(DesignerDecoratorType.ElementGroup, new ElementGroup('bizObjectTypeGroup', 1))
    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select, [12, 3]))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.singleSelect })
    @Reflect.metadata(DesignerDecoratorType.ClassCode, new ElementClassCode(ClassCodeType.Code, 'D-BizObjectType'))
    bizObjectType: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [12, 3]))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.readonly })
    creatorName: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.datetime, [12, 3]))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.readonly })
    createTime: Date = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text, [12, 3]))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.readonly })
    lastUpdatorName: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.datetime, [12, 3]))
    @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.readonly })
    lastUpdateTime: Date = null
}