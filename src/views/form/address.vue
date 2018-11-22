<template>
<section v-show="!loading">
  <div class="weui-cells weui-cells_form" style="margin-top:0">
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">收货人</label>
      </div>
      <div class="weui-cell__bd">
        <input class="weui-input" v-model="record.name" placeholder="姓名">
      </div>
    </div>
    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">联系方式</label>
      </div>
      <div class="weui-cell__bd">
        <input class="weui-input" type="tel" v-model="record.phone" placeholder="手机号码">
      </div>
    </div>
    <div class="weui-cell weui-cell_access">
      <div class="weui-cell__hd">
        <label class="weui-label">收货地区</label>
      </div>
      <div class="weui-cell__bd" @click="selectAreaClickFn"><span class="weui-input">{{record.area.name}}</span>
      </div>
      <div class="weui-cell__ft"></div>
    </div>
  </div>
  <div class="weui-cells__title" style="margin-top:4px">详细地址</div>
  <div class="weui-cells weui-cells_form">
    <div class="weui-cell">
      <div class="weui-cell__bd">
        <textarea class="weui-textarea" placeholder="请输入详细地址" v-model="record.area_address" rows="3"></textarea>
      </div>
    </div>
  </div>
  <label for="weuiAgree" class="weui-agree"><input id="weuiAgree" type="checkbox" v-model="record.default" class="weui-agree__checkbox">
    <span class="weui-agree__text">设置为默认地址</span>
  </label>
  <div @click="submitFn" :class="{'disabled':checkStatus}" class="submit-btn xa-bg-red xa-txt-white">提交</div>
  <AddressAreaSelect v-model="record.area" v-if="areaSelectCom.isShow" @close="areaSelectCom.isShow=false" />
</section>
</template>
<script>
import { getAddressDetail, saveAddress } from '@/controllers/address.js'
import { getLocationDetail } from '@/controllers/common.js'
import AddressAreaSelect from '@/components/AddressAreaSelect'
export default {
  name: 'formAddress',
  components: {
    AddressAreaSelect
  },
  data() {
    return {
      loading: false,
      oldRecord: '',
      record: {
        guid: '',
        area: { id: 1, name: '北京市' },
        area_address: '',
        name: '',
        phone: '',
        default: false
      },
      viewState: '', // 'EDIT/ADD' 表示当前页面是作为编辑页面（EDIT） 还是新建页面(ADD)
      areaSelectCom: {
        isShow: false
      }
    }
  },
  computed: {
    /**
     * 检查表单是否有改变 ture:没有 false:有
     */
    checkStatus() {
      if (this.viewState === 'ADD') {
        if (this.record.phone.length < 8) {
          return true
        }
        if (this.record.name.length < 2) {
          return true
        }
        if (this.record.area_address.length < 4) {
          return true
        }
        return false
      }
      return this.oldRecord === JSON.stringify(this.record)
    }
  },
  methods: {
    selectAreaClickFn() {
      this.areaSelectCom.isShow = true
    },
    async submitFn() {
      if (this.checkStatus === false) {
        await this.$actionWithLoading(saveAddress(this.record))
        this.$router.go(-1)
      }
    }
  },
  async mounted() {
    this.oldRecord = JSON.stringify(this.record)
    this.viewState = 'ADD'
    if (this.$route.query.guid) {
      this.viewState = 'EDIT'
      this.$actionWithLoading(getAddressDetail({ guid: this.$route.query.guid })).then(data => {
        Object.assign(this.record, data)
        this.oldRecord = JSON.stringify(this.record)
      })
    } else {
      if (this.$root.latlng) {
        this.loading = true
        try {
          const result = await getLocationDetail(this.$root.latlng)
          if (result) {
            this.record.area = {
              id: result.id,
              name: result.name
            }
            this.record.area_address = result.address
          }
        } finally {
          this.$nextTick(() => {
            this.loading = false
          })
        }
      }
    }
  }
}
</script>
<style scoped>
.weui-label,
.weui-input,
.weui-textarea {
  font-size: 14px;
}

.weui-label {
  max-width: 6em;
}
.submit-btn {
  line-height: 46px;
  text-align: center;
  margin: 16px 17px 0;
}
.submit-btn.disabled {
  opacity: 0.3;
}
</style>