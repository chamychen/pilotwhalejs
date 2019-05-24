/**
 * cookie工具类
 */
export default class cookieUtils {
    /**
     * 获取cookie
     * @param cname
     * @returns {*}
     */
    public static getCookie(name: string) {
        let cookieArr = document.cookie.split('; ')
        for (let i = 0; i < cookieArr.length; i++) {
            let arr = cookieArr[i].split('=')

            if (arr[0] === name) {
                return arr[1]
            }
        }
    }

    /**
     * 设置cookie
     * @param cname
     * @param cvalue
     * @param expires 毫秒数
     */
    public static setCookie(name: string, value: any, expires: number) {
        let exp = new Date()
        exp.setTime(exp.getTime() + expires)
        document.cookie = name + '=' + value + ';expires=' + exp.toUTCString()
    }

    /**
     * 清除cookie
     * @param name
     */
    public static clearCookie(name) {
        cookieUtils.setCookie(name, '', -1)
    }
}