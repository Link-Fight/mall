<template>
  <notice title="优惠券使用说明" :value="value" @input="$emit('input', false)">
    <div style="text-align:left;padding:18px 0">
      <slot></slot>
    </div>
  </notice>
</template>
<script>
import notice from '@/components/notice/notice'
export default {
  name: 'couponNotice',
  components: { notice },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>