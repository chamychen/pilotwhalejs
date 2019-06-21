import ElementClassCode, { ClassCodeType } from '@core/element/decorator/ElementClassCode'
import ElementTypes from '@core/element/types'
import CommonTreeModel from '@entity/Base/CommonTreeModel'
import { DataObjectType } from './DataObjectType'
import DesignerDecoratorType from '@core/element/decorator'
import SimpleElementCreator from '@core/element/decorator/SimpleElementCreator'
import ElementPropsTmpl from '@core/element/decorator/ElementPropsTmpl'
import { LayoutObjectType } from './LayoutObjectType'

export default class LayoutObject extends CommonTreeModel {
    layoutObjectId: string = null

    dataObjectId: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    layoutObjectName: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.select))
    @Reflect.metadata(DesignerDecoratorType.ClassCode, new ElementClassCode(ClassCodeType.Code, 'D-LayoutObjectType')) @Reflect.metadata(DesignerDecoratorType.ExtendProps, { ...ElementPropsTmpl.singleSelect })
    layoutObjectType: LayoutObjectType = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.text))
    dataObjectPrimaryKey: string = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.textCoulumn))
    dataObjectType: DataObjectType = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer))
    smallFlex: number = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer))
    middleFlex: number = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.natural_integer))
    largeFlex: number = null

    @Reflect.metadata(DesignerDecoratorType.Element, SimpleElementCreator.createCommonElement(ElementTypes.textCoulumn))
    actions: string = null
}