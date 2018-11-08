<template>
  <div class="home">
    <!-- 主滑块 -->
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <template v-for="(img,index) in swipers">
          <a :key="index" class="swiper-slide" :href="img.href">
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
          <img :src="item.img" alt="">
          <p>{{item.label}}</p>
        </a>
      </template>
    </div>
    <!-- 活动模块 -->
    <HomeActivity class="home-space xa-bg-white" title="活动" :type="activitysType" :items="activitys"/>
    <HomeGoods class="home-space xa-bg-white" title="精选产品" :items="goods"/>
    <div v-show="isShowToTopPoint" @click="moveToTop" class="home-flex-toTop-icon xa-cell">
      <i class="iconfont icon-dingbu xa-txt-20"></i>
    </div>
    <div ref="footPoint" class="home-flex-loading-point"></div>
    <div v-if="canLoadingMore" class="home-loading xa-cell">
      <img src="../assets/loading.svg" alt="">正在加载更多
    </div>
    <div class="home-search max-container"><HomeSearchBar/></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import homeCfg from '@/config/views/Home'
import HomeSearchBar from '@/components/HomeSearchBar'
import HomeActivity from '@/components/HomeActivity'
import HomeGoods from '@/components/HomeGoods'
import startMove from '@/util/startMove'
function queryM(params) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        goods: homeCfg.goods
      })
    }, 1000)
  })
}
export default {
  name: 'home',
  data() {
    return {
      swipers: homeCfg.swipers,
      navItms: homeCfg.items,
      goods: homeCfg.goods,
      activitysType: 1,
      activitys: homeCfg.activitys,
      isShowToTopPoint: false,
      isLoadingMore: false,
      canLoadingMore: true,
      pageQuery: {
        num: 0,
        size: 8
      }
    }
  },
  components: {
    HomeSearchBar,
    HomeActivity,
    HomeGoods
  },
  methods: {
    async queryMore() {
      this.isLoadingMore = true
      this.pageQuery.num++
      const result = await queryM(this.pageQuery)
      if (result.goods.length) {
        this.goods = this.goods.concat(result.goods)
      } else {
        this.canLoadingMore = false
      }
      this.isLoadingMore = false
    },
    moveToTop() {
      let target = document.documentElement || document.body
      startMove(target, { scrollTop: 0 })()
    },
    handleScroll() {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isShowToTopPoint = scrollTop / clientHeight > 0.5
    }
  },
  mounted() {
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination',
      }
    })
    let LoadingMoreObserver = this.$options.$_LoadingMoreObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio) {
        !this.isLoadingMore && this.queryMore()
      }
    })
    LoadingMoreObserver.observe(this.$refs.footPoint)
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style>
@import url("../../node_modules/swiper/dist/css/swiper.min.css");
</style>
<style scoped lang="scss">
.home {
  padding-top: 44px;
  padding-bottom: 44px;
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
.home-loading {
  justify-content: center;
  font-size: 12px;
  color: 999;
  img {
    width: 30px;
  }
}
.home-flex-loading-point {
  position: absolute;
  bottom: 60px;
  bottom: 30vh;
  right: 20px;
  width: 20px;
  height: 20px;
  background-color: aqua;
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
  img {
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

