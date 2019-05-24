import { cookieUtils } from 'pilotwhale-utils'
import Router from 'vue-router'
import errorRouter from '@config/router/ErrorRouter'
import publicRouter from '@config/router/PublicRouter'
import homeRouter from '@config/router/HomeRouter'
import FIXED_PAGE_NAME from './FixedPageName'

const isTest = true

const routes = [].concat(errorRouter)
  .concat(publicRouter)
  .concat(homeRouter)

const errorRoutes = errorRouter

const router = new Router({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {
  if (errorRoutes.some(i => i.name === to.name)) {
    next()
  } else {
    let tenantId =
      to.params.tenantId || router.app.$store.state.tenantStore.tenantId
    // 非法路径或无具体系统指向
    if (!to.name || !tenantId) {
      next({
        name: FIXED_PAGE_NAME.E404
      })
    } else {
      let ticket = cookieUtils.getCookie('ticket')
      // 已登录
      if (ticket || isTest) {
        next()
      } else {
        if (to.name === FIXED_PAGE_NAME.LOGIN) {
          next()
        } else {
          next({
            name: FIXED_PAGE_NAME.LOGIN
          })
        }
      }
    }
  }
})
router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
