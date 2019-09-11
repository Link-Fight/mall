<template>
  <section class="xa-view">
    <div class="search-container fade xa-cell">
      <img src="../assets/logo.png" alt />
    </div>
    <section class="classify-content xa-flex xa-cell">
      <div class="classify-slide xa-bg-f6">
        <div>
          <div class="fade"></div>
        </div>
      </div>
      <div class="classify-main">
        <div v-for="i in 9" :key="i">
          <div class="fade"></div>
        </div>
      </div>
    </section>
  </section>
</template>
<style lang="scss" scoped>
section {
  overflow: hidden;
  height: 90vh;
  div {
    box-sizing: border-box;
  }
}
.search-container {
  height: 44px;
  padding: 8px;
  background-color: #eee;
  background-clip: content-box;
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

.classify-slide {
  height: 100%;
  width: 121px;
  background-color: #f0f0f0;
  > div {
    padding: 8px 0px 8px 16px;
    background-color: #fff;
    > .fade {
      height: 36px;
    }
  }
}
.classify-main {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  align-content: baseline;
  > div {
    margin: 23px 0 5px;
    box-sizing: border-box;
    padding: 8px;
    width: 33.33%;
    background-color: #fff;
    > .fade {
      width: 100%;
      padding-top: 100%;
    }
  }
}
</style>

