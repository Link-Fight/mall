<template>
  <ul class="xa-cell nav-tab">
    <div class="icon xa-cell">
      <i class="iconfont icon-caigou-xianxing"></i>
      <span v-if="num" class="num">2</span>
    </div>
    <div @click="$emit('add')" class="add-btn xa-cell xa-flex">加入购物车</div>
    <div @click="$emit('buy')" class="buy-btn xa-cell xa-flex">立即购买</div>
  </ul>
</template>
<script>
export default {
  props: {
    num: [String, Number]
  }
}
</script>
<style lang="scss" scoped>
.nav-tab {
  height: 48px;
  box-sizing: border-box;
  background-color: #ffffff;
  text-align: center;
  font-size: 18px;
  color: #fff;
  align-items: stretch;
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
}
</style>
