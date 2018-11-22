<template>
<div>
  <div class="xa-cell goods-container" v-for="goods in items" :key="goods.guid">
    <!-- <router-link class="goods-img xa-img" :style="'backgroundImage:url('+goods.img+')'" :to="'/goods?guid='+goods.guid" tag="div"></router-link> -->
    <div class="goods-img xa-img" :style="'backgroundImage:url('+goods.img+')'"></div>
    <div class="goods-info xa-flex">
      <p class="title xa-txt-16 xa-txt-bold">{{goods.title}}</p>
      <p class="sku">{{goods.sku}}</p>
      <div class="xa-cell price-box">
        <p class="xa-txt-16 xa-txt-bold xa-txt-red">￥ {{goods.price}}</p>
        <p>x{{goods.count}}</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.goods-container {
  padding: 20px 0;
  & + & {
    border-top: 1px solid #e4e4e4;
  }
  .goods-img {
    width: 80px;
    height: 80px;
    margin-right: 11px;
  }
  .goods-info {
    .title {
      min-height: 42px;
    }
    .sku {
      color: #6d6d6d;
      font-size: 12px;
      min-height: 17px;
    }
    .price-box {
      justify-content: space-between;
    }
  }
}
</style>
