<style lang="scss" scoped>
.box-wrap {
  position: relative;
  padding: 8px;
  text-align: center;
  .box-point {
    position: absolute;
    top: -50vh;
  }
}
</style>
<template>
  <div class="box-wrap">
    <div class="box-point" ref="point"></div>
    <AppLoadingMore v-if="canLoadMore" />
    <div class="xa-txt-999 xa-txt-12" v-if="count>0&&!canLoadMore">已加载全部数据 - {{count}}条</div>
  </div>
</template>
<script>
import AppLoadingMore from "@/components/AppLoadingMore";
export default {
  components: {
    AppLoadingMore
  },
  props: {
    count: {
      type: Number,
      default: 10
    },
    canLoadMore: {
      type: Boolean,
      default: true
    }
  },
  beforeDestroy() {
    this.$options.$_LoadingMoreObserver = null;
  },
  mounted() {
    let LoadingMoreObserver = (this.$options.$_LoadingMoreObserver = new IntersectionObserver(
      entries => {
        if (entries[0].intersectionRatio) {
          this.$emit("loadMore");
        }
      }
    ));
    LoadingMoreObserver.observe(this.$refs.point);
  }
};
</script>