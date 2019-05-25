export default class ButtonAreaDefine {
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
     * 按钮区块定义
     * @param useTag 应用区域标记（如TabItem的名称、Table的列名）
     * @param buttonCodes 按钮code
     * @param groupText 组合名称(非组合按钮不传)
     * @param groupIcon 组合ICON(非组合按钮不传)
     * @param mobileFixed 手机端是否强制独立显示
     */
    constructor(useTag: string, buttonCodes: Array<string>, groupText?: string, groupIcon?: string, mobileFixed?: boolean) {
        this.useTag = useTag
        this.buttonCodes = buttonCodes
        this.groupText = groupText
        this.groupIcon = groupIcon
        this.mobileFixed = mobileFixed
    }
}