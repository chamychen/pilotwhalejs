import ElementClassCode, { ClassCodeType } from '@core/element/decorator/ElementClassCode'
import utils from 'pilotwhale-utils'
import ElementTypes, { noEditElementTypes } from './types'
import { TabItemDefine } from 'vuetify'
export default class ComponentConvertor {
    private context: any
    private i18n?: any

    constructor(context: any, i18n?: any) {
        this.context = context
        this.i18n = i18n
    }

    public getConfig(entity: any) {
        const config: any = { props: {}, attrs: {}, on: {} }
        const elementTypeName = entity.elementTypeName
        const isLayoutElment = noEditElementTypes.includes(entity.elementTypeName)
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
                        config.ref = fieldValue
                        config.props.label = this.getI18n(fieldValue)
                        let model = fieldValue.split('_').join('.')
                        if (!isLayoutElment) {
                            config.model = {
                                value: this.getModel(model),
                                callback: val => {
                                    if (!this.context.updateWithChange) {
                                        this.setModel(model, val)
                                    }
                                }
                            }
                            config.on.change = val => {
                                if (this.context.updateWithChange) {
                                    this.setModel(model, val)
                                }
                            }
                        } else if (elementTypeName === ElementTypes.table.elementTypeName) {
                            config.props.items = this.getModel(model)
                        }
                        break
                    // 可不设置，设置后则比key中的model配置优先
                    case 'model':
                        config.attrs.modelName = fieldValue
                        config.model = {
                            value: this.getModel(fieldValue, true),
                            callback: val => {
                                if (!this.context.updateWithChange) {
                                    this.setModel(fieldValue, val, true)
                                }
                            }
                        }
                        config.on.change = val => {
                            if (this.context.updateWithChange) {
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
                        field = field.replace('_', ':').replace('$', '-')
                        if (typeof fieldValue === 'string') {
                            config.on[field] = this.context[fieldValue]
                        }
                        break
                    case 'items':
                        if (utils.stringUtils.compare(elementTypeName, ElementTypes.tab.elementTypeName)) {
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
                    case 'classCodeType':
                    case 'classCode':
                    case 'classCodeJSON':
                    case 'classCodeUrl':
                    case 'classCodeMethod':
                        // 分类码部分此处不处理
                        break
                    case 'buttonGroups':
                        config.props.context = this.context
                        config.props.buttons = this.context['buttons']
                        config.props.buttonGroups = fieldValue
                        // config.props.buttonGroups = this.context[field]
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
        if (config.props.noLabel) {
            config.attrs.title = config.props.label
            config.props.label = null
        }
        if (config.flexClass) {
            config.class = config.class ? `${config.class} ${config.flexClass}` : config.flexClass
        }
        if (entity.tagTypeName === 'layout') {
            config.class = config.class ? config.class + ' wrap' : 'wrap'
        }
        if (config.props.type === 'color') {
            config.class = config.class ? config.class + ' v-color-input' : 'v-color-input'
        }
        this.initClassCode(entity, config)
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
                    result[section] = value
                    if (!noFromData && result.__defineSetter__) {
                        this.context.$set(this.context, 'currentValue', this.context.currentValue)
                    }
                } else {
                    if (result && !result.hasOwnProperty(section)) {
                        result[section] = {}
                    }
                    result = result[section]
                }
            })
        }
    }

    /**
     * 实例化分类码数据
     * @param entity 
     * @param config 
     */
    private initClassCode(entity: any, config: any) {
        if (entity.classCodeType) {
            let entityKey = entity['key']
            let items = null
            if (this.context.classCode && Object.keys(this.context.classCode).includes(entityKey)) {
                items = this.context.classCode[entityKey]
            } else {
                let elementClassCode: ElementClassCode = null
                switch (entity.classCodeType) {
                    case ClassCodeType.Code:
                        elementClassCode = new ElementClassCode(ClassCodeType.Code, entity.classCode)
                        break
                    case ClassCodeType.JSON:
                        elementClassCode = new ElementClassCode(ClassCodeType.JSON, entity.classCodeJSON)
                        break
                    case ClassCodeType.URL:
                        elementClassCode = new ElementClassCode(ClassCodeType.URL, entity.classCodeUrl)
                        break
                    case ClassCodeType.METHOD:
                        elementClassCode = new ElementClassCode(ClassCodeType.METHOD, entity.classCodeMethod)
                        break
                }
                items = elementClassCode.getItems(this.context)
                if (this.context.classCode) {
                    this.context.$set(this.context.classCode, entityKey, items)
                } else {
                    let obj = {}
                    obj[entityKey] = items
                    this.context.$set(this.context, 'classCode', obj)
                }
            }
            config.props.items = items
        }
    }
}