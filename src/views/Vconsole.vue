<template>
<section class="xa-view">
    <div class="xa-flex">
      <div class="xa-flex">
        <textarea v-model="url" placeholder="输入地址" rows="3"/>
      </div>
      <div>{{userAgent}}</div>
    </div>
    <router-link class="btn" :to="url">跳转</router-link>
</section>
</template>
<script>
let VConsole = require('vconsole/dist/vconsole.min.js')
// eslint-disable-next-line
let vc = new VConsole()
export default {
  data() {
    return {
      url: this.$route.query.url || '/',
      userAgent: navigator.userAgent
    }
  }
}
</script>
<style lang="scss" scoped>
section.xa-view {
  height: 100vh;
}
textarea {
  width: 100%;
  padding: 8px;
}
.btn {
  line-height: 44px;
  background-color: green;
  color: #fff;
  text-align: center;
}
</style>

