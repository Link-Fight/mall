<template>
  <section class="order-page">
    <div class="order-info xa-bg-white ">
      <div class="xa-cell goods-container" v-for="goods in orderList" :key="goods.guid">
        <div class="goods-img xa-img" :style="'backgroundImage:url('+goods.img+')'"></div>
        <div class="goods-info xa-flex">
          <p class="title xa-txt-16 xa-txt-bold">{{goods.title}}</p>
          <p class="sku">{{goods.sku}}</p>
          <div class="xa-cell price-box">
            <p class="xa-txt-16 xa-txt-bold xa-txt-red">￥ {{goods.price}}</p>
            <p>x{{goods.count}}</p>
          </div>
        </div>
      </div>
      <selectItem label="配送方式" @click="onSelectDelivery" :value="logisticsSelectedMap[logisticsSelected]" :access="canSelectelogistics"/>
      <router-link v-if="logisticsSelected==0" tag="div" to="/addressList?action=select">
        <div v-if="deliveryAddress" class="address-item xa-cell">
          <div class="xa-flex">
            <div class="xa-cell">{{deliveryAddress.name}}&nbsp;&nbsp; <p class="xa-txt-999">{{deliveryAddress.phone}}</p></div>
            <p>{{deliveryAddress.area_name}}{{deliveryAddress.area_address}}</p>
          </div>
          <i class="iconfont icon-xiangyou1" style="opacity:0.6"></i>
        </div>
        <selectItem v-else label="收货地址"/>
      </router-link>
      <template v-if="logisticsSelected==1">
        <selectItem @click="isShowOrderProtectionSelect=true" label="保障中心" :value="warehouse?warehouse.name:''"/>
      </template>
      <selectItem label="备注信息">
        <input class="memo-input xa-flex" type="text" v-model="memo" placeholder="如有备注信息，请输入"/>
      </selectItem>
    </div>
    <div class="order-info xa-bg-white">
      <selectItem label="发票">
        <div class="weui-cell__ft xa-cell">
            <input :checked="needInvoice" @change="needInvoice=!needInvoice" class="xa-switch" type="checkbox">
        </div>
      </selectItem>
      <router-link v-if="needInvoice" tag="div" to="/bill">
        <selectItem v-if="!billData" label="发票信息"/>
        <selectItem v-else label="发票信息">
          <div class="xa-flex xa-txt-right">
            <p>{{billData.type?'电子发票':'纸质发票'}}</p>
            <p>{{billDataMsg}}</p>
          </div>
          <i class="iconfont icon-xiangyou1" style="opacity:0.6"></i>
        </selectItem>
      </router-link>
      <div class="tip-container" v-html="orderTip.logistics_info"></div>
    </div>
    <OrderNavTab class="app-fb-tab" :total="totalPrice" @buy="onSubmit"/>
    <OrderDelivery v-model="logisticsSelected" v-if="isShowOrderDelivery" @close="isShowOrderDelivery=false"/>
    <OrderProtectionSelect v-model="warehouse" v-if="isShowOrderProtectionSelect" @close="isShowOrderProtectionSelect=false" :query="shopInfo"/>
  </section>
