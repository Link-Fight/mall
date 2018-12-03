<template>
  <section class="search-page">
    <form
      class="xa-cell search-bar-box max-container"
      @onSearchQuery.prevent="()=> false"
      action="javascript:return true"
    >
      <div class="xa-flex xa-cell search-bar">
        <i class="iconfont icon-sousuo" style="font-size:18px"></i>&nbsp;&nbsp;
        <input
          @focus="onSearchFocus"
          @blur="onSearchBlur"
          v-model="keyword"
          type="search"
          placeholder="搜索"
          @keyup.enter.stop="onSearchQuery"
        >
        <i
          v-show="keyword"
          @click="keyword=''"
          class="iconfont icon-guanbi2fill"
          style="margin-right:4px"
        ></i>
      </div>
      <span v-show="isShowCancel" class="cancel-btn" @click="onCancelClick">取消</span>
    </form>
    <App2Top/>
    <SearchPrompt
      v-show="isShowSearchPrompt||prodList.length===0"
      @select="onSearchSelect"
      :hotItems="hotItems"
      :historyItems="historyItems"
      @clear="historyItems=[]"
    />
    <ProdColumelist :items="prodList"/>
    <!-- 加载更多触发点 -->
    <div ref="footPoint" class="page-flex-loading-point"></div>
    <AppLoadingMore v-show="prodList.length&&canLoadingMore"/>
    <div
      v-if="!canLoadingMore&&prodList.length"
      class="xa-txt-center xa-txt-999 xa-txt-12"
      style="padding:16px"
    >已加载全部数据</div>
  </section>
