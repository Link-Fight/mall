<template>
  <div v-show="isShowToTopPoint" @click="moveToTop" class="flex-toTop-icon xa-cell">
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
    moveToTop() {
      let target = document.documentElement || document.body
      startMove(target, { scrollTop: 0 })()
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
  right: 0px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #000;
  opacity: 0.6;
  color: #fff;
  z-index: 10;
  justify-content: center;
}
</style>
