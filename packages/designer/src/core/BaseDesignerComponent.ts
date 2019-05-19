import BaseDesigner from '@core/BaseDesigner'
import Vue from 'vue'
import RenderTool from './RenderTool'


export default Vue.extend({
    mixins: [BaseDesigner],
    render() {
        let entitys = this.uiEntity
        if (entitys) {
            let el = new RenderTool(this, entitys, null).genUI()
            return el
        }
        return null
    }
})