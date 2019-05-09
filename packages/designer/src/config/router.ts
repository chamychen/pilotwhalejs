import Router from 'vue-router'
import Home from '@views/Home.vue'
import Preview from '@views/Preview'

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/preview',
          name: 'preview',
          component: Preview
        }
      ]
    }
  ]
})
