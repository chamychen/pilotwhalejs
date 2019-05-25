
/**
 * 权限按钮
 */
export default class ButtonProps {
    code: string = null

    btnName: string = null

    /**
     *与fab互斥
     *
     * @type {boolean}
     * @memberof SecurityButton
     */
    icon: boolean = null

    /**
     *与icon互斥
     *
     * @type {boolean}
     * @memberof SecurityButton
     */
    fab: boolean = null

    iconClass: string = null

    color: string = null

    dark: boolean = null

    outlined: boolean = null

    sizes: string = null

    title: string = null
}