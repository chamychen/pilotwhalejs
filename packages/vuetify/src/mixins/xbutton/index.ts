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
    groupButtonColor: string
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
        },
        buttonMinWidth: {
            type: Number
        },
        buttonMinHeight: {
            type: Number
        },
        buttonSize: {
            type: String
        },
        buttonColor: {
            type: String
        },
        buttonDark: {
            type: Boolean
        },
        buttonStyle: {
            type: String
        },
        buttonOutline: {
            type: Boolean
        },
        buttonRound: {
            type: Boolean
        },
        buttonClickMethod: {
            type: String
        },
        buttonClickContext: {
            type: Object
        },
        buttonStaticClass: {
            type: String
        },
        mobileBreakpoint: {
            type: Number,
            default: 1024
        }
    },
    data() {
        return {
            buttonStructure: {}
        }
    },
    computed: {
        btnProps() {
            let obj: any = {}
            if (this.buttonMinWidth) {
                obj.minWidth = this.buttonMinWidth
            }
            if (this.buttonMinHeight) {
                obj.minHeight = this.buttonMinHeight
            }
            if (this.buttonSize) {
                obj[this.buttonSize] = true
            }
            if (this.buttonColor) {
                obj.color = this.buttonColor
            }
            if (this.buttonDark) {
                obj.dark = true
            }
            if (this.buttonStyle) {
                obj[this.buttonStyle] = true
            }
            if (this.buttonOutline) {
                obj.outline = this.buttonOutline
            }
            if (this.buttonRound) {
                obj.round = this.buttonRound
            }
            return obj
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
                                let btn = this.genButton(this.$createElement, button)
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
                    let buttonProps = new ButtonProps()
                    buttonProps.btnName = buttonGroup.groupText
                    buttonProps.iconClass = buttonGroup.groupIcon
                    buttonProps.color = buttonGroup.groupButtonColor
                    let button = this.genButton(h, buttonProps, true)
                    let menu = h('VMenu', { props: { bottom: true, left: true, offsetY: true } }, [button, list])
                    return menu
                }
            }
        },
        genButton(h, button: ButtonProps, isMenuButton = false) {
            let props = { ...this.btnProps }
            if (button.color) {
                props.color = button.color
            }
            let iconDark = !stringUtils.isEmpty(props.color)
            let icon = button.iconClass ? h('VIcon', {
                // class: isMenuButton ? 'px-1 hidden-md-and-up' : 'px-1',
                class: 'px-1',
                props: {
                    small: true,
                    dark: iconDark
                },
                domProps: {
                    innerHTML: button.iconClass
                }
            }) : null
            let label = button.btnName ? h('span', {
                class: 'mr-1 hidden-sm-and-down',
                domProps: {
                    innerHTML: button.btnName
                }
            }) : null
            let objs = []
            if (icon) {
                objs.push(icon)
            }
            if (label) {
                objs.push(label)
            }
            if (isMenuButton) {
                let iconExtend = h('VIcon', {
                    class: 'hidden-sm-and-down',
                    domProps: {
                        innerHTML: 'mdi-menu-down'
                    }
                })
                objs.push(iconExtend)
            }
            if (objs && objs.length > 0) {
                if (this.isMobile()) {
                    props.fab = true
                    props.minWidth = null
                    props.outline = false
                }
                let btn = h('VBtn', {
                    slot: isMenuButton ? 'activator' : undefined,
                    staticClass: this.buttonStaticClass,
                    props: {
                        ...props,
                        ariaLabel: isMenuButton ? button.btnName : undefined
                    },
                    domProps: {
                        title: button.title ? button.title : undefined
                    }
                }, objs)
                return btn
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
            let action = button.iconClass ? h('VListItemAction', {
                style: {
                    marginRight: '0px'
                }
            }, [icon]) : null

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
                        rel: 'noopener'
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
            let isMobile = this.isMobile()
            let data: Array<ButtonGroup> = null
            if (this.buttonStructure[tagName]) {
                if (isMobile) {
                    data = this.buttonStructure[tagName].mobileData
                } else {
                    data = this.buttonStructure[tagName].pcData
                }
            }
            if (!data) {
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
                                        groupText: isGroup ? (isMobile ? null : tagButtonArea.groupText) : null,
                                        buttons: securityButtons,
                                        groupButtonColor: tagButtonArea.groupButtonColor
                                    }
                                    if (isMobile) {
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
                            if (isMobile && notMobileFixedButtons.length > 0) {
                                notMobileFixedButtons = arrayUtils.removeDuplicate(notMobileFixedButtons)
                                let isGroup = notMobileFixedButtons.length > 1
                                let buttonGroup: ButtonGroup = {
                                    isGroup,
                                    groupIcon: isGroup ? 'mdi-format-list-bulleted' : null,
                                    groupText: null,
                                    buttons: notMobileFixedButtons,
                                    groupButtonColor: null
                                }
                                allButtonGroups = mobileFixedButtonGroups.concat(buttonGroup)
                            }
                            result = allButtonGroups
                            let tagNameData = this.buttonStructure[tagName]
                            let obj: any = {}
                            if (isMobile) {
                                obj.mobileData = result
                                if (tagNameData && tagNameData.pcData) {
                                    obj.pcData = tagNameData.pcData
                                }
                            } else {
                                obj.pcData = result
                                if (tagNameData && tagNameData.mobileData) {
                                    obj.mobileData = tagNameData.mobileData
                                }
                            }
                            this.$set(this.buttonStructure, tagName, obj)
                            return result
                        }
                    }
                }
            } else {
                return data
            }
        },
        isMobile(): boolean {
            return this.$vuetify.breakpoint.width < this.mobileBreakpoint
        }
    }
})
