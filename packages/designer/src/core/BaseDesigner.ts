import CommonButtonEvent from '@core/CommonButtonEvent'
import ClassCodeItem from '@core/class-code/model/ClassCodeItem'
import Vue from 'vue'
import DecoratorCompiler from './element/decorator/DecoratorCompiler'
import RenderTool from './RenderTool'

export default Vue.extend({
  mixins: [CommonButtonEvent],
  props: {},
  data() {
    return {
      // 分类码
      classCode: {},
      classCodeMethods: [],
      // 界面配置,在页面中定义
      // uiEntity: null,
      // 更新方式
      updateWithChange: false,
      buttons: [],
      // 新增到页面尾部的组件
      extendElements: []
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
  render(h: any) {
    // return (
    //   <div>
    //     <span>2222</span>
    //   </div>
    // )
    if (this.uiEntity) {
      let dto = new DecoratorCompiler(this.uiEntity).getInitElements()
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
})
