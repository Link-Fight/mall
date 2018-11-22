<template>
  <ul class="xa-cell nav-tab" :class="{'disable':disable}">
    <div v-show="notice" class="tab-notice">
      {{notice}}
    </div>
    <div class="icon xa-cell">
      <i class="iconfont icon-caigou-xianxing"></i>
      <span v-if="num" class="num">2</span>
    </div>
    <div @click="onClick('add')" class="add-btn xa-cell xa-flex">加入购物车</div>
    <div @click="onClick('buy')" class="buy-btn xa-cell xa-flex">立即购买</div>
  </ul>
</template>
<script>
export default {
  props: {
    num: [String, Number],
    disable: {
      type: Boolean,
      default: false
    },
    notice: String
  },
  methods: {
    onClick(action) {
      if (this.disable) {
        this.$appToast.showToast('该商品目前无法购买')
      } else {
        this.$emit(action)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-tab {
  position: relative;
  height: 48px;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: center;
  font-size: 18px;
  color: #fff;
  align-items: stretch;
  .tab-notice {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 47px;
    line-height: 22px;
    font-size: 12px;
    background-color: #FFC107;
  }
  .xa-cell {
    justify-content: center;
  }
  .icon {
    position: relative;
    width: 48px;
    height: 48px;
    color: #9d9d9d;
  }
  .iconfont {
    font-size: 24px;
  }
  .num {
    position: absolute;
    right: 6px;
    top: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    color: #fff;
    font-size: 12px;
    background-color: #ff6701;
  }
  .add-btn {
    background-color: #ff6701;
  }
  .buy-btn {
    background-color: #da0126;
  }
  &.disable {
    .add-btn {
      // opacity: 0.5;
      background-color: #999;
    }
    .buy-btn {
      // opacity: 0.5;
      background-color: #666;
    }
  }
}
</style>
