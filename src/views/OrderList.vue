<template>
<section class="order-list-page">
  <div class="page-head">
    <AppTabs v-model="tabIndex" :items="tabItems"/>
  </div>
  <div class="page-content" v-show="!isLoading">
    <div class="order-item" v-for="(data) in dataSoure[tabIndex]" :key="data.id">
      {{data}}
    </div>
    <div v-show="dataSoure[tabIndex].length===0" class="page-empty xa-view xa-txt-999">
      <i class="iconfont icon-caigou-xianxing" style="font-size: 80px;"></i>
      <span>没有相关数据！</span>
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
      if (this.dataSoure[newIndex].length === 0) {
        this.getQueryData()
      } else {
        this.$nextTick(() => {
          // document.documentElement.scrollTop = this.scrollTop[newIndex]
          this.$refs.scroll.animateTo(this.scrollTop[newIndex])
        })
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
}
.page-content {
  padding-top: 40px;
}
.order-item {
  margin-top: 10px;
  padding: 8px 17px;
  background-color: #fff;
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
