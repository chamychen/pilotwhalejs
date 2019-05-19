import { ClassificationCodeType } from '@core/element/decorator/ElementClassificationCode'
import ClassificationCodeItem from '@entity/ClassificationCode/ClassificationCodeItem'
import ClassificationCodeService from '@service/ClassificationCodeService'

/**
 * 设计器服务
 */
export default class FieldSetterService {
    /**
     * 获取分类码
     * @param code 
     */
    static getItemsWithClassificationCode(): Array<ClassificationCodeItem> {
        let codes = ClassificationCodeService.getAllClassificationCode()
        if (codes) {
            let result = []
            codes.forEach(element => {
                let obj = new ClassificationCodeItem()
                obj.text = element.main.name
                obj.value = element.main.code
                obj.desc = element.main.desc
                result.push(obj)
            })
            return result
        }
    }

    /**
     * 获取分类码类型
     * @param code 
     */
    static getItemsWithClassificationCodeType(): Array<ClassificationCodeItem> {
        let result = []
        let code = new ClassificationCodeItem()
        code.text = 'Code'
        code.value = ClassificationCodeType.Code
        result.push(code)
        let json = new ClassificationCodeItem()
        json.text = 'JSON'
        json.value = ClassificationCodeType.JSON
        result.push(json)
        let method = new ClassificationCodeItem()
        method.text = 'METHOD'
        method.value = ClassificationCodeType.METHOD
        result.push(method)
        let url = new ClassificationCodeItem()
        url.text = 'URL'
        url.value = ClassificationCodeType.URL
        result.push(url)

        return result
    }
}