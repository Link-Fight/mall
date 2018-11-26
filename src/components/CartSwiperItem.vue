<template>
<div class="xa-cell swpier-container" :id="id">
  <div class="swiper-slide content">
    <slot></slot>
  </div>
  <div class="swiper-slide menu" @click="$emit('delete')">删除</div>
</div>
</template>
<script>
import Swiper from 'swiper'
export default {
  data() {
    return {
      id: 'swpier_' + parseInt(Math.random() * 10000)
    }
  },
  mounted() {
    new Swiper(this.id, {
      slidesPerView: 1,
      initialSlide: 0,
      resistanceRatio: 0,
      slideToClickedSlide: true
    })
  }
}
</script>
<style lang="scss" scoped>
.swpier-container {
  width: 100%;
  overflow: auto;
  align-items: stretch;
  background-color: #da0126;
}
.menu {
  width: 80px;
  background-color: #da0126;
  color: #fff;
  text-align: center;
  font-size: 18px;
  align-self: center;
}
.content {
  background: #fff;
  min-width: 100px;
  width: 100%;
}
</style>
