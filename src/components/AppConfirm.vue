<template>
<div class="app-confirm xa-view" v-show="show"  @touchmove="touchMove">
  <div class="content" :class="{'show':show}">
   <div class="txt">{{message}}</div>
   <div class="xa-cell btn">
     <div class="xa-flex" @click="hiddenConfirm('cancel')">取消</div>
     <div class="xa-flex" @click="hiddenConfirm('ok')">确定</div>
   </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      resolve: null,
      reject: null
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
    showConfirm(msg = '') {
      this.show = true
      this.message = msg
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },
    hiddenConfirm(action) {
      this.show = false
      if (action === 'ok')
        this.resolve()
      else
        this.reject()
    }
  }
}
</script>

<style lang="scss" scoped>
.app-confirm {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  .content {
    text-align: center;
    width: 80vw;
    min-width: 280px;
    max-width: 300px;
    border-radius: 5px;
    background-color: #fff;
    transition: transform 0.3s;
    transform: scale(0);
    &.show {
      transform: scale(1);
    }
    .txt {
      color: #999;
      padding: 24px 8px;
      border-bottom: 1px solid #e4e4e4;
    }
    .btn {
      line-height: 48px;
      font-size: 18px;
    }
  }
}
</style>

