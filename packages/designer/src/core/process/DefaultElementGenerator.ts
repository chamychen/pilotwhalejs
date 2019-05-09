import utils from 'pilotwhale-utils'
import DesignerDecoratorType from '../decorator'
import ElementGroup from '../decorator/ElementGroup'
import CommonElement from '../decorator/CommonElement'
import ElementType, { SimpleElement } from '../ElementType'
import BaseInfoEntity from '../../entity/BaseInfoEntity'
import CssEntity from '../../entity/CssEntity'
import EventEntity from '../../entity/EventEntity'
import ElementFilter from '../decorator/ElementFilter'

export default class DefaultElementGenerator {
    /**
    *元素类型属性差异树
    *
    * @static
    * @memberof DefaultElementGenerator
    */
    public static ElementTypeProps = null

    /**
     *拥有子元素的类型
     *
     * @private
     * @memberof DefaultElementGenerator
     */
    private listElementTypeNames = [ElementType.layout.elementTypeName, ElementType.table.elementTypeName]

    private dto: any

    private elements: Array<any> = []

    constructor(dto: any) {
        this.dto = dto
        // 初始化元素类型属性差异树
        if (!DefaultElementGenerator.ElementTypeProps) {
            DefaultElementGenerator.ElementTypeProps = this.buildEntityDiffTree()
        }
    }

    /**
     * 获取初始化后的元素
     */
    public getInitElements() {
        this.initElements()
        this.extendElementDefaultProps()
        return this.elements && this.elements.length > 0 ? this.elements : null
    }

    /**
    * 
    * @param definedEntity 构建差异树
    */
    private buildEntityDiffTree() {
        let entitys = [new BaseInfoEntity(), new CssEntity(), new EventEntity()]
        if (entitys) {
            let result: any = {}
            entitys.forEach(definedEntity => {
                Object.keys(definedEntity).forEach(key => {
                    if (Reflect.hasMetadata(DesignerDecoratorType.Element, definedEntity, key)) {
                        let tagFilterMetaData: ElementFilter = Reflect.getMetadata(DesignerDecoratorType.ElementFilter, definedEntity, key)
                        if (!tagFilterMetaData) {
                            if (!result.all) {
                                result.all = []
                            }
                            result.all.push(key)
                        } else {
                            if (tagFilterMetaData.include) {
                                tagFilterMetaData.include.forEach(item => {
                                    if (!Reflect.has(result, item)) {
                                        Reflect.set(result, item, { include: [], exclude: [] })
                                    }
                                    result[item].include.push(key)
                                })
                                if (tagFilterMetaData.exclude) {
                                    tagFilterMetaData.exclude.forEach(item => {
                                        if (!Reflect.has(result, item)) {
                                            Reflect.set(result, item, { include: [], exclude: [] })
                                        }
                                        result[item].exclude.push(key)
                                    })
                                }
                            }
                        }
                    }
                })
            })
            return result
        }
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
            let elementPropNames = Object.keys(dto).filter(elementPropName =>
                Reflect.hasMetadata(DesignerDecoratorType.Element, dto, elementPropName)
            )
            if (elementPropNames) {
                elementPropNames.forEach((elementPropName: string, index: number) => {
                    let currentElement = Reflect.getMetadata(DesignerDecoratorType.Element, dto, elementPropName)
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
                            this.addLayoutElement(flexKey, ElementType.flex, index, currentParentKey, flex)
                            // add group layout
                            this.addLayoutElement(layoutKey, ElementType.layout, 0, flexKey)
                        }
                        currentParentKey = layoutKey
                        currentSortNo = ElementGroup.elementSortNo
                    }

                    if (parentElementTypeName === ElementType.table.elementTypeName) {
                        currentElement.noFlex = true
                    }
                    if (!currentElement.noFlex) {
                        // add Element Flex
                        let flexKey = parentKey ? `${parentKey}_${elementPropName}_@flex` : `${elementPropName}_@flex`
                        let hasFlex = currentElement.smallFlex || currentElement.middleFlex || currentElement.largeFlex
                        let flex = hasFlex ? [currentElement.smallFlex, currentElement.middleFlex, currentElement.largeFlex] : [12]
                        this.addLayoutElement(flexKey, ElementType.flex, currentSortNo, currentParentKey, flex)
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
                        if (currentElement.elementTypeName === ElementType.layout.elementTypeName) {
                            currentElement.class = 'row wrap'
                            // currentElement.class = 'row wrap px-3'
                            // currentElement.style = `${currentElement.style ? currentElement.style : ''}padding-top:20px;background:#fafafa;margin-top:1px;'}`
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
    private addLayoutElement(key: string, elementType: SimpleElement, sortNo: number, parentKey?: string, flex?: Array<number>) {
        if (!elementType) {
            throw new Error('getLayoutElementKey method elementType props cannot be empty')
        } else if (utils.stringUtils.isEmpty(key)) {
            throw new Error('getLayoutElementKey method key props cannot be empty')
        } else {
            let el = new CommonElement(elementType, flex)
            el.key = key
            el.parentKey = parentKey
            el.sortNo = sortNo !== null ? sortNo : 0
            this.elements.push(el)
        }
    }

    /**
     * 合并元素默认属性
     */
    private extendElementDefaultProps() {
        if (this.elements) {
            let allProps = { ...new BaseInfoEntity(), ...new CssEntity(), ...new EventEntity() }
            for (let i = 0; i < this.elements.length; i++) {
                let currentEl = this.elements[i]
                let newEl: any = {}
                Object.keys(allProps).forEach(prop => {
                    let val = allProps[prop]
                    if (val) {
                        if (DefaultElementGenerator.ElementTypeProps.all && DefaultElementGenerator.ElementTypeProps.all.includes(prop)) {
                            newEl[prop] = val
                        } else if (DefaultElementGenerator.ElementTypeProps[currentEl.elementTypeName]) {
                            let includeProps = DefaultElementGenerator.ElementTypeProps[currentEl.elementTypeName].include
                            if (includeProps && includeProps.includes(prop)) {
                                newEl[prop] = val
                            }
                            if (!includeProps) {
                                let excludeProps = DefaultElementGenerator.ElementTypeProps[currentEl.elementTypeName].exclude
                                if (excludeProps && !excludeProps.includes(prop)) {
                                    newEl[prop] = val
                                }
                            }
                        }
                    }
                })
                newEl = { ...newEl, ...currentEl }
                this.elements[i] = newEl
            }
        }
    }
}