<template>
  <div class="xa-txt-12" style="padding:4px 0;">
    <p class="item-type_box" :class="'bill-type--'+config.invoice_type">{{config.invoice_type==0?'普票':'专票'}}</p>
    <item :label="config.header"/>
    <item label="税号" :value="config.taxpayer_no"></item>
    <item v-if="config.bank_name" label="银行名称" :value="config.bank_name"></item>
    <item v-if="config.bank_account" label="银行账号" :value="config.bank_account"></item>
    <item v-if="config.company_phone" label="公司电话" :value="config.company_phone"></item>
    <item v-if="config.company_address" label="公司地址" :value="config.company_address"></item>
  </div>
</template>
<script>
export default {
  components: {
    item: {
      render(h) {
        return h('div', { class: 'xa-cell' }, [
          this.label,
          h('div', { class: 'xa-flex xa-txt-222 xa-txt-right' }, this.value)
        ])
      },
      props: {
        label: '',
        value: ''
      }
    }
  },
  props: {
    config: {
      type: Object,
      default() {
        return {
          bank_account: '9876543210987655432',
          bank_name: '广州银行',
          company_address: '广州天河客运站',
          company_phone: '8263543242376478',
          default: true,
          guid: '615BD013D8D6AFC206637C52EB3DAC1C',
          header: '我是发票抬头',
          taxpayer_no: '123456789123456789'
        }
      }
    }
  }
}
</script>
<style scoped>
.item-type_box {
  width: 36px;
  line-height: 18px;
  text-align: center;
  border: 1px solid;
  color: #42bd56;
}
.item-type-1 {
  color: red;
}
.xa-cell:first-of-type {
  font-size: 14px;
  padding-bottom: 4px;
  margin-bottom: 8px;
  border-bottom: 1px solid;
}
</style>
