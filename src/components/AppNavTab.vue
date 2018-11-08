<template>
  <ul class="xa-cell nav-tab">
    <template v-for="item in items">
      <router-link class="xa-flex nav-tab-item" :to="item.herf" :key="item.href" tag="div">
        <i class="iconfont" :class="item.icon"></i>
        <p>{{item.label}}</p>
      </router-link>
    </template>
  </ul>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return [
          {
            icon: 'icon-shouye',
            label: '首页',
            herf: '/main/home'
          },
          {
            icon: 'icon-leimu',
            label: '类目',
            herf: '/main/classify'
          },
          {
            icon: 'icon-caigou-xianxing',
            label: '购物车',
            herf: '/main/cart'
          },
          {
            icon: 'icon-wode',
            label: '我的',
            herf: '/main/user'
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-tab {
  height: 44px;
  background-color: #ffffff;
  text-align: center;
  .iconfont {
    font-size: 22px;
  }
  p {
    font-size: 12px;
  }
}
.router-link-active {
  color: red;
}
</style>
