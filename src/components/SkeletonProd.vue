<template>
  <section>
    <div v-for="i in 10" :key="i" class="item xa-cell">
      <div class="img"></div>
      <div class="content xa-flex">
        <div class="title"></div>
        <div class="tip"></div>
        <div class="price"></div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section > div {
  box-sizing: border-box;
}
.item {
  padding: 10px 17px;
  height: 116px;
}
.img,
.title,
.tip,
.price {
  background-color: #eee;
}
.img {
  width: 80px;
  height: 80px;
  border: 50%;
  border-radius: 4px;
  margin-right: 12px;
}
.title {
  height: 21px;
}
.tip {
  height: 17px;
  margin-top: 5px;
  width: 5em;
}
.price {
  width: 7em;
  margin-top: 15px;
  height: 21px;
}
</style>
