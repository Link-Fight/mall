<template>
  <div class="form-imgs__wrapper xa-bg-white" :style="{'paddingTop':!label&&!this.max&&'15px'}">
    <div
      v-if="label||this.max"
      :style="{'opacity':this.max||0}"
      style="padding:8px 0"
      class="xa-cell xa-txt-12 xa-txt-999"
    >
      <div class="xa-flex xa-txt-333 xa-txt-14">{{label}}</div>
      {{this.items.length}}/{{this.max}}
    </div>
    <ul class="form-imgs__container xa-cell">
      <template v-for="(img,index) in items">
        <slot :img="img" :i="index" :onpreview="onPreviewClick" :onremove="onRemoveClick">
          <li
            @click.self="onPreviewClick(index)"
            :key="img.thumb_url+index"
            :style="{'backgroundImage':'url('+img.thumb_url+')','width':imgSize,'height':imgSize}"
            class="xa-uploader__file"
          >
            <div
              v-if="!disabled"
              @click.stop="onRemoveClick(index)"
              style="position: absolute;top:-9px;right: -9px;"
            >
              <i class="iconfont icon-guanbi2fill xa-txt-999"></i>
            </div>
          </li>
        </slot>
      </template>
      <li
        v-if="canAdd&&!disabled"
        @click="onAddClick"
        class="xa-uploader__input-box"
        :style="{'width':imgSize,'height':imgSize}"
      ></li>
    </ul>
  </div>
</template>
<script>
import wxAction from '@/controllers/wx.js'
let uploadImgAsync = import(/* webpackChunkName: "uploadImageServer" */'@/controllers/UploadImg.js')
let uploadServer
export default {
  name: 'UploadImgs',
  data() {
    return {
      items: [],
      isLoading: false
    }
  },
  props: {
    label: String,
    value: {
      type: Array,
      default() {
        return []
      }
    },
    max: [Number, String],
    readyOnly: {
      type: Boolean,
      default: false
    },
    sizeType: {
      type: [String, Array]
      // ['original', 'compressed']
    },
    sourceType: {
      type: [String, Array]
      //  ['album', 'camera']
    },
    disabled: {
      type: Boolean,
      default: false
    },
    imgSize: String
  },
  computed: {
    canAdd() {
      if (this.readyOnly === true) {
        return false
      }
      if (this.max !== undefined) {
        let max = parseInt(this.max)
        if (max <= this.items.length) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    showToast(title) {
      this.$appLoading.showLoading(title)
    },
    getServer() {
      if (uploadServer) {
        return Promise.resolve(uploadServer)
      } else {
        return uploadImgAsync.then(({ UploadImg }) => {
          uploadServer = new UploadImg(this.$isWeixin, this.showToast, wxAction, this.$diyAction)
          return uploadServer
        })
      }
    },
    getCfg() {
      let config = {
        count: 9
      }
      if (this.max) {
        config.count = parseInt(this.max) - this.items.length
        if (config.count > 9) {
          config.count = 9
        }
      }
      if (this.sizeType) {
        config.sizeType = this.sizeType instanceof Array ? this.sizeType : [this.sizeType]
      }
      if (this.sourceType) {
        config.sourceType = this.sourceType instanceof Array ? this.sourceType : [this.sourceType]
      }
      return config
    },
    onRemoveClick(index) {
      this.items.splice(index, 1)
      this.updateVaule()
    },
    onPreviewClick(index) {
      wxAction.previewImage(this.items[index].url, this.items.map(item => item.url))
    },
    async onAddClick() {
      let server = await this.getServer()
      try {
        let imagesData = await server.chooseImage(this.getCfg())
        this.isLoading = true
        imagesData.guid.forEach((guid, index) => {
          this.items.push({
            guid,
            thumb_url: imagesData.src[index],
            url: imagesData.src[index]
          })
        })
        this.$appLoading.hiddenLoading()
        this.updateVaule()
      } catch (error) {
        // console.log('error', JSON.stringify(error))
      }
    },
    updateVaule() {
      this.$nextTick(function () {
        this.isLoading = false
        this.$emit('input', this.items.map(item => item.guid))
      })
    }
  },
  async mounted() {
    if (this.value && this.value.length) {
      this.isLoading = true
      let imgs = await wxAction.getImageUrl(this.value)
      this.items = imgs.map(img => {
        this.isLoading = false
        return {
          guid: img.uid,
          thumb_url: img.thumb_url,
          url: img.url
        }
      })
    }
  }
}
</script>
<style scoped>
.xa-uploader__file {
  position: relative;
  box-sizing: border-box;
  margin-right: 16px;
  margin-bottom: 16px;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border: 1px dotted #e4e4e4;
}
.form-imgs__container {
  flex-wrap: wrap;
}
.form-imgs__wrapper {
  padding: 0px 15px 5px 15px;
  min-height: 100px;
  flex-wrap: wrap;
}
.xa-uploader__input-box {
  float: left;
  position: relative;
  margin-right: 9px;
  margin-bottom: 9px;
  width: 77px;
  height: 77px;
  border: 1px solid #d9d9d9;
}
.xa-uploader__input-box:before {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
  width: 2px;
  height: 39.5px;
}
.xa-uploader__input-box:after {
  content: " ";
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: #d9d9d9;
  width: 39.5px;
  height: 2px;
}
@media screen and (min-width: 360px) {
  .xa-uploader__input-box,
  .xa-uploader__file {
    width: 88px;
    height: 88px;
  }
}
@media screen and (min-width: 375px) {
  .xa-uploader__input-box,
  .xa-uploader__file {
    width: 98px;
    height: 98px;
  }
}
</style>
