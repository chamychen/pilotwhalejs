import Vue, { VNode, CreateElement } from 'vue'
import { Provide, Component } from 'vue-property-decorator'
import ClassCodeItem from '@core/class-code/model/ClassCodeItem'
import DecoratorCompiler from '@core/element/decorator/DecoratorCompiler'
import RenderTool from '@core/RenderTool'

@Component({})
export default class DesignerRoot extends Vue {
    /**
     * 布局实体对象
     *
     * @type {Object}
     * @memberof DesignerRoot
     */
    layoutEntity: Object

    /**
     * 数据
     *
     * @type {Object}
     * @memberof DesignerRoot
     */
    @Provide()
    currentValue: Object = {}

    /**
     * 分类码
     *
     * @type {Object}
     * @memberof DesignerRoot
     */
    @Provide()
    classCode: Object = {}

    /**
     * 分类码函数
     *
     * @type {Array<ClassCodeItem>}
     * @memberof DesignerRoot
     */
    @Provide()
    classCodeMethods: Array<ClassCodeItem>

    /**
     * 本页的所有按钮
     *
     * @type {Array<any>}
     * @memberof DesignerRoot
     */
    @Provide()
    buttons: Array<any>

    /**
     * 新增到页面尾部的组件
     *
     * @type {Array<VNode>}
     * @memberof DesignerRoot
     */
    @Provide()
    extendElements: Array<VNode>

    /**
     *更新方式
     *
     * @type {false}
     * @memberof DesignerRoot
     */
    @Provide()
    updateWithChange = false

    /**
     * 注册方法到函数分类码
     * @param methodName
     */
    registerClassCodeMethod(methodName: string) {
        const classCodeMethod = new ClassCodeItem()
        classCodeMethod.text = methodName
        classCodeMethod.value = methodName
        if (!this.classCodeMethods) {
            this.classCodeMethods = []
        }
        this.classCodeMethods.push(classCodeMethod)
    }

    /**
     * 函数分类码
     */
    getClassCodeMethods() {
        return this.classCodeMethods
    }

    /**
     * 渲染
     * @param h 
     */
    render(h: CreateElement) {
        if (this.layoutEntity) {
            let dto = new DecoratorCompiler(this.layoutEntity).getInitElements()
            let el = new RenderTool(this, dto, null).genUI(null)
            if (this.extendElements) {
                let els = [el, ...this.extendElements]
                return h('div', els)
            } else {
                return el
            }
        } else {
            return null
        }
    }
}
