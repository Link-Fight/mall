<style lang="scss" scoped>
.app-list-empty {
  justify-content: center;
  .iconfont {
    display: inline-block;
    font-size: 64px;
    margin-bottom: 24px;
  }
}
</style>
<template>
  <section class="app-list-empty xa-cell xa-container">
    <div class="xa-txt-999 xa-txt-center">
      <i class="iconfont icon-tishi"></i>
      <slot>
        <p>没有数据</p>
      </slot>
    </div>
  </section>
</template>
<script>
export default {}
</script>