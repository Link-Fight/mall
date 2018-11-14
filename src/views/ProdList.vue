<template>
  <section class="search-page">
    <form class="xa-cell search-bar-box max-container" @submit.prevent="()=> false" action="javascript:return true">
      <div class="xa-flex xa-cell search-bar">
        <i class="iconfont icon-sousuo" style="font-size:18px"></i>&nbsp;&nbsp;<input v-model="keyword" type="search" placeholder="搜索" @keyup.enter.stop="submit" ><i v-show="keyword" @click="keyword=''" class="iconfont icon-guanbi2fill" style="margin-right:4px"></i>
      </div>
      <span class="cancel-btn" @click="onCancelClick">取消</span>
    </form>
    <SearchPrompt :hotItems="hotItems" :historyItems="historyItems"/>
    <ProdColumelist :items="prodList"/>
    <AppLoadingMore/>
  </section>
</template>
<script>
import storage from '@/util/storage'
import ProdColumelist from '@/components/ProdColumelist'
import prodlist from '@/config/components/prodlist'
import AppLoadingMore from '@/components/AppLoadingMore'
import SearchPrompt from '@/components/SearchPrompt'
import { LOCAL_SEARCH_HISTORY } from '@/storeKey'
import { getProductList, getShopProductList } from '@/controllers/category'
export default {
  data() {
    return {
      type: this.$route.query.type || 'CATEGORY',
      keyword: '',
      hotItems: ['P20电池', 'P30电池', 'M3*8*19圆柱', '大灯', '轮胎'],
      historyItems: [],
      prodList: prodlist.items,
      query: {
        pageIndex: 1,
        pageSize: 10
      }
    }
  },
  components: {
    AppLoadingMore,
    SearchPrompt,
    ProdColumelist
  },
  methods: {
    onCancelClick() {
      this.$router.go(-1)
    },
    submit() {
      if (this.keyword) {
        if (this.historyItems.indexOf(this.keyword) === -1) {
          this.historyItems.push(this.keyword)
          if (this.historyItems.length >= 5) {
            this.historyItems.shift()
          }
          storage.setStorage(LOCAL_SEARCH_HISTORY, this.historyItems)
        }
      }
    },
    async queryData() {
      let data = {}
      if (this.type === 'CATEGORY') {
        data = await getProductList({ category_guid: this.$route.query.guid, ...this.query })
      } else if (this.type === 'SHOP') {
        data = await getShopProductList({ shop_guid: this.$route.query.guid, ...this.query })
      } else if (this.type === 'SEARCH') {
        data = await getProductList({ category_guid: this.$route.query.guid, keyword: this.keyword, ...this.query })
      }
      this.query.pageIndex++
      return data
    }
  },
  async mounted() {
    let result = storage.getStorage(LOCAL_SEARCH_HISTORY)
    this.historyItems = result || []
    const data = await this.queryData()
    this.prodList = data.items
  }
}
</script>
<style lang="scss" scoped>
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
