<template>
  <section class="sku-panel xa-container xa-view">
    <div class="sku-info xa-cell xa-bg-white">
      <div class="img" :style="'backgroundImage:url('+info.img+')'"></div>
      <div class="content xa-flex">
        <p class="title">{{info.title}}</p>
        <p class="subTitle">{{info.sub_title}}</p>
        <p class="price">￥ {{info.price}}</p>
      </div>
    </div>
    <div class="sku-content xa-bg-white xa-container xa-flex">
      <div v-if="skus" class="sku-cell">
          <p class="title">{{skus.title}}</p>
          <ul class="xa-cell">
            <li class="item" v-for="sku in skus.option" :class="{'active':sku.is_choose}" :key="sku.sku_name" @click="onChangeSku(sku)">
              {{sku.sku_name}}
            </li>
          </ul>
      </div>
      <template v-for="item in params">
        <div :key="item.key" class="sku-cell" :class="{'disable':disable}">
          <p class="title">{{item.title}}</p>
          <ul class="xa-cell">
            <li class="item" v-for="sku in item.option" :key="sku" :class="{'active':result[item.title]&&result[item.title]==sku}" @click="onChangeParams(item, sku)">
              {{sku}}
            </li>
          </ul>
        </div>
      </template>
      <p class="count-tip">{{countMsg}}</p>
      <div class="num-box xa-cell xa-bg-white">
        <span class="title">购买数量</span><AppInputNum v-model="num"/>
      </div>
    </div>
    <div :class="{'disable':disable}">
      <div v-if="buyType==1" class="add-btn" @click="onBuy">加入购物车</div>
      <div v-if="buyType==2" class="buy-btn" @click="onBuy">立即购买</div>
    </div>
    <div v-show="isLoading" class="sku-loading">
      <img src="../assets/loading.svg" alt="">
    </div>
  </section>
</template>
<script>
import AppInputNum from '@/components/AppInputNum'
import { addCart } from '@/controllers/good'
export default {
  name: 'skuPanel',
  components: {
    AppInputNum
  },
  data() {
    return {
      isLoading: false,
      num: 1,
      result: {},
      disable: false,
      countMsg: ''
    }
  },
  props: {
    guid: {
      type: String
    },
    changeAction: {
      type: Function
    },
    buyType: {
      type: [Number, String],
      default: 1
    },
    info: {
      type: Object,
      default() {
        return {
          img: 'http://agri-private.static.xag.cn/v3/upload/2018/05/22/6b5f8910c89af4ace4aeb87d7be79a70.png?imageView2/0/w/750/h/750&e=1541673764&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:iTHJXoaZiiXT6fOGM9SdUQEz5HY=',
          title: 'P30 2018款 折叠桨（正桨）',
          sub_title: '1个',
          price: 420
        } || null
      }
    },
    skus: {
      type: Object,
      default() {
        return {
          title: '无穷大鸡翅',
          option: [{
            'guid': '383E78484DC106F78D8E7E9E30E669BE',
            'sku_name': '2019',
            'is_choose': 0
          },
          {
            'guid': 'A81013381F6FE03A15FA8DBE0A9930F6',
            'sku_name': '2018',
            'is_choose': 1
          }]
        } && null
      }
    },
    choice: {
      type: Object,
      default() {
        return {
          '香辣,雄': {
            'guid': '313203230948CA449ADDE5BE00BC7579',
            'available_stock': 14
          },
          '五香,雄': {
            'guid': 'FCAA735F78CB81827ABF4D46B5997F33',
            'available_stock': 2
          },
          '香辣,雌': {
            'guid': '5B081AE08636A3C95A20F1001A9FEA47',
            'available_stock': 3
          },
          '五香,雌': {
            'guid': 'A3714B54E0ECF1DA9F4BF18AF488BDD5',
            'available_stock': 0
          }
        } || null
      }
    },
    params: {
      type: Array,
      default() {
        return [
          {
            title: '口味',
            option: ['香辣', '五香']
          },
          {
            title: '性别',
            option: ['雄', '雌']
          }
        ] && null
      }
    }
  },
  methods: {
    async onBuy() {
      let selectResult = {}
      if (this.params) {
        selectResult = this.getParamsSelectResult(true)
        if (selectResult && selectResult.available_stock < this.num) {
          this.$appToast.showToast('该规格商品库存不足！')
        }
      }
      this.$actionWithLoading(addCart({
        guid: this.guid,
        param_choice_guid: selectResult.guid,
        count: this.num
      }))
    },
    async onChangeSku(sku) {
      this.isLoading = true
      await this.changeAction(sku.guid)
      this.isLoading = false
    },
    onChangeParams(item, key) {
      this.result = {
        ...this.result,
        [item.title]: key
      }
      const selectResult = this.getParamsSelectResult()
      this.countMsg = ''
      this.disable = false
      if (selectResult) {
        if (selectResult.available_stock <= 0) {
          this.$appToast.showToast('该规格商品暂时没库存！')
          this.disable = true
        } else {
          selectResult.available_stock < 10 && (this.countMsg = '当前该规格商品库存还有:' + selectResult.available_stock)
        }
      }
    },
    getParamsSelectResult(needToast = false) {
      let key = ''
      let hasFinishSelect = true
      let msg = ''
      this.params.forEach(item => {
        if (!this.result[item.title]) {
          hasFinishSelect = false
          msg = '请选择:' + item.title
        } else {
          key += (key ? ',' : '') + this.result[item.title]
        }
      })
      if (hasFinishSelect) {
        return {
          key,
          ...this.choice[key]
        }
      } else if (needToast) {
        this.$appToast.showToast(msg)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sku-panel {
  position: relative;
  background-color: #f2f2f2;
  max-height: 90%;
  max-height: 90vh;
  overflow: auto;
}
.sku-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.2);
  img {
    max-width: 80px;
  }
}
.sku-info {
  padding: 16px 0 10px 18px;
  margin-bottom: 10px;
  .img {
    box-sizing: border-box;
    border: 1px solid #e4e4e4;
    width: 75px;
    height: 75px;
    background-size: cover;
  }
  .content {
    margin-left: 15px;
  }
  .title {
    color: #1d1d1d;
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
  }
  .subTitle {
    margin-top: 5px;
    color: #6d6d6d;
    font-size: 12px;
    line-height: 17px;
    min-height: 31px;
  }
  .price {
    color: #da0126;
    font-size: 16px;
    font-weight: bold;
    line-height: 22px;
  }
}
.sku-content {
  padding: 0 17px;
  color: #1d1d1d;
  max-height: 70vh;
  overflow: auto;
  .sku-cell {
    padding-bottom: 20px;
    border-bottom: 1px solid #f2f2f2;
  }

  .title {
    padding-top: 17px;
    padding-bottom: 10px;
    color: #1d1d1d;
    line-height: 20px;
  }
  .item {
    box-sizing: border-box;
    margin-top: 6px;
    padding: 0 12px;
    margin-right: 12px;
    height: 40px;
    line-height: 40px;
    background-color: #f2f2f2;
    border-radius: 2px;
    border: 1px solid #fff;
    &.active {
      color: #da0126;
      background-color: #fbe5e9;
      border: 1px solid #ff3366;
    }
  }
  .disable {
    .item.active {
      opacity: 0.3;
    }
  }
}
.count-tip {
  padding: 8px 17px 0;
  background-color: #fff;
  color: #ff6701;
  font-size: 12px;
}
.num-box {
  padding: 20px 17px;
  justify-content: space-between;
  color: #1d1d1d;
}
.add-btn {
  background-color: #ff6701;
}
.buy-btn {
  background-color: #da0126;
}
.add-btn,
.buy-btn {
  font-size: 18px;
  color: #fff;
  height: 48px;
  text-align: center;
  line-height: 48px;
}
</style>
