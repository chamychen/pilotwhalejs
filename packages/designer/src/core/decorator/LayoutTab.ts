import utils from 'pilotwhale-utils'
import ElementType, { SimpleElement } from '../ElementType'
import CommonElement from './CommonElement'

export default class LayoutTabDecorator extends CommonElement {
    /**
     *tab集
     *
     * @type {Array<string>}
     * @memberof LayoutTabDecorator
     */
    items: Array<string> = null

    fixed: boolean = false

    /**
     *是否隐藏头部
     *
     * @type {boolean}
     * @memberof LayoutTabDecorator
     */
    hideHead: boolean

    constructor(items: Array<string>, fixed: boolean = false, hideHead?: boolean, elementFlex?: Array<number>) {
        super(ElementType.cTab, elementFlex)
        this.hideHead = hideHead
        this.fixed = fixed
        this.items = utils.arrayUtils.trim(items)
        if (this.items) {
            this.items = utils.arrayUtils.removeDuplicate(this.items)
        }
        if (!this.items) {
            throw new Error('LayoutTabDecorator class constructor props items cannot be empty')
        }
    }
}