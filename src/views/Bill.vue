<template>
<section class="bill-page">
  <div><p v-show="needBill" class="bill-head xa-txt-red" @click="isNoticeShow=true">发票须知</p></div>
  <div class="bill-content">
    <div class="bill-cell">
      <h2 class="title">发票类型</h2>
      <div class="xa-cell">
          <div class="xa-cell xa-flex" :class="{'action-disable':!invoicePaper}" @click="changeBillType(0)">
              <i :class="[billType==0?'icon-yuanxingxuanzhong xa-txt-red':'icon-yuanxingweixuanzhong']" class="xa-txt-22 iconfont"></i>
              <div style="text-indent:10px" class="xa-txt-12">纸质</div>
          </div>
          <div class="xa-cell xa-flex" :class="{'action-disable':!invoiceElectronic}"  @click="changeBillType(1)">
              <i :class="[billType==1?'icon-yuanxingxuanzhong xa-txt-red':'icon-yuanxingweixuanzhong']" class="xa-txt-22 iconfont"></i>
              <div style="text-indent:10px" class="xa-txt-12">电子 (暂不支持专票)</div>
          </div>
      </div>
    </div>
    <div class="bill-cell">
      <h2 class="title">发票信息</h2>
      <div class="xa-cell" @click="gotoSelectBillInfo">
          <BillInfoItem v-if="billInfo.guid" :config="billInfo"/>
          <template v-else>
            <div class="xa-flex xa-txt-999">请添加发票或选择发票信息</div><i style="opacity:0.5" class="iconfont icon-xiangyou1"></i>
          </template>
      </div>
    </div>
    <div class="bill-cell">
      <h2 class="title" v-if="billType==0">发票寄送地址</h2>
      <div v-if="billType==0">
          <div class="xa-cell" @click="gotoSelectAddress">
              <div v-if="address.name" class="weui-cell__bd">
                  <p class="address-person xa-txt-14">
                      <span v-html='address.name'></span>
                      <span>{{address.phone}}</span>
                  </p>
                  <p class="address-where xa-txt-12">{{address.area_name}}{{address.area_address}}</p>
              </div>
              <template v-else>
                <div class="xa-flex xa-txt-999">请选择地址</div><i style="opacity:0.5" class="iconfont icon-xiangyou1"></i>
              </template>
          </div>
      </div>
      <div style="padding-top:17px;" class="xa-txt-10 xa-txt-gray">
          <p> 公司发票<span class="xa-txt-red">抬头请务必准确填写</span>，一旦确认提交，不能修改</p>
          <p> 发票将于<span class="xa-txt-red">20个工作日</span>内开具。</p>
      </div>
    </div>
  </div>
  <div @click="submitFn" class="bill-submit xa-bg-red xa-txt-white xa-txt-18">确定</div>
  <notice v-model="isNoticeShow"/>
</section>
</template>
<script>
import notice from '@/components/notice/bill'
import BillInfoItem from '@/components/BillInfoItem.vue'
export default {
  components: {
    BillInfoItem,
    notice
  },
  data() {
    return {
      invoiceElectronic: true, // 电子发票
      invoicePaper: true, // 纸质发票
      needBill: true,  // 是否需要发票
      billType: 0,  // 个人/公司 发票  电子
      isNoticeShow: false,  // 是否显示须知
      isWatchNoticeShow: false,  // 记录须知是否自动提示过
      address: {}, // 地址信息
      billInfo: {} // 发票信息
    }
  },
  watch: {
    needBill(val) {
      if (val === true && this.isWatchNoticeShow === false) {
        this.isNoticeShow = true
        this.isWatchNoticeShow = true
      }
    }
  },
  methods: {
    setBillMsg() { },
    changeBillType(type) {
      if (this.onlyEinvoice && type === 0) {
        return
      }
      this.billType = type
    },
    gotoSelectAddress() {
      this.setBillMsg({
        needBill: this.needBill,
        type: this.billType
      })
      this.$router.push({ path: '/address', query: { action: 'billselect', guid: this.address.guid } })
    },
    gotoSelectBillInfo() {
      this.setBillMsg({
        needBill: this.needBill,
        type: this.billType
      })
      this.$router.push({ path: '/form/billInfoList', query: { action: 'select', guid: this.billInfo.guid } })
    },
    submitFn() {
      if (this.needBill === true && !this.billInfo.guid) {
        this.$appAlert.showAlert('请添加或选择发票信息')
      } else {
        this.setBillMsg({
          needBill: this.needBill,
          type: this.billType
        })
        this.$router.go(-1)
      }
    }
  },
  mounted() {
    if (this.$route.query.invoice) {
      let invoice = Array.isArray(this.$route.query.invoice) ? this.$route.query.invoice.join('') : this.$route.query.invoice
      this.invoiceElectronic = this.invoicePaper = false
      if (invoice.indexOf('1') > -1) {
        this.invoicePaper = true
      }
      if (invoice.indexOf('2') > -1) {
        this.invoiceElectronic = true
      }
    }
    if (!this.invoicePaper && this.invoiceElectronic) {
      this.billType = 1
    }
    if (this.invoicePaper && !this.invoiceElectronic) {
      this.billType = 0
    }
  }
}
</script>
<style lang="scss" scoped>
.bill-head {
  line-height: 36px;
  background: #fff;
  text-align: center;
  border-bottom: 1px solid #e4e4e4;
  box-shadow: 0 0 8px #ccc;
}
.bill-content {
  .title {
    font-size: 16px;
    font-weight: bold;
    line-height: 44px;
  }
  .bill-cell {
    padding: 0 17px 17px;
    margin: 10px 0;
    background-color: #fff;
  }
}
.bill-submit {
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 640px;
  text-align: center;
  line-height: 47px;
}
.action-disable {
  color: #d6d6d6;
  pointer-events: none;
}
</style>
