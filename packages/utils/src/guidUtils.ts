/**
 * cookie工具类
 */
export default class guidUtils {
    /**
     * guid
     * @param connector 连接符
     */
    public static newId(connector?: string) {
        if (!connector) {
            connector = '-'
        }
        return (
            guidUtils.S4() +
            guidUtils.S4() +
            connector +
            guidUtils.S4() +
            connector +
            guidUtils.S4() +
            connector +
            guidUtils.S4() +
            connector +
            guidUtils.S4() +
            guidUtils.S4() +
            guidUtils.S4()
        )
    }

    private static S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    }
}