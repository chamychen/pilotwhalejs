import ElementButtonArea from '@core/security-button/model/ElementButtonArea'
import ElementClassCode, { ClassCodeType } from '@core/element/decorator/ElementClassCode'
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

    /**
     * dto对象
     *
     * @private
     * @type {*}
     * @memberof DecoratorCompiler
     */
    private dto: any

    /**
     *构建好的元素缓存列表
     *
     * @private
     * @type {Array<any>}
     * @memberof DecoratorCompiler
     */
    private elements: Array<any> = []

    /**
     * dto对象
     * @param dto 
     */
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
                    let currentParentKey = parentKey
                    let currentSortNo = index
                    // 构建Group
                    let genGroupResult = this.genElementGroup(dto, elementPropName, parentKey, index)
                    if (genGroupResult) {
                        currentParentKey = genGroupResult.key
                        currentSortNo = genGroupResult.elementSortNo
                    }
                    // 构建Flex
                    let genElementFlexResult = this.genElementFlex(simpleElement, elementPropName, parentKey, parentElementTypeName, currentSortNo, currentParentKey)
                    if (genElementFlexResult) {
                        currentParentKey = genElementFlexResult.key
                        currentSortNo = genElementFlexResult.elementSortNo
                    }
                    // 构建Element
                    let currentElement = ElementFactory.createElement(simpleElement.elementType).mergeProps(simpleElement).toProps()
                    currentElement.smallFlex = currentElement.middleFlex = currentElement.largeFlex = null // 重置
                    currentElement.sortNo = currentSortNo
                    if (this.listElementTypeNames.includes(currentElement.elementTypeName)) {
                        currentElement.key = elementPropName
                    } else {
                        currentElement.key = parentKey ? `${parentKey}_${elementPropName}` : elementPropName
                        currentElement.parentKey = currentParentKey
                    }
                    // 扩展属性
                    let ExtendProps: any = Reflect.getMetadata(DesignerDecoratorType.ExtendProps, dto, elementPropName)
                    if (ExtendProps != null) {
                        currentElement = { ...currentElement, ...ExtendProps }
                    }
                    // 初始化分类码定义
                    this.initClassCode(dto, elementPropName, currentElement)
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
     * 生成元素组合
     * @param dto 
     * @param elementPropName 
     * @param elementParentKey 
     * @param index 
     */
    private genElementGroup(dto: any, elementPropName: string, elementParentKey: string, index: number): { elementSortNo: number, key: string } {
        // 构建group
        let ElementGroup: ElementGroup = Reflect.getMetadata(DesignerDecoratorType.ElementGroup, dto, elementPropName)
        if (ElementGroup != null) {
            if (ElementGroup.groupName === '@') {
                throw new Error('ElementGroup props groupName cannot be @')
            } else {
                ElementGroup.groupName = ElementGroup.groupName.replace('@', '')
            }
            let groupKey = elementParentKey ? `${elementParentKey}_${ElementGroup.groupName}` : ElementGroup.groupName
            if (!this.elements.some(i => utils.stringUtils.compare(i.key, groupKey))) {
                let flexKey = `${groupKey}_@flex`
                let flex = [12]
                if (ElementGroup.groupXsFlex || ElementGroup.groupMdFlex || ElementGroup.groupLgFlex) {
                    flex = [ElementGroup.groupXsFlex, ElementGroup.groupMdFlex, ElementGroup.groupLgFlex]
                }
                // add group flex
                this.addLayoutElement(flexKey, ElementTypes.flex, index, elementParentKey, flex)
                // add group layout
                this.addLayoutElement(groupKey, ElementTypes.layout, 0, flexKey)
            }
            return { elementSortNo: ElementGroup.elementSortNo, key: groupKey }
        }
    }

    /**
     * 生成元素的flex
     * @param simpleElement 
     * @param elementPropName 
     * @param elementParentKey 
     * @param parentElementTypeName 
     * @param sortNo 
     * @param parentKey 
     */
    private genElementFlex(simpleElement: SimpleElement, elementPropName: string, elementParentKey: string, parentElementTypeName: string, sortNo: number, parentKey: string): { elementSortNo: number, key: string } {
        if (!simpleElement.noFlex) {
            if (parentElementTypeName === ElementTypes.table.elementTypeName) {
                simpleElement.noFlex = true
            } else {
                // add Element Flex
                let flexKey = elementParentKey ? `${elementParentKey}_${elementPropName}_@flex` : `${elementPropName}_@flex`
                let hasFlex = simpleElement.smallFlex || simpleElement.middleFlex || simpleElement.largeFlex
                let flex = hasFlex ? [simpleElement.smallFlex, simpleElement.middleFlex, simpleElement.largeFlex] : [12]
                this.addLayoutElement(flexKey, ElementTypes.flex, sortNo, parentKey, flex)
                return { elementSortNo: 0, key: flexKey }
            }
        } else {
            simpleElement.class = (simpleElement.class || '') + ' px-1'
        }
    }

    /**
     * 初始化分类码
     * @param element 
     * @param elementPropName 
     * @param config 
     */
    private initClassCode(element: any, elementPropName: string, config: any) {
        let elementClassCode: ElementClassCode = Reflect.getMetadata(DesignerDecoratorType.ClassCode, element, elementPropName)
        if (elementClassCode) {
            config.classCodeType = elementClassCode.type
            switch (elementClassCode.type) {
                case ClassCodeType.Code:
                    config.classCode = elementClassCode.code
                    break
                case ClassCodeType.JSON:
                    config.classCodeJSON = elementClassCode.code
                    break
                case ClassCodeType.URL:
                    config.classCodeUrl = elementClassCode.code
                    break
                case ClassCodeType.METHOD:
                    config.classCodeMethod = elementClassCode.code
                    break
            }
        }
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
}