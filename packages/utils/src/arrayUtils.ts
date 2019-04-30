import StringUtils from './stringUtils'

export default class arrayUtils {
    /**
     * 去重
     * @param arr 
     */
    public static removeDuplicate(arr: Array<any>) {
        if (!arr || arr.length === 0) {
            return null
        } else {
            return Array.from(new Set(arr))
        }
    }

    /**
     * 去除空值
     * @param arr 
     */
    public static trim(arr: Array<string>) {
        let result: Array<string> = []
        if (arr) {
            arr.forEach(item => {
                if (!StringUtils.isEmpty(item)) {
                    result.push(item.trim())
                }
            })
        }
        return result && result.length > 0 ? result : null
    }
}