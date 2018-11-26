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
      path: '/vconsole',
      name: 'Vconsole',
      component: () => import('@/views/Vconsole')
    },
    {
      path: '/prodList',
      name: 'ProdList',
      component: () => import('@/views/ProdList')
    },
    {
      path: '/orderList',
      name: 'OrderList',
      component: () => import('@/views/OrderList')
    },
    {
      path: '/addressList',
      name: 'AddressList',
      component: () => import('@/views/AddressList')
    },
    {
      path: '/billInfoList',
      name: 'BillInfoList',
      component: () => import('@/views/BillInfoList')
    },
    {
      path: '/goods',
      name: 'Goods',
      component: () => import('@/views/Goods')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "about" */ './views/Order.vue')
    },
    {
      path: '/order/read',
      name: 'orderRead',
      component: () => import(/* webpackChunkName: "about" */ './views/OrderRead.vue')
    },
    {
      path: '/bill',
      name: 'Bill',
      component: () => import(/* webpackChunkName: "about" */ './views/Bill.vue')
    },
    {
      path: '/promotions',
      name: 'Promotions',
      component: () => import(/* webpackChunkName: "about" */ './views/Promotions.vue')
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
    },
    {
      path: '/form/billInfo',
      component: () => import('@/views/form/billInfo'),
    },
    {
      path: '/form/address',
      component: () => import('@/views/form/address'),
    }
  ]
})
