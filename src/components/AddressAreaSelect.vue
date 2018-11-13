<template>
<transition name="fadeshow">
    <section>
        <div v-if="modal" class="xa-mask" @click="$emit('close')"></div>
        <section class="area-wrap max-container xa-view" :class="{modal:modal}">
            <p class="title">请选择保障点</p>
            <slot name="header"></slot>
            <div class="list-header xa-cell">
                <div v-for="(m,index) in menus" :key="index" @click="onMenuClick(m)" :class="{active:curMenu.id===m.id}" class="area-menu">{{m.name}}</div>
            </div>
            <main ref="scrollwrap" class="list-wrapper xa-flex selected-container">
                <slot name="items" v-for="item in items" :item="item" :curMenu="curMenu" :onItemClick="onItemClick">
                    <div @click="onItemClick(item)" class="area-item" :class="{active:curMenu.id ===item.id}" :key="item.id">
                        {{item.name}}
                    </div>
                </slot>
                <loading v-show="items.length===0"></loading>
            </main>
        </section>
    </section>
</transition>
</template>
<script>
import { cache as service } from '@/controllers/index'
import loading from '@/components/AppDotLoading.vue'
const defaultGetAreasSrc = '/common/area/areas'
const placeholder = {
  upid: 0,
  id: '-',
  name: '请选择'
}
export default {
  components: { loading },
  data() {
    return {
      saveKey: 'Protection',
      menus: [Object.assign({}, placeholder)],
      items: [],
      curMenu: Object.assign({}, placeholder),
      seletedStatus: '' // 【''/'UP'】  ''表示从根节点开始、'UP'表示是从某个子节点开始
    }
  },
  props: {
    modal: {
      type: Boolean,
      default: true
    },
    query: {
      type: Object,
      default() {
        return {}
      }
    },
    getAreas: {
      type: String,
      default: defaultGetAreasSrc
    }
  },
  methods: {
    onMenuClick(menu) {
      if (menu.id === this.curMenu.id) return
      this.updateCurItems(menu.upid, menu.id === placeholder.id ? this.curMenu.upid : menu.id)
      this.curMenu = menu
    },
    onItemClick(item) {
      let index
      if (item.id) {
        if (this.seletedStatus === 'UP') {
          this.menus.push(Object.assign({}, placeholder))
          this.seletedStatus = ''
          return this.onItemClick(item)
        }
        if (this.curMenu.id === placeholder.id) {
          index = this.menus.length - 1
          this.menus.splice(index, 0, item)
        } else {
          index = this.menus.indexOf(this.curMenu)
          this.menus.splice(index, this.menus.length - 1 - index, item)
          this.onMenuClick(this.menus[this.menus.length - 1])
        }
        this.menus[this.menus.length - 1].upid = item.id
        item.upid = item.upid || (index === 0 ? 0 : this.menus[index - 1].id)
        this.updateCurItems(item.id, item.upid, item)
      }
    },
    updateCurItems(enterId) {
      this.items = []
      let query = this.query
      query.upid = enterId
      service(this.getAreas, query).then(data => {
        this.items = data
        if (data.length === 0) {
          this.emit()
        }
      })
    },
    emit() {
      let name = ''
      let id
      let path = []
      this.menus.forEach(menu => {
        if (menu.id !== placeholder.id) {
          name += ' ' + menu.name
          id = menu.id
          path.push(menu)
        }
      })
      if (path.length) {
        this.$emit('input', {
          id, name
        })
      }
      this.$emit('close', null)
    }
  },
  created() {
    service(this.getAreas, this.query).then(data => { this.items = data })
  }
}
</script>
<style scoped>
.title {
  line-height: 40px;
  text-align: center;
  border-bottom: 1px solid #efefef;
  box-shadow: 0 0 8px #ccc;
  z-index: 1;
}
.selected-container {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  height: 100%;
}
.area-wrap.modal {
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 5000;
  background-color: #ffffff;
  height: 50vh;
}

.area-title {
  line-height: 40px;
  height: 40px;
  padding: 0 8px;
}

.area-menu {
  position: relative;
  margin-right: 8px;
}

.area-item.active,
.area-menu.active {
  color: #da0126;
}

.area-menu.active::after {
  position: absolute;
  right: 1px;
  bottom: 1px;
  left: 1px;
  height: 2px;
  background-color: #da0126;
  content: " ";
}

.area-item > .iconfont {
  display: none;
}

.area-item.active > .iconfont {
  display: initial;
}

.action {
  line-height: 26px;
}
.list-header,
.list-wrapper {
  text-indent: 8px;
}
.list-header {
  background-color: #f2f2f2;
  line-height: 2.8em;
}
.list-wrapper {
  line-height: 2.4em;
}
</style>