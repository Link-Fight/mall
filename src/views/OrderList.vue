<template>
  <section class="order-list-page">
    <div class="page-head">
      <AppTabs v-model="tabIndex" :items="tabItems"/>
    </div>
    <div class="page-content" v-show="!isLoading">
      <div class="order-item" v-for="(data) in dataSoure[tabIndex]" :key="data.id">
        <div class="xa-cell xa-txt-999">
          <div class="xa-flex">金额：￥ {{data.price}}</div>
          <div>{{data.time}}</div>
        </div>
        <div class="xa-cell xa-bg-f2">
          <div
            class="xa-img"
            v-for="(img,index) in data.imgs"
            :style="'backgroundImage:url('+img+')'"
            :key="index"
          ></div>
          <div v-show="data.imgs.length==1">
            <div class="xa-txt-16">{{data.title}}</div>
            <div>{{data.tip}}</div>
          </div>
        </div>
        <router-link class="xa-cell" tag="div" :to="'/order/read?guid='+data.order_no">
          <div
            class="xa-flex"
            :class="data.status==0?'xa-txt-red':'xa-txt-666'"
          >{{data.status==0?'继续支付':'查看详情'}}</div>
          <i style="opacity:0.5" class="iconfont icon-xiangyou1"></i>
        </router-link>
      </div>
      <div v-show="dataSoure[tabIndex].length===0" class="page-empty xa-view xa-txt-999">
        <i class="iconfont icon-caigou-xianxing" style="font-size: 80px;"></i>
        <span>还没有相关订单！</span>
      </div>
    </div>
    <div ref="loadingMore"></div>
    <div class="page-foot">
      <AppLoadingMore v-if="dataSoure[tabIndex].length&&canLoadMore[tabIndex]"/>
      <div v-else-if="dataSoure[tabIndex].length">已加载全部数据</div>
    </div>
    <App2Top ref="scroll"/>
  </section>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import App2Top from '@/components/App2Top'
import AppLoadingMore from '@/components/AppLoadingMore'
import { getOrderList } from '@/controllers/order'
const tabs = ['待付款', '待收货', '已完成', '已取消']
export default {
  components: {
    AppTabs,
    App2Top,
    AppLoadingMore
  },
  data() {
    return {
      isLoading: false,
      tabItems: tabs,
      tabIndex: 0,
      dataSoure: {
        0: [],
        1: [],
        2: [],
        3: []
      },
      canLoadMore: {
        0: true,
        1: true,
        2: true,
        3: true
      },
      scrollTop: {
        0: 0,
        1: 0,
        2: 0,
        3: 0
      },
      pageSize: 4
    }
  },
  watch: {
    tabIndex(newIndex, oldIndex) {
      this.scrollTop[oldIndex] = this.$refs.scroll.getCurScrollTop()
      this.tabIndex = newIndex
      if (this.dataSoure[newIndex].length === 0) {
        this.getQueryData()
      } else {
        this.$refs.scroll.animateTo(this.scrollTop[newIndex])
      }
    }
  },
  methods: {
    async queryData(params = {}) {
      return getOrderList({
        status: this.tabIndex,
        psize: this.pageSize,
        ...params
      })
    },
    async getQueryData() {
      this.isLoading = true
      let data = await this.$actionWithLoading(this.queryData())
      this.isLoading = false
      this.dataSoure[this.tabIndex] = data.items
      if (data.items.length < this.pageSize) {
        this.canLoadMore[this.tabIndex] = false
      }
    },
    async getQueryMore() {
      const items = this.dataSoure[this.tabIndex]
      const pid = items[items.length - 1].id
      let data = await this.$actionWithAlert(this.queryData({ pid }))
      this.dataSoure[this.tabIndex] = this.dataSoure[this.tabIndex].concat(data.items)
      if (data.items.length < this.pageSize) {
        this.canLoadMore[this.tabIndex] = false
      }
    }
  },
  async mounted() {
    this.tabIndex = this.$route.params.type
    await this.getQueryData()
    let LoadingMoreObserver = this.$options.$_LoadingMoreObserver = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio) {
        if (this.dataSoure[this.tabIndex].length && this.canLoadMore[this.tabIndex]) {
          this.getQueryMore()
        }
      }
    })
    LoadingMoreObserver.observe(this.$refs.loadingMore)
  }
}
</script>
<style lang="scss" scoped>
.page-head {
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 640px;
  background-color: #fff;
  z-index: 99;
}
.page-content {
  padding-top: 40px;
}
.order-item {
  margin-top: 10px;
  // margin: 10px;
  border-radius: 4px;
  background-color: #fff;
  .xa-img {
    width: 60px;
    height: 60px;
    margin-right: 16px;
  }
  .xa-cell {
    position: relative;
    padding: 8px 8px 8px 0;
    margin-left: 8px;
  }
}
.page-empty {
  height: 70vh;
  justify-content: center;
  align-items: center;
}
.page-foot {
  color: #999;
  text-align: center;
  line-height: 36px;
}
</style>
