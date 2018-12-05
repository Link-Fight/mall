<template>
  <ul class="xa-cell nav-tab">
    <template v-for="item in items">
      <router-link class="xa-flex nav-tab-item" :to="item.herf" :key="item.href" tag="div">
        <div>
          <i class="iconfont" :class="item.icon"></i>
        </div>
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
            label: '分类',
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
  box-sizing: border-box;
  height: 48px;
  background-color: #ffffff;
  text-align: center;
  color: #9d9d9d;
  .iconfont {
    font-size: 22px;
  }
  p {
    margin-top: 4px;
    font-size: 10px;
    line-height: 14px;
    height: 14px;
  }
}
.nav-tab-item {
  div {
    height: 24px;
  }
}
.router-link-active {
  color: #db0226;
}
</style>
