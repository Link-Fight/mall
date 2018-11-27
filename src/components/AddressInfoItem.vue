<template>
  <div class="wrapper">
    <div class="xa-cells-box">
      <div class="xa-cell-box">
        <div class="address-icon" @click="$emit('click','select',config.guid)" v-if="selectable">
          <i
            class="xa-txt-22 iconfont icon-yuanxingweixuanzhong"
            :class="{'icon-yuanxingxuanzhongfill':selectState}"
          ></i>
        </div>
        <div class="xa-flex">
          <p v-if="config.default" class="item-icon_defalut xa-txt-red iconfont icon-moren"></p>
          <div @click="$emit('click','select',config.guid)">
            <div class="xa-cell">
              <p class="xa-cell__hd xa-txt-14">{{config.name}}</p>&nbsp;
              <p class="xa-cell__bd xa-txt-14">{{config.phone}}</p>
            </div>
            <p class="xa-txt-12">{{config.area_name+config.area_address}}</p>
          </div>
          <div class="xa-cell">
            <div class="xa-cell__bd xa-cell__ft">
              <span
                class="item-btn item-btn_delete xa-txt-red"
                @click="$emit('click','delete',config.guid)"
              >
                <i class="item-icon_delete iconfont icon-shanchu"></i>
                <span class="xa-txt-12">删除</span>
              </span>
              <router-link
                :to="{ path:'/form/address?guid='+guid}"
                class="item-btn xa-txt-blue"
                tag="span"
              >
                <i class="item-icon_edit iconfont icon-fankui"></i>
                <span class="xa-txt-12">编辑</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default: function () {
        return {
          guid: '123',
          name: '柯琳',
          phone: '15915797485',
          area_address: '思成路1号北明软件2',
          area_name: '广东省/广州市/增城市',
          status: true
        }
      }
    },
    selectable: {
      type: Boolean,
      default: false
    },
    selectState: {
      type: Boolean,
      default: false
    },
    guid: {
      type: String
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin: 0 8px 4px;
  border-radius: 4px;
}
.wrapper .xa-flex {
  position: relative;
}
.wrapper .address-icon {
  margin-right: 8px;
}
.item-icon_defalut {
  position: absolute;
  top: -8px;
  right: -15px;
  font-size: 24px;
}
.item-icon_delete,
.item-icon_edit {
  padding-right: 4px;
  position: relative;
  top: 1px;
}
.item-btn_delete {
  line-height: 18px;
  margin-right: 10px;
}
.item-btn {
  line-height: 16px;
}
.icon-yuanxingxuanzhongfill {
  color: rgb(255, 87, 34);
}
</style>