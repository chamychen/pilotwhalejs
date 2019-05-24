import ClassCodeItem from '@core/class-code/model/ClassCodeItem'
import Vue from 'vue'
import DecoratorCompiler from './element/decorator/DecoratorCompiler'
import RenderTool from './RenderTool'

export default Vue.extend({
    props: {
    },
    data() {
        return {
            // 分类码
            classCode: {},
            classCodeMethods: [],
            // 界面配置,在页面中定义
            // uiEntity: null,
            // 更新方式
            updateWithChange: false
        }
    },
    methods: {
        /**
         * 注册方法到函数分类码
         * @param methodName 
         */
        registerClassCodeMethod(methodName: string) {
            const classCodeMethod = new ClassCodeItem()
            classCodeMethod.text = methodName
            classCodeMethod.value = methodName
            this.classCodeMethods.push(classCodeMethod)
        },
        /**
         * 函数分类码
         */
        getClassCodeMethods() {
            return this.classCodeMethods
        }

    },
    render() {
        if (this.uiEntity) {
            debugger
            let dto = new DecoratorCompiler(this.uiEntity).getInitElements()
            let el = new RenderTool(this, dto, null).genUI(null)
            return el
        } else {
            return null
        }
    }
})