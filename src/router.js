import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop || document.documentElement.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
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
      component: () => import(/* webpackChunkName: "Goods" */ '@/views/Goods')
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
          meta: { keepAlive: true, savedPosition: 0 },
          path: 'home', component: () => import(/* webpackChunkName: "home" */'@/views/Home')
        },
        {
          path: 'classify', component: () => import('@/views/Classify')
        },
        {
          path: 'cart', name: 'cart', component: () => import('@/views/Cart')
        },
        {
          path: 'user', component: () => import('@/views/User')
        }
      ]
    },
    {
      path: '/form/billInfo',
      component: () => import(/* webpackChunkName: "form" */'@/views/form/billInfo'),
    },
    {
      path: '/form/address',
      component: () => import(/* webpackChunkName: "form" */'@/views/form/address'),
    },
    {
      path: '/form/feedback',
      component: () => import(/* webpackChunkName: "form" */'@/views/form/FeedBack'),
    }
  ]
})
