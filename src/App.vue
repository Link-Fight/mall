<template>
  <div id="app">
    <router-view/>
    <AppAlert ref="alert"/>
    <AppToast ref="toast"/>
    <AppLoading ref="loading"/>
  </div>
</template>
<script>
import AppAlert from '@/components/AppAlert'
import AppToast from '@/components/AppToast'
import AppLoading from '@/components/AppLoading'
import Vue from 'vue'
export default {
  components: {
    AppAlert,
    AppToast,
    AppLoading
  },
  mounted() {
    Vue.prototype.$alert = this.$refs.alert
    Vue.prototype.$appLoading = this.$refs.loading
    Vue.prototype.$appToast = this.$refs.toast
  }
}
</script>

<style>
body {
  background-color: black;
}
#app {
  position: relative;
  min-height: 100vh;
  max-width: 640px;
  margin: 0 auto;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #1d1d1d;
  background-color: #f6f6f9;
}
.app-fb-tab,
.max-container {
  max-width: 640px;
}
#app .app-fb-tab {
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e5e5e5;
}
</style>
