import { stringUtils } from 'pilotwhale-utils'
import ClassificationCodeService from '@service/ClassificationCodeService'

/**
 * 分类码类型
 */
enum ClassificationCodeType {
    Code = 1,
    JSON,
    URL,
    METHOD
}

class ElementClassificationCode {
    type: ClassificationCodeType

    code: string

    constructor(type: ClassificationCodeType, code: string) {
        // if (!type) {
        //     throw new Error('ElementClassificationCode class constructor param [type] cannot be null')
        // }
        // if (!code || (typeof code === 'string' && stringUtils.isEmpty(code))) {
        //     throw new Error('ElementClassificationCode class constructor param [type] cannot be null or empty')
        // }
        this.type = type
        this.code = code
    }

    getItems(context: any): Array<any> {
        if (this.type && this.code) {
            switch (this.type) {
                case ClassificationCodeType.Code:
                    let thisCode = ClassificationCodeService.getClassificationCodeBY(this.code)
                    if (thisCode && thisCode.child) {
                        return thisCode.child
                    }
                    break
                case ClassificationCodeType.JSON:
                    try {
                        let obj = JSON.parse(this.code)
                        if (Array.isArray(obj)) {
                            return obj
                        }
                    } catch {
                        throw new Error('code cannot to convert to JSON')
                    }
                    break
                case ClassificationCodeType.URL:
                    console.log('ClassificationCodeType.URL暂未实现')
                    break
                case ClassificationCodeType.METHOD:
                    if (context && context[this.code]) {
                        return context[this.code]()
                    }
                    break
            }
        }
    }
}

export { ClassificationCodeType }
export default ElementClassificationCode
