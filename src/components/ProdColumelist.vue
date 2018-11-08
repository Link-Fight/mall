<template>
  <section class="prodlist-container">
      <template v-for="(item,index) in items">
        <div class="prod-item xa-cell" :key="index">
          <img v-lazyLoad="item.img" src="../assets/logo.png" alt="">
          <div class="content xa-flex">
            <p class="title">{{item.title}}</p>
            <p class="sub-title">{{item.subTitle}}</p>
            <p class="tips">{{item.tip}}</p>
            <p class="price">￥&nbsp;{{item.price}}</p>
          </div>
        </div>
      </template>
  </section>
</template>
<script>
import lazyLoad from '@/directives/lazyLoad'
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
  margin: 8px 0;
  box-sizing: border-box;
  font-family: PingFang-SC-Medium;
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  img {
    display: block;
    flex-shrink: 0;
    width: 120px;
    height: 120px;
    margin-bottom: 10px;
    margin-right: 8px;
    border-radius: 4px;
    background-color: #eee;
  }
  .content {
    align-self: stretch;
    border-bottom: 1px solid #e4e4e4;
  }
  .title {
    height: 48px;
    font-size: 15px;
    font-weight: 600;
    color: #1d1d1d;
    white-space: normal;
    line-height: 24px;
  }
  .sub-title {
    height: 34px;
    font-size: 12px;
    color: #1d1d1d;
    line-height: 17px;
  }
  .tips {
    margin-top: 6px;
    font-size: 12px;
    color: rgba(109, 109, 109, 1);
    line-height: 17px;
  }
  .price {
    margin-top: 4px;
    font-weight: 600;
    color: #da0126;
    line-height: 20px;
  }
}
</style>

