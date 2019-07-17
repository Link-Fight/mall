<template>
<div class="order-info xa-bg-white order-status">
  <p class="status-title" v-show="title">{{title}}</p>
  <template v-for="(item,index) in items">
    <div :key="index" class="xa-cell">
      <div class="title">{{item.title}}</div>
      <div v-if="item.content" class="content xa-txt-blue" v-clipboard :data-clipboard-text="item.content">{{item.content}}</div>
      <div class="content xa-flex" :class="{'xa-txt-red':item.red}">{{item.value}}</div>
    </div>
    <div v-if="item.close&&triggerClose" :key="index+'i'" class="open-btn xa-cell" @click="onClose">
      <div><i class="iconfont icon-xiangxia2"></i></div>
    </div>
  </template>
  <div v-if="!triggerClose" class="open-btn xa-cell" @click="onClose">
      <div><i class="iconfont icon-xiangshang2"></i></div>
    </div>
</div>
</template>
<script>
import clipboard from '@/directives/Clipboard'
export default {
  data() {
    return {
      triggerClose: true
    }
  },
  directives: {
    clipboard
  },
  props: {
    title: String,
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    onClose() {
      this.triggerClose = !this.triggerClose
    }
  }
}
</script>
<style lang="scss" scoped>
.order-status {
  padding: 17px 0px;
  line-height: 20px;
  > div {
    line-height: 20px;
  }
  > div + div {
    margin-top: 13px;
    transition: all 0.3s;
  }
  .status-title {
    margin-bottom: 8px;
    font-size: 16px;
    font-weight: bold;
  }
  .title {
    margin-right: 1em;
    color: #6d6d6d;
  }
  .content {
    text-align: right;
  }
  .open-btn {
    justify-content: center;
    margin-top: 0;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #e4e4e4;
    }
  }
  .open-btn ~ div {
    background-color: red;
    line-height: 0;
    overflow: hidden;
    margin: 0;
  }
}
</style>
