<template>
  <section class="goods-page">
    <!-- 主滑块 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <template v-for="(img) in info.pics">
          <div :key="img" class="swiper-slide" :style="'backgroundImage:url('+img+')'"></div>
        </template>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 商品基本信息 -->
    <div class="goods-info xa-bg-white">
      <p class="title">{{info.title}}</p>
      <p class="sub-title">{{info.sub_title}}</p>
      <p class="price">￥ {{info.price}}</p>
    </div>
    <!-- 商店信息 -->
    <div class="shop-info xa-bg-white xa-cell">
      <div class="img" :style="'backgroundImage:url('+info.shop_logo+')'"></div>
      <div class="xa-flex">
        <p class="name">{{info.shop_company_name}}</p>
        <p class="description">{{info.shop_description}}</p>
      </div>
      <i style="opacity:0.5" class="iconfont icon-xiangyou1"></i>
    </div>
    <!-- 富文本内容 -->
    <div class="xa-bg-white html-detail" v-if="info.detail" style="padding:0 8px;" v-html="info.detail"></div>
    <img style="width:100%;" src="../assets/notice.jpg" alt="">
    <!-- 返回顶部 -->
    <App2Top/>
    <GoodsNavTab :disable="info.buy!=1" :notice="info.buy_notice" @add="onTabAction('add')" @buy="onTabAction('buy')" class="app-fb-tab"/>
    <AppPopPanel v-show="isShowSku" @close="isShowSku=false">
      <SkuPanel :changeAction="changeGoodsBySku" :buyType="buyType" :info="info" :guid="guid" :skus="skuInfo.skus" :params="skuInfo.params" :choice="skuInfo.choice"/>
    </AppPopPanel>
  </section>
</template>
<script>
import Swiper from 'swiper'
import { getDetail_2 } from '@/controllers/good'
import App2Top from '@/components/App2Top'
import AppPopPanel from '@/components/AppPopPanel'
import GoodsNavTab from '@/components/GoodsNavTab'
import SkuPanel from '@/components/SkuPanel'
export default {
  name: 'Goods',
  data() {
    return {
      isShowSku: true,
      buyType: 1, // [1:加入购物车,2:立即购买]
      info: {},
      guid: '',
      skuInfo: {
        skus: null,
        params: null,
        choice: null
      }
    }
  },
  components: {
    App2Top,
    AppPopPanel,
    GoodsNavTab,
    SkuPanel
  },
  methods: {
    onTabAction(action) {
      this.buyType = action === 'add' ? 1 : 2
      this.isShowSku = true
    },
    changeGoodsBySku(guid) {
      this.guid = guid
      this.queryData()
    },
    async queryData() {
      const data = await this.$actionWithLoading(getDetail_2({
        guid: this.guid
      }))
      this.info = data
      this.skuInfo.params = data.params.length ? data.params : null
      this.skuInfo.choice = data.params.length ? data.param_choice : null
      this.skuInfo.skus = data.sku.length ? {
        title: data.sku_name,
        option: data.sku
      } : null
    }
  },
  mounted() {
    new Swiper('.swiper-container', {
      autoplay: {
        delay: 5000
      },
      pagination: {
        el: '.swiper-pagination',
      }
    })
    this.guid = this.$route.query.guid
    this.queryData()
  }
}
</script>
<style>
@import url("../../node_modules/swiper/dist/css/swiper.min.css");
</style>
<style lang="scss" scoped>
.goods-page {
  padding-bottom: 63px;
}
.swiper-container {
  width: 100%;
  height: 100vw;
  max-height: 640px;
}
.swiper-slide {
  background: 50% no-repeat;
  background-size: cover;
}
.goods-info {
  padding: 16px;
  margin-bottom: 10px;
  .title {
    color: #1d1d1d;
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
  }
  .sub-title {
    margin-top: 6px;
    color: #6d6d6d;
    font-size: 12px;
    line-height: 17px;
  }
  .price {
    margin-top: 8px;
    font-size: 16px;
    color: #da0126;
    font-weight: bold;
    line-height: 22px;
  }
}
.shop-info {
  padding: 12px 17px;
  margin-bottom: 10px;
  .img {
    width: 50px;
    height: 50px;
    margin-right: 12px;
    background-size: cover;
    background-color: #da0126;
  }
  .name {
    color: #1d1d1d;
    font-size: 13px;
    font-weight: bold;
    line-height: 18px;
  }
  .description {
    margin-top: 1px;
    color: #6d6d6d;
    font-size: 10px;
    line-height: 14px;
  }
}
</style>
