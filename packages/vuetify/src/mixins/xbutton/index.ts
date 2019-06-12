import lodash from 'lodash'
import Colorable from '../colorable'
import { VNode } from 'vue'
import ButtonGroup from './ButtonGroup'
import { stringUtils, arrayUtils, guidUtils } from 'pilotwhale-utils'
import Button from './Button'
import { PropValidator } from 'vue/types/options'
import xMobile from '../xMobile'

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
 * 按钮组合实例
 */
class ButtonGroupInstance {
    isGroup: boolean
    groupIcon: string
    groupText: string
    groupButtonColor: string
    buttons: Array<Button>
}

export default ({
    name: 'xbutton',
    mixins: [Colorable, xMobile],
    props: {
        context: {
            type: Object
        },
        // 按钮结构的集合
        buttonGroups: {
            type: [Array]
        } as PropValidator<Array<ButtonGroup>>,
        // 按钮的集合
        buttons: {
            type: [Array]
        } as PropValidator<Array<Button>>,
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
        }, // raised|flat|depressed|icon|fab
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
        }
    },
    data() {
        return {
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
        /**
         * 生成表格移动端按钮
         * @param tagName 
         * @param item 
         * @param rowIndex 
         */
        genTableMobileButtons(tagName: string, item?: any, rowIndex?: number) {
            if (tagName) {
                let h = this.$createElement
                let buttonStructure: Array<ButtonGroupInstance> = this.getButtonStructure(tagName)
                if (buttonStructure) {
                    let result = []
                    buttonStructure.forEach(buttonGroup => {
                        buttonGroup.buttons.forEach(button => {
                            let btn = this.genButton(h, button, false, item, rowIndex)
                            if (btn) {
                                result.push(h('VListItem', { style: { margin: '2px 0px', left: '-4px' } }, [btn]))
                            }
                        })
                    })
                    return result
                }
            }
        },
        genButtons(tagName: string, item?: any, rowIndex?: number): VNode[] | undefined {
            if (tagName) {
                let h = this.$createElement
                let buttonStructure: Array<ButtonGroupInstance> = this.getButtonStructure(tagName)
                if (buttonStructure) {
                    let result = []
                    buttonStructure.forEach(buttonGroup => {
                        if (buttonGroup.isGroup) {
                            let group = this.genDropDownList(h, buttonGroup, item, rowIndex)
                            if (group) {
                                result.push(group)
                            }
                        } else {
                            buttonGroup.buttons.forEach(button => {
                                let btn = this.genButton(h, button, false, item, rowIndex)
                                if (btn) {
                                    result.push(btn)
                                }
                            })
                        }
                    })
                    if (this.getButtonType() === ButtonType.APP) {
                        this.genBottomNavigation(h, result)
                        return null
                    } else {
                        if (!this.isMobile && this.context && this.context.hasOwnProperty('extendElements') && this.context.extendElements.length > 0) {
                            this.context.$set(this.context, 'extendElements', [])
                        }
                        return result
                    }
                }
            }
        },
        genBottomNavigation(h, buttons) {
            if (this.context && this.context.extendElements) {
                let result = []
                if (buttons && buttons.length > 0) {
                    let flexNo = parseInt(12 / buttons.length)
                    let maxCount = 12 / flexNo
                    let flexs = []
                    for (let i = 0; i < maxCount; i++) {
                        let flex = h('VFlex', { class: `xs${flexNo}` }, [buttons[i]])
                        flexs.push(flex)
                    }
                    let layout = h('VLayout', flexs)
                    let bottomNavigation = h('VBottomNavigation', {
                        props: {
                            app: true
                        }
                    }, [layout])
                    result.push(bottomNavigation)
                }
                if (!lodash.isEqual(this.context.extendElements, result)) {
                    this.context.$set(this.context, 'extendElements', result)
                }
            }
        },
        genDropDownList(h, buttonGroup: ButtonGroupInstance, item?: any, rowIndex?: number) {
            if (buttonGroup.buttons) {
                let menuId = guidUtils.newId()
                let buttons = []
                buttonGroup.buttons.forEach(buttonProps => {
                    let button = this.genDropDownItem(h, menuId, buttonProps, item, rowIndex)
                    if (button) {
                        buttons.push(button)
                    }
                })
                if (buttons && buttons.length > 0) {
                    let list = h('VList', {
                        props: { light: true, dense: true }
                    }, buttons)
                    let buttonProps = new Button()
                    buttonProps.text = buttonGroup.groupText
                    buttonProps.icon = buttonGroup.groupIcon
                    buttonProps.color = buttonGroup.groupButtonColor
                    let button = this.genButton(h, buttonProps, true)
                    let menu = h('VMenu', { key: menuId, ref: menuId, props: { closeOnClick: true, bottom: true, left: true, offsetY: true } }, [button, list])
                    return menu
                }
            }
        },
        genDropDownItem(h, menuId: string, button: Button, item?: any, rowIndex?: number) {
            let icon = button.icon ? h('VIcon', {
                props: {
                    small: true,
                    color: button.color ? button.color : undefined
                },
                domProps: {
                    innerHTML: button.icon
                }
            }) : null
            let action = button.icon ? h('VListItemAction', {
                style: {
                    marginRight: '0px'
                }
            }, [icon]) : null

            let title = button.text ? h('VListItemTitle', {
                domProps: {
                    innerHTML: `<span>${button.text}</span>`
                }
            }) : null
            let content = button.text ? h('VListItemContent', [title]) : null

            let objs = []
            if (action) {
                objs.push(action)
            }
            if (content) {
                objs.push(content)
            }
            if (objs && objs.length > 0) {
                let on = null
                if (button.event && this.context && this.context[button.event]) {
                    on = {}
                    on.click = (e) => {
                        this.context[button.event](e, this.$vnode.key, item, rowIndex)
                        this.$refs[menuId].isActive = false
                        e.stopPropagation()
                    }
                }
                let buttonKey = item ? `${item[this.itemKey]}_${button.key ? button.key : guidUtils.newId()}` : `${button.key ? button.key : guidUtils.newId()}`
                let listItem = h('VListItem', {
                    key: buttonKey,
                    class: 'v-list__tile--doc',
                    props: {
                        ripple: true,
                        rel: 'noopener'
                    },
                    domProps: {
                        title: button.tips ? button.tips : undefined
                    },
                    on
                }, objs)
                return listItem
            }
        },
        genButton(h, button: Button, isMenuButton: boolean, item?: any, rowIndex?: number) {
            let isMobileTableInlinButton = this.getButtonType() === ButtonType.INLINE_ROW && this.isMobile
            if (this.getButtonType() === ButtonType.APP && !button.color) {
                button.color = '#000000'
            }
            let props = { ...this.btnProps }
            if (button.color) {
                props.color = button.color
            }
            let iconDark = !stringUtils.isEmpty(props.color)
            let buttonKey = item ? `${item[this.itemKey]}_${button.key ? button.key : guidUtils.newId()}` : `${button.key ? button.key : guidUtils.newId()}`
            let icon = button.icon ? h('VIcon', {
                key: buttonKey + '_icon',
                // class: isMenuButton ? 'px-1 hidden-md-and-up' : 'px-1',
                class: 'px-1',
                props: {
                    small: true,
                    dark: iconDark,
                    color: this.getButtonType() === ButtonType.APP || isMobileTableInlinButton ? button.color : null
                },
                domProps: {
                    innerHTML: button.icon
                },
                style: {
                    fontSize: this.getButtonType() === ButtonType.APP ? '22px' : null
                }
            }) : null
            let labelClass = 'mr-1'
            if (this.getButtonType() !== ButtonType.APP) {
                if (isMobileTableInlinButton) {
                    labelClass = 'mr-1'
                } else {
                    labelClass = 'mr-1 hidden-sm-and-down'
                }
            }
            let labelProps: any = button.text ? {
                // class: this.getButtonType() === ButtonType.APP ? 'mr-1' : 'mr-1 hidden-sm-and-down',
                class: labelClass,
                domProps: {
                    innerHTML: button.text
                },
                style: {
                    fontSize: this.getButtonType() === ButtonType.APP ? '14px' : null
                }
            } : null
            if (labelProps) {
                if (this.getButtonType() === ButtonType.APP || isMobileTableInlinButton) {
                    if (this.isCssColor(button.color)) {
                        if (!labelProps.style) {
                            labelProps.style = {}
                        }
                        labelProps.style.color = button.color
                    } else {
                        labelProps.class += ` ${button.color}--text`
                    }
                }
            }
            let label = labelProps ? h('span', labelProps) : null
            let objs = []
            if (icon) {
                objs.push(icon)
            }
            if (label) {
                objs.push(label)
            }
            if (isMenuButton && this.getButtonType() !== ButtonType.APP) {
                let iconExtend = h('VIcon', {
                    class: 'hidden-sm-and-down',
                    domProps: {
                        innerHTML: 'mdi-menu-down'
                    }
                })
                objs.push(iconExtend)
            }
            if (objs && objs.length > 0) {
                if (this.isMobile) {
                    if (this.getButtonType() === ButtonType.INLINE_ROW) {
                        props.fab = false
                        props.minWidth = null
                        props.width = '100%'
                        props.small = false
                        props.color = '#ffffff'
                    } else {
                        props.fab = true
                        props.minWidth = null
                        props.outline = false
                    }
                }
                let on: any = {}
                if (!isMenuButton) {
                    if (button.event && this.context && this.context[button.event]) {
                        on.click = (e) => {
                            this.context[button.event](e, this.$vnode.key, item, rowIndex)                            
                            // 关闭bottom sheet
                            if (isMobileTableInlinButton) {
                                this.$set(this, 'showBottomSheetButton', false)
                            }
                            e.stopPropagation()
                        }
                    } else {
                        on.click = (e) => {
                            // 关闭bottom sheet
                            if (isMobileTableInlinButton) {
                                this.$set(this, 'showBottomSheetButton', false)
                            }
                            e.stopPropagation()
                        }
                    }
                }
                let style: any = {}
                let staticClass: string = null
                if (this.getButtonType() === ButtonType.APP) {
                    props.color = undefined
                    staticClass = this.buttonStaticClass
                    let objsLable = objs[1]
                    objs[1] = objs[0]
                    objs[0] = objsLable
                } else {
                    let mx1Class: string = this.buttonStyle !== 'flat' ? 'mx-1' : ''
                    staticClass = this.buttonStaticClass ? (this.buttonStaticClass + ' ' + mx1Class) : mx1Class
                }
                let btn = h('VBtn', {
                    slot: isMenuButton ? 'activator' : undefined,
                    key: buttonKey,
                    staticClass,
                    style,
                    props: {
                        ...props,
                        ariaLabel: isMenuButton ? button.text : undefined
                    },
                    domProps: {
                        title: button.tips ? button.tips : undefined
                    },
                    on
                }, objs)
                return btn
            }
        },
        /**
         * 获取按钮类型
         */
        getButtonType() {
            let buttonType = ButtonType.DEFAULT
            switch (this.$options._componentTag) {
                case 'VDataTable':
                case 'v-data-table':
                    buttonType = ButtonType.INLINE_ROW
                    break
                case 'CTab':
                    if (this.app && this.isMobile) {
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
        getButtonStructure(tagName: string): Array<ButtonGroupInstance> {
            let isMobile = this.isMobile
            let result = null
            if (this.buttonGroups && this.buttonGroups.length > 0 && this.buttons && this.buttons.length > 0) {
                let buttonGroups: Array<ButtonGroup> = this.buttonGroups
                let tagbuttonGroups = buttonGroups.filter(i => stringUtils.compare(i.useTag, tagName))
                if (tagbuttonGroups && tagbuttonGroups.length > 0) {
                    let buttons: Array<Button> = this.buttons
                    let allButtonGroups: Array<ButtonGroupInstance> = []
                    let notMobileFixedButtons = []
                    let mobileFixedButtonGroups = []
                    tagbuttonGroups.forEach(tagButtonArea => {
                        let groupButtons: Array<Button> = []
                        let buttonKeys = tagButtonArea.buttonKeys
                        buttonKeys.forEach(key => {
                            let button: Button = buttons.find(i => stringUtils.compare(i.key, key))
                            if (button) {
                                groupButtons.push(button)
                            }
                        })
                        if (groupButtons && groupButtons.length > 0) {
                            let isGroup = groupButtons.length > 1 && (!stringUtils.isEmpty(tagButtonArea.groupIcon) || !stringUtils.isEmpty(tagButtonArea.groupText))
                            let buttonGroup: ButtonGroupInstance = {
                                isGroup,
                                groupIcon: isGroup ? tagButtonArea.groupIcon : null,
                                groupText: isGroup ? tagButtonArea.groupText : null,
                                buttons: groupButtons,
                                groupButtonColor: tagButtonArea.groupButtonColor
                            }
                            if (isMobile) {
                                if (!tagButtonArea.refusedMergeForMobile) {
                                    notMobileFixedButtons = notMobileFixedButtons.concat(groupButtons)
                                } else {
                                    mobileFixedButtonGroups.push(buttonGroup)
                                    allButtonGroups.push(buttonGroup)
                                }
                            } else {
                                allButtonGroups.push(buttonGroup)
                            }
                        }
                    })
                    if (isMobile && notMobileFixedButtons.length > 0) {
                        notMobileFixedButtons = arrayUtils.removeDuplicate(notMobileFixedButtons)
                        let isGroup = notMobileFixedButtons.length > 1
                        let buttonGroup: ButtonGroupInstance = {
                            isGroup,
                            groupIcon: isGroup ? 'mdi-format-list-bulleted' : null,
                            groupText: 'more',
                            buttons: notMobileFixedButtons,
                            groupButtonColor: null
                        }
                        allButtonGroups = mobileFixedButtonGroups.concat(buttonGroup)
                    }
                    result = allButtonGroups
                    return result
                }
            }
        }
    }
})
