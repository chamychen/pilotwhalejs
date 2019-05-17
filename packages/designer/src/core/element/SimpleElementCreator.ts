import ElementFactory from '@core/element/ElementFactory'
import { stringUtils, arrayUtils } from 'pilotwhale-utils'
import ElementTypes, { ElementType } from '@core/element/ElementTypes'

/**
 * 用于创建基本控件
 */
export class SimpleElement {
    elementType: ElementType

    noFlex: boolean

    smallFlex: number

    middleFlex: number

    largeFlex: number

    parentKey: string

    slot: string

    fixed: boolean

    hideHead: boolean

    items: Array<string>

    constructor(elementType: ElementType) {
        this.elementType = elementType
    }
}

export default class SimpleElementCreator {
    /**
     * 创建通用元素
     * @param elementType 
     * @param elementFlex 
     * @param noFlex 
     */
    static createCommonElement(elementType: ElementType, elementFlex?: Array<number>, noFlex?: boolean): SimpleElement {
        if (elementType) {
            let element = new SimpleElement(elementType)
            element.noFlex = noFlex
            if (elementFlex) {
                let lastFlex = 12
                elementFlex.forEach((flex, index) => {
                    switch (index) {
                        case 0:
                            lastFlex = element.smallFlex = flex || lastFlex
                            break
                        case 1:
                            lastFlex = element.middleFlex = flex || lastFlex
                            break
                        case 2:
                            lastFlex = element.largeFlex = flex || lastFlex
                            break
                    }
                })
            }
            return element
        } else {
            throw new Error('SimpleElementCreator Method createCommonElement param elementType cannot be null')
        }
    }

    /**
     * 创建slot占位元素
     * @param elementType
     * @param parentKey 
     * @param slot 
     * @param elementFlex 
     */
    static createSlotElement(elementType: ElementType, parentKey?: string, slot?: string, elementFlex?: Array<number>): SimpleElement {
        let element = SimpleElementCreator.createCommonElement(elementType, elementFlex)
        if (!stringUtils.isEmpty(parentKey)) {
            element.parentKey = parentKey.trim()
        }
        if (!stringUtils.isEmpty(slot)) {
            element.slot = slot.trim()
        }
        return element
    }

    /**
     * 创建tab元素
     * @param elementType
     * @param parentKey 
     * @param slot 
     * @param elementFlex 
     */
    static createTabElement(items: Array<string>, fixed: boolean = false, hideHead?: boolean, elementFlex?: Array<number>): SimpleElement {
        let element = SimpleElementCreator.createCommonElement(ElementTypes.tab, elementFlex)
        element.hideHead = hideHead
        element.fixed = fixed
        element.items = arrayUtils.trim(items)
        if (element.items) {
            element.items = arrayUtils.removeDuplicate(element.items)
        }
        if (!element.items) {
            throw new Error('SimpleElementCreator Method createTabElement props items cannot be null or empty')
        }
        return element
    }
}