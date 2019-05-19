import ElementClassificationCode, { ClassificationCodeType } from '@core/element/decorator/ElementClassificationCode'
import ElementFactory from '@core/element/types/ElementFactory'
import utils, { stringUtils } from 'pilotwhale-utils'
import DesignerDecoratorType from '.'
import ElementGroup from './ElementGroup'
import ElementTypes, { ElementType } from '../types'
import { SimpleElement } from '@core/element/decorator/SimpleElementCreator'


export default class DecoratorCompiler {
    /**
     *拥有子元素的类型
     *
     * @private
     * @memberof DecoratorCompiler
     */
    private listElementTypeNames = [ElementTypes.layout.elementTypeName, ElementTypes.table.elementTypeName]

    private dto: any

    private elements: Array<any> = []

    constructor(dto: any) {
        this.dto = dto
    }

    /**
     * 获取初始化后的元素
     */
    public getInitElements() {
        this.initElements()
        return this.elements && this.elements.length > 0 ? this.elements : null
    }

    /**
     * 构建元素
     * @param dto 
     * @param parentKey 父级key
     * @param prefixKey key真实前缀
     */
    private initElements(dto?: any, parentKey?: string, parentElementTypeName?: string) {
        let result = []
        if (!dto) {
            dto = this.dto
        }
        if (dto) {
            // 过滤出具有DesignerDecoratorType.Element注解的属性
            let elementPropNames = Object.keys(dto).filter(elementPropName =>
                Reflect.hasMetadata(DesignerDecoratorType.Element, dto, elementPropName)
            )
            if (elementPropNames) {
                elementPropNames.forEach((elementPropName: string, index: number) => {
                    let simpleElement: SimpleElement = Reflect.getMetadata(DesignerDecoratorType.Element, dto, elementPropName)
                    let currentElement = ElementFactory.createElement(simpleElement.elementType).mergeProps(simpleElement).toProps()
                    let currentParentKey = parentKey
                    let currentSortNo = index

                    // 构建group
                    let ElementGroup: ElementGroup = Reflect.getMetadata(DesignerDecoratorType.ElementGroup, dto, elementPropName)
                    if (ElementGroup != null) {
                        if (ElementGroup.groupName === '@') {
                            throw new Error('ElementGroup props groupName cannot be @')
                        } else {
                            ElementGroup.groupName = ElementGroup.groupName.replace('@', '')
                        }
                        let layoutKey = `${parentKey}_${ElementGroup.groupName}`
                        if (!this.elements.some(i => utils.stringUtils.compare(i.key, layoutKey))) {
                            let flexKey = `${layoutKey}_@flex`
                            let hasFlex = ElementGroup.groupXsFlex || ElementGroup.groupMdFlex || ElementGroup.groupLgFlex
                            let flex = hasFlex ? [ElementGroup.groupXsFlex, ElementGroup.groupMdFlex, ElementGroup.groupLgFlex] : [12]
                            // add group flex
                            this.addLayoutElement(flexKey, ElementTypes.flex, index, currentParentKey, flex)
                            // add group layout
                            this.addLayoutElement(layoutKey, ElementTypes.layout, 0, flexKey)
                        }
                        currentParentKey = layoutKey
                        currentSortNo = ElementGroup.elementSortNo
                    }

                    if (parentElementTypeName === ElementTypes.table.elementTypeName) {
                        currentElement.noFlex = true
                    }
                    if (!currentElement.noFlex) {
                        // add Element Flex
                        let flexKey = parentKey ? `${parentKey}_${elementPropName}_@flex` : `${elementPropName}_@flex`
                        let hasFlex = currentElement.smallFlex || currentElement.middleFlex || currentElement.largeFlex
                        let flex = hasFlex ? [currentElement.smallFlex, currentElement.middleFlex, currentElement.largeFlex] : [12]
                        this.addLayoutElement(flexKey, ElementTypes.flex, currentSortNo, currentParentKey, flex)
                        currentSortNo = 0
                        currentParentKey = flexKey
                    } else {
                        currentElement.class = `${currentElement.class ? currentElement.class : ''} px-1`
                    }
                    currentElement.smallFlex = null // 重置
                    currentElement.middleFlex = null // 重置
                    currentElement.largeFlex = null // 重置
                    currentElement.sortNo = currentSortNo
                    if (this.listElementTypeNames.includes(currentElement.elementTypeName)) {
                        if (currentElement.elementTypeName === ElementTypes.layout.elementTypeName) {
                            currentElement.class = 'row wrap'
                        }
                        currentElement.key = elementPropName
                    } else {
                        currentElement.parentKey = currentParentKey
                        // add Element
                        currentElement.key = parentKey ? `${parentKey}_${elementPropName}` : elementPropName
                    }
                    let ExtendProps: any = Reflect.getMetadata(DesignerDecoratorType.ExtendProps, dto, elementPropName)
                    // 原生扩展属性
                    if (ExtendProps != null) {
                        currentElement = { ...currentElement, ...ExtendProps }
                    }
                    // 初始化分类码定义
                    this.initClassificationCode(dto, elementPropName, currentElement)
                    this.elements.push(currentElement)

                    // 迭代构建子元素
                    if (this.listElementTypeNames.includes(currentElement.elementTypeName)) {
                        let data = dto[elementPropName]
                        this.initElements(data, currentElement.key, currentElement.elementTypeName)
                    }
                })
            }
        }
        return result && result.length > 0 ? result : null
    }

    /**
     * 添加布局元素
     * @param elementType 
     * @param elementName 元素名称
     * @param sortNo 
     * @param parentKey 父级key
     * @param flex 
     */
    private addLayoutElement(key: string, elementType: ElementType, sortNo: number, parentKey?: string, flex?: Array<number>) {
        if (!elementType) {
            throw new Error('addLayoutElement method elementType props cannot be empty')
        } else if (stringUtils.isEmpty(key)) {
            throw new Error('addLayoutElement method key props cannot be empty')
        } else {
            let element = ElementFactory.createElement(elementType).toProps()
            element.key = key
            element.parentKey = parentKey
            element.sortNo = sortNo !== null ? sortNo : 0
            if (flex) {
                let lastFlex = 12
                flex.forEach((flex, index) => {
                    switch (index) {
                        case 0:
                            lastFlex = element.smallFlex = flex || lastFlex
                            break
                        case 1:
                            lastFlex = element.middleFlex = flex || lastFlex
                            break
                        case 2:
                            lastFlex = element.largeFlex = flex || lastFlex
                            break
                    }
                })
            }
            this.elements.push(element)
        }
    }

    /**
     * 初始化分类码
     * @param element 
     * @param elementPropName 
     * @param config 
     */
    private initClassificationCode(element: any, elementPropName: string, config: any) {
        let elementClassificationCode: ElementClassificationCode = Reflect.getMetadata(DesignerDecoratorType.ClassificationCode, element, elementPropName)
        if (elementClassificationCode) {
            config.classificationCodeType = elementClassificationCode.type
            switch (elementClassificationCode.type) {
                case ClassificationCodeType.Code:
                    config.classificationCode = elementClassificationCode.code
                    break
                case ClassificationCodeType.JSON:
                    config.classificationCodeJSON = elementClassificationCode.code
                    break
                case ClassificationCodeType.URL:
                    config.classificationCodeUrl = elementClassificationCode.code
                    break
                case ClassificationCodeType.METHOD:
                    config.classificationCodeMethod = elementClassificationCode.code
                    break
            }
        }
    }
}