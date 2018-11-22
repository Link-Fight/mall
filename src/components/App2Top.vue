<template>
  <div v-show="isShowToTopPoint" @click="animateToTop" class="flex-toTop-icon xa-cell">
    <i class="iconfont icon-dingbu xa-txt-20"></i>
  </div>
</template>
<script>
import startMove from '@/util/startMove'
export default {
  data() {
    return {
      isShowToTopPoint: false
    }
  },
  methods: {
    getCurScrollTop() {
      return document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
    },
    moveTo(target) {
      let targetEl = document.documentElement.scrollTop ? document.documentElement : document.body
      targetEl.scrollTop = target
    },
    animateTo(target) {
      let targetEl = document.documentElement.scrollTop ? document.documentElement : document.body
      startMove(targetEl, { scrollTop: target })()
    },
    animateToTop() {
      this.animateTo(0)
    },
    handleScroll() {
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.isShowToTopPoint = scrollTop / clientHeight > 0.5
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style lang="scss" scoped>
.flex-toTop-icon {
  position: fixed;
  top: 75vh;
  right: 4px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.6;
  color: #fff;
  z-index: 10;
  justify-content: center;
}
</style>
