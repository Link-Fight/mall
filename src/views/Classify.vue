<template>
  <section class="classify-page xa-view">
    <router-link class="xa-cell search-bar-box" tag="div" to="/prodlist?type=SEARCH">
      <div class="xa-flex xa-cell search-bar">
        <i class="iconfont icon-sousuo" style="font-size:18px"></i>&nbsp;&nbsp;<span>搜索</span>
      </div>
    </router-link>
    <section class="classify-content">
      <div class="classify-slide">
        <div class="slide-item" v-for="(item,index) in slides" :class="{'active':curSide==item.guid}" :key="index" @click="curSide=item.guid">
          {{item.name}}
        </div>
      </div>
      <div class="classify-main">
        <router-link class="main-item" v-for="(item,index) in classifyMap[curSide]" :key="index" tag="div" :to="'/prodList?guid='+item.guid">
            <div class="xa-img" :style="'backgroundImage:url('+item.logo+')'"></div>
            <p>{{item.name}}</p>
        </router-link>
      </div>
    </section>
  </section>
</template>
<script>
import { getCategory } from '@/controllers/category'
export default {
  name: 'classify',
  data() {
    return {
      curSide: '',
      slides: [],
      classifyMap: {}
    }
  },
  async created() {
    const data = await this.$actionWithLoading(getCategory())
    const classifyMap = {}
    let curSide = ''
    this.slides = data.map(item => {
      classifyMap[item.guid] = item.son
      curSide = curSide || item.guid
      return {
        name: item.name,
        guid: item.guid
      }
    })
    this.curSide = curSide
    this.classifyMap = classifyMap
  }
}
</script>
<style lang="scss" scoped>
.classify-page {
  height: 100vh;
  padding-bottom: 48px;
  background-color: #fff;
}
.search-bar-box {
  padding: 8px 17px;
  height: 44px;
}
.search-bar {
  justify-content: center;
  height: 28px;
  background-color: #f0f0f0;
  color: #9d9d9d;
  border-radius: 4px;
}
.classify-content {
  border-top: 1px solid #e4e4e4;
  display: flex;
  flex: 1;
}
.classify-slide {
  width: 121px;
  background-color: #f0f0f0;
  overflow: auto;
  flex-shrink: 0;
  font-size: 14px;
  .slide-item {
    padding-left: 16px;
    height: 50px;
    line-height: 50px;
    &.active {
      position: relative;
      font-size: 15px;
      font-weight: bold;
      color: #da0126;
      background-color: #fff;
      &::after {
        content: "";
        position: absolute;
        height: 24px;
        width: 3px;
        top: 50%;
        left: 0;
        background-color: #da0126;
        transform: translateY(-50%);
      }
    }
  }
}
.classify-main {
  display: flex;
  flex-wrap: wrap;
  align-content: baseline;
  flex: 1;
  overflow: auto;
  text-align: center;
  .main-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 23px;
    padding-bottom: 5px;
    width: 33.33%;
    .xa-img {
      width: 60px;
      height: 60px;
    }
    p {
      margin-top: 17px;
      font-size: 13px;
      color: #1d1d1d;
      line-height: 18px;
    }
  }
}
</style>
