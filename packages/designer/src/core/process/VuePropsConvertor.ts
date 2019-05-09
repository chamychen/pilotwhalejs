import utils from 'pilotwhale-utils'
import ElementType, { ElementTypeGroup } from '../ElementType'
import { TabItemDefine } from 'vuetify'
export default class VuePropsConvertor {
    private context: any
    private i18n?: any

    constructor(context: any, i18n?: any) {
        this.context = context
        this.i18n = i18n
    }

    public getConfig(entity: any) {
        const config: any = { props: {} }
        const elementTypeName = entity.elementTypeName
        const isLayoutElment = ElementTypeGroup.layout.includes(entity.elementTypeName)
        let hasIsPrependInnerIconProps = false
        let hasIsAppendOuterIcon = false
        Object.keys(entity).map((field) => {
            let fieldValue = entity[field]
            if (typeof fieldValue === 'string') {
                fieldValue = fieldValue.trim()
                if (fieldValue.length === 0) {
                    fieldValue = null
                }
            }
            if (fieldValue != null) {
                switch (field) {
                    case 'slot':
                        config.slot = fieldValue
                        break
                    case 'key':
                        config.key = fieldValue
                        config.props.ref = fieldValue
                        config.props.label = this.getI18n(fieldValue)
                        let model = fieldValue.split('_').join('.')
                        if (!isLayoutElment) {
                            config.model = {
                                value: this.getModel(model),
                                callback: val => {
                                    this.setModel(model, val)
                                }
                            }
                        } else if (elementTypeName === ElementType.table.elementTypeName) {
                            config.props.items = this.getModel(model)
                        }
                        break
                    // 可不设置，设置后则比key中的model配置优先
                    case 'model':
                        config.model = {
                            value: this.getModel(fieldValue, true),
                            callback: val => {
                                this.setModel(fieldValue, val, true)
                            }
                        }
                        break
                    case 'smallFlex':
                        let smflexClass = `xs${fieldValue} `
                        config.flexClass = config.flexClass ? config.flexClass + smflexClass : smflexClass
                        break
                    case 'middleFlex':
                        let mdflexClass = `md${fieldValue} `
                        config.flexClass = config.flexClass ? config.flexClass + mdflexClass : mdflexClass
                        break
                    case 'largeFlex':
                        let lgflexClass = `lg${fieldValue} `
                        config.flexClass = config.flexClass ? config.flexClass + lgflexClass : lgflexClass
                        break
                    case 'sysClass':
                        config.class = config.class ? config.class + ' ' + fieldValue : fieldValue
                        break
                    case 'class':
                        config.class = config.class ? config.class + ' ' + fieldValue : fieldValue
                        break
                    case 'style':
                        config.style = fieldValue
                        break
                    case 'maxlength':
                        if (!config.attrs) {
                            config.attrs = {}
                        }
                        config.attrs.maxlength = fieldValue
                        break
                    case 'hint':
                    case 'title':
                    case 'placeholder':
                    case 'noDataText':
                        config.props[field] = this.getI18n(fieldValue)
                        break
                    case 'isPrependInnerIcon':
                        hasIsPrependInnerIconProps = true
                        break
                    case 'isAppendOuterIcon':
                        hasIsAppendOuterIcon = true
                        break
                    case 'items':
                        if (utils.stringUtils.compare(elementTypeName, ElementType.cTab.elementTypeName)) {
                            let newItems: Array<TabItemDefine> = []
                            fieldValue.forEach(tabItemKey => {
                                let tabItem = {
                                    key: tabItemKey,
                                    name: this.getI18n(tabItemKey)
                                } as TabItemDefine
                                newItems.push(tabItem)
                            })
                            config.props[field] = newItems
                        } else {
                            if (this.i18n) {
                                fieldValue.forEach((item: any) => {
                                    if (entity.itemText) {
                                        if (typeof item === 'object') {
                                            const itemText = entity.itemText
                                            item[itemText] = this.getI18n(item[itemText])
                                        } else if (typeof item === 'string') {
                                            item = this.getI18n(item)
                                        }
                                    }
                                })
                            }
                            config.props[field] = fieldValue
                        }
                        break
                    case 'disablePagination':
                        if (fieldValue) {
                            config.props.disablePagination = fieldValue
                            config.props.hideDefaultFooter = true
                        }

                        break
                    case 'change':
                    case 'update_error':
                    case 'click_append':
                    case 'click_append$outer':
                    case 'click_clear':
                    case 'click_prepend':
                    case 'click_prepend$inner':
                    case 'input':
                    case 'update_search$input':
                    case 'item$selected':
                        if (!config.on) {
                            config.on = {}
                        }
                        field = field.replace('_', ':').replace('$', '-')
                        if (typeof fieldValue === 'string') {
                            config.on[field] = this.context[fieldValue]
                        }
                        break
                    default:
                        config.props[field] = fieldValue
                        break
                }
            }
        })
        if (hasIsPrependInnerIconProps && entity.isPrependInnerIcon) {
            config.props.prependInnerIcon = config.props.prependIcon
            config.props.prependIcon = null
        }
        if (hasIsAppendOuterIcon && entity.isAppendOuterIcon) {
            config.props.appendOuterIcon = config.props.appendIcon
            config.props.appendIcon = null
        }
        if (config.flexClass) {
            config.class = config.class ? `${config.class} ${config.flexClass}` : config.flexClass
        }
        if (entity.tagTypeName === 'layout') {
            config.class = config.class ? config.class + ' wrap' : 'wrap'
        }
        return config
    }

    /**
     * 获取国际化字符串
     */
    private getI18n(i18nKey: string) {
        if (i18nKey) {
            if (this.i18n) {
                return this.i18n(i18nKey)
            } else {
                let arr = i18nKey.split('_')
                return arr[arr.length - 1]
            }
        }
    }

    private getModel(modelName: string, noFromData: boolean = false) {
        if (modelName) {
            let result = noFromData ? this.context : this.context.currentValue
            const sections = modelName.split('.')
            sections.forEach((section: string) => {
                if (result) {
                    result = result[section]
                }
            })
            return result
        }
    }

    private setModel(modelName: string, value: any, noFromData: boolean = false) {
        if (modelName) {
            let result = noFromData ? this.context : this.context.currentValue
            const sections = modelName.split('.')
            sections.forEach((section: string, index: number) => {
                if (index === sections.length - 1) {
                    this.context.$set(result, section, value)
                } else {
                    if (!result.hasOwnProperty(section)) {
                        result[section] = {}
                    }
                    result = result[section]
                }
            })
        }
    }
}