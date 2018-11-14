<template>
  <section class="orderRead-page">
    <div class="xa-bg-white xa-cell cell-space" style="padding:17px 17px;">
      <div class="address-icon">
        <i class="iconfont icon-zuobiaofill xa-txt-24"></i>  
      </div>
      <div class="xa-flex">
        <p class="xa-txt-13"><span>{{addressInfo.name}}</span>&nbsp; <span class="xa-txt-999">{{addressInfo.phone}}</span></p>
        <p>{{addressInfo.address}}</p>
      </div>
      <a v-if="addressInfo.phone" :href="'tel:'+ addressInfo.protection_phone">
        <i class="xa-txt-red iconfont icon-dianhua1 xa-txt-20"></i>
      </a>
    </div>
    <div class="xa-bg-white cell-space">
      <ShopInfo class="border-bottom" :config="shopInfo"/>
      <OrderGoods class="order-goods xa-bg-white" :items="products"/>
      <div class="order-price xa-cell border-top">
        <p class="xa-txt-14">合计:</p> <p class="xa-txt-18 xa-txt-red xa-txt-bold">￥ {{price}}</p>
      </div>
    </div>
    <div class="xa-bg-white cell-space">
      <OrderStatus :items="orderStatus"/>
    </div>
    <div v-if="expressStatus.length" class="xa-bg-white cell-space ">
      <p class="border-bottom" style="line-height:50px;">物流信息</p>
      <OrderStatus :items="expressStatus"/>
    </div>
    <div class="xa-bg-white">
      <OrderStatus v-if="billStatus.length" :items="billStatus"/>
      <div class="order-tip border-top" v-html="logistics_info"></div>
    </div>
    <div v-if="status==0" class="submit-btn-box">
      <p class="app-fb-tab submit-btn xa-bg-red xa-txt-white xa-txt-16">
        继续支付
      </p>
    </div>
  </section>
</template>
<script>
import ShopInfo from '@/components/ShopInfo'
import OrderStatus from '@/components/OrderStatus'
import OrderGoods from '@/components/OrderGoods'
// import config from '@/config/views/OrderRead'
import { getOrder } from '@/controllers/order.js'
export default {
  name: 'OrderRead',
  components: {
    OrderStatus,
    OrderGoods,
    ShopInfo
  },
  data() {
    return {
      shopInfo: {},
      status: -1,
      products: [],
      logisticsType: 0,
      addressInfo: {},
      orderStatus: [],
      billStatus: [],
      expressStatus: [],
      payUrl: '',
      price: '',
      logistics_info: ''
    }
  },
  methods: {
    onSubmit() {
      window.location.href = this.payUrl
    },
    initData(config) {
      this.logistics_info = config.logistics_info
      this.products = config.products
      this.shopInfo = config.shop
      this.price = config.price
      const logisticsType = config.logistics.logistics_type
      const addressInfo = {
        type: logisticsType,
        address: '',
        name: '',
        phone: ''
      }
      if (logisticsType === 1) { // 自提
        addressInfo.address = config.logistics.protection_address
        addressInfo.name = config.logistics.protection_name
        addressInfo.phone = config.logistics.protection_phone
      } else if (logisticsType === 0) { // 快递
        addressInfo.address = config.logistics.address
        addressInfo.name = config.logistics.name
        addressInfo.phone = config.logistics.phone
      }
      this.addressInfo = addressInfo
      const orderStatus = []
      orderStatus.push({
        title: '订单状态',
        value: config.status_text,
        red: true
      })
      orderStatus.push({
        title: '配送方式',
        value: logisticsType === 0 ? '物流快递' : '上门自提'
      })
      orderStatus.push({
        title: '订单编号',
        value: config.order_no
      })
      orderStatus.push({
        title: '下单日期',
        value: config.create_time
      })
      orderStatus.push({
        title: '订单备注',
        value: config.memo
      })
      this.orderStatus = orderStatus
      const billStatus = []
      if (config.bill && config.bill.header) {
        billStatus.push({
          title: '发票抬头',
          value: config.bill.header
        })
        billStatus.push({
          title: '税号',
          value: config.bill.taxpayer_no
        })
        let billKey = [{
          title: '银行名称',
          key: 'bank_name'
        }, {
          title: '银行账号',
          key: 'bank_account'
        }, {
          title: '公司电话',
          key: 'company_phone'
        }, {
          title: '公司地址',
          key: 'company_address'
        }]
        billKey.forEach(item => {
          config.bill[item.key] && (
            billStatus.push({
              title: item.title,
              value: config.bill[item.key]
            })
          )
        })
      }
      if (billStatus.length > 4) {
        billStatus[1].close = true
      }
      this.billStatus = billStatus
      this.status = config.status
      if (config.express && config.express.length) {
        this.expressStatus = config.express.map(item => {
          return {
            title: item.name,
            content: item.number,
            value: item.send_at
          }
        })
      }
      this.payUrl = config.pay_page_url
    }
  },
  async mounted() {
    const data = await this.$actionWithLoading(getOrder({ order_no: this.$route.query.guid }))
    this.initData(data)
  }
}
</script>
<style lang="scss" scoped>
.orderRead-page {
  > div {
    padding: 0 17px;
  }
  .cell-space {
    margin-bottom: 10px;
  }
  .border-bottom {
    border-bottom: 1px solid #e4e4e4;
  }
  .border-top {
    border-top: 1px solid #e4e4e4;
  }
  .order-price {
    padding: 14px 0;
    line-height: 28px;
    justify-content: flex-end;
  }
  .order-tip {
    padding: 16px 0;
    color: #6d6d6d;
  }
  .address-icon {
    width: 40px;
    height: 40px;
    background: #da0126;
    text-align: center;
    margin-right: 11px;
    border-radius: 50%;
    color: #fff;
  }
  .submit-btn-box {
    height: 80px;
    padding: 0;
  }
  .submit-btn {
    margin: 0;
    text-align: center;
    line-height: 47px;
  }
}
</style>
