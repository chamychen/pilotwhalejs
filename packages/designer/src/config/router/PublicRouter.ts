import Login from '@views/public/Login.vue'
import FIXED_PAGE_NAME from './FixedPageName'

/**
 * 无需登录权限控制的路由
 */
const publicRouter = [
  {
    path: '/login/:tenantId?',
    name: FIXED_PAGE_NAME.LOGIN,
    component: Login
  }
]

export default publicRouter
