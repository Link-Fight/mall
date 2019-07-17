<template>
  <div class="xa-cell nav-tab xa-bg-white">
    <div class="tip-content xa-cell xa-flex xa-txt-16">
      合计: <span class="xa-txt-red xa-txt-bold"> {{total}}元</span>
    </div>
    <div @click="$emit('buy')" class="buy-btn xa-bg-red">提交订单</div>
  </div>
</template>
<script>
export default {
  props: {
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
  .buy-btn {
    font-size: 18px;
    padding: 0 34px;
    color: #fff;
    line-height: 48px;
  }
}
</style>
