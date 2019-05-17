import ClassificationCodeItem from './ClassificationCodeItem'
import ClassificationCode from './ClassificationCode'

/**
 * 分类码
 */
export default class ClassificationCodeDto {
    main: ClassificationCode

    child: Array<ClassificationCodeItem> = null
}