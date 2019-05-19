import ClassificationCodeItem from '@entity/ClassificationCode/ClassificationCodeItem'
import Vue from 'vue'
import DecoratorCompiler from './element/decorator/DecoratorCompiler'
import RenderTool from './RenderTool'

export default Vue.extend({
    props: {
    },
    data() {
        return {
            // 分类码
            classificationCode: {},
            classificationCodeMethods: [],
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
        registerClassificationCodeMethod(methodName: string) {
            const classificationCodeMethod = new ClassificationCodeItem()
            classificationCodeMethod.text = methodName
            classificationCodeMethod.value = methodName
            this.classificationCodeMethods.push(classificationCodeMethod)
        },
        /**
         * 函数分类码
         */
        getClassificationCodeMethods() {
            return this.classificationCodeMethods
        }

    },
    render() {
        if (this.uiEntity) {
            let dto = new DecoratorCompiler(this.uiEntity).getInitElements()
            let el = new RenderTool(this, dto, null).genUI(null)
            return el
        } else {
            return null
        }
    }
})