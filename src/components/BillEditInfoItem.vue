<template>
    <div class="wrapper">
        <div class="weui-cells">
            <div class="weui-cell">
                <div class="weui-cell__hd item-icon_select" @click="$emit('click','select',config.guid)"  v-if="selectable">
                    <i class="xa-txt-22 iconfont icon-yuanxingweixuanzhong"
                       :class="{'icon-yuanxingxuanzhongfill':selectState}"></i>
                </div>
                <div class="weui-cell__bd">
                    <p v-if="config.default" class="item-icon_defalut xa-txt-red iconfont icon-moren"></p>
                    <div @click="$emit('click','select',config.guid)">
                        <slot><addressItem :config="config"/></slot>
                    </div>
                    <router-link v-if="config.enable!=1" :to="{ path: editPath+'guid='+guid}" class="item-btn xa-txt-red" tag='span'>
                        <span class="xa-txt-12">信息需要重新确认</span>
                    </router-link>
                    <div class="xa-cell edit-btns">  
                      <span class="item-btn item-btn_delete xa-txt-green" @click="toChangeType">
                          <i class="item-icon_delete iconfont icon-shuaxin" ></i><span class="xa-txt-12">
                              {{config.invoice_type==0?'转变为专票':'转变为普票'}}
                          </span>
                      </span>
                      <span class="item-btn item-btn_delete xa-txt-red" @click="$emit('click','delete',config.guid)">
                          <i class="item-icon_delete iconfont icon-shanchu" ></i><span class="xa-txt-12">删除</span>
                      </span>
                      <router-link :to="{ path: editPath+'guid='+guid}" class="item-btn xa-txt-blue" tag='span'>
                          <i class="item-icon_edit iconfont icon-fankui"></i><span class="xa-txt-12">编辑</span>
                      </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import addressItem from '@/components/AddressInfoItem'
export default {
  components: { addressItem },
  props: {
    config: {
      type: Object,
      default() {
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
    editPath: {
      type: String
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
  },
  methods: {
    toChangeType() {
      let type = this.config.invoice_type ? 0 : 1
      this.$router.push(this.editPath + 'guid=' + this.guid + '&type=' + type)
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin: 0 8px 4px;
  border-radius: 4px;
}

.weui-cells {
  margin-top: 0;
}
.weui-cell {
  position: relative;
  padding: 8px 15px;
}
.weui-cell__bd {
  position: relative;
}
.item-icon_select {
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
.edit-btns {
  justify-content: flex-end;
}
</style>
