import DesignCenter from '@views/designer/DesignCenter.vue'
import ClassCodeManager from '@views/designer/ClassCodeManager.vue'
import ButtonManager from '@views/designer/ButtonManager.vue'
import BizObject from '@views/designer/BizObject.vue'

/**
 * 设计管理的路由
 */
const designerRouter = [
    {
        path: '/bizObject',
        name: 'designCenter',
        component: BizObject
    },
    {
        path: '/designCenter',
        name: 'designCenter',
        component: DesignCenter
    },
    {
        path: '/classManager',
        name: 'classManager',
        component: ClassCodeManager
    },
    {
        path: '/buttonManager',
        name: 'buttonManager',
        component: ButtonManager
    }
]

export default designerRouter
