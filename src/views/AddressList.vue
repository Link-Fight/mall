<template>
<div class="addresslist-page">
    <div class="xa-cell page-head">
        <div class="xa-flex xa-txt-12" v-html='tip'></div>
        <div v-if="addressList.length<10" class="xa-cell__ft" @click="clickFn('addNew')" style="padding:0 10px;color: rgb(55, 167, 236);">
            <i class="iconfont icon-jiahao1" style="font-size:20px;font-weight:bold;"></i>
        </div>
    </div>
     <div>
        <div class="prod-list">
            <template v-for='address in addressList'>
                <AddressItem @click="clickFn" :key='address.guid' :guid='address.guid' :config='address' :selectable='selectable' :selectState='address.guid==selectGuid'></AddressItem>
            </template>
        </div>
        <template v-if='addressList.length==0&&isLoadingState==false'>
            <div class="xa-view page-empty">
                <i style="font-size:80px;margin-bottom:36px;" class="iconfont icon-zanwujilu"></i>
                <div>请点击 + 号添加记录</div>
            </div>
        </template>
    </div>
</div>
</template>
<script>
/* eslint-disable */
// 地址列表页面
// 基本地址 /#/address (可以CRUD)
// 选择功能的地址 /address?action=select/billselect(有选择按钮) 在基本功能上 当选择一个后将自动返回上一个页面history.go(-1) 分别用于配送货品的地址选择/配送发票的地址选择
// mounted: 每次页面加载都去后台拿一次列表数据
// vuex: defaultAddress  拿来当默认勾选  并且刚刚好删除到的时候要去清除它
import storage from '@/util/storage'
import { getAddressList, getAddressDetail, deleteAddress } from '@/controllers/address.js'
import AddressItem from '@/components/AddressInfoItem'
import { SESSION_BILL_ADDRESS_SELECTED, SESSION_ORDER_ADDRESS_SELECTED } from '@/storeKey'
const ACTIONS = {
  'select': 'setOrderAddress', //配送货品的地址选择
  'billselect': 'setBillAddress' //配送发票的地址选择
}
let dataList = []
export default {
  name: 'addressIndex',
  components: { AddressItem },
  data() {
    return {
      pageAction: this.$route.query.action,
      isLoadingState: true,
      addressList: [],
      deleteGuid: '',
      selectGuid: this.$route.query.guid
    }
  },
  computed: {
    selectable() {
      return this.pageAction === 'select' || this.pageAction === 'billselect';
    },
    tip() {
      if (this.addressList.length >= 10) {
        return '<span style="color:rgb(255, 87, 34)">只能有10个收货地址记录</span>'
      }
      if (this.pageAction === "select" || this.pageAction === 'billselect') {
        return '<span>选择或管理您的地址</span>';
      } else {
        return '<span>管理您的收货地址</span>';
      }
    }
  },
  methods: {
    setOrderAddress(info) {
      storage.setStorage(SESSION_ORDER_ADDRESS_SELECTED, info, 'sessionStorage')
    },
    setBillAddress(info) {
      storage.setStorage(SESSION_BILL_ADDRESS_SELECTED, info, 'sessionStorage')
    },
    clickFn(action, guid) {
      if (action === 'delete') {
        this.deleteGuid = guid
        this.$appConfirm.showConfirm('确定要删除该地址信息？').then(this.onDelete)
      } else if (action === 'select') {
        this.selectGuid = guid
        if (this[ACTIONS[this.pageAction]]) {
          this[ACTIONS[this.pageAction]](this.addressList.find(item => item.guid === guid))
          this.$router.go(-1)
        }
      } else if (action === 'addNew') {
        this.$router.push({ path: '/form/address' })
      }
    },
    onDelete() {
      if (this.deleteGuid) {
        deleteAddress({
          guid: this.deleteGuid
        }).then(data => {
          var _index = -1
          this.addressList.filter((item, index) => {
            if (item.guid === this.deleteGuid) {
              _index = index
            }
          })
          this.addressList.splice(_index, 1)
        })
      }
    }
  },
  mounted() {
    this.isLoadingState = true
    this.addressList = dataList || []
    this.$actionWithLoading(getAddressList())
      .then(data => {
        dataList = this.addressList = data
        this.isLoadingState = false
        if (this.selectGuid === '') {
          for (var i = 0; i < data.length; i++) {
            if (data[i].default === true) {
              this.selectGuid = data[i].guid
            }
          }
        }
      })
  }
}
</script>
<style lang="scss" scoped>
.addresslist-page {
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
}
.address-wrap .xa-cells-box {
  margin-top: 0;
}

.address-wrap .address-icon {
  margin-right: 8px;
}
</style>
