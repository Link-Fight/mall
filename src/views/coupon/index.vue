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
</style>
<template>
  <section>
    <AppTabs class="page-head" v-model="tabIndex" :items="tabItems" />
    <section class="page-content">
      <template v-if="isLoading">
        <SkeletonProd />
      </template>
      <template v-else>
        <CouponCard
          @click="onItemClick"
          v-for="(item,index) in list"
          :key="index"
          :model="cardModel"
          :cfg="item"
        ></CouponCard>
        <AppFootLoadingMore :count="list.length" :canLoadMore="canLoadMore" @loadMore="onLoadMore" />
        <App2Top />
        <AppListEmpty style="padding-top:30vh;" v-if="list.length===0" />
      </template>
    </section>
  </section>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import AppListEmpty from '@/components/AppListEmpty'
import CouponCard from '@/components/CouponCard'
import SkeletonProd from '@/components/SkeletonProd'
import AppFootLoadingMore from '@/components/AppFootLoadingMore'
import App2Top from '@/components/App2Top'
import { getScrollTop, setScrollTop } from '@/util'
import { getCoupon } from '@/controllers/coupon'
const TAB_TEXTS = ['待使用', '已使用', '已过期']
const TAB_VALUES = ['1', '2', '3']
const CARD_MODEL = ['CAN_USE', 'HAS_USE', 'OUT_TIME']
export default {
  components: {
    App2Top,
    AppListEmpty,
    AppTabs,
    CouponCard,
    SkeletonProd,
    AppFootLoadingMore
  },
  data() {
    return {
      isLoading: true,
      tabItems: TAB_TEXTS,
      tabIndex: 0,
      isLoadingMore: false,
      canLoadMore: false,
      list: [],
      storeList: {},
      storeQuery: {},
      storeScroll: {},
      cardModel: CARD_MODEL[0],
      query: {
        type: TAB_VALUES[0],
        page_index: 1,
        page_size: 10
      }
    }
  },
  watch: {
    tabIndex(index) {
      // 发生tab切换时候，记录当前的tab下数据，(获取新的/恢复之前)tab的数据
      this.recordTabData()
      this.cardModel = CARD_MODEL[index]
      this.setNewOrResetTabData(index)
    }
  },
  methods: {
    onItemClick({ action, cfg }) {
      if (this.tabIndex === 0 && action === 'foot') {
        this.$router.push({
          path: `/prodList?coupon_guid=${cfg.coupon_guid}`
        })
      }
    },
    recordTabData() {
      const type = this.query.type
      this.storeQuery[type] = this.query
      this.storeList[type] = this.list
      this.storeScroll[type] = getScrollTop()
    },
    setNewOrResetTabData(typeIndex) {
      const type = TAB_VALUES[typeIndex]
      this.query = this.storeQuery[type] || {
        type,
        page_index: 1,
        page_size: 10
      }
      this.list = this.storeList[type] || []
      const scrollTop = this.storeScroll[type] || 0
      this.isLoadingMore = false
      this.$nextTick(() => {
        setScrollTop(scrollTop)
      })
      if (this.list.length === 0) {
        this.isLoading = true
        this.fetchData()
      }
    },
    async onLoadMore() {
      if (this.canLoadMore && this.isLoadingMore === false) {
        this.isLoadingMore = true
        await this.fetchData()
        this.isLoadingMore = false
      }
    },
    async fetchData() {
      const query = this.query
      const list = await getCoupon(query)
      if (query.type !== this.query.type) {
        return
      }
      if (list.length) {
        this.list = [...this.list, ...list]
        this.query.page_index++
      }
      this.canLoadMore = list.length >= this.query.page_size
      this.isLoading = false
    }
  },
  mounted() {
    this.fetchData()
  }
}
</script>