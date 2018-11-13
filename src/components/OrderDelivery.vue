<template>
<AppPopPanel @close="onClose">
    <div class="xa-bg-white container">
      <p class="title xa-txt-999">请选择配送方式:</p>
      <div class="xa-cell">
        <p v-for="item in items" class="item" :class="{'active':item.id==value}" :key="item.title" @click="onSelect(item)">{{item.title}}</p>
      </div>
      <div class="close xa-txt-red" @click="onClose">
        <i class="xa-txt-24 iconfont icon-guanbi1"></i>
      </div>
    </div>
</AppPopPanel>
</template>
<script>
import AppPopPanel from '@/components/AppPopPanel'
export default {
  components: {
    AppPopPanel
  },
  props: {
    value: [String, Number]
  },
  data() {
    return {
      items: [
        { title: '物流快递', id: 0 },
        { title: '上门自提', id: 1 }
      ]
    }
  },
  methods: {
    onSelect(item) {
      this.$emit('input', item.id)
    },
    onClose() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 16px 17px;
}
.title {
  margin-bottom: 12px;
}
.item {
  padding: 6px 12px;
  border: 1px solid;
  border-radius: 4px;
  & + & {
    margin-left: 8px;
  }
  &.active {
    color: #da0126;
  }
}
.close {
  margin-top: 16px;
  text-align: center;
}
</style>
