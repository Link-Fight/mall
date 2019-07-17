<template>
  <section class="billinfolist-page">
    <div class="xa-cell page-head">
      <div class="xa-flex xa-txt-12" v-html="tip"></div>
      <div
        v-if="dataList.length<10"
        class="xa-txt-blue"
        @click="clickFn('addNew')"
        style="padding:0 10px;"
      >
        <i class="iconfont icon-jiahao1" style="font-size:20px;font-weight:bold;"></i>
      </div>
    </div>
    <section>
      <div class="prod-list">
        <template v-for="dataItem in dataList">
          <editItem
            @click="clickFn"
            :key="dataItem.guid"
            :guid="dataItem.guid"
            :config="dataItem"
            editPath="/form/billInfo?"
            :selectable="selectable&&dataItem.enable==1"
            :selectState="dataItem.guid==selectGuid"
          >
            <billInfo :config="dataItem"/>
          </editItem>
        </template>
      </div>
      <template v-if="dataList.length==0&&isLoadingState==false">
        <section class="xa-view page-empty">
          <i style="font-size:80px;margin-bottom:36px;" class="iconfont icon-zanwujilu"></i>
          <div>请点击 + 号添加记录</div>
        </section>
      </template>
    </section>
    <div
      v-show="actionsheet.isShow"
      class="xa-mask xa-cell page-mask"
      @click="actionsheet.isShow=false"
    >
      <div class="btn-wrap">
        <p class="title">请选择发票信息类型</p>
        <button
          class="xa-btn xa-bg-green"
          style="background-color:#42bd56"
          @click="handlerAddInfo(0)"
        >普通发票</button>
        <button class="xa-btn xa-bg-red" @click="handlerAddInfo(1)">增值税专用发票</button>
      </div>
    </div>
    <billInfoNotice v-model="noticeIsShow"/>
  </section>
</template>
<script>
import storage from '@/util/storage'
import editItem from '@/components/BillEditInfoItem.vue'
import billInfo from '@/components/BillInfoItem.vue'
import billInfoNotice from '@/components/notice/billInfo.vue'
import { getBillInfoList, deleteBillInfo } from '@/controllers/bill'
import { SESSION_BILLINFO_SELECTED } from '@/storeKey'
let needNoticeShow = false
export default {
  name: 'billInfoList',
  components: { billInfoNotice, editItem, billInfo },
  data() {
    return {
      noticeIsShow: needNoticeShow,
      pageAction: this.$route.query.action,
      isLoadingState: true,
      actionsheet: {
        isShow: false
      },
      selectGuid: this.$route.query.guid,
      addState: true,
      dataList: []
    }
  },
  computed: {
    selectable() {
      return this.pageAction === 'select'
    },
    tip() {
      if (this.dataList.length >= 10) {
        return '<span style="color:rgb(255, 87, 34)">只能有10个发票信息记录</span>'
      }
      if (this.pageAction === 'select') {
        return '<span>选择或管理您的发票信息</span>'
      } else {
        return '<span>管理您的发票信息</span>'
      }
    }
  },
  methods: {
    setSelectedBillIno(info) {
      storage.setStorage(SESSION_BILLINFO_SELECTED, info, 'sessionStorage')
    },
    clickFn(action, guid) {
      if (action === 'delete') {
        this.$appConfirm.showConfirm('确定要删除该发票抬头？').then(async () => {
          await this.$actionWithLoading(deleteBillInfo(guid), { loading: '正在提交' })
          this.$appToast.showToast('删除成功')
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].guid === guid) {
              this.dataList.splice(i, 1)
              return
            }
          }
        })
      } else if (action === 'select') {
        this.selectGuid = guid
        if (this.pageAction === 'select') {
          let billInfo = this.dataList.find(data => data.guid === guid)
          if (parseInt(billInfo.enable) === 1) {
            this.setSelectedBillIno(billInfo)
            this.$router.go(-1)
          }
        }
      } else if (action === 'addNew') {
        this.actionsheet.isShow = true
      }
    },
    handlerAddInfo(type) {
      this.actionsheet.isShow = false
      this.$router.push({ path: `/form/billInfo?type=${type}` })
    }
  },
  mounted() {
    this.isLoadingState = true
    this.$actionWithLoading(getBillInfoList())
      .then(data => {
        this.dataList = data
        this.isLoadingState = false
      })
  },
  destroyed() {
    needNoticeShow = false
  }
}
</script>
<style lang="scss" scoped>
.billinfolist-page {
  padding-top: 44px;
  padding-bottom: 10px;
  .page-head {
    position: fixed;
    top: 0;
    width: 100%;
    max-width: 640px;
    height: 44px;
    padding: 5px 0px 5px 10px;
    background: #f0f1f2;
    z-index: 1;
  }
  .page-empty {
    height: 70vh;
    justify-content: center;
    align-items: center;
  }
  .page-mask {
    justify-content: center;
    .title {
      font-size: 16px;
      text-align: center;
      padding-bottom: 16px;
    }
    .btn-wrap {
      padding: 16px;
      background-color: #fff;
      border-radius: 5px;
      width: 80vw;
      max-width: 320px;
    }
  }
  .xa-btn + .xa-btn {
    margin-top: 16px;
  }
}
</style>
