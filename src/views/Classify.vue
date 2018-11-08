<template>
  <section class="classify-page xa-view">
    <div class="xa-cell search-bar-box">
      <div class="xa-flex xa-cell search-bar">
        <i class="iconfont icon-sousuo" style="font-size:18px"></i>&nbsp;&nbsp;<span>搜索</span>
      </div>
    </div>
    <section class="classify-content">
      <div class="classify-slide">
        <div class="slide-item" v-for="(item,index) in slides" :class="{'active':curSlideItem==item.key}" :key="index" @click="curSlideItem=item.key">
          {{item.label}}
        </div>
      </div>
      <div class="classify-main">
        <div class="main-item" v-for="(item,index) in 5" :key="index">
          <img :src="curClassify[0].img" alt="">
          <p>{{curClassify[0].label}}</p>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: 'classify',
  data() {
    return {
      curSlideItem: '20:2019',
      slides: [
        {
          label: 'P10 19配件',
          key: '10:2019'
        },
        {
          label: 'P20 19配件',
          key: '20:2019'
        },
        {
          label: 'P30 19配件',
          key: '30:2019'
        },
        {
          label: 'C2000 19配件',
          key: '2000:2019'
        },
        {
          label: 'P10 18配件',
          key: '10:2018'
        },
        {
          label: 'P20 18配件',
          key: '20:2018'
        },
        {
          label: 'P30 18配件',
          key: '30:2018'
        },
        {
          label: 'C2000 18配件',
          key: '2000:2018'
        },
        {
          label: 'P10 17款配件',
          key: '10:2017'
        },
        {
          label: 'P20 17款配件',
          key: '20:2017'
        },
        {
          label: 'P30 17款配件',
          key: '30:2017'
        },
        {
          label: 'C2000 17款配件',
          key: '2000:2017'
        }
      ],
      curClassify: [
        {
          img: 'http://agri-private.static.xag.cn/v3/upload/2018/05/24/b4b1b0f533a6698b2b8c8067b68fdaaf.png?imageView2/0/w/750/h/750&e=1854930099&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:R63Vr4RaXQFmWB0tpy1rjXN0hS4=',
          label: '全部',
          href: ''
        },
        {
          img: 'http://agri-private.static.xag.cn/v3/upload/2018/05/24/b4b1b0f533a6698b2b8c8067b68fdaaf.png?imageView2/0/w/750/h/750&e=1854930099&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:R63Vr4RaXQFmWB0tpy1rjXN0hS4=',
          label: '螺旋桨',
          href: ''
        },
        {
          img: 'http://agri-private.static.xag.cn/v3/upload/2018/05/24/b4b1b0f533a6698b2b8c8067b68fdaaf.png?imageView2/0/w/750/h/750&e=1854930099&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:R63Vr4RaXQFmWB0tpy1rjXN0hS4=',
          label: '胶圈',
          href: ''
        },
        {
          img: 'http://agri-private.static.xag.cn/v3/upload/2018/05/24/b4b1b0f533a6698b2b8c8067b68fdaaf.png?imageView2/0/w/750/h/750&e=1854930099&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:R63Vr4RaXQFmWB0tpy1rjXN0hS4=',
          label: '电机',
          href: ''
        },
        {
          img: 'http://agri-private.static.xag.cn/v3/upload/2018/05/24/b4b1b0f533a6698b2b8c8067b68fdaaf.png?imageView2/0/w/750/h/750&e=1854930099&token=wYqu938c9qi_H_uUgnE_B36feoECpNZuZ1cZQw1S:R63Vr4RaXQFmWB0tpy1rjXN0hS4=',
          label: '飞控',
          href: ''
        }
      ]
    }
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
    img {
      display: block;
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
