<template>
  <section>
    <div class="search-container fade xa-cell">
      <img src="../assets/logo.png" alt>
    </div>
    <div class="swiper-container fade"></div>
    <div class="nav-container xa-cell">
      <div v-for="i in 4" :key="i">
        <div class="img fade"></div>
        <div class="label fade"></div>
      </div>
    </div>
    <div class="activity-container">
      <div class="title fade"></div>
      <div class="xa-cell">
        <div class="item xa-flex fade"></div>
        <div class="item xa-flex fade"></div>
      </div>
    </div>
    <div class="activity-container">
      <div class="title fade"></div>
      <div class="xa-cell">
        <div class="item small xa-flex fade"></div>
        <div class="item small xa-flex fade"></div>
      </div>
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
.search-container {
  height: 44px;
  padding: 8px;
  background-color: #eee;
  background-clip: content-box;
}
.swiper-container {
  width: 100%;
  height: 49.3vw;
  max-height: 320px;
  background-color: #eee;
}
.nav-container {
  height: 93px;
  padding-top: 16px;
  padding-bottom: 5px;
  justify-content: space-around;
  margin-bottom: 10px;
  .img,
  .label {
    background-color: #eee;
  }
  .img {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    margin-bottom: 2px;
  }
  .label {
    margin-top: 4px;
    height: 12px;
    width: 40px;
    margin-left: auto;
    margin-right: auto;
  }
}
.activity-container {
  padding: 0 17px 20px;
  .title,
  .item {
    background-color: #eee;
  }
  .title {
    padding: 16px 0 16px;
    height: 25px;
    width: 3em;
    background-clip: content-box;
  }
  .item {
    height: 203px;
    border-radius: 4px;
    &.small {
      height: 100px;
    }
  }
  .item + .item {
    margin-left: 8px;
  }
}
</style>

