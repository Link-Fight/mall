<style lang="scss" scoped>
.app-cell {
  padding: 17px 0;
  justify-content: space-between;
  line-height: 20px;
  .label {
    padding-right: 0.5em;
    flex-shrink: 0;
  }
}
</style>
<script>
export default {
  render(h) {
    let that = this;
    return h("div", { class: "app-cell xa-cell" }, [
      h("div", { class: "label" }, this.label),
      that.$slots.default ||
        h(
          "div",
          {
            class: "content",
            on: {
              click() {
                that.$emit("click");
              }
            }
          },
          [
            that.$slots.value || this.value || "请选择",
            that.access &&
              h("i", { class: "iconfont icon-xiangyou1", style: "opacity:0.5" })
          ]
        )
    ]);
  },
  props: {
    label: String,
    value: String,
    access: {
      type: Boolean,
      default: true
    }
  }
};
</script>
