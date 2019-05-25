export default class ElementButtonArea {
    /**
     * 应用区域标记
     *
     * @type {string}
     * @memberof ElementButtons
     */
    useTag: string

    /**
     * 按钮code
     *
     * @type {Array<string>}
     * @memberof ElementButtons
     */
    buttonCodes: Array<string>

    groupText: string

    groupIcon: string

    groupDownIcon: string = 'mdi-menu-down'

    /**
     * 
     * @param useTag 应用区域标记
     * @param buttonCodes 按钮code
     */
    constructor(useTag: string, buttonCodes: Array<string>, groupText?: string, groupIcon?: string) {
        this.useTag = useTag
        this.buttonCodes = buttonCodes
        this.groupText = groupText
        this.groupIcon = groupIcon
    }
}