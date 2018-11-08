<template>
<div class="loading-more xa-cell">
  <img src="../assets/loading.svg" alt="">{{text}}
</div>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: '正在加载更多'
    }
  }
}
</script>

<style lang="scss" scoped>
.loading-more {
  justify-content: center;
  font-size: 12px;
  color: 999;
  img {
    width: 30px;
  }
}
</style>

