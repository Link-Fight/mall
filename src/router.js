import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/main/home'
    },
    {
      path: '/vconsole',
      name: 'Vconsole',
      component: () => import(/* webpackChunkName: "Vconsole" */'@/views/Vconsole')
    },
    {
      path: '/prodList',
      name: 'ProdList',
      component: () => import('@/views/ProdList')
    },
    {
      path: '/orderList/:type',
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
      path: '/order',
      name: 'order',
      component: () => import(/* webpackChunkName: "order" */ './views/Order.vue')
    },
    {
      path: '/order/read',
      name: 'orderRead',
      component: () => import(/* webpackChunkName: "orderRead" */ './views/OrderRead.vue')
    },
    {
      path: '/bill',
      name: 'Bill',
      component: () => import(/* webpackChunkName: "Bill" */ './views/Bill.vue')
    },
    {
      path: '/promotions',
      name: 'Promotions',
      component: () => import(/* webpackChunkName: "promotions" */ './views/Promotions.vue')
    },
    {
      path: '/main',
      component: () => import('@/views/MainRoute'),
      children: [
        {
          path: '', redirect: 'home'
        },
        {
          path: 'home', component: () => import(/* webpackChunkName: "home" */'@/views/Home')
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
