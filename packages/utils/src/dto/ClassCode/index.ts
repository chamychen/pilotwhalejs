import ClassCodeItem from './ClassCodeItem'
import ClassCode from './ClassCode'

/**
 * 分类码
 */
export default class ClassCodeDTO {
    main: ClassCode

    child: Array<ClassCodeItem>
}