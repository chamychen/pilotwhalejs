import './libs'

declare type utils = {
    componentUtils: componentUtils
    stringUtils: stringUtils
    arrayUtils: arrayUtils
    classcodeUtils: classcodeUtils
}

declare class classcodeUtils {
    /**
     * 注册分类码到window.classcode
     * @param requireComponent 待注册classcode的require引用   
     */
    static registerClassCode(requireComponent: __WebpackModuleApi.RequireContext)

    /**
     * 将枚举转换成分类码
     * @param enumObj 枚举
     * @param enumObjName 枚举名称
     */
    static convertEnumToClassCode(enumObj: any, enumObjName: string): ClassCodeDTO
}


/**
 * 分类码主表
 */
declare interface ClassCode {
    id: string

    code: string

    name: string

    multiLevel: string

    desc: string
}

/**
 * 分类码单项
 */
declare interface ClassCodeItem {
    id: string

    parentId: string

    text: string

    value: any

    linkName: string

    sortNo: number

    treeNo: number

    /**
     *说明
     *
     * @type {string}
     * @memberof ClassCodeItem
     */
    desc: string
}

/**
 * 分类码
 */
declare interface ClassCodeDTO {
    main: ClassCode

    child: Array<ClassCodeItem>
}

declare class componentUtils {
    /**
     * 注册组件到vue全局
     * @param requireComponent 待注册组件的require引用
     */
    static registerComponent(
        requireComponent: __WebpackModuleApi.RequireContext, componentPrefix?: null
    )

    /**
     * 导入文件（如mock等）
     * @param requireComponent 
     */
    static import(requireComponent: __WebpackModuleApi.RequireContext)
}

declare class stringUtils {
    /**
    * 比较字符串是否相等
    * @param a 
    * @param b 
    * @param ignoreCase 是否忽略大小写
    */
    static compare(a: string, b: string, ignoreCase?: boolean): boolean

    /**
     * 
     * @param a 判断字符串是否为空
     */
    static isEmpty(a: string): boolean
}

declare class arrayUtils {
    /**
     * 去重
     * @param arr 
     */
    static removeDuplicate(arr: Array<any>)

    /**
     * 去除空值
     * @param arr 
     */
    static trim(arr: Array<string>): Array<string> | null
}


declare class cookieUtils {
    /**
    * 获取cookie
    * @param cname
    * @returns {*}
    */
    static getCookie(name: string)

    /**
     * 设置cookie
     * @param cname
     * @param cvalue
     * @param expires 毫秒数
     */
    static setCookie(name: string, value: any, expires: number)

    /**
     * 清除cookie
     * @param name
     */
    static clearCookie(name)
}



declare class guidUtils {
    /**
     * guid
     * @param connector 连接符
     */
    static newId(connector?: string)
}

