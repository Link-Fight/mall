<template>
<div class="app-loading xa-view" :class="{'show':show}" @touchmove="touchMove">
  <div class="content xa-view">
    <img src="../assets/loading.svg" alt="">{{message}}
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      show: false,
      message: '正在加载...'
    }
  },
  methods: {
    touchMove(e) {
      let scroller = this.scroller
      let path = e.composedPath && e.composedPath()
      if (path && !path.some(item => item === this.scroller)) {
        e.preventDefault()
        return
      }
      let y = e.touches[0].pageY - this.y   //  >0向下 <0向上
      if ((scroller.scrollTop <= 0 && y >= 0) || (scroller.scrollTop >= scroller.scrollHeight - scroller.clientHeight && y <= 0)) {
        this.y = e.touches[0].pageY
        e.preventDefault()
      }
    },
    showLoading(msg = '正在加载...') {
      this.show = true
      this.message = msg
    },
    hiddenLoading() {
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-loading {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: transform 0.3s;
  transform: scale(0);
  align-items: center;
  justify-content: center;
  font-size: 12px;
  .content {
    width: 100px;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    align-items: center;
    justify-content: center;
    color: #fff;
  }
  img {
    display: block;
    width: 60px;
  }
}
.app-loading.show {
  transform: scale(1);
}
</style>

