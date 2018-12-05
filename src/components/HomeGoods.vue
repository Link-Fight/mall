<template>
  <div class="goods-container">
    <div class="goods-title">{{title}}</div>
    <div class="goods-box xa-cell">
      <template v-for="(item,index) in items">
        <router-link class="goods-item" tag="div" :key="index" :to="'/goods?guid='+item.guid">
          <!-- <img v-lazyLoad="item.img" src="../assets/logo.png" alt=""> -->
          <div v-lazyLoad="item.img" class="xa-img"></div>
          <div class="content">
            <p class="title">{{item.title}}</p>
            <p class="sub-title">{{item.subTitle}}</p>
            <p class="tips">{{item.tip}}</p>
          </div>
          <p class="price">￥&nbsp;{{item.price}}</p>
        </router-link>
      </template>
    </div>
  </div>
</template>
<script>
import { lazyLoadConfig } from '@/directives/lazyLoad'
const lazyLoad = lazyLoadConfig('div', { loadingClass: 'loading-img' })
export default {
  directives: {
    lazyLoad
  },
  props: {
    title: {
      type: String
    },
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
  padding: 0 17px 0px;
}
.goods-title {
  padding: 16px 0 16px;
  line-height: 25px;
  font-size: 18px;
  font-weight: bold;
}
.goods-box {
  flex-wrap: wrap;
}
.goods-item {
  width: 50%;
  padding-bottom: 15px;
  box-sizing: border-box;
  // font-family: PingFang-SC-Medium;
  &:nth-child(even) {
    padding-left: 4px;
  }
  &:nth-child(odd) {
    padding-right: 4px;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .xa-img {
    display: block;
    height: 130px;
    margin: 0 auto;
    max-width: 100%;
    border-radius: 4px;
    background-color: #eee;
    background-image: url(../assets/logo.png);
  }
  .loading-img {
    background-size: 50%;
    opacity: 0.3;
  }
  .content {
    height: 50px;
    overflow: auto;
  }
  .title {
    margin-top: 12px;
    font-size: 13px;
    font-weight: 600;
    color: #1d1d1d;
    line-height: 18px;
  }
  .sub-title {
    font-size: 12px;
    font-weight: 400;
    color: #1d1d1d;
    line-height: 17px;
  }
  .tips {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 400;
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