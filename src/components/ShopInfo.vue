<template>
<div class="xa-bg-white">
  <div class="shop-info xa-cell">
    <div class="shop-img xa-img" :style="'backgroundImage:url('+(config.shop_logo||config.logo)+')'"></div>
    <div class="shop-content xa-flex">
      <div class="shop-title xa-txt-13 xa-txt-bold">{{config.name}}</div>
      <div class="shop-tip">{{config.tip||config.shop_description||'主营极飞产品零部件'}}</div>
    </div>
    <!-- <i class="iconfont icon-xiangyou1" style="opacity:0.6"></i> -->
  </div>
</div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          shop_logo: 'http://agri-private.static.xag.cn/v3/upload/ab4ca00515edaa7e205564ea58bdfc13.jpg?imageView2/0/w/100/h/100&e=1542167197&token=kL3qRYaFy4Ip8uZVbJyYE1KL6GgwtdNbqwu5C4lO:MWI_K94pWu7pmfqc3LVtjGWtO6U=',
          name: '极飞科技官方旗舰店'
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.shop-info {
  .shop-img {
    width: 50px;
    height: 50px;
    margin-right: 12px;
  }
  .shop-title {
    line-height: 18px;
  }
  .shop-tip {
    margin-top: 1px;
    line-height: 14px;
    font-size: 10px;
    color: #6d6d6d;
  }
}
</style>

