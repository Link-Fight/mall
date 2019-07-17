<template>
  <div id="app">
    <keep-alive include="mainRoot,prodList">
      <router-view/>
    </keep-alive>
    <AppAlert ref="alert"/>
    <AppToast ref="toast"/>
    <AppLoading ref="loading"/>
    <AppConfirm ref="confirm"/>
  </div>
</template>
<script>
import AppAlert from '@/components/AppAlert'
import AppToast from '@/components/AppToast'
import AppLoading from '@/components/AppLoading'
import AppConfirm from '@/components/AppConfirm'
import Vue from 'vue'
export default {
  components: {
    AppAlert,
    AppConfirm,
    AppToast,
    AppLoading
  },
  mounted() {
    Vue.prototype.$gotoUrl = function (url) {
      if (url) {
        if (url.indexOf('/') === 0) {
          this.$router.push(url)
        } else {
          window.location.href = url
        }
      }
    }
    Vue.prototype.$appAlert = this.$refs.alert
    Vue.prototype.$appLoading = this.$refs.loading
    Vue.prototype.$appToast = this.$refs.toast
    Vue.prototype.$appConfirm = this.$refs.confirm
    Vue.prototype.$actionWithLoading = function (promiseAction, { loading = '正在加载' } = {}) {
      this.$appLoading.showLoading(loading)
      return promiseAction.then(data => {
        this.$appLoading.hiddenLoading()
        return data
      }).catch(error => {
        this.$appLoading.hiddenLoading()
        this.$appAlert.showAlert(error.message)
        return Promise.reject(error)
      })
    }
    Vue.prototype.$actionWithAlert = function (promiseAction) {
      return promiseAction.catch(error => {
        this.$appAlert.showAlert(error.message)
        return Promise.reject(error)
      })
    }
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
  font-family: "PingFang-SC-Medium", "Avenir", Helvetica, Arial, sans-serif;
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
  box-shadow: 0 0 8px #ccc;
}
@media screen and (min-height: 760px) and (max-width: 414px) {
  .app-fb-tab {
    position: relative;
    margin-bottom: 18px;
  }
  .app-fb-tab::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    height: 18px;
    background-color: #f6f6f9;
  }
}
</style>
