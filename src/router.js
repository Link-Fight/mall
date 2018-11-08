import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/main/home',
      component: Home
    },
    {
      path: '/prodList',
      name: 'ProdList',
      component: () => import('@/views/ProdList')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/MainRoute'),
      children: [
        {
          path: '', redirect: 'home'
        },
        {
          path: 'home', component: () => import('@/views/Home')
        },
        {
          path: 'classify', component: () => import('@/views/Classify')
        },
        {
          path: 'cart', component: () => import('@/views/Cart')
        },
        {
          path: 'user', component: () => import('@/views/User')
        }
      ]
    }
  ]
})
