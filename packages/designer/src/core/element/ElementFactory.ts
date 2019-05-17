import { ElementType } from '@core/element/ElementTypes'
import BaseElement from '@core/element/model/BaseElement'
import InputElement from '@core/element/model/InputElement'
import SelectElement from '@core/element/model/SelectElement'
import SingleSelectorElement from '@core/element/model/SingleSelectorElement'
import SingleSelectorGroupElement from '@core/element/model/SingleSelectorGroupElement'
import TabElement from '@core/element/model/TabElement'
import TableElement from '@core/element/model/TableElement'
import AbstractElement from './model/AbstractElement'

export default class ElementFactory {
    /**
      * 创建映射实体
      * @param elementType 
      */
    public static createElement(elementType: ElementType): AbstractElement {
        let el = null
        if (elementType && elementType.className) {         
            switch (elementType.className) {
                case 'BaseElement':
                    el = new BaseElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
                case 'InputElement':
                    el = new InputElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
                case 'SelectElement':
                    el = new SelectElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
                case 'SingleSelectorElement':
                    el = new SingleSelectorElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
                case 'SingleSelectorGroupElement':
                    el = new SingleSelectorGroupElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
                case 'TabElement':
                    el = new TabElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
                case 'TableElement':
                    el = new TableElement(elementType.elementName, elementType.type, elementType.elementTypeName).mergeProps(elementType.extendProps)
                    break
            }
        }
        return el
    }
}