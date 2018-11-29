<template>
  <section class="feedback-page">
    <div class="page-content">
      <div class="xa-txt-center">
        <img style="max-width:120px;margin:8px auto;" src="../../assets/logo.png" alt>
      </div>
      <div class="title">问题类型</div>
      <div class="item-wrap xa-cell">
        <div
          v-for="(item,index) in types"
          class="item"
          :class="{'xa-txt-red':type===index}"
          :key="item"
          @click="type=index"
        >{{item}}</div>
      </div>
      <div class="title">反馈问题</div>
      <div class="item-wrap">
        <textarea class="xa-textarea" v-model="content" placeholder="反馈内容" rows="4"></textarea>
        <UploadImgs v-model="pics"/>
      </div>
      <div class="title">联系电话</div>
      <div class="item-wrap">
        <input class="xa-input" type="tel" v-model="mobile" placeholder="输入联系电话">
      </div>
    </div>
    <div class="xa-btn xa-bg-red" @click="submit">提交</div>
  </section>
</template>
<script>
import { addFeekBack } from '@/controllers/user'
import wxAction from '@/controllers/wx.js'
import UploadImgs from '@/components/UploadImgs.vue'
export default {
  name: 'feedback',
  components: {
    UploadImgs
  },
  data() {
    return {
      types: ['功能异常', '体验问题', '新功能建议', '其他'],
      type: '',
      content: '',
      pics: [],
      mobile: '',
      lat: '',
      lng: ''
    }
  },
  methods: {
    async submit() {
      if (!this.content) {
        this.$appToast.showToast('请输入问题内容！')
      } else {
        await this.$actionWithLoading(addFeekBack(this.$data))
        this.$appToast.showToast('提交成功！')
        this.$router.go(-1)
      }
    }
  },
  async created() {
    await wxAction.config()
    wxAction.getLocation({
      success: (res) => {
        this.lat = res.lat
        this.lng = res.lng
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.feedback-page {
  box-sizing: border-box;
  padding: 16px;
  /deep/ .form-imgs__wrapper {
    padding: 0;
  }
  .title {
    padding: 8px 0;
    color: #999;
  }
  .item-wrap {
    color: #666;
    background-color: #fff;
    border-radius: 4px;
    padding: 8px 4px;
  }
  .item {
    border: 1px solid;
    padding: 4px 8px;
    font-size: 12px;
  }
  .item + .item {
    margin-left: 16px;
  }
  .xa-btn{
    margin-top: 44px;
  }
  .page-content {
    min-height: calc(100vh - 122px);
  }
}
</style>
