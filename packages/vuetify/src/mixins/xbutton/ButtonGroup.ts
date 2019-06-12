export default class ButtonGroupInstance {
    /**
     * 应用区域标记
     *
     * @type {string}
     * @memberof ElementButtons
     */
    useTag: string

    /**
     * Button key
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
    refusedMergeForMobile: boolean
}