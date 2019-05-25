import { VNode } from 'vue'
import ButtonAreaDefine from './ButtonAreaDefine'
import { stringUtils, arrayUtils } from 'pilotwhale-utils'
import ButtonProps from './ButtonProps'

enum ButtonType {
    /**
     * 普通
     */
    DEFAULT,
    /**
     * 表格行内按钮
     */
    INLINE_ROW,
    /**
     * 页面级按钮
     */
    APP
}

/**
 * 按钮组合
 */
export class ButtonGroup {
    isGroup: boolean
    groupIcon: string
    groupText: string
    buttons: Array<ButtonProps>
}

export default ({
    name: 'xbutton',
    props: {
        // 按钮配置的集合
        buttons: {
            type: [Array]
        },
        // 按钮结构的集合
        buttonAreas: {
            type: [Array, Object]
        },
        // 是否页面级别按钮
        app: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            buttonStructure: {}
        }
    },
    methods: {
        genButtons(tagName: string): VNode[] | undefined {
            if (tagName) {
                let buttonStructure: Array<ButtonGroup> = this.getButtonStructure(tagName)
                if (buttonStructure) {
                    let result = []
                    buttonStructure.forEach(buttonGroup => {
                        if (buttonGroup.isGroup) {
                            let group = this.genButtonGroup(this.$createElement, buttonGroup)
                            if (group) {
                                result.push(group)
                            }
                        } else {
                            buttonGroup.buttons.forEach(button => {
                                let btn = this.genDefaultButton(this.$createElement, button)
                                if (btn) {
                                    result.push(btn)
                                }
                            })
                        }
                    })
                    return result
                }
            }
        },
        genDefaultButton(h, button: ButtonProps) {
            let iconDark = !stringUtils.isEmpty(button.color)
            let icon = button.iconClass ? h('VIcon', {
                class: 'px-1',
                props: {
                    small: true,
                    dark: iconDark
                },
                domProps: {
                    innerHTML: button.iconClass
                }
            }) : null

            let title = button.btnName ? h('span', {
                domProps: {
                    innerHTML: button.btnName
                },
                style: {
                    position: icon ? 'relative' : undefined,
                    top: icon ? '1px' : undefined
                }
            }) : null

            let objs = []
            if (icon) {
                objs.push(icon)
            }
            if (title) {
                objs.push(title)
            }
            if (objs && objs.length > 0) {
                let btn = h('VBtn', {
                    class: 'mx-1',
                    props: button,
                    domProps: {
                        title: button.title ? button.title : undefined
                    }
                }, objs)
                return btn
            }
        },
        genButtonGroup(h, buttonGroup: ButtonGroup) {
            if (buttonGroup.buttons) {
                let buttons = []
                buttonGroup.buttons.forEach(buttonProps => {
                    let button = this.genButtonGroupItem(h, buttonProps)
                    if (button) {
                        buttons.push(button)
                    }
                })
                if (buttons && buttons.length > 0) {
                    let list = h('VList', { props: { light: true, dense: true } }, buttons)
                    let label = buttonGroup.groupText ? h('span', {
                        class: 'hidden-sm-and-down mr-1',
                        domProps: {
                            innerHTML: buttonGroup.groupText
                        }
                    }) : null
                    let icon1 = h('VIcon', {
                        class: 'hidden-sm-and-down',
                        domProps: {
                            innerHTML: 'mdi-menu-down'
                        }
                    })
                    let icon2 = buttonGroup.groupIcon ? h('VIcon', {
                        class: 'hidden-md-and-up',
                        domProps: {
                            innerHTML: buttonGroup.groupIcon
                        }
                    }) : null
                    let objs = []
                    if (label) {
                        objs.push(label)
                    }
                    if (icon1) {
                        objs.push(icon1)
                    }
                    if (icon2) {
                        objs.push(icon2)
                    }
                    let btn = h('VBtn', { slot: 'activator', props: { ariaLabel: buttonGroup.groupText, text: true }, class: 'mx-1', style: { minWidth: '48px' } }, objs)
                    let menu = h('VMenu', { props: { bottom: true, left: true, offsetY: true } }, [btn, list])
                    return menu
                }
            }
        },
        genButtonGroupItem(h, button: ButtonProps) {
            let icon = button.iconClass ? h('VIcon', {
                props: {
                    small: true,
                    color: button.color ? button.color : undefined
                },
                domProps: {
                    innerHTML: button.iconClass
                }
            }) : null
            let action = button.iconClass ? h('VListItemAction', [icon]) : null

            let title = button.btnName ? h('VListItemTitle', {
                domProps: {
                    innerHTML: `<span>${button.btnName}</span>`
                }
            }) : null
            let content = button.btnName ? h('VListItemContent', [title]) : null

            let objs = []
            if (action) {
                objs.push(action)
            }
            if (content) {
                objs.push(content)
            }
            if (objs && objs.length > 0) {
                let listItem = h('VListItem', {
                    class: 'v-list__tile--doc',
                    props: {
                        ripple: true,
                        rel: 'noopener',
                        dark: button.dark
                    },
                    domProps: {
                        title: button.title ? button.title : undefined
                    }
                }, objs)
                return listItem
            }
        },
        /**
         * 获取按钮类型
         */
        getButtonType() {
            let buttonType = ButtonType.DEFAULT
            switch (this.name) {
                case 'v-data-table':
                    buttonType = ButtonType.INLINE_ROW
                    break
                case 'c-tab':
                    if (this.app) {
                        buttonType = ButtonType.APP
                    }
                    break
            }
            return buttonType
        },
        /**
         * 获取标签/列名的按钮结构
         * @param tagName 
         */
        getButtonStructure(tagName: string): Array<ButtonGroup> {
            if (this.buttonStructure[tagName]) {
                let result: Array<ButtonGroup> = this.buttonStructure[tagName]
                return result
            } else {
                let result = null
                if (this.buttons && this.buttons.length > 0) {
                    if (this.buttonAreas) {
                        let buttonAreas: Array<ButtonAreaDefine> = null
                        if (!Array.isArray(this.buttonAreas)) {
                            buttonAreas = [this.buttonAreas]
                        } else {
                            buttonAreas = this.buttonAreas
                        }
                        let tagButtonAreas = buttonAreas.filter(i => stringUtils.compare(i.useTag, tagName))
                        if (tagButtonAreas && tagButtonAreas.length > 0) {
                            let allButtonGroups: Array<ButtonGroup> = []
                            let notMobileFixedButtons = []
                            let mobileFixedButtonGroups = []
                            tagButtonAreas.forEach(tagButtonArea => {
                                let buttonCodes = tagButtonArea.buttonCodes
                                let securityButtons = []
                                buttonCodes.forEach(code => {
                                    let buttonConfig = this.buttons.find(i => stringUtils.compare(i.code, code))
                                    if (buttonConfig) {
                                        // 按钮操作权限
                                        securityButtons.push(buttonConfig)
                                    }
                                })
                                if (securityButtons && securityButtons.length > 0) {
                                    let isGroup = securityButtons.length > 1 && (!stringUtils.isEmpty(tagButtonArea.groupIcon) || !stringUtils.isEmpty(tagButtonArea.groupText))
                                    let buttonGroup: ButtonGroup = {
                                        isGroup,
                                        groupIcon: isGroup ? tagButtonArea.groupIcon : null,
                                        groupText: isGroup ? (this.isMobile() ? null : tagButtonArea.groupText) : null,
                                        buttons: securityButtons
                                    }
                                    if (this.isMobile()) {
                                        buttonGroup.groupText = null
                                        if (!tagButtonArea.mobileFixed) {
                                            notMobileFixedButtons = notMobileFixedButtons.concat(securityButtons)
                                        } else {
                                            mobileFixedButtonGroups.push(buttonGroup)
                                        }
                                    } else {
                                        allButtonGroups.push(buttonGroup)
                                    }
                                }
                            })
                            if (this.isMobile() && notMobileFixedButtons.length > 0) {
                                notMobileFixedButtons = arrayUtils.removeDuplicate(notMobileFixedButtons)
                                let isGroup = notMobileFixedButtons.length > 1
                                let buttonGroup: ButtonGroup = {
                                    isGroup,
                                    groupIcon: isGroup ? 'list' : null,
                                    groupText: null,
                                    buttons: notMobileFixedButtons
                                }
                                allButtonGroups = mobileFixedButtonGroups.concat(buttonGroup)
                            }
                            result = allButtonGroups
                            this.$set(this.buttonStructure, tagName, result)
                            return result
                        }
                    }
                }
            }
        },
        isMobile(): boolean {
            return this.$vuetify.breakpoint.width < this.mobileBreakpoint
        }
    }
})
