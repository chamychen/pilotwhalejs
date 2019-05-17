import Router from 'vue-router'
import Root from '@views/Root.vue'
import Home from '@views/Home.vue'
import Preview from '@views/Preview'

let router = new Router({
  mode: 'hash',
  base: __dirname,
  routes: [
    {
      path: '',
      component: Root,
      children: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/preview',
          name: 'priview',
          component: Preview
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router