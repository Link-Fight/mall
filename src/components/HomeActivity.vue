<template>
  <div class="activity-container">
    <div class="activity-title">{{title}}</div>
    <div class="activity-box xa-cell type-1">
      <div class="xa-flex xa-view">
        <div class="xa-flex activity-item" :style="'backgroundImage:url('+items[0].img+')'">
          <div class="activity-content">
            <p class="title">{{items[0].title}}</p>
            <p class="sub-title">{{items[0].subTitle}}</p>
          </div>
        </div>
        <div class="xa-flex activity-item" v-if="items.length>=4" :style="'backgroundImage:url('+items[3].img+')'">
          <contentItem :item="items[3]"/>
        </div>
      </div>
      <div class="xa-flex xa-view" v-if="items.length>=2">
        <div class="xa-flex activity-item" :style="'backgroundImage:url('+items[1].img+')'">
          <contentItem :item="items[1]"/>
        </div>
        <div class="xa-flex activity-item" v-if="items.length>=3" :style="'backgroundImage:url('+items[2].img+')'">
          <contentItem :item="items[2]"/>
        </div>
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
          h('p', { class: 'sub-title' }, this.item.subTitle)
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
  padding: 16px 0 16px;
  line-height: 25px;
  font-size: 18px;
  font-weight: bold;
}
.activity-box {
  height: 203px;
  flex-wrap: wrap;
  text-align: center;
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
