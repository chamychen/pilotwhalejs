/**
 * 元素组合
 */
export default class ElementGroup {
    groupName: string
    groupXsFlex: number
    groupMdFlex: number
    groupLgFlex: number
    elementXsFlex: number
    elementMdFlex: number
    elementLgFlex: number
    elementSortNo: number

    /**
     * 元素组合构造器
     * @param groupName 组合名称
     * @param sortNo 排序号
     * @param elementFlex 当前元素在组合中所占flex
     * @param groupFlex 组合自身的flex(为避免混乱，此处取组合中第一个元素的设置)
     */
    constructor(groupName: string, sortNo: number, elementFlex?: Array<number>, groupFlex?: Array<number>) {
        if (groupName) {
            groupName = groupName.trim()
        }
        if (!groupName) {
            throw new Error('ElementGroup class groupName field cannot be empty')
        } else {
            this.groupName = groupName
            this.elementSortNo = sortNo

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