import utils from 'pilotwhale-utils'
import { VNode } from 'vue'
import ComponentConvertor from './element/ComponentConvertor'
import ElementTypes, { ElementType } from './element/types'
import ElementFactory from '@core/element/types/ElementFactory'


export default class RenderTool {
    private context: any
    private entites: Array<any>
    private i18n?: any

    constructor(context: any, entites: Array<any>, i18n?: any) {
        this.context = context
        this.entites = entites
        this.i18n = i18n
    }

    /**
     * 创建UI
     * @param current 要生成UI的元素
     */
    public genUI(current?: any): VNode {
        let entites = this.entites
        if (entites) {
            let isRoot = !current
            if (isRoot) {
                current = ElementFactory.createElement(ElementTypes.container).toProps()
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
            let control
            if (current.elementTypeName === ElementTypes.table.elementTypeName) {
                // table
                let config = new ComponentConvertor(this.context, this.i18n).getConfig(current)
                if (children) {
                    let headers = []
                    let regex = new RegExp(`^${current.key}_`)
                    children.forEach(item => {
                        let col = {
                            text: item.key,
                            value: item.key.replace(regex, ''),
                            editor: item.elementTypeName !== ElementTypes.textCoulumn.elementTypeName ? new ComponentConvertor(this.context, this.i18n).getConfig(item) : null
                        }
                        headers.push(col)
                    })
                    if (headers && headers.length > 0) {
                        config.props.headers = headers
                    }
                }
                control = h(current.elementName, config)
                return control
            } else {
                // other element
                control = h(current.elementName, new ComponentConvertor(this.context, this.i18n).getConfig(current), childControl)
                return control
            }
        }
    }
}