</template>
<script>
import OrderDelivery from '@/components/OrderDelivery'
import OrderNavTab from '@/components/OrderNavTab'
import OrderProtectionSelect from '@/components/OrderProtectionSelect'
import storage from '@/util/storage'
import { getDefaultAddress } from '@/controllers/address'
import { submitOrder } from '@/controllers/order'
import { SESSION_CART_2_ORDER, SESSION_ORDER_ADDRESS_SELECTED, SESSION_BILL_SUBMIT } from '@/storeKey'
const logisticsSelectedMap = {
  0: '物流快递',
  1: '上门自提'
}
let logisticsSelected = -1
let memo = ''
let needInvoice = false
let warehouse = null
export default {
  name: 'order',
  components: {
    OrderNavTab,
    OrderDelivery,
    OrderProtectionSelect,
    selectItem: {
      render(h) {
        let that = this
        return h('div', { 'class': 'select-item xa-cell' }, [
          h('div', { 'class': 'label' }, this.label),
          that.$slots.default || h('div', {
            'class': 'content',
            on: {
              click() {
                that.$emit('click')
              }
            }
          }, [this.value || '请选择', that.access && h('i', { 'class': 'iconfont icon-xiangyou1', style: 'opacity:0.5' })])
        ])
      },
      props: {
        label: String,
        value: String,
        access: {
          type: Boolean,
          default: true
        }
      }
    }
  },
  data() {
    return {
      shopInfo: null, // 商店信息
      billData: null, // 发票信息
      billDataMsg: '', // 发票信息(显示用)
      logisticsSelectedMap,
      isShowOrderDelivery: false, // 选择快递地址
      isShowOrderProtectionSelect: false, // 选择保障中心
      logisticsSelected,
      canSelectelogistics: true, // 能否选择配送方式
      deliveryAddress: null, // 快递地址
      warehouse, // 保障中心
      orderList: [],
      orderTip: {},
      needInvoice, // 是否需要发票
      totalPrice: 0,
      memo // 备注信息
    }
  },
  methods: {
    onSelectDelivery() {
      this.canSelectelogistics && (this.isShowOrderDelivery = true)
    },
    checkInfo() {
      if (this.logisticsSelected === -1) {
        return '请选择配送方式'
      } else if (this.logisticsSelected === 0 && !this.deliveryAddress) {
        return '物流快递的需要选择地址'
      } else if (this.logisticsSelected === 1 && !this.warehouse) {
        return '上门自提的需要选择保障中心'
      } else if (this.needInvoice && !this.billData) {
        return `请选择发票信息`
      }
    },
    async onSubmit() {
      const msg = this.checkInfo()
      if (msg) {
        this.$appToast.showToast(msg)
      } else {
        const carts = this.orderList.map((it) => {
          return { guid: it.guid, update_at: it.update_at }
        })
        const submit = {
          carts,
          memo: this.memo
        }
        if (this.logisticsSelected === 0) {
          submit.address_guid = this.deliveryAddress.guid
        } else if (this.logisticsSelected === 1) {
          submit.protection_guid = this.warehouse.id
        }
        if (this.needInvoice) {
          let billObj = {
            ...this.billData.billInfo,
            address_guid: this.billData.address ? this.billData.address.guid : ''
          }
          submit.bill = billObj
        }
        console.log(submit)
        const result = await this.$actionWithLoading(submitOrder(submit))
        window.location.href = result.pay_page_url
      }
    },
    async initDeliveryAddress() {
      const orderAddress = storage.getStorage(SESSION_ORDER_ADDRESS_SELECTED, 'sessionStorage')
      if (orderAddress) {
        this.deliveryAddress = orderAddress
      } else {
        const asyncAddress = await getDefaultAddress()
        asyncAddress instanceof Object && (this.deliveryAddress = asyncAddress)
      }
    },
    initBillInfo() {
      this.billData = storage.getStorage(SESSION_BILL_SUBMIT, 'sessionStorage')
      if (this.billData && this.billData.billInfo) {
        this.billDataMsg = this.billData.billInfo.header + ' - ' + this.billData.billInfo.taxpayer_no + ''
      }
    }
  },
  async mounted() {
    this.initDeliveryAddress()
    this.initBillInfo()
    const cartData = storage.getStorage(SESSION_CART_2_ORDER, 'sessionStorage')
    if (cartData) {
      this.orderList = cartData.orderList
      this.shopInfo = cartData.shopInfo
      this.orderTip = cartData.orderTip
      this.totalPrice = cartData.orderTip.total_price
    } else {
      this.$router.replace('/main/cart')
    }
    if (this.$route.query.way) {
      const way = parseInt(Array.isArray(this.$route.query.way) ? this.$route.query.way.join('') : this.$route.query.way)
      if (way === 1) {
        this.canSelectelogistics = false
        this.logisticsSelected = 0
      } else if (way === 2) {
        this.canSelectelogistics = false
        this.logisticsSelected = 1
      }
    }
  },
  beforeDestroy() {
    logisticsSelected = this.logisticsSelected
    memo = this.memo
    needInvoice = this.needInvoice
    warehouse = this.warehouse
  }
}
</script>
<style lang="scss" scoped>
.order-page {
  padding-bottom: 94px;
}
.order-info {
  padding: 0 17px;
  & + & {
    margin-top: 10px;
  }
  /deep/ .select-item {
    padding: 17px 0;
    justify-content: space-between;
    line-height: 20px;
    .label {
      padding-right: 0.5em;
      flex-shrink: 0;
    }
  }
  .address-item {
    padding: 17px 0;
  }
  & > div {
    border-bottom: 1px solid #e4e4e4;
    &:last-child {
      border-bottom: none;
    }
  }
}
.goods-container {
  padding: 20px 0;
  .goods-img {
    width: 80px;
    height: 80px;
    margin-right: 11px;
  }
  .goods-info {
    .title {
      min-height: 42px;
    }
    .sku {
      color: #6d6d6d;
      font-size: 12px;
      min-height: 17px;
    }
    .price-box {
      padding-right: 17px;
      justify-content: space-between;
    }
  }
}
.tip-container {
  font-size: 12px;
  color: #6d6d6d;
  padding: 16px 0;
}
</style>
