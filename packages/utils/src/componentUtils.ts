import Vue from 'vue'
import lodash from 'lodash'

/**
 * 组件支持类
 */
export default class componentUtils {
    /**
     * 注册组件到vue全局
     * @param requireComponent 待注册组件的require引用
     * @param componentPrefix 组件前缀
     */
    public static registerComponent(
        requireComponent: __WebpackModuleApi.RequireContext, componentPrefix?: null
    ) {
        if (requireComponent) {
            let fileNames = requireComponent.keys()
            if (fileNames) {
                fileNames.forEach(fileName => {
                    let componentConfig = requireComponent(fileName)
                    let componentName = lodash.kebabCase(fileName.replace(/\.\w+$/, '').replace(/Index$/i, ''))
                    if (componentPrefix) {
                        componentName = `${componentPrefix}_componentName`
                    }
                    Vue.component(
                        componentName,
                        componentConfig.default || componentConfig
                    )
                })
            }
        }
    }

    /**
     * 导入文件（如mock等）
     * @param requireComponent 
     */
    public static import(requireComponent: __WebpackModuleApi.RequireContext) {
        if (requireComponent) {
            let fileNames = requireComponent.keys()
            if (fileNames) {
                fileNames.forEach(fileName => {
                    requireComponent(fileName)
                })
            }
        }
    }
}