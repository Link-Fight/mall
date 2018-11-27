<template>
  <section v-show="!loading">
    <div class="xa-cells-box xa-cells-box_form" style="margin-top:0">
      <div class="xa-cell-box">
        <div class>
          <label class="xa-label">收货人</label>
        </div>
        <div class="xa-flex">
          <input class="xa-input" v-model="record.name" placeholder="姓名">
        </div>
      </div>
      <div class="xa-cell-box">
        <div class>
          <label class="xa-label">联系方式</label>
        </div>
        <div class="xa-flex">
          <input class="xa-input" type="tel" v-model="record.phone" placeholder="手机号码">
        </div>
      </div>
      <div class="xa-cell-box xa-cell-box_access">
        <div class>
          <label class="xa-label">收货地区</label>
        </div>
        <div class="xa-flex" @click="selectAreaClickFn">
          <span class="xa-input">{{record.area.name}}</span>
        </div>
        <div class="xa-cell-box__ft"></div>
      </div>
    </div>
    <div class="xa-cells-box__title" style="margin-top:4px">详细地址</div>
    <div class="xa-cells-box xa-cells-box_form">
      <div class="xa-cell-box">
        <div class="xa-flex">
          <textarea
            class="xa-textarea"
            placeholder="请输入详细地址"
            v-model="record.area_address"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
    <label for="agreeChekbox" class="xa-cell-box xa-cell">
      <input id="agreeChekbox" type="checkbox" v-model="record.default" class="xa-agree__checkbox">
      <span class="xa-txt-999 xa-txt-12">设置为默认地址</span>
    </label>
    <div
      @click="submitFn"
      :class="{'disabled':checkStatus}"
      class="submit-btn xa-bg-red xa-txt-white"
    >提交</div>
    <AddressAreaSelect
      v-model="record.area"
      v-if="areaSelectCom.isShow"
      @close="areaSelectCom.isShow=false"
    />
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
.xa-label,
.xa-input,
.xa-textarea {
  font-size: 14px;
}

.xa-label {
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
.xa-agree__checkbox {
  appearance: none;
  outline: 0;
  font-size: 0;
  margin-right: 4px;
  border: 1px solid #d1d1d1;
  background-color: #ffffff;
  border-radius: 3px;
  width: 13px;
  height: 13px;
  position: relative;
  top: -1px;
  vertical-align: 0;
}
</style>