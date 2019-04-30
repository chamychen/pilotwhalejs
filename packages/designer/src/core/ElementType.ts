/**
 * 组件构造
 */
class SimpleElement {
    elementName: string
    type: string
    elementTypeName: string

    constructor(elementName: string, type: string, elementTypeName: string) {
        if (elementName && elementName.trim().length > 0) {
            this.elementName = elementName.trim()
            this.type = type ? type.trim() : null
        } else {
            throw new Error('SimpleElement constructor [elementName] Can not be empty')
        }
        if (elementTypeName && elementTypeName.trim().length > 0) {
            this.elementTypeName = elementTypeName
        } else {
            throw new Error('SimpleElement constructor [elementTypeName] Can not be empty')
        }
    }
}

const ElementType = {
    container: new SimpleElement('VContainer', null, 'container'),
    layout: new SimpleElement('VLayout', null, 'layout'),
    flex: new SimpleElement('VFlex', null, 'flex'),
    cTab: new SimpleElement('CTab', null, 'cTab'),
    form: new SimpleElement('div', null, 'form'),
    tab: new SimpleElement('div', null, 'tab'),
    table: new SimpleElement('VDataTable', null, 'table'),
    card: new SimpleElement('VCard', null, 'card'),
    textarea: new SimpleElement('VTextarea', null, 'textarea'),
    text: new SimpleElement('VTextField', null, 'text'),
    integer: new SimpleElement('VTextField', 'number', 'integer'), // 整数
    natural_number: new SimpleElement('VTextField', 'number', 'natural_number'), // 正整数(自然数)
    negative_integer: new SimpleElement('VTextField', 'number', 'negative_integer'), // 负整数
    float: new SimpleElement('VTextField', 'number', 'float'), // 浮点数
    positive_float: new SimpleElement('VTextField', 'number', 'positive_float'), // 正浮点数
    negative_float: new SimpleElement('VTextField', 'number', 'negative_float'), // 负浮点数
    datetime: new SimpleElement('VDateTimeField', null, 'datetime'), // 日期时间
    year: new SimpleElement('VYear', null, 'year'), // 年度
    month: new SimpleElement('VMonth', null, 'month'), // 月度
    date: new SimpleElement('VDate', null, 'date'), // 日期
    time: new SimpleElement('VTime', null, 'time'), // 时间
    switch: new SimpleElement('VSwitch', null, 'switch'), // switch
    checkbox: new SimpleElement('VCheckbox', null, 'checkbox'), // checkbox
    select: new SimpleElement('VSelect', null, 'select'), // select
    checkboxList: new SimpleElement('VRadioGroup', 'checkbox', 'integer'),
    radioList: new SimpleElement('VRadioGroup', 'radio', 'radioList'),
    switchList: new SimpleElement('VRadioGroup', 'switch', 'switchList'),
    popupSelector: new SimpleElement('VPopupSelector', null, 'popupSelector')
}

const layoutContainer = [ElementType.container.elementTypeName, ElementType.layout.elementTypeName]
const layout = [ElementType.container.elementTypeName, ElementType.cTab.elementTypeName, ElementType.tab.elementTypeName, ElementType.layout.elementTypeName, ElementType.flex.elementTypeName, ElementType.table.elementTypeName, ElementType.card.elementTypeName]
const text = [ElementType.text.elementTypeName, ElementType.textarea.elementTypeName]
const number = [ElementType.natural_number.elementTypeName, ElementType.negative_integer.elementTypeName, ElementType.float.elementTypeName, ElementType.positive_float.elementTypeName, ElementType.negative_float.elementTypeName]
const date = [ElementType.date.elementTypeName, ElementType.time.elementTypeName, ElementType.year.elementTypeName, ElementType.month.elementTypeName, ElementType.datetime.elementTypeName]
const singleSelect = [ElementType.radioList.elementTypeName]
const multiSelect = [ElementType.select.elementTypeName, ElementType.checkboxList.elementTypeName, ElementType.switchList.elementTypeName]
const selectItem = [ElementType.checkbox.elementTypeName, ElementType.switch.elementTypeName]

const ElementTypeGroup = {
    layout,
    text,
    number,
    date,
    singleSelect,
    multiSelect,
    selectItem
}
export default ElementType
export { SimpleElement, ElementTypeGroup }