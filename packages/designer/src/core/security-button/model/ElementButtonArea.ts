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
     * 手机端是否强制独立显示
     */
    mobileFixed: boolean

    /**
     * 
     * @param useTag 应用区域标记
     * @param buttonCodes 按钮code
     */
    constructor(useTag: string, buttonCodes: Array<string>, groupText?: string, groupIcon?: string, mobileFixed?: boolean) {
        this.useTag = useTag
        this.buttonCodes = buttonCodes
        this.groupText = groupText
        this.groupIcon = groupIcon
        this.mobileFixed = mobileFixed
    }
}