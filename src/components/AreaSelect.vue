<template>
    <div class="chooseArea" v-show="show">
        <div class="area-mark" @click="selectEnd"></div>
        <div class="area-tab" v-show="show">
            <ul class="area-tab-menu">
                <li v-for="(item,index) in menus" :key="index" :class="{active:item.level==currentLevel}" @click.stop='menusClick(item)'> <span class="area-menu-item"> {{item.name}}</span></li>
            </ul>
            <div class="area-tab-con">
                <template v-for="me in menus">
                    <ul v-show="me.level==currentLevel"
                    :key="me.level"
                        style='position:relative'
                        :style="{'left':horizontal+'%'}">
                        <li v-for="item in store['id'+me.pid]"
                            :key="item.name"
                            :class="{active:item.id == me.id}"
                            @click.stop="clickItem(item)">
                            {{item.name}}
                        </li>
                    </ul>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
/* eslint-disable semi */
export default {
  props: {
    selected: {
      type: Object,
      default: function () {
        return { name: '', id: '' }
      }
    },
    variable: {
      type: String
    },
    isShowCountry: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      loading: false,
      show: false,
      menus: [
        {
          pid: 0,
          id: '',
          name: '请选择',
          level: 0
        }
      ],
      pathMenus: [],
      currentLevel: 0,
      currentId: 0,
      store: {}, // 暂存数据
      hasDate: false,
      horizontal: 0
    }
  },
  computed: {
    curlevelActiveId: function () {
      return this.pathMenus.length > 0 && this.currentLevel <= this.pathMenus.length ? this.pathMenus[this.currentLevel - 1].id : '';
    }
  },
  watch: {
    'show': function (val, oldVal) {
      if (val) {
        this.init();
      }
    },
    'pathMenus': function (val, oldVal) {
      console.log('pathMenus');
      if (!this.show) {
        return;
      }
      var menus = [];
      for (var level = 0; level < this.pathMenus.length; level++) {
        menus.push({
          pid: level > 0 ? this.pathMenus[level - 1].id : 0,
          id: this.pathMenus[level].id,
          name: this.pathMenus[level].name,
          level: level
        });
      }
      var pid = this.pathMenus.length === 0 ? '0' : this.pathMenus[this.pathMenus.length - 1].id;
      if ((this.store['id' + pid] && this.store['id' + pid].length > 0) || this.hasDate) {
        menus.push({
          pid: pid,
          id: '',
          name: '请选择',
          level: this.pathMenus.length === 0 ? 0 : level
        })
        this.hasDate = false;
      } else {
        this.currentLevel = this.currentLevel === 0 ? 0 : this.currentLevel - 1;
      }
      this.menus = menus;
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    init: function () {
      // debugger;
      this.pathMenus = [];
      if (!this.selected) {
        this.selected = {
          name: '', id: ''
        }
      }
      this.loading = true;
      // console.log(_this.selected.id + "init#");
      if (this.selected.id) {
        window.Xa.get('/common/area/up_areas', { id: this.selected.id }, (result) => {
          if (result.status === 200) {
            if (result.data.length !== 0) {
              var dataList = [];
              result.data.sort(function (r1, r2) {
                return r1.level - r2.level;
              });
              for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].level === 1) {
                  if (!this.store['id0']) {
                    this.$set(this.store, 'id' + '0', result.data[i].data);
                  }
                } else if (result.data[i].data.length > 0) {
                  if (!this.store['id' + result.data[i - 1].id]) {
                    this.$set(this.store, 'id' + result.data[i - 1].id, result.data[i].data);
                  }
                }
                dataList[result.data[i].level - 1] = {
                  id: result.data[i].id,
                  name: result.data[i].name
                };
              }
              if (dataList.length > 0) {
                do {
                  this.pathMenus.push(dataList.shift());
                } while (dataList.length > 0);
              }
              this.currentLevel = this.pathMenus.length;
              this.currentId = this.selected.id;
            }
          }
          this.loading = false;
        });
      } else {
        if (this.store['id0']) {
          this.currentLevel = 0;
          this.loading = false;
          return;
        }
        this.menus = [];
        window.Xa.get('/common/area/areas', { upid: '0' }, (result) => {
          if (result.status === 200) {
            this.currentLevel = 0;
            this.$set(this.store, 'id0', result.data);
            this.menus.push({
              pid: 0,
              id: '',
              name: '请选择',
              level: 0
            })
          } else {
            // alert(result.message);
          }
          this.loading = false;
        });
      }
    },
    selectEnd() {
      this.show = false;
      this.$emit('areaSelectEnd', {
        variable: this.variable,
        action: 'areaSelect',
        val: {
          id: this.currentId,
          name: this.toString()
        }
      });
      this.pathMenus = [];
    },
    clickItem(item) {
      // console.log("clickItem" + JSON.stringify(item));
      this.hasDate = true;
      var storeData = this.store['id' + item.id];
      if (!storeData) {
        this.getNextLevelDate(item.id, item.name);
      } else if (storeData.length === 0) {
        this.selectEnd();
      }
      this.nextLevelTabs(item);
    },
    getNextLevelDate(id, name) {
      this.loading = true;
      window.Xa.get('/common/area/areas', { upid: id }, (result) => {
        if (result.status === 200) {
          if (result.data.length > 0) {
            this.$set(this.store, 'id' + id, result.data);
          } else {
            this.$set(this.store, 'id' + id, []);
            this.selectEnd();
            return;
          }
        } else {
          // alert(result.message);
          return;
        }
        this.loading = false;
      });
    },
    menusClick(item) {
      if (item) {
        this.currentLevel = item.level;
        if (!this.store['id' + item.pid]) {
          this.getNextLevelDate(item.pid);
        }
      }
    },
    nextLevelTabs(item) {
      if (this.currentLevel < this.pathMenus.length) {
        do {
          this.pathMenus.pop();
        } while (this.currentLevel < this.pathMenus.length);
      }
      this.currentId = item.id;
      this.currentLevel++;
      this.currentShowId = item.id;
      this.pathMenus.push({
        id: item.id,
        name: item.name
      });
    },
    toString() {
      var str = '';
      this.pathMenus.forEach(function (element) {
        str += element.name;
      });
      return str;
    }
  },
  filters: {
    getJsonObj(param) {
      return JSON.stringify(param);
    }
  }
}
</script>
<style scoped>
.chooseArea {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 10;
}
.chooseArea .area-mark {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
}
.chooseArea .area-tab {
  width: 80%;
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  height: 100%;
}
.chooseArea .area-tab-menu {
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  background: #eee;
  display: -webkit-box;
}
.chooseArea .area-tab-menu li {
  -webkit-box-flex: 1;
  box-sizing: border-box;
  cursor: pointer;
}
.chooseArea .area-tab-menu li.active {
  color: #0dc459;
  border-bottom: 2px solid #0dc459;
}
.chooseArea .area-tab-con {
  width: 100%;
  background: #fff;
  overflow: hidden;
  height: 100%;
  position: relative;
}
.chooseArea .area-tab-con ul {
  width: 100%;
  background: #fff;
  overflow: auto;
  overflow-x: hidden;
  padding-bottom: 40px;
}
.chooseArea .area-tab-con ul li {
  height: 40px;
  line-height: 40px;
  text-indent: 20px;
  border-bottom: 1px solid #e5e5e5;
  cursor: pointer;
}
.chooseArea .area-tab-con ul li.active {
  color: #0dc459;
}
.chooseArea .area-tab-con ul li:last-child {
  border: 0 none;
}
.chooseArea .loadtip {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.1);
  display: -webkit-box;
  -webkit-box-align: center;
  -webkit-box-pack: center;
}
.chooseArea .loadtip:after {
  content: "\e613";
  font-size: 20px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-family: "wechat";
  display: block;
  color: #555;
  -webkit-animation: loading 2s infinite linear;
}

.chooseArea .area-tab-menu {
  text-align: left;
}

.chooseArea .area-tab-menu li {
  display: inline-block;
  padding: 0 5px;
}

.chooseArea .area-tab-con ul {
  padding-bottom: 40px;
}

.chooseArea .area-menu-item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 5em;
  display: block;
}

.chooseArea .area-tab-con {
  overflow: auto;
}
</style>