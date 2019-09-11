<template>
  <section>
    <div class="swiper-container fade xa-cell">
      <img src="../assets/logo.png" alt />
    </div>
    <div class="goods-info">
      <p class="title fade"></p>
      <p class="sub-title fade"></p>
      <p class="price fade"></p>
    </div>
    <div class="shop-info xa-cell">
      <p class="img fade"></p>
      <p class="content fade"></p>
    </div>
    <div class="shop-info xa-cell">
      <p class="img fade"></p>
      <p class="content fade"></p>
    </div>
    <div class="shop-info xa-cell">
      <p class="img fade"></p>
      <p class="content fade"></p>
    </div>
  </section>
</template>
<style lang="scss" scoped>
section {
  overflow: hidden;
  height: 90vh;
  > div {
    box-sizing: border-box;
    background-color: #fff;
  }
  img {
    max-height: 20px;
    margin: 0 auto;
    opacity: 0.5;
  }
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
.swiper-container {
  width: 100%;
  height: 100vw;
  background-color: #eee;
  background-clip: content-box;
}
.goods-info {
  padding: 16px;
  margin-bottom: 10px;
  .title {
    width: 80vw;
    height: 22px;
  }
  .sub-title {
    width: 40vw;
    margin-top: 6px;
    height: 17px;
  }
  .price {
    width: 10vw;
    margin-top: 8px;
    height: 22px;
  }
}
.shop-info {
  margin-top: 16px;
  padding: 16px;
  .img {
    width: 50px;
    height: 50px;
  }
  .content {
    margin-left: 16px;
    height: 50px;
    width: 50vw;
  }
}
</style>