</template>
<script>
import storage from '@/util/storage'
import ProdColumelist from '@/components/ProdColumelist'
import App2Top from '@/components/App2Top'
import AppLoadingMore from '@/components/AppLoadingMore'
import SearchPrompt from '@/components/SearchPrompt'
import { LOCAL_SEARCH_HISTORY } from '@/storeKey'
import { getRecommendSearch } from '@/controllers/main'
import { getProductList, getShopProductList } from '@/controllers/category'
let mRecommendSearch = null
export default {
  name: 'prodList',
  data() {
    return {
      isLoading: false,
      isShowCancel: false,
      isShowSearchPrompt: false,
      keyword: '',
      hotItems: mRecommendSearch,
      historyItems: [],
      prodList: [],
      isLoadingMore: false,
      canLoadingMore: true,
      query: {
        page_index: 1,
        page_size: 10
      },
      fullPath: '', // 记录当前页面地址
      pageHeight: 0 // 记录屏幕高度
    }
  },
  components: {
    App2Top,
    AppLoadingMore,
    SearchPrompt,
    ProdColumelist
  },
  methods: {
    onSearchFocus() {
      this.isShowSearchPrompt = true
    },
    onSearchBlur() {
      this.$route.query.type === 'SEARCH' && (this.isShowSearchPrompt = false)
    },
    onCancelClick() {
      this.$router.go(-1)
    },
    onSearchSelect(keyword) {
      this.keyword = keyword
      this.onSearchQuery()
    },
    async onSearchQuery() {
      if (this.$route.query.guid || this.keyword) {
        this.isShowSearchPrompt = false
        if (this.keyword) {
          if (this.historyItems.indexOf(this.keyword) === -1) {
            this.historyItems.unshift(this.keyword)
            if (this.historyItems.length >= 6) {
              this.historyItems.pop()
            }
            storage.setStorage(LOCAL_SEARCH_HISTORY, this.historyItems)
          }
        }
        this.query.page_index = 1
        const data = await this.$actionWithLoading(this.queryData())
        this.prodList = data.items
        if (data.items.length === 0) {
          this.isShowSearchPrompt = true
          this.$appToast.showToast('抱歉！没有相关内容！')
        } else if (data.items.length < this.query.page_size) {
          this.canLoadingMore = false
        } else {
          this.canLoadingMore = true
        }
      }
    },
    async queryData(getMore = false) {
      const type = this.$route.query.type || 'CATEGORY'
      let data = {}
      let action
      let query = {}
      if (type === 'CATEGORY') {
        action = getProductList
        query = { category_guid: this.$route.query.guid, keyword: this.keyword, ...this.query }
      } else if (type === 'SHOP') {
        action = getShopProductList
        query = { shop_guid: this.$route.query.guid, keyword: this.keyword, ...this.query }
      } else if (type === 'SEARCH') {
        action = getProductList
        query = { category_guid: this.$route.query.guid, keyword: this.keyword, ...this.query }
      }
      data = getMore ? await this.$actionWithAlert(action(query)) : await this.$actionWithLoading(action(query))
      this.query.page_index++
      return data
    },
    async queryMore() {
      if (!this.canLoadingMore) return
      if (!this.prodList.length) return
      this.isLoadingMore = true
      const data = await this.queryData(true)
      this.isLoadingMore = false
      if (data.items.length < this.query.page_size) {
        this.canLoadingMore = false
      }
      this.prodList = this.prodList.concat(data.items)
    },
    async initData() {
      this.isShowCancel = false
      this.keyword = ''
      this.isLoadingMore = false
      this.isShowSearchPrompt = false
      this.canLoadingMore = true
      this.prodList = []
      this.query = {
        page_index: 1,
        page_size: 10
      }
      if (this.$route.query.type === 'SEARCH') {
        this.isShowSearchPrompt = true
        this.isShowCancel = true
      } else {
        const data = await this.queryData()
        this.prodList = data.items
        if (data.items.length === 0) {
          this.$appToast.showToast('抱歉！没有相关内容！')
          this.isShowSearchPrompt = true
        }
        if (data.items.length < this.query.page_size) {
          this.canLoadingMore = false
        }
      }
    },
    onResize() {
      const docH = Math.max(document.documentElement.clientHeight, document.body.clientHeight)
      if (this.pageHeight - docH < 100) {
        if (this.prodList.length > 0 && this.isShowSearchPrompt) {
          this.isShowSearchPrompt = false
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true
    this.fullPath = this.$route.fullPath
    let result = storage.getStorage(LOCAL_SEARCH_HISTORY)
    this.historyItems = result || []
    await this.initData()
    const recommendSearchResult = await getRecommendSearch()
    this.hotItems = recommendSearchResult
    mRecommendSearch = recommendSearchResult
    this.$nextTick(() => {
      let LoadingMoreObserver = this.$options.$_LoadingMoreObserver = new IntersectionObserver((entries) => {
        if (entries[0].intersectionRatio) {
          !this.isLoadingMore && this.queryMore()
        }
      })
      LoadingMoreObserver.observe(this.$refs.footPoint)
      this.pageHeight = Math.max(document.documentElement.clientHeight, document.body.clientHeight)
      window.addEventListener('resize', this.onResize)
    })
    this.isLoading = false
  },
  activated() {
    if (this.$route.fullPath !== this.fullPath) {
      this.fullPath = this.$route.fullPath
      this.initData()
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>
<style lang="scss" scoped>
.page-flex-loading-point {
  position: absolute;
  bottom: 60px;
  bottom: 30vh;
  right: 20px;
  width: 20px;
  height: 20px;
  pointer-events: none;
  z-index: 10;
}
.search-page {
  padding-top: 44px;
}
.search-bar-box {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 8px 17px;
  height: 44px;
  background-color: #fff;
  z-index: 10;
  box-shadow: 0px 1px 6px #ccc;
  .cancel-btn {
    margin-left: 17px;
    color: #1d1d1d;
    line-height: 20px;
  }
}
.search-bar {
  padding-left: 12px;
  height: 28px;
  background-color: #f0f0f0;
  color: #9d9d9d;
  border-radius: 4px;
  input {
    flex: 1;
    width: 100%;
    outline: none;
    border: none;
    background-color: transparent;
  }
}
</style>
