import { ElementType } from '@core/element/types'
import BaseElement from '@core/element/types/BaseElement'
import InputElement from '@core/element/types/InputElement'
import SelectElement from '@core/element/types/SelectElement'
import SingleSelectorElement from '@core/element/types/SingleSelectorElement'
import SelectorGroupElement from '@core/element/types/SelectorGroupElement'
import TabElement from '@core/element/types/TabElement'
import TableElement from '@core/element/types/TableElement'
import AbstractElement from './AbstractElement'

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
                    el = new BaseElement(elementType)
                    break
                case 'InputElement':
                    el = new InputElement(elementType)
                    break
                case 'SelectElement':
                    el = new SelectElement(elementType)
                    break
                case 'SingleSelectorElement':
                    el = new SingleSelectorElement(elementType)
                    break
                case 'SelectorGroupElement':
                    el = new SelectorGroupElement(elementType)
                    break
                case 'TabElement':
                    el = new TabElement(elementType)
                    break
                case 'TableElement':
                    el = new TableElement(elementType)
                    break
            }
        }
        return el
    }
}