import utils from 'pilotwhale-utils'
import CommonElement from './CommonElement'
import ElementType, { SimpleElement } from '../ElementType'


export default class LayoutForm extends CommonElement {
    slot: string = null

    constructor(elementType: SimpleElement, parentKey?: string, slot?: string, elementFlex?: Array<number>) {
        super(elementType, elementFlex)
        if (!utils.stringUtils.isEmpty(parentKey)) {
            this.parentKey = parentKey.trim()
        }
        this.slot = slot
    }
}