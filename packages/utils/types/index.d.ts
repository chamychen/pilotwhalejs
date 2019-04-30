import './lib'

declare type utils = {
    componentUtils: componentUtils
    stringUtils: stringUtils
    arrayUtils: arrayUtils
}


declare class componentUtils {
    /**
  * 注册组件到vue全局
  * @param requireComponent 待注册组件的require引用
  */
    static registerComponent(
        requireComponent: __WebpackModuleApi.RequireContext, componentPrefix?: null
    )
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
