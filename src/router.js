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
      path: '/BillInfoList',
      name: 'BillInfoList',
      component: () => import('@/views/BillInfoList')
    },
    {
      path: '/Goods',
      name: 'Goods',
      component: () => import('@/views/Goods')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/Order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ './views/Order.vue')
    },
    {
      path: '/Bill',
      name: 'Bill',
      component: () => import(/* webpackChunkName: "about" */ './views/Bill.vue')
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
