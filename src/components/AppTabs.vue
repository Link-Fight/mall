<template>
<ul class="tabs-box  xa-cell">
  <li class="tabs-item xa-flex"  v-for="(item,index) in items" :key="index" :class="{'active':value==index}" @click="$emit('input',index)">{{item}}</li>
  <div class="tabs-line" :style="lineStyle"></div>
</ul>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    items: {
      type: Array,
      default() {
        return ['待付款', '待收货', '已完成', '已取消']
      }
    }
  },
  computed: {
    lineStyle() {
      return {
        width: 1 / this.items.length * 100 + '%',
        transform: `translate3d(${this.value * 100 + '%'},0,0)`
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs-box {
  position: relative;
}
.tabs-item {
  line-height: 40px;
  text-align: center;
  &.active {
    font-weight: bold;
    color: #da0126;
  }
}
.tabs-line {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  transition: all 0.3s ease-in-out;
  background-color: #da0126;
}
</style>
