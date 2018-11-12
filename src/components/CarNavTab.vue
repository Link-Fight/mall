<template>
  <div class="xa-cell nav-tab xa-bg-white">
    <div v-if="needSelectAll" class="icon xa-cell">
      <i class="iconfont" :class="selectAll?'icon-yuanxingxuanzhongfill  xa-txt-red':'icon-yuanxingweixuanzhong'"></i><span>全选</span>
    </div>
    <div class="tip-content xa-cell xa-flex">
      合计: <span class="xa-txt-red xa-txt-bold"> {{total}}元</span>
    </div>
    <div @click="$emit('buy')" class="buy-btn xa-bg-red">结算({{num}})</div>
  </div>
</template>
<script>
export default {
  props: {
    needSelectAll: {
      type: Boolean,
      default: false
    },
    selectAll: {
      type: Boolean,
      default: true
    },
    num: {
      type: [Number, String],
      default: 0
    },
    total: {
      type: [Number, String],
      default: 0
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-tab {
  padding-left: 18px;
  height: 48px;
  align-items: stretch;
  .icon {
    width: 58px;
    height: 100%;
    flex-shrink: 0;
  }
  .iconfont {
    font-size: 18px;
    margin-right: 10px;
  }
  .icon + .tip-content {
    justify-content: flex-end;
    padding-right: 18px;
  }
  .tip-content {
    font-size: 16px;
  }
  .buy-btn {
    font-size: 18px;
    padding: 0 16px;
    color: #fff;
    line-height: 48px;
  }
}
</style>
