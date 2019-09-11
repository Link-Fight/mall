<template>
  <section class="user-page">
    <div class="xa-cell page-header" >
      <div class="xa-txt-24 xa-flex">{{info.name}}</div>
      <div class="xa-img" :style="'backgroundImage:url('+info.avatar_thumb+')'"></div>
    </div>
    <div class="page-content">
      <router-link to="/addressList" tag="div" class="link-item xa-cell">
        <span class="xa-flex">地址信息</span>
        <i class="iconfont icon-wuliu"></i>
      </router-link>
      <router-link to="/billInfoList" tag="div" class="link-item xa-cell">
        <span class="xa-flex">发票抬头</span>
        <i class="iconfont icon-fapiaoguanli"></i>
      </router-link>
      <router-link to="/orderList/0" tag="div" class="link-item xa-cell">
        <span class="xa-flex">我的订单</span>
        <i class="iconfont icon-dingdan"></i>
      </router-link>
      <router-link to="/coupon/index" tag="div" class="link-item xa-cell">
        <span class="xa-flex">我的优惠券</span>
        <i class="iconfont icon-quan"></i>
      </router-link>
      <router-link to="/form/feedback" tag="div" class="link-item xa-cell">
        <span class="xa-flex">意见反馈</span>
        <i class="iconfont icon-kefu"></i>
      </router-link>
      <!-- <router-link to="/billInfoList" tag="div" class="link-item xa-cell">
        <span class="xa-flex">最近浏览</span>
        <i class="iconfont icon-leimu"></i>
      </router-link> -->
    </div>
  </section>
</template>
<script>
import { checkLogin } from '@/controllers/user'
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    this.info = await checkLogin()
  }
}
</script>
<style lang="scss" scoped>
.user-page {
  padding-top: 8px;
  .xa-img {
    width: 45px;
    height: 45px;
    background-size: cover;
    border-radius: 50%;
    // margin-right: 16px;
    box-shadow: 0 0 8px #000;
  }
  .page-header {
    padding: 12px 17px;
    background-color: #ffffff;
  }
  .page-content {
    // margin-top: 8px;
    padding: 0 17px;
    background-color: #ffffff;
  }
  .link-item {
    padding: 24px 0;
    .iconfont {
      font-size: 18px;
      color: #da0126;
      margin-right: 12px;
    }
  }
}
</style>
