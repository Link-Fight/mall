<template>
  <router-link class="xa-cell search-bar-box" tag="div" to="/prodList">
    <img src="../assets/logo.png" alt="">
    <div class="xa-flex xa-cell search-bar">
      <i class="iconfont icon-sousuo" style="font-size:18px"></i>&nbsp;&nbsp;<span>搜索</span>
    </div>
  </router-link>
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
img {
  max-height: 20px;
  margin-right: 20px;
}
.search-bar {
  justify-content: center;
  box-sizing: border-box;
  height: 28px;
  text-align: center;
  background-color: #f0f0f0;
  color: #9D9D9D;
  border-radius: 4px;
}
</style>
