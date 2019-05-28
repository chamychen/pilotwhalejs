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
    buttonKeys: Array<string>

    groupText: string

    groupIcon: string

    groupDownIcon: string = 'mdi-menu-down'

    groupButtonColor: string

    /**
     * 手机端是否强制独立显示
     */
    mobileFixed: boolean

    /**
     * 
     * @param useTag 应用区域标记
     * @param buttonCodes 按钮code
     */
    constructor(useTag: string, buttonKeys: Array<string>, groupText?: string, groupIcon?: string, mobileFixed?: boolean) {
        this.useTag = useTag
        this.buttonKeys = buttonKeys
        this.groupText = groupText
        this.groupIcon = groupIcon
        this.mobileFixed = mobileFixed
    }
}