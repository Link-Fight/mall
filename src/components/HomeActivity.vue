<template>
  <div class="activity-container">
    <div class="activity-title">{{title}}</div>
    <div v-for="(item,index) in items" :key="index" class="activity-box xa-cell type-1">
      <div class="xa-flex xa-view">
        <a class="xa-flex activity-item xa-img" :style="'backgroundImage:url('+item[0].img+')'" :href="item[0].url">
          <contentItem :item="item[0]" />
        </a>
        <a v-if="item.length>=4" class="xa-flex activity-item xa-img" :style="'backgroundImage:url('+item[3].img+')'" :href="item[3].url">
          <contentItem :item="item[3]"/>
        </a>
      </div>
      <div class="xa-flex xa-view" v-if="item.length>=2">
        <a class="xa-flex activity-item xa-img" :style="'backgroundImage:url('+item[1].img+')'" :href="item[1].url">
          <contentItem :item="item[1]"/>
        </a>
        <a class="xa-flex activity-item xa-img" v-if="item.length>=3"  :style="'backgroundImage:url('+item[2].img+')'" :href="item[2].url">
          <contentItem :item="item[2]"/>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
// 现在是根据数据量来自动排版
export default {
  components: {
    contentItem: {
      render(h) {
        return h('div', { class: 'activity-content' }, [
          h('p', { class: 'title' }, this.item.title),
          h('p', { class: 'sub-title' }, this.item.sub_title)
        ])
      },
      props: {
        item: Object
      }
    }
  },
  props: {
    title: {
      type: String
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.activity-container {
  padding: 0 17px 20px;
}
.activity-title {
  padding: 12px 0 12px;
  line-height: 25px;
  font-size: 16px;
  // font-weight: bold;
}
.activity-box {
  height: 203px;
  flex-wrap: wrap;
  text-align: center;
  & + & {
    margin-top: 8px;
  }
  &.type-1 {
    align-items: stretch;
    > div + div {
      margin-left: 8px;
    }
    .activity-item {
      position: relative;
      height: 100%;
      border-radius: 4px;
      background-position: center center;
      background-size: cover;
    }
    .activity-item + .activity-item {
      margin-top: 8px;
    }
  }
}
/deep/.activity-content {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  color: #fff;
  .title {
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    line-height: 20px;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
  .sub-title {
    margin-bottom: 10px;
    font-size: 10px;
    font-family: PingFang-SC-Regular;
    line-height: 14px;
    text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  }
}
</style>
