import stringUtils from './stringUtils'
import ClassCodeDTO from './dto/ClassCode'
import ClassCode from './dto/ClassCode/ClassCode'
import ClassCodeItem from './dto/ClassCode/ClassCodeItem'

export default class classcodeUtils {
    /**
     * 注册分类码到window.classcode
     * @param path 
     * @param filter 
     */
    public static registerClassCode(requireComponent: __WebpackModuleApi.RequireContext) {
        if (requireComponent) {
            let appWindow: any = window
            appWindow.classCode = appWindow.classCode ? appWindow.classCode : []
            requireComponent.keys().forEach(key => {
                let classCode = requireComponent(key).default;
                appWindow.classCode = appWindow.classCode.concat(classCode)
            })
        }
    }

    /**
     * 将枚举转换成分类码
     * @param enumObj 枚举
     * @param enumObjName 枚举名称
     */
    public static convertEnumToClassCode(enumObj: any, enumObjName: string): ClassCodeDTO {
        if (enumObj && !stringUtils.isEmpty(enumObjName)) {
            let keys = Object.keys(enumObj)
            if (keys) {
                let itemKeys = keys.splice(keys.length / 2)
                let dto = new ClassCodeDTO()
                dto.main = new ClassCode()
                dto.main.code = dto.main.id = `D-${enumObjName}`
                dto.main.name = enumObjName
                dto.child = []
                itemKeys.forEach((key: string, index: number) => {
                    const item = new ClassCodeItem()
                    item.id = `${dto.main.code}-${key}`
                    item.text = key
                    item.value = enumObj[key]
                    item.treeNo = item.sortNo = index
                    dto.child.push(item)
                })
                return dto
            }
        }
    }
}