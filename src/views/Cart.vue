<template>
  <section class="cart-page">
    <div class="shop-container xa-bg-white" v-for="shop in prods" :key="shop.shop.shop_guid">
      <div class="shop-info xa-cell">
        <i @click="onSelectShop(shop)" class="iconfont" :class="shop.selected?'icon-yuanxingxuanzhongfill xa-txt-red':'icon-yuanxingweixuanzhong'"></i>
        <div class="shop-img" :style="'backgroundImage:url('+shop.shop.shop_logo+')'"></div>
        <router-link class="xa-txt-16" tag="div" :to="'/prodList?type=SHOP&guid='+shop.shop.shop_guid">
          {{shop.shop.name}}
        </router-link>
        <i style="opacity:0.5" class="iconfont icon-xiangyou1"></i>
      </div>
      <div class="xa-cell shop-goods" v-for="goods in shop.list" :key="goods.guid">
        <i @click="onSelectGoods(shop,goods)" class="iconfont" :class="goods.selected?'icon-yuanxingxuanzhongfill xa-txt-red':'icon-yuanxingweixuanzhong'"></i>
        <router-link class="goods-img xa-img" :style="'backgroundImage:url('+goods.img+')'" :to="'/goods?guid='+goods.guid" tag="div"></router-link>
        <div class="goods-info xa-flex">
          <p class="title xa-txt-16 xa-txt-bold xa-txt-ellipsis-2">{{goods.title}}</p>
          <p class="sku">{{goods.sku}}</p>
          <div class="xa-cell price-box">
            <p class="xa-txt-16 xa-txt-bold xa-txt-red">￥ {{goods.price}}</p>
            <AppInputNum v-model="goods.count"/>
          </div>
        </div>
      </div>
    </div>
    <CarNavTab v-show="prods.length" @buy="onBuyClick" :num="totalNum" :total="totalPrice" class="app-fb-tab cart-fb-cart"/>
  </section>
</template>
<script>
import storage from '@/util/storage'
import debounce from '@/util/debounce'
import CarNavTab from '@/components/CarNavTab'
import CartConfig from '@/config/views/Cart'
import AppInputNum from '@/components/AppInputNum'
import { getCartList, addCart } from '@/controllers/cart'
import { checkOrder } from '@/controllers/order'
import { SESSION_CART_2_ORDER, SESSION_CAER_SELECTED } from '@/storeKey'
export default {
  components: {
    AppInputNum,
    CarNavTab
  },
  data() {
    return {
      isLoading: false,
      isTest: false,
      selectedShopGuid: '',
      selectedGoodsMap: {},
      prodsNumMap: {},
      prodsSelectedMap: {},
      prods: []
    }
  },
  watch: {
    prods: {
      deep: true,
      handler(newProds, oldProds) {
        oldProds.length && this.updateGoodsNum()
      }
    }
  },
  methods: {
    checkGoodsSelected() {
      const prodsSelectedMap = {}
      this.prods.forEach(shop => shop.list.forEach(goods => {
        prodsSelectedMap[goods.guid] = goods.selected
      }))
      this.prodsSelectedMap = prodsSelectedMap
    },
    updateGoodsNum: debounce(function () {
      this.prods.forEach(shop => {
        shop.list.forEach(goods => {
          if (this.prodsNumMap[goods.guid] !== goods.count) {
            this.prodsNumMap[goods.guid] = goods.count
            addCart({
              guid: goods.product_guid,
              count: goods.count
            }).then(result => {
              goods.update_at = result.update_at
            })
          }
        })
      })
    }),
    /** 选择商品
     */
    onSelectGoods(shop, goods) {
      if (!goods.selected && this.selectedShopGuid && shop.shop.shop_guid !== this.selectedShopGuid) {
        return this.$appToast.showToast('一次仅能购买同一个店铺的商品')
      }
      goods.selected = !goods.selected
      shop.selected = this.checkShopSelectAllGoods(shop)
      this.selectedShopGuid = this.checkShopHasSelectGoods(shop) ? shop.shop.shop_guid : ''
    },
    // 检查商品是否全选
    checkShopSelectAllGoods(shop) {
      return shop.list.every(goods => goods.selected)
    },
    checkShopHasSelectGoods(shop) {
      return shop.list.some(goods => goods.selected)
    },
    /** 商店的全选
     * 1：已选中的，取消选中
     * 2: 没选过的，检查是否有正在操作的 当前商店
     * 3: 其他则提示
     * */
    onSelectShop(shop) {
      if (shop.selected || (!shop.selected && (!this.selectedShopGuid || this.selectedShopGuid === shop.shop.shop_guid))) {
        shop.selected = !shop.selected
        this.selectedShopGuid = shop.selected ? shop.shop.shop_guid : ''
        shop.list.forEach(goods => goods.selected = shop.selected)
      } else {
        this.$appToast.showToast('一次仅能购买同一个店铺的商品')
      }
    },
    async init() {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      this.selectedShopGuid = ''
      const data = await this.$actionWithLoading(this.isTest ? CartConfig() : getCartList())
      let prodsNumMap = {}
      data.forEach(shop => {
        shop.list.forEach(goods => {
          goods.selected = !!this.prodsSelectedMap[goods.guid]
          goods.selected && (this.selectedShopGuid = shop.shop.shop_guid)
          prodsNumMap[goods.guid] = goods.count
        })
        shop.selected = this.checkShopSelectAllGoods(shop)
      })
      this.prodsNumMap = prodsNumMap
      this.prods = data
      this.isLoading = false
    },
    async onBuyClick() {
      if (this.totalNum > 0) {
        let orderList = []
        this.prods.forEach(shop => {
          let prodList = shop.list.filter(prod => prod.selected)
          orderList.push(...prodList)
        })
        orderList = JSON.parse(JSON.stringify(orderList))
        let checkorderList = orderList.map(it => ({
          guid: it.guid,
          update_at: it.update_at
        }))
        this.$appLoading.showLoading()
        let data
        try {
          data = await checkOrder({
            carts: checkorderList
          })
        } catch (error) {
          this.$appLoading.hiddenLoading()
          await this.$appAlert.showAlert(error.message)
          this.checkGoodsSelected()
          this.init()
          return
        }
        this.$appLoading.hiddenLoading()
        storage.setStorage(SESSION_CART_2_ORDER, {
          orderList: orderList,
          shopInfo: {
            name: orderList[0].shop,
            shop_guid: orderList[0].shop_guid,
            shop_logo: orderList[0].shop_logo
          },
          orderTip: data
        }, 'sessionStorage')
        this.$router.push({
          path: '/order',
          query: {
            invoice: data.invoice,
            way: data.way
          }
        })
      }
    }
  },
  computed: {
    totalPrice() {
      let totalPrice = 0
      if (this.selectedShopGuid) {
        const shop = this.prods.find(shop => shop.shop.shop_guid === this.selectedShopGuid)
        totalPrice = shop.list.reduce((pre, item) =>
          pre += item.selected ? (item.price * item.count * 100) : 0
          , 0) / 100
      }
      return totalPrice
    },
    totalNum() {
      let totalNum = 0
      if (this.selectedShopGuid) {
        const shop = this.prods.find(shop => shop.shop.shop_guid === this.selectedShopGuid)
        totalNum = shop.list.reduce((pre, item) =>
          pre += item.selected ? item.count : 0
          , 0)
      }
      return totalNum
    }
  },
  deactivated() {
    this.checkGoodsSelected()
    storage.setStorage(SESSION_CAER_SELECTED, this.prodsSelectedMap, 'sessionStorage')
  },
  activated() {
    this.prodsSelectedMap = storage.getStorage(SESSION_CAER_SELECTED, 'sessionStorage') || {}
    this.init()
  },
  mounted() {
    this.prodsSelectedMap = storage.getStorage(SESSION_CAER_SELECTED, 'sessionStorage') || {}
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.cart-page {
  padding-bottom: 108px;
}
#app .cart-fb-cart {
  bottom: 48px;
}
.shop-container {
  & + & {
    margin-top: 10px;
  }
  .iconfont {
    padding-left: 18px;
    font-size: 18px;
    padding-right: 15px;
  }
  .shop-info {
    box-sizing: border-box;
    padding: 5px 0;
    border-bottom: 1px solid #e4e4e4;
  }
  .shop-img {
    margin-right: 8px;
  }
}
.goods-img,
.shop-img {
  width: 30px;
  height: 30px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.shop-goods {
  padding: 20px 0;
  .goods-img {
    width: 80px;
    height: 80px;
    margin-right: 11px;
  }
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
</style>
