import Vue from 'vue'
import DefaultElementGenerator from './process/DefaultElementGenerator'
import RenderTool from './process/RenderTool'

export default Vue.extend({
    props: {

    },
    data() {
        return { uiEntity: null }
    },
    render() {
        let dto = new DefaultElementGenerator(this.uiEntity).getInitElements()
        let el = new RenderTool(this, dto, null).genUI()
        return el
    }
})