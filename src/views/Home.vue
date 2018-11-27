<template>
  <div class="home-page" v-if="!isLoading">
    <!-- 主滑块 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <template v-for="(img,index) in swipers">
          <a :key="index" class="swiper-slide" :href="img.url">
            <img :src="img.img" alt="">
          </a>
        </template>
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <!-- 快速导航  -->
    <div class="home-space nav-container xa-cell">
      <template v-for="item in navItms">
        <a class="nav-item" :key="item.label" :href="item.href">
          <div class="xa-img" :style="'backgroundImage:url('+'http://192.168.11.85:8080/img/logo.fd6ca067.png'+')'"></div>
          <p>{{item.label}}</p>
        </a>
      </template>
    </div>
    <!-- 活动模块 -->
    <HomeActivity v-if="activitys.length" class="home-space xa-bg-white" title="活动" :type="activitysType" :items="activitys"/>
    <!-- 推荐商品 -->
    <HomeGoods class="home-space xa-bg-white" title="精选产品" :items="goods"/>
    <!-- 返回顶部 -->
    <App2Top/>
    <!-- 加载更多触发点 -->
    <div ref="footPoint" class="home-flex-loading-point"></div>
    <AppLoadingMore v-if="canLoadingMore"/>
    <div class="home-search max-container"><HomeSearchBar/></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import homeCfg from '@/config/views/Home'
import HomeSearchBar from '@/components/HomeSearchBar'
import HomeActivity from '@/components/HomeActivity'
import HomeGoods from '@/components/HomeGoods'
import AppLoadingMore from '@/components/AppLoadingMore'
import App2Top from '@/components/App2Top'
import { getMain, getRecommendProduct } from '@/controllers/main'
export default {
  name: 'home',
  data() {
    return {
      isLoading: false,
      swipers: [],
      navItms: [] || homeCfg.items,
      goods: [] || homeCfg.goods,
      activitysType: 1,
      activitys: [],
      isLoadingMore: false,
      canLoadingMore: true,
      pageQuery: {
        page_index: 1,
        page_size: 4
      }
    }
  },
  components: {
    AppLoadingMore,
    App2Top,
    HomeSearchBar,
    HomeActivity,
    HomeGoods
  },
  methods: {
    async queryMore() {
      this.isLoadingMore = true
      this.pageQuery.page_index++
      const result = await getRecommendProduct(this.pageQuery)
      if (result.length) {
        this.goods = this.goods.concat(this.initGoods(result.goods))
      } else {
        this.canLoadingMore = false
      }
      this.isLoadingMore = false
    },
    initGoods(items) {
      return items.map(item => {
        return {
          img: item.first_pic,
          title: item.title,
          subTitle: item.sub_title,
          guid: item.guid,
          tip: '',
          price: item.price
        }
      })
    },
    initSwiper() {
      new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        }
      })
      let LoadingMoreObserver = this.$options.$_LoadingMoreObserver = new IntersectionObserver((entries) => {
        console.log('IntersectionObserver', entries[0])
        if (entries[0].intersectionRatio) {
          !this.isLoadingMore && this.queryMore()
        }
      })
      LoadingMoreObserver.observe(this.$refs.footPoint)
    },
    spliceActivitys(activitys) {
      let arrs = []
      let arr
      for (let i = 0; i < activitys.length; i++) {
        if (i % 4 === 0) {
          if (arr) {
            arrs.push(arr)
          }
          arr = []
        }
        arr.push(activitys[i])
      }
      arr && arrs.push(arr)
      return arrs
    }
  },
  async beforeMount() {
    this.isLoading = true
    const data = await this.$actionWithLoading(getMain())
    this.navItms = data.recommend_nav.map(item => {
      return {
        img: item.icon,
        label: item.name
      }
    })
    this.goods = this.initGoods(data.recommend_product)
    this.swipers = data.banner
    this.activitys = this.spliceActivitys(data.activity_new)
    this.isLoading = false
    this.$nextTick(() => this.initSwiper())
  }
}
</script>
<style>
@import url("../../node_modules/swiper/dist/css/swiper.min.css");
</style>
<style scoped lang="scss">
.home-page {
  padding-top: 44px;
  padding-bottom: 48px;
  min-height: 100vh;
}
.home-space {
  margin-bottom: 10px;
}
.home-search {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 8px 17px;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 10;
}
.home-flex-loading-point {
  position: absolute;
  bottom: 60px;
  bottom: 30vh;
  right: 20px;
  width: 20px;
  height: 20px;
  pointer-events: none;
  z-index: 10;
}
.home-flex-toTop-icon {
  position: fixed;
  top: 75vh;
  right: 0px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.6;
  color: #fff;
  z-index: 10;
  justify-content: center;
}
.swiper-container {
  width: 100%;
  height: 49.3vw;
  max-height: 320px;
}
.swiper-slide {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
.nav-container {
  height: 93px;
  padding-top: 16px;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: stretch;
  color: #1d1d1d;
  text-align: center;
  background-color: #fff;
  font-size: 12px;
  .xa-img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-bottom: 2px;
  }
  p {
    margin-top: 4px;
    line-height: 17px;
    color: #1d1d1d;
  }
}
</style>

