<template>
    <section class="bill-page" v-show="!isLoading">
        <p v-if="record.invoice_type==1" @click="noticeIsShow=true" style="line-height:44px;text-align:center;background:#fff;" class="xa-txt-red">一般纳税人资质证明示例</p>
        <FormTitle>发票基本信息(必填)</FormTitle>
        <FormCells>
            <FormCell label="发票抬头">
                <input class="weui-input" v-model="record.header" placeholder="必须填写发票抬头">
            </FormCell>
            <FormCell label="税号">
                <input class="weui-input" v-model="record.taxpayer_no" placeholder="必须填写税号(15位以上)">
            </FormCell>
            <FormCell style="padding-top:4px;padding-bottom:4px;" v-if="record.taxpayer_no&&record.taxpayer_no.length<15" class="xa-bg-base">
                <div class="xa-tip xa-txt-12">
                    <span style="color: red;">请输入15位以上的税号 当前长度:{{record.taxpayer_no.length}}</span>
                </div>
            </FormCell>
        </FormCells>
        <div>
            <div class="weui-cells__title xa-cell" style="margin-top:4px;">
                <span class="xa-flex">{{record.invoice_type == 0?'更多信息':'专票信息(开设专票必填)'}}</span>
                <i v-if="record.invoice_type == 0" @click="needMore=!needMore" class="iconfont" :class="!needMore?'icon-xiangxia2':'icon-xiangshang2'"></i>
            </div>
            <template v-if="needMore">
                <FormCells>
                    <FormCell label="银行名称"><input class="weui-input" v-model="record.bank_name" placeholder="请填写银行名称"></FormCell>
                    <FormCell label="银行账号"><input class="weui-input" v-model="record.bank_account" placeholder="请填写银行账号"></FormCell>
                    <FormCell label="公司联系方式"><input class="weui-input" v-model="record.company_phone" placeholder="请填写公司联系方式"></FormCell>
                </FormCells>
                <FormTitle>公司地址</FormTitle>
                <FormCells>
                    <div class="weui-cell"><div class="weui-cell__bd"><textarea class="weui-textarea" placeholder="请填写公司地址" v-model="record.company_address" rows="3"></textarea></div></div>
                </FormCells>
            </template>
            <template v-if="record.invoice_type==1">
                <FormTitle>一般纳税人资质证明（非营业执照）</FormTitle>
                <FormCells>
                    <UploadImgs v-model="record.st_img"/>
                </FormCells>
            </template>
        </div>
        <label for="weuiAgree" class="weui-agree">
            <input id="weuiAgree" type="checkbox" v-model="record.default" class="weui-agree__checkbox">
            <span class="weui-agree__text">设置为默认</span>
        </label>
        <FormCells>
            <FormCell class="xa-bg-base">
                <div class="xa-tip xa-txt-12">
                    <span>应国家税务总局要求，自2017年7月1曰 起，您若开具增值税普通发票，
                    <span style="color: red;">须同时提供企业抬头及税号，</span>否则发票将无法用于企业报销。</span>
                </div>
            </FormCell>
        </FormCells>
        <div @click="submitFn" :class="{'weui-btn_disabled':checkStatus}" class="submit-btn xa-bg-red xa-txt-white">提交</div>
        <notice v-model="noticeIsShow" title="一般纳税人资质证明示例">
            <div>
                <img style="width: 100%;margin-bottom:8px;" src="http://agri-pub.static.xag.cn//image/v3/yibannashuiren-1.png" @click="previewImage">
                <img style="width: 100%;" src="http://agri-pub.static.xag.cn//image/v3/yibannashuiren-2.png" @click="previewImage">
            </div>
        </notice>
    </section>
</template>
<script>
import wxAction from '@/controllers/wx.js'
import { saveBillInfo, getBillInfoList } from '@/controllers/bill.js'
import UploadImgs from '@/components/UploadImgs.vue'
import FormTitle from '@/components/FormTitle.vue'
import FormCell from '@/components/FormCell.vue'
import FormCells from '@/components/FormCells.vue'
import notice from '@/components/notice/notice'
export default {
  name: 'formBillinfo',
  components: {
    FormTitle,
    FormCell,
    FormCells,
    notice,
    UploadImgs
  },
  data() {
    return {
      noticeIsShow: false,
      isLoading: false,
      oldRecord: '',
      needMore: true,
      record: {
        invoice_type: 0,
        guid: '',
        header: '',
        taxpayer_no: '',
        bank_name: '',
        bank_account: '',
        company_phone: '',
        company_address: '',
        default: false,
        st_img: []
      }
    }
  },
  computed: {
    /**
     * 检查表单是否有改变 ture:没有 false:有
     */
    checkStatus() {
      if (this.record.header.length < 4) {
        return true
      }
      if (this.record.taxpayer_no.length < 15) {
        return true
      }
      return this.oldRecord === JSON.stringify(this.record)
    }
  },
  methods: {
    previewImage(imgEl) {
      wxAction.previewImage(imgEl.target.src, [])
    },
    submitFn() {
      if (this.checkStatus === false) {
        let parmas = Object.assign({}, this.record)
        if (parseInt(this.record.invoice_type) === 0) {
          delete parmas.st_img
        } else if (parmas.st_img.length === 0) {
          this.$appAlert.showAlert('开设专票需要提交资质证明！')
          return
        }
        this.$appLoading.showLoading('正在提交')
        saveBillInfo(parmas).then(() => {
          this.$appLoading.hiddenLoading()
          this.$router.go(-1)
        }).catch(error => {
          this.$appLoading.hiddenLoading()
          this.$appAlert.showAlert(error.message)
        })
      } else {
        if (this.oldRecord !== JSON.stringify(this.record)) {
          this.$appAlert.showAlert('请完善发票抬头/税号信息')
        }
      }
    }
  },
  mounted() {
    this.oldRecord = JSON.stringify(this.record)
    this.record.invoice_type = this.$route.query.type
    if (this.$route.query.guid) {
      this.isLoading = true
      this.$actionWithLoading(getBillInfoList(this.$route.query.guid))
        .then(data => {
          if (data && data.length) {
            Object.assign(this.record, data[0])
            if (this.$route.query.type !== undefined) {
              this.record.invoice_type = this.$route.query.type
            } else {
              this.oldRecord = JSON.stringify(this.record)
            }
          }
          this.isLoading = false
        })
    }
  }
}
</script>
<style scoped>
.bill-page {
  overflow: auto;
  padding-bottom: 10px;
}
.weui-label,
.weui-input,
.weui-textarea {
  font-size: 14px;
}

.weui-label {
  max-width: 7.5em;
}
.submit-btn {
  line-height: 46px;
  text-align: center;
  margin: 16px 17px 0;
}
.submit-btn.disabled {
  opacity: 0.3;
}
</style>
