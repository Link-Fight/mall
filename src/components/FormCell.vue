<template>
  <div class="weui-cell xa-txt-14 xa-bg-while" :class="{'weui-cell_access':access!=undefined}">
      <slot name="label"></slot>
      <div v-if="label" class="weui-cell__hd">
          <label class="weui-label">{{label}}</label>
      </div>
      <div class="weui-cell__bd">
          <slot></slot>
      </div>
      <div class="weui-cell__ft"></div>
  </div>
</template>
<script>
export default {
  props: {
    label: {},
    access: {}
  }
}
</script>
