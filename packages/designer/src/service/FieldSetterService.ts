import { ClassCodeType } from '@core/element/decorator/ElementClassCode'
import ClassCodeItem from '@core/class-code/model/ClassCodeItem'
import ClassCodeService from '@service/ClassCodeService'

/**
 * 设计器服务
 */
export default class FieldSetterService {
    /**
     * 获取分类码
     * @param code 
     */
    static getItemsWithClassCode(): Array<ClassCodeItem> {
        let codes = ClassCodeService.getAllClassCode()
        if (codes) {
            let result = []
            codes.forEach(element => {
                let obj = new ClassCodeItem()
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
    static getItemsWithClassCodeType(): Array<ClassCodeItem> {
        let result = []
        let code = new ClassCodeItem()
        code.text = 'Code'
        code.value = ClassCodeType.Code
        result.push(code)
        let json = new ClassCodeItem()
        json.text = 'JSON'
        json.value = ClassCodeType.JSON
        result.push(json)
        let method = new ClassCodeItem()
        method.text = 'METHOD'
        method.value = ClassCodeType.METHOD
        result.push(method)
        let url = new ClassCodeItem()
        url.text = 'URL'
        url.value = ClassCodeType.URL
        result.push(url)

        return result
    }
}