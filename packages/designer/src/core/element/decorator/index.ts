import AbstractElement from '@core/element/types/AbstractElement'
import ElementGroup from './ElementGroup'

enum DesignerDecoratorType {
    // 元素注解
    Element = 'Element',
    // 元素组注解
    ElementGroup = 'ElementGroup',
    // 原生扩展属性
    ExtendProps = 'ExtendProps',
    // 分类码注解
    ClassificationCode = 'ClassificationCode'
}


export default DesignerDecoratorType