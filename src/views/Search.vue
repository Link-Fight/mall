<template>
  <section class="search-page">
    <form class="xa-cell search-bar-box" @submit.prevent="()=> false" action="javascript:return true">
      <div class="xa-flex xa-cell search-bar">
        <i class="iconfont icon-sousuo" style="font-size:18px"></i>&nbsp;&nbsp;<input v-model="keyword" type="search" placeholder="搜索" @keyup.enter.stop="submit" ><i v-show="keyword" @click="keyword=''" class="iconfont icon-guanbi2fill"></i>
      </div>
      <span class="cancel-btn" @click="onCancelClick">取消</span>
    </form>
    <div class="tip-cell">
      <p class="tip-title">热门搜索</p>
      <div class="tip-item-box xa-cell">
        <div class="tip-item" v-for="item in hotItems" :key="item">{{item}}</div>
      </div>
    </div>
    <div class="tip-cell" v-if="historyItems.length">
      <p class="tip-title">搜索记录</p>
      <div class="tip-item-box xa-cell">
        <div class="tip-item" v-for="item in historyItems" :key="item">{{item}}</div>
      </div>
    </div>
  </section>
</template>
<script>
import storage from '@/util/storage'
const storageKey = '/Mall3.0/Search/History'
export default {
  data() {
    return {
      keyword: '',
      hotItems: ['P20电池', 'P30电池', 'M3*8*19圆柱', '大灯', '轮胎'],
      historyItems: []
    }
  },
  methods: {
    onCancelClick() {
      this.$router.go(-1)
    },
    submit() {
      if (this.keyword) {
        if (this.historyItems.indexOf(this.keyword) === -1) {
          this.historyItems.push(this.keyword)
          if (this.historyItems.length >= 10) {
            this.historyItems.pop()
          }
          storage.setStorage(storageKey, this.historyItems)
        }
      }
    }
  },
  mounted() {
    let result = storage.getStorage(storageKey)
    this.historyItems = result || []
  }
}
</script>
<style lang="scss" scoped>
.search-bar-box {
  padding: 8px 17px;
  height: 44px;
  background-color: #fff;
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
.tip-cell {
  padding-bottom: 16px;
  margin: 0 17px;
  & + & {
    border-top: 1px solid #e4e4e4;
  }
}
.tip-title {
  padding: 16px 0 10px;
  color: #6d6d6d;
}
.tip-item-box {
  flex-wrap: wrap;
}
.tip-item {
  margin-top: 7px;
  margin-right: 7px;
  padding: 0 11px;
  line-height: 30px;
  color: #1d1d1d;
  background-color: #fff;
}
</style>
