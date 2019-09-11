<template>
  <section class="order-page">
    <div class="order-info xa-bg-white">
      <ShopInfo v-if="shopInfo" :config="shopInfo" />
      <OrderGoods :items="orderList" />
      <selectItem
        label="配送方式"
        @click="onSelectDelivery"
        :value="logisticsSelectedMap[logisticsSelected]"
        :access="canSelectelogistics"
      />
      <router-link v-if="logisticsSelected==0" tag="div" to="/addressList?action=select">
        <div v-if="deliveryAddress" class="address-item xa-cell">
          <div class="xa-flex">
            <div class="xa-cell">
              {{deliveryAddress.name}}&nbsp;&nbsp;
              <p class="xa-txt-999">{{deliveryAddress.phone}}</p>
            </div>
            <p>{{deliveryAddress.area_name}}{{deliveryAddress.area_address}}</p>
          </div>
          <i class="iconfont icon-xiangyou1" style="opacity:0.6"></i>
        </div>
        <selectItem v-else label="收货地址" />
      </router-link>
      <template v-if="logisticsSelected==1">
        <selectItem
          @click="isShowOrderProtectionSelect=true"
          label="保障中心"
          :value="warehouse?warehouse.name:''"
        />
      </template>
      <selectItem label="备注信息">
        <input class="memo-input xa-flex" type="text" v-model="memo" placeholder="如有备注信息，请输入" />
      </selectItem>
    </div>
    <div class="order-info xa-bg-white">
      <selectItem label="发票">
        <div class="xa-cell-box__ft xa-cell">
          <input
            :checked="needInvoice"
            @change="needInvoice=!needInvoice"
            class="xa-switch"
            type="checkbox"
          />
        </div>
      </selectItem>
      <router-link v-if="needInvoice" tag="div" :to="'/bill?invoice='+$route.query.invoice">
        <selectItem v-if="!billData" label="发票信息" />
        <selectItem v-else label="发票信息">
          <div class="xa-flex xa-txt-right">
            <p>{{billData&&billData.billInfo.type?'电子发票':'纸质发票'}}</p>
            <p>{{billDataMsg}}</p>
          </div>
          <i class="iconfont icon-xiangyou1" style="opacity:0.6"></i>
        </selectItem>
      </router-link>
      <selectItem v-if="canSelectCoupon" label="优惠券" @click="onSelectCoupon">
        <template slot="value">
          <span :class="{'xa-txt-red':coupon_price>0}">{{coupon_price?'优惠￥'+coupon_price:'请选择'}}</span>
        </template>
      </selectItem>
      <div class="tip-container" v-html="orderTip.logistics_info"></div>
    </div>
    <OrderNavTab class="app-fb-tab" :total="totalPrice" @buy="onSubmit" />
    <OrderDelivery
      v-model="logisticsSelected"
      v-if="isShowOrderDelivery"
      @close="isShowOrderDelivery=false"
    />
    <OrderProtectionSelect
      v-model="warehouse"
      v-if="isShowOrderProtectionSelect"
      @close="isShowOrderProtectionSelect=false"
      :query="shopInfo"
    />
    <AppPopPanel v-if="isShowCoupon" @close="isShowCoupon=false">
      <section style="height:80vh">
        <CouponSelect :controller="couponSelectController" />
      </section>
    </AppPopPanel>
  </section>
</template>
<script>
import AppPopPanel from '@/components/AppPopPanel'
import OrderDelivery from '@/components/OrderDelivery'
import CouponSelect from '@/views/coupon/select'
import OrderNavTab from '@/components/OrderNavTab'
import OrderGoods from '@/components/OrderGoods'
import ShopInfo from '@/components/ShopInfo'
import selectItem from '@/components/AppCell'
import OrderProtectionSelect from '@/components/OrderProtectionSelect'
import storage from '@/util/storage'
import { getDefaultAddressFormStorageOrNetwork } from '@/controllers/address'
import { submitOrder, submitQuickOrder } from '@/controllers/order'
import {
  getProductCoupon,
  getCurProductCanUse,
  getCurProductNoUse,
  getCouponDesc,
  updateProductByCoupon
} from '@/controllers/coupon'
import {
  SESSION_CART_2_ORDER,
  SESSION_ORDER_ADDRESS_SELECTED,
  SESSION_BILL_SUBMIT
} from '@/storeKey'
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
    AppPopPanel,
    OrderNavTab,
    OrderDelivery,
    OrderGoods,
    OrderProtectionSelect,
    CouponSelect,
    ShopInfo,
    selectItem
  },
  data() {
    return {
      canSelectCoupon: false, //
      isShowCoupon: false, // 优惠券信息
      couponSelectController: null, //处理优惠券的逻辑
      type: this.$route.query.type || 'normal',
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
      coupon_guid: [], // 选中的优惠券
      coupon_price: '', // 优惠的价格
      originTotalPrice: '', // 原来的价格
      memo // 备注信息
    }
  },
  methods: {
    onSelectCoupon() {
      let vm = this
      this.couponSelectController = function() {
        return {
          getDesc: getCouponDesc,
          query({ type }) {
            return {
              0: getCurProductCanUse,
              1: getCurProductNoUse
            }[type]()
          },
          submit(couponList) {
            vm.isShowCoupon = false
            vm.updatePriceByCoupon(couponList)
          }
        }
      }
      this.isShowCoupon = true
    },
    async updatePriceByCoupon(couponList) {
      if (couponList.length === 0) {
        this.totalPrice = this.originTotalPrice
        this.coupon_price = 0
        return
      }
      this.coupon_guid = couponList.map(({ coupon_guid }) => coupon_guid)
      const product = this.orderList.map(({ product_guid, count }) => {
        return {
          guid: product_guid,
          count
        }
      })
      const { total_price, coupon_price } = await updateProductByCoupon(
        product,
        this.coupon_guid
      )
      this.coupon_price = coupon_price || 0
      this.totalPrice = total_price
    },
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
        let submit
        if (this.type === 'normal') {
          const carts = this.orderList.map(it => {
            return { guid: it.guid, update_at: it.update_at }
          })
          submit = {
            coupon_guids: this.coupon_guid,
            carts,
            memo: this.memo
          }
        } else if (this.type === 'quick') {
          submit = {
            coupon_guids: this.coupon_guid,
            memo: this.memo,
            product_guid: this.orderList[0].guid,
            count: this.orderList[0].count,
            product_param_choice_guid: this.orderList[0]
              .product_param_choice_guid
          }
        }
        if (this.logisticsSelected === 0) {
          submit.address_guid = this.deliveryAddress.guid
        } else if (this.logisticsSelected === 1) {
          submit.protection_guid = this.warehouse.id
        }
        if (this.needInvoice) {
          let billObj = {
            ...this.billData.billInfo,
            address_guid: this.billData.address
              ? this.billData.address.guid
              : ''
          }
          submit.bill = billObj
        }
        let action = this.type === 'normal' ? submitOrder : submitQuickOrder
        const result = await this.$actionWithLoading(action(submit))
        this.$gotoUrl(result.pay_page_url)
      }
    },
    async initDeliveryAddress() {
      const address = await getDefaultAddressFormStorageOrNetwork(
        SESSION_ORDER_ADDRESS_SELECTED
      )
      if (address && address instanceof Object) {
        this.deliveryAddress = address
      }
    },
    initBillInfo() {
      this.billData = storage.getStorage(SESSION_BILL_SUBMIT, 'sessionStorage')
      if (this.billData && this.billData.billInfo) {
        this.billDataMsg =
          this.billData.billInfo.header +
          ' - ' +
          this.billData.billInfo.taxpayer_no +
          ''
      }
    },
    /**
     * 判断这些商品能不能使用优惠券
     */
    async getCouponInfo() {
      const couponList = await getProductCoupon(
        this.orderList.map(({ product_guid }) => product_guid)
      )
      this.canSelectCoupon = couponList.length > 0
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
      this.originTotalPrice = this.totalPrice
      this.getCouponInfo()
    } else {
      this.$router.replace('/main/cart')
    }
    if (this.$route.query.way) {
      const way = parseInt(
        Array.isArray(this.$route.query.way)
          ? this.$route.query.way.join('')
          : this.$route.query.way
      )
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
.tip-container {
  font-size: 12px;
  color: #6d6d6d;
  padding: 16px 0;
}
</style>
