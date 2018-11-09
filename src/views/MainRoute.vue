<template>
<section class="main-page">
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
  <MainNavTab class="app-fb-tab"/>
</section>
</template>
<script>
import MainNavTab from '@/components/MainNavTab'
export default {
  name: 'mainRoot',
  components: {
    MainNavTab
  }
}
</script>
<style lang="scss" scoped>
.main-page {
  position: relative;
}
</style>
