export default class ElementGroup {
    groupName: string
    groupXsFlex: number
    groupMdFlex: number
    groupLgFlex: number
    elementXsFlex: number
    elementMdFlex: number
    elementLgFlex: number
    elementSortNo: number

    constructor(groupName: string, elementSortNo: number, elementFlex?: Array<number>, groupFlex?: Array<number>) {
        if (groupName) {
            groupName = groupName.trim()
        }
        if (!groupName) {
            throw new Error('ElementGroup class groupName field cannot be empty')
        } else {
            this.groupName = groupName
            this.elementSortNo = elementSortNo

            if (groupFlex) {
                groupFlex.forEach((flex, index) => {
                    switch (index) {
                        case 0:
                            this.groupXsFlex = flex
                            break
                        case 1:
                            this.groupMdFlex = flex
                            break
                        case 2:
                            this.groupLgFlex = flex
                            break
                    }
                })
            }
            if (elementFlex) {
                elementFlex.forEach((flex, index) => {
                    switch (index) {
                        case 0:
                            this.elementXsFlex = flex
                            break
                        case 1:
                            this.elementMdFlex = flex
                            break
                        case 2:
                            this.elementLgFlex = flex
                            break
                    }
                })
            }
        }
    }
}