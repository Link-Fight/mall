<style lang="scss" scoped>
.card-box {
  padding-top: 16px;
  margin: 0px 15px;
  &.disable {
    .card-body {
      border-top: 6px solid #999;
    }
    .xa-txt-red {
      color: #999;
    }
  }
  .card-body,
  .card-foot {
    background-color: #fff;
    border-radius: 6px;
    overflow: hidden;
  }
  .card-body {
    border-top: 6px solid #da0126;
    padding: 10px;
  }
  .card-foot {
    border-top: 1px dotted #e4e4e4;
    padding: 10px 0;
  }
  .card-box-price {
    width: 120px;
  }
  .card-box-info {
    min-height: 2.5em;
    margin-bottom: 4px;
  }
  .card-box-label {
    min-height: 16px;
    margin-bottom: 8px;
  }
}
</style>
<template>
  <div class="card-box" :class="{'disable':disable}">
    <div class="xa-cell card-body" @click="onClick('content')">
      <div class="card-box-price xa-txt-center xa-txt-red">
        <p>
          <span>￥</span>
          <strong class="xa-txt-32">{{cfg.price}}</strong>
        </p>
        <!-- <p>满21元可用</p> -->
      </div>
      <div class="card-box-contetn xa-flex xa-txt-12">
        <p class="card-box-info xa-txt-ellipsis-2">{{cfg.coupon_name}}</p>
        <p class="card-box-label xa-txt-888">{{cfg.desc}}</p>
        <p class="xa-txt-888">{{cfg.expiry_date}}</p>
      </div>
      <div v-if="canSelect" class="xa-cell">
        <i v-if="selected" class="iconfont icon-yuanxingxuanzhongfill xa-txt-red"></i>
        <i v-else class="iconfont icon-yuanxingxuanzhong"></i>
      </div>
    </div>
    <div v-if="tip" class="card-foot xa-txt-center xa-txt-red" @click="onClick('foot')">{{tip}}</div>
  </div>
</template>
<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    cfg: {
      type: Object,
      default() {
        return {}
      }
    },
    model: {
      type: String,
      default: 'CAN_USE' // CAN_USE, OUT_TIME, HAS_USE, CAN_SELECT, NO_SELECT
    }
  },
  computed: {
    canSelect() {
      return ['CAN_SELECT'].includes(this.model)
    },
    disable() {
      return !['CAN_USE', 'CAN_SELECT'].includes(this.model)
    },
    tip() {
      const model = this.model || 'CAN_USE'
      return {
        CAN_USE: '去使用',
        OUT_TIME: '已过期',
        HAS_USE: '已使用'
      }[model]
    }
  },
  methods: {
    onClick(action) {
      this.$emit('click', {
        action,
        cfg: this.cfg
      })
    }
  }
}
</script>
