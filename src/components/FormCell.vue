<template>
  <div class="xa-cell-box xa-txt-14 xa-bg-while" :class="{'xa-cell-box_access':access!=undefined}">
      <slot name="label"></slot>
      <div v-if="label" class="">
          <label class="xa-label">{{label}}</label>
      </div>
      <div class="xa-flex">
          <slot></slot>
      </div>
      <div class="xa-cell-box__ft"></div>
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
