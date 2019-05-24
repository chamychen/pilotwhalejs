import ClassCodeService from '@service/ClassCodeService'

/**
 * 分类码类型
 */
enum ClassCodeType {
    Code = 1,
    JSON,
    URL,
    METHOD
}

class ElementClassCode {
    type: ClassCodeType

    code: string

    constructor(type: ClassCodeType, code: string) {
        this.type = type
        this.code = code
    }

    getItems(context: any): Array<any> {
        if (this.type && this.code) {
            switch (this.type) {
                case ClassCodeType.Code:
                    let thisCode = ClassCodeService.getClassCodeBY(this.code)
                    if (thisCode && thisCode.child) {
                        return thisCode.child
                    }
                    break
                case ClassCodeType.JSON:
                    try {
                        let obj = JSON.parse(this.code)
                        if (Array.isArray(obj)) {
                            return obj
                        }
                    } catch {
                        throw new Error('code cannot to convert to JSON')
                    }
                    break
                case ClassCodeType.URL:
                    console.log('ClassCodeType.URL暂未实现')
                    break
                case ClassCodeType.METHOD:
                    if (context && context[this.code]) {
                        return context[this.code]()
                    }
                    break
            }
        }
    }
}

export { ClassCodeType }
export default ElementClassCode
