<style lang="scss" scoped>
.page-wrappper {
  height: 100%;
  .page-head {
    padding: 8px 15px 0;
    box-shadow: 0px 1px 2px #e4e4e4;
    border-radius: 8px 8px 0 0;
  }
  .page-body {
    padding-bottom: 16px;
  }
  .page-foot {
    padding: 8px 15px 16px;
    box-shadow: 0px -1px 2px #e4e4e4;
  }
}
</style>
<template>
  <section class="page-wrappper xa-container xa-view">
    <div class="page-head xa-bg-white">
      <div class="xa-txt-16 xa-cell">
        <div class="xa-flex">优惠券</div>
        <div class="xa-txt-12 xa-txt-red" @click="isShowNotice=true">说明</div>
      </div>
      <AppTabs v-model="tabIndex" :items="['可用优惠券', '不可用优惠券']" />
    </div>
    <section ref="wrapper" class="page-body xa-bg-f6 xa-flex xa-container">
      <template v-if="isLoading">
        <SkeletonProd />
      </template>
      <template v-else>
        <CouponCard
          @click="onItemClick"
          v-for="(coupon,index) in list"
          :cfg="coupon"
          :key="index"
          :model="cardModel"
          :selected="coupon.select"
        ></CouponCard>
        <AppListEmpty v-if="list.length===0" />
      </template>
    </section>
    <div class="page-foot xa-bg-white">
      <div class="xa-btn xa-btn--mini xa-bg-red" @click="onSubmit">确定</div>
    </div>
    <Notice v-model="isShowNotice">{{desc}}</Notice>
  </section>
</template>
<script>
import AppTabs from '@/components/AppTabs'
import AppListEmpty from '@/components/AppListEmpty.vue'
import CouponCard from '@/components/CouponCard.vue'
import SkeletonProd from '@/components/SkeletonProd.vue'
import Notice from '@/components/notice/coupon'
const TAB_VALUES = ['0', '1']
const CARD_MODEL = ['CAN_SELECT', 'NO_SELECT']
import { getScrollTop, setScrollTop } from '@/util'
const test = function() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{}, {}, {}, {}, {}, {}, {}, {}])
    }, 3000)
  })
}
export default {
  components: {
    AppTabs,
    AppListEmpty,
    CouponCard,
    Notice,
    SkeletonProd
  },
  props: {
    controller: {
      type: Function,
      default() {
        return {
          submit() {},
          query(params) {
            return test(params)
          }
        }
      }
    }
  },
  data() {
    return {
      isShowNotice: false,
      isLoading: true,
      tabIndex: 0,
      list: [],
      desc: '', // 描述
      storeList: {},
      storeQuery: {},
      storeScroll: {},
      cardModel: CARD_MODEL[0],
      query: {
        type: TAB_VALUES[0]
      }
    }
  },
  watch: {
    tabIndex(index) {
      // 发生tab切换时候，记录当前的tab下数据，(获取新的/恢复之前)tab的数据
      this.recordTabData()
      this.cardModel = CARD_MODEL[index]
      this.setNewOrResetTabData(index)
    }
  },
  methods: {
    recordTabData() {
      const type = this.query.type
      this.storeQuery[type] = this.query
      this.storeList[type] = this.list
      this.storeScroll[type] = getScrollTop(this.$refs.wrapper)
    },
    setNewOrResetTabData(typeIndex) {
      const type = TAB_VALUES[typeIndex]
      this.query = this.storeQuery[type] || {
        type,
        page_index: 1,
        page_size: 10
      }
      this.list = this.storeList[type] || []
      const scrollTop = this.storeScroll[type] || 0
      this.$nextTick(() => {
        setScrollTop(scrollTop, this.$refs.wrapper)
      })
      if (this.list.length === 0) {
        this.isLoading = true
        this.fetchData()
      }
    },
    onItemClick({ cfg }) {
      cfg.select = !cfg.select
    },
    async fetchData() {
      const query = this.query
      const list = await this.control.query(query)
      this.list = list
      this.isLoading = false
    },
    getSelectedList() {
      const list =
        this.tabIndex === 0 ? this.list : this.storeList[TAB_VALUES[0]]
      const selectList = list.filter(item => item.select)
      return selectList
    },
    async onSubmit() {
      const selectList = this.getSelectedList()
      await this.control.submit(selectList)
    }
  },
  beforeDestroy() {
    this.control = null
  },
  async mounted() {
    this.control = this.controller()
    this.fetchData()
    this.desc = await this.control.getDesc()
  }
}
</script>