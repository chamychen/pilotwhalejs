export default class stringUtils {
    /**
     * 比较字符串是否相等
     * @param a 
     * @param b 
     * @param ignoreCase 是否忽略大小写
     */
    public static compare(a: string, b: string, ignoreCase: boolean = true) {
        if (ignoreCase) {
            if (a === b) {
                return true
            } else {
                if (!a || !b) {
                    return !a && !b
                } else {
                    let isCompare = new RegExp(`^\\s*${a}\\s*$`, 'i').test(b)
                    return isCompare
                }
            }
        } else {
            return a === b
        }
    }

    /**
     * 
     * @param a 判断字符串是否为空
     */
    public static isEmpty(a: string) {
        return !a ? true : a.trim().length === 0
    }
}