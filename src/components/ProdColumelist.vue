<template>
  <section class="prodlist-container">
    <template v-for="(item,index) in items">
      <router-link
        class="prod-item xa-cell"
        :key="index+item.product_guid"
        tag="div"
        :to="'/goods?guid='+item.product_guid"
      >
        <div v-lazyLoad="item.img" class="xa-img"></div>
        <div class="content xa-flex">
          <div style="min-height:76px;">
            <p class="title xa-txt-ellipsis-2">{{item.title}}</p>
            <p class="sub-title xa-txt-ellipsis-2">{{item.sub_title}}</p>
          </div>
          <p class="price">￥&nbsp;{{item.price}}</p>
        </div>
      </router-link>
    </template>
  </section>
</template>
<script>
import { lazyLoadConfig } from '@/directives/lazyLoad'
const lazyLoad = lazyLoadConfig('div', { loadingClass: 'loading-img' })
export default {
  directives: {
    lazyLoad
  },
  props: {
    items: Array,
    default() {
      return []
    }
  }
}
</script>
<style lang="scss" scoped>
.prod-item {
  padding: 8px 0 8px 17px;
  box-sizing: border-box;
  // font-family: PingFang-SC-Medium;
  background-color: #fff;
  &:last-of-type {
    .content {
      border: none;
    }
  }
  .xa-img {
    display: block;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
    margin-right: 11px;
    border-radius: 4px;
    // background-color: #eee;
    background-size: contain;
    background-image: url(../assets/logo.png);
  }
  .loading-img {
    background-size: 80%;
    opacity: 0.3;
  }
  .content {
    align-self: stretch;
    border-bottom: 1px solid #e4e4e4;
  }
  .title {
    // height: 42px;
    font-size: 15px;
    font-weight: 600;
    color: #1d1d1d;
    white-space: normal;
    line-height: 24px;
  }
  .sub-title {
    min-height: 34px;
    font-size: 12px;
    color: #6d6d6d;
    line-height: 17px;
  }
  .price {
    margin-bottom: 4px;
    font-weight: 700;
    color: #da0126;
    line-height: 25px;
  }
}
</style>

