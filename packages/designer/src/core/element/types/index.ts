import { stringUtils } from 'pilotwhale-utils'

class ElementType {
    elementTypeName: string

    elementName: string

    type: string

    className: string

    constructor(elementName: string, type: string, elementTypeName: string, className: string) {
        if (!stringUtils.isEmpty(elementName)) {
            this.elementName = elementName.trim()
            this.type = type ? type.trim() : null
        } else {
            throw new Error('ElementType constructor [elementName] Can not be empty')
        }
        if (!stringUtils.isEmpty(elementTypeName)) {
            this.elementTypeName = elementTypeName.trim()
        } else {
            throw new Error('ElementType constructor [elementTypeName] Can not be empty')
        }
        if (!stringUtils.isEmpty(className)) {
            this.className = className.trim()
        } else {
            throw new Error('ElementType constructor [className] Can not be empty')
        }
    }

    newElement() {

    }
}

const ElementTypes = {
    content: new ElementType('VContent', null, 'content', 'BaseElement'),
    container: new ElementType('VContainer', null, 'container', 'BaseElement'),
    bottomNavigation: new ElementType('VBottomNavigation', null, 'bottomNavigation', 'BaseElement'),
    layout: new ElementType('VLayout', null, 'layout', 'BaseElement'),
    flex: new ElementType('VFlex', null, 'flex', 'BaseElement'),
    tab: new ElementType('CTab', null, 'tab', 'TabElement'),
    form: new ElementType('div', null, 'form', 'BaseElement'),
    table: new ElementType('VDataTable', null, 'table', 'TableElement'),
    card: new ElementType('VCard', null, 'card', 'BaseElement'),
    textarea: new ElementType('VTextarea', null, 'textarea', 'InputElement'),
    textCoulumn: new ElementType('div', null, 'textCoulumn', 'BaseElement'),
    color: new ElementType('VTextField', 'color', 'color', 'InputElement'),
    text: new ElementType('VTextField', null, 'text', 'InputElement'),
    integer: new ElementType('VTextField', 'number', 'integer', 'InputElement'), // 整数
    natural_integer: new ElementType('VTextField', 'number', 'natural_integer', 'InputElement'), // 正整数(自然数)
    negative_integer: new ElementType('VTextField', 'number', 'negative_integer', 'InputElement'), // 负整数
    float: new ElementType('VTextField', 'number', 'float', 'InputElement'), // 浮点数
    positive_float: new ElementType('VTextField', 'number', 'positive_float', 'InputElement'), // 正浮点数
    negative_float: new ElementType('VTextField', 'number', 'negative_float', 'InputElement'), // 负浮点数
    datetime: new ElementType('VTextField', 'date', 'datetime', 'InputElement'), // 日期时间
    year: new ElementType('VYear', null, 'year', 'InputElement'), // 年度
    month: new ElementType('VMonth', null, 'month', 'InputElement'), // 月度
    date: new ElementType('VDate', null, 'date', 'InputElement'), // 日期
    time: new ElementType('VTime', null, 'time', 'InputElement'), // 时间
    switch: new ElementType('VSwitch', null, 'switch', 'SingleSelectorElement'), // switch
    checkbox: new ElementType('VCheckbox', null, 'checkbox', 'SingleSelectorElement'), // checkbox
    select: new ElementType('VSelect', null, 'select', 'SelectElement'), // select
    combobox: new ElementType('VCombobox', null, 'combobox', 'SelectElement'), // combobox
    checkboxList: new ElementType('VRadioGroup', 'checkbox', 'integer', 'SelectorGroupElement'),
    radioList: new ElementType('VRadioGroup', 'radio', 'radioList', 'SelectorGroupElement'),
    switchList: new ElementType('VRadioGroup', 'switch', 'switchList', 'SelectorGroupElement'),
    popupSelector: new ElementType('VPopupSelector', null, 'popupSelector', 'SelectElement')
}

/**
 * 非编缉类型元素
 */
const noEditElementTypes = [
    ElementTypes.container.elementTypeName,
    ElementTypes.layout.elementTypeName,
    ElementTypes.flex.elementTypeName,
    ElementTypes.tab.elementTypeName,
    ElementTypes.form.elementTypeName,
    ElementTypes.table.elementTypeName,
    ElementTypes.card.elementTypeName
]

export { noEditElementTypes, ElementType }
export default ElementTypes
