<template>
<transition name="pop-pane-fade">
    <div class="pop-panel__wrapper">
        <div class="xa-mask" @click.stop="$emit('close')" @touchstart="$emit('close')" @touchmove="$emit('close')"></div>
        <template v-if="isShow">
          <transition name="slide-fade">
              <div class="pop-panel__content">
                  <section class="xa-view max-page-width" :style="wrapStyle">
                      <slot name="header"></slot>
                      <section class="xa-container xa-flex" :class="contentClass">
                          <slot>
                              <section></section>
                          </slot>
                      </section>
                      <slot name="footer"></slot>
                  </section>
              </div>
          </transition>
        </template>
    </div>
</transition>
</template>
<script>
export default {
  name: 'PopPanel',
  data() {
    return {
      isShow: false
    }
  },
  props: {
    wrapStyle: Object,
    contentClass: String
  },
  mounted() {
    this.isShow = true
  }
}
</script>
<style lang="scss" scoped>
.max-page-width {
  max-width: 640px;
  margin: 0 auto;
}
.pop-pane-fade-enter,
.pop-pane-fade-leave-active {
  opacity: 0;
}
.pop-pane-fade-leave-active {
  opacity: 0;
  transform: translateY(30%);
}
.pop-pane-fade-enter-active,
.pop-pane-fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.pop-panel__wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  z-index: 1000;
}
.pop-panel__content {
  position: fixed;
  left: 0;
  right: 0px;
  bottom: 0;
  z-index: 1001;
}
</style>
