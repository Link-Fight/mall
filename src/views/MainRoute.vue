<template>
<section class="main-page">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <AppNavTab class="main-nav max-container"/>
</section>
</template>
<script>
import AppNavTab from '@/components/AppNavTab'
export default {
  name: 'mainRoot',
  components: {
    AppNavTab
  }
}
</script>
<style lang="scss" scoped>
.main-page {
  position: relative;
}
.main-nav {
  position: fixed;
  z-index: 1;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e5e5e5;
}
</style>
