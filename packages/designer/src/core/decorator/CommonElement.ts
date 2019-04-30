import { SimpleElement } from '../ElementType'

export default class CommonElement {
    key: string = null

    parentKey: string = null

    elementTypeName: string = null

    elementName: string = null

    type: string = null

    sortNo: number = null

    smallFlex: number = null

    middleFlex: number = null

    largeFlex: number = null

    class: string = null

    hide: boolean = false

    disable: boolean = false

    readonly: boolean = false

    noFlex: boolean = false

    constructor(elementType: SimpleElement, elementFlex?: Array<number>, noFlex?: boolean) {
        if (elementType) {
            this.elementTypeName = elementType.elementTypeName
            this.elementName = elementType.elementName
            this.type = elementType.type
            this.noFlex = noFlex
        } else {
            throw new Error('BaseElementConfig class constructor props elementType  cannot be empty')
        }
        if (elementFlex) {
            elementFlex.forEach((flex, index) => {
                switch (index) {
                    case 0:
                        this.smallFlex = flex
                        break
                    case 1:
                        this.middleFlex = flex
                        break
                    case 2:
                        this.largeFlex = flex
                        break
                }
            })
        }
    }
}