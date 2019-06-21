import { stringUtils, arrayUtils } from 'pilotwhale-utils'
import ElementTypes, { ElementType } from '@core/element/types'

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

    class: string

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
                for (let i = 0; i < 3; i++) {
                    if (elementFlex[i]) {
                        lastFlex = elementFlex[i]
                    }
                    switch (i) {
                        case 0:
                            element.smallFlex = lastFlex
                            break
                        case 1:
                            element.middleFlex = lastFlex
                            break
                        case 2:
                            element.largeFlex = lastFlex
                            break
                    }
                }
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
    static createContainerElement(elementType: ElementType, parentKey?: string, slot?: string, elementFlex?: Array<number>): SimpleElement {
        let element = SimpleElementCreator.createCommonElement(elementType, elementFlex)
        if (!stringUtils.isEmpty(parentKey)) {
            element.parentKey = parentKey.trim()
        }
        if (!stringUtils.isEmpty(slot)) {
            element.slot = slot.trim()
        }
        return element
    }
}