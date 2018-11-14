<template>
  <section class="sku-panel">
    <div class="sku-info xa-cell xa-bg-white">
      <div class="img" :style="'backgroundImage:url('+info.img+')'"></div>
      <div class="content xa-flex">
        <p class="title">{{info.title}}</p>
        <p class="subTitle">{{info.sub_title}}</p>
        <p class="price">￥ {{info.price}}</p>
      </div>
    </div>
    <div class="sku-content xa-bg-white">
      <template v-for="item in skus">
        <div :key="item.key" class="sku-cell">
          <p class="title">{{item.title}}</p>
          <ul class="xa-cell">
            <li class="item" v-for="sku in item.items" :key="sku.key" :class="{'active':skuResult[item.key]==sku.key}" @click="onChangeSku(sku)">
              {{sku.title}}
            </li>
          </ul>
        </div>
      </template>
    </div>
    <div class="num-box xa-cell xa-bg-white">
      <span class="title">购买数量</span><AppInputNum v-model="num"/>
    </div>
    <div v-if="buyAction==1" class="add-btn">加入购物车</div>
    <div v-if="buyAction==2" class="buy-btn">立即购买</div>
    <div v-show="isLoading" class="sku-loading">
      <img src="../assets/loading.svg" alt="">
    </div>
  </section>
</template>
<script>
import AppInputNum from '@/components/AppInputNum'
export default {
  components: {
    AppInputNum
  },
  data() {
    return {
      isLoading: false,
      num: 1
    }
  },
  props: {
    changeAction: {
      type: Function
    },
    buyAction: {
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
        }
      }
    },
    skuResult: {
      type: Object,
      default() {
        return {
          version: '2017',
          color: 'red'
        }
      }
    },
    skus: {
      type: Array,
      default() {
        return [
          {
            key: 'version',
            title: '版本',
            items: [{
              title: '2017款',
              key: '2017'
            }, {
              title: '2018款',
              key: '2018'
            }]
          },
          {
            key: 'color',
            title: '颜色',
            items: [
              {
                title: '黑色',
                key: 'black'
              },
              {
                title: '红色',
                key: 'red'
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    async onChangeSku(sku) {
      this.isLoading = true
      await this.changeAction(sku)
      this.isLoading = false
    }
  }
}
</script>
<style lang="scss" scoped>
.sku-panel {
  position: relative;
  background-color: #f2f2f2;
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
    margin-top: 6px;
    padding: 0 12px;
    margin-right: 12px;
    height: 40px;
    line-height: 40px;
    background-color: #f2f2f2;
    border-radius: 2px;
    &.active {
      box-sizing: border-box;
      color: #da0126;
      background-color: #fbe5e9;
      border: 1px solid #ff3366;
    }
  }
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
