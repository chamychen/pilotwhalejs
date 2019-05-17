export default abstract class AbstractElement {
    /**
     * 转换成属性
     */
    toProps(): any {
        let props = {}
        if (Object.keys(this).includes('baseInfo')) {
            props = { ...props, ...this['baseInfo'] }
        }
        if (Object.keys(this).includes('css')) {
            props = { ...props, ...this['css'] }
        }
        if (Object.keys(this).includes('event')) {
            props = { ...props, ...this['event'] }
        }
        return props
    }

    /**
     * 合并外部属性
     * @param props 
     */
    mergeProps(props: any) {
        if (props) {
            let baseinfo = this['baseInfo']
            let css = this['css']
            let event = this['event']
            Object.keys(props).forEach(key => {
                if (baseinfo && Object.keys(baseinfo).includes(key)) {
                    baseinfo[key] = props[key]
                }
                if (css && Object.keys(css).includes(key)) {
                    css[key] = props[key]
                }
                if (event && Object.keys(event).includes(key)) {
                    event[key] = props[key]
                }
            })           
        }
        return this
    }
}