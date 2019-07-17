<template>
  <section>
    <div v-for="i in 10" :key="i" class="item xa-cell">
      <div class="img fade"></div>
      <div class="content xa-flex">
        <div class="title fade"></div>
        <div class="tip"></div>
        <div class="price fade"></div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section {
  max-height: 100vh;
  overflow: hidden;
}
section > div {
  box-sizing: border-box;
}
.fade {
  width: 100%;
  background: linear-gradient(to right, #ececf0 8%, #d3d3d9 18%, #ececf0 33%);
  background-size: 800px 45px;
  animation: shine 3s infinite;
}
@keyframes shine {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
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
