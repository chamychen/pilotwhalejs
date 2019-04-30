import utils from 'pilotwhale-utils'
import { VNode } from 'vue'
import VuePropsConvertor from './VuePropsConvertor'
import CommonElement from '../decorator/CommonElement'
import ElementType from '../ElementType'


export default class RenderTool {
    private context: any
    private entites: Array<any>
    private i18n?: any

    constructor(context: any, entites: Array<any>, i18n?: any) {
        this.context = context
        this.entites = entites
        this.i18n = i18n
    }

    public genUI(current?: any): VNode {
        let entites = this.entites
        if (entites) {
            if (!current) {
                current = new CommonElement(ElementType.container)
                current.class = 'grid-list-md'
            }
            let childControl = []
            let children = entites.filter(i => utils.stringUtils.compare(current.key, i.parentKey))
            if (children && children.length > 0) {
                children.sort((a, b) => a.sortNo - b.sortNo)
                children.forEach(child => {
                    let c = this.genUI(child)
                    childControl.push(c)
                })
            }
            let h = this.context.$createElement
            if (current.elementTypeName === ElementType.table.elementTypeName) {
                // table
                let config = new VuePropsConvertor(this.context, this.i18n).getConfig(current)
                if (children) {
                    let headers = []
                    children.forEach(item => {
                        let col = {
                            text: item.key,
                            value: item.key,
                            editor: item
                        }
                        headers.push(col)
                    })
                    if (headers && headers.length > 0) {
                        config.props.headers = headers
                    }
                }
                let control = h(current.elementName, config)
                return control
            } else {
                // other element
                let control = h(current.elementName, new VuePropsConvertor(this.context, this.i18n).getConfig(current), childControl)
                return control
            }
        }
    }
}