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
      <selectItem label="配送方式" @click="onSelectDelivery" :value="logisticsSelectedMap[logisticsSelected]"/>
      <template v-if="logisticsSelected==0">
        <div v-if="deliveryAddress" class="address-item">
          <div class="xa-cell">{{deliveryAddress.name}}&nbsp;&nbsp; <p class="xa-txt-999">{{deliveryAddress.phone}}</p></div>
          <p>{{deliveryAddress.area_name}}{{deliveryAddress.area_address}}</p>
        </div>
        <selectItem v-else label="收货地址"/>
      </template>
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
      <div class="tip-container" v-html="orderTip.logistics_info"></div>
    </div>
    <OrderNavTab class="app-fb-tab" :total="totalPrice"/>
    <OrderDelivery v-model="logisticsSelected" v-if="isShowOrderDelivery" @close="isShowOrderDelivery=false"/>
    <OrderProtectionSelect v-model="warehouse" v-if="isShowOrderProtectionSelect" @close="isShowOrderProtectionSelect=false" :query="shopInfo"/>
  </section>
</template>
<script>
import OrderDelivery from '@/components/OrderDelivery'
import OrderNavTab from '@/components/OrderNavTab'
import OrderProtectionSelect from '@/components/OrderProtectionSelect/index'
import storage from '@/util/storage'
import { getDefaultAddress } from '@/controllers/address'
const storageProdKey = '/Mall3.0/Cart/prods'
const logisticsSelectedMap = {
  0: '物流快递',
  1: '上门自提'
}
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
          }, [this.value || '请选择', h('i', { 'class': 'iconfont icon-xiangyou1', style: 'opacity:0.5' })])
        ])
      },
      props: {
        label: String,
        value: String
      }
    }
  },
  data() {
    return {
      shopInfo: null, // 商店信息
      logisticsSelectedMap,
      isShowOrderDelivery: false,
      isShowOrderProtectionSelect: false,
      logisticsSelected: 1,
      deliveryAddress: null,
      warehouse: null,
      orderList: [],
      orderTip: {},
      needInvoice: false,
      totalPrice: 0,
      memo: '' // 备注信息
    }
  },
  methods: {
    onSelectDelivery() {
      this.isShowOrderDelivery = true
    }
  },
  async mounted() {
    const address = await getDefaultAddress()
    this.deliveryAddress = address
    const data = storage.getStorage(storageProdKey, 'sessionStorage')
    if (data) {
      this.orderList = data.orderList
      this.shopInfo = data.shopInfo
      this.orderTip = data.orderTip
      this.totalPrice = data.orderTip.total_price
    } else {
      this.$router.replace('/main/cart')
    }
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
  .memo-input {
    text-indent: 0.5em;
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
