import Preview from '@views/Preview'
import FIXED_PAGE_NAME from './FixedPageName'
import Home from '@views/Home.vue'
import designerRouter from './DesignerRouter'

/**
 * 无需登录权限控制的路由
 */
const homeRouter = [
  {
    path: '/',
    name: FIXED_PAGE_NAME.HOME,
    component: Home,
    children: [
      ...designerRouter
    ]
  },
  {
    path: '/preview',
    name: 'preview',
    component: Preview
  }
]

export default homeRouter
