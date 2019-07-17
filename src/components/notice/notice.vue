<template>
<section v-if="value" class="xa-mask" @touchmove="touchMove">
    <div @click="$emit('input', false)"></div>
    <div class="xa-dialog">
        <slot name="header">
            <header>
                <p style="line-height:42px;font-weight:bold" class="xa-txt-16">{{title}}</p>
            </header>
        </slot>
        <div style="padding:0 10px;">
            <slot>
            </slot>
        </div>
        <div @click="$emit('input', false)">
            <slot name="footer">
                <footer>
                <p style="line-height:36px;border-top: 1px solid #ccc;" class="xa-txt-red xa-txt-12">{{foot}}</p>
                </footer>
            </slot>
        </div>
    </div>
</section>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      default: '须知'
    },
    foot: {
      default: '我知道了'
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
    }
  }
}
</script>