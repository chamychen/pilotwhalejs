export default class Button {
    key: string

    event: string

    icon: string

    text: string

    color: string

    tips: string

    /**
     * 控制元素的key
     *
     * @type {string}
     * @memberof Button
     */
    scope: string

    /**
     * 新增对象的初始数据
     * 默认方法为新增时使用
     *
     * @type {string}
     * @memberof Button
     */
    initData: string
}