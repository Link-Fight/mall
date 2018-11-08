<template>
<div>
  <div class="prompt-cell">
    <p class="prompt-title">热门搜索</p>
    <div class="prompt-item-box xa-cell">
      <div class="prompt-item" v-for="item in hotItems" :key="item">{{item}}</div>
    </div>
  </div>
  <div class="prompt-cell" v-if="historyItems.length">
    <p class="prompt-title">搜索记录</p>
    <div class="prompt-item-box xa-cell">
      <div class="prompt-item" v-for="item in historyItems" :key="item">{{item}}</div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: {
    hotItems: {
      type: Array,
      default() {
        return []
      }
    },
    historyItems: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.prompt-cell {
  padding-bottom: 16px;
  margin: 0 17px;
  & + & {
    border-top: 1px solid #e4e4e4;
  }
}
.prompt-title {
  padding: 16px 0 10px;
  color: #6d6d6d;
}
.prompt-item-box {
  flex-wrap: wrap;
}
.prompt-item {
  margin-top: 7px;
  margin-right: 7px;
  padding: 0 11px;
  line-height: 30px;
  color: #1d1d1d;
  background-color: #fff;
}
</style>

