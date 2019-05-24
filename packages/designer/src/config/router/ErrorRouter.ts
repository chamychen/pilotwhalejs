import Error401 from '@views/error-page/401.vue'
import Error500 from '@views/error-page/500.vue'
import Error404 from '@views/error-page/404.vue'
import FIXED_PAGE_NAME from './FixedPageName'

/**
 * 无需登录权限控制的路由
 */
const errorRouter = [
  {
    path: '/401',
    name: FIXED_PAGE_NAME.E401,
    meta: {
      hideInMenu: true
    },
    component: Error401
  },
  {
    path: '/500',
    name: FIXED_PAGE_NAME.E500,
    meta: {
      hideInMenu: true
    },
    component: Error500
  },
  {
    path: '/404',
    name: FIXED_PAGE_NAME.E404,
    meta: {
      hideInMenu: true
    },
    component: Error404
  }
]

export default errorRouter
