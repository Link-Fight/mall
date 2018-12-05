<template>
  <section class="main-page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <MainNavTab v-show="isShowFb" class="app-fb-tab"/>
  </section>
</template>
<script>
import MainNavTab from '@/components/MainNavTab'
export default {
  name: 'mainRoot',
  data() {
    return {
      isShowFb: true
    }
  },
  components: {
    MainNavTab
  },
  watch: {
    '$route'(route) {
      this.isShowFb = route.name !== 'cart'
    }
  },
  beforeMount() {
    this.isShowFb = this.$route.name !== 'cart'
  }
}
</script>
<style lang="scss" scoped>
.main-page {
  position: relative;
}
</style>
