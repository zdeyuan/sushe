<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 17:57:41
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-06-08 20:27:41
-->
<template>
  <div class="user-select" :class="check ? 'check' : 'no-check'">
    <div class="flex" v-if="check">
      <div class="show-div">
        <div class="select-box" :style="{ height: height }">
          <span class="no-data-sapn" v-if="selectList.length == 0">请选择</span>
          <span class="select-ont" v-for="(item, index) in selectList" :key="item.id" @click="clickOne(index)">
            {{ item.name }}
            <a-icon type="close" class="select-close" />
          </span>
        </div>
      </div>
      <div class="select-div">
        <a-button type="primary" @click="show()">
          <a-icon type="plus" class="acion" />
          选择
        </a-button>
      </div>
    </div>

    <div v-else class="ant-select" :class="disable ? 'ant-select-disabled' : 'ant-select-enabled'">
      <div class="ant-select-selection ant-select-selection--single" @click="show()">
        <div class="ant-select-selection__rendered">
          <div unselectable="on" class="ant-select-selection__placeholder" v-if="selectList.length == 0">请选择</div>
          <div v-else class="ant-select-selection-selected-value" style="display: block; opacity: 1;"> {{ selectText }} </div>
        </div>
        <span unselectable="on" class="ant-select-arrow" style="user-select: none;">
          <a-icon :type="visible ? 'up' : 'down'" />
        </span>
      </div>
    </div>
    <!-- 编辑页 -->
    <userSelectFrom ref="userSelectFrom" v-if="visible" :check="check" @ok="onOk" @cancel="handelCancel"></userSelectFrom>
  </div>
</template>

<script>
import sysUserApi from '@/api/common/sysUserApi';
import userSelectFrom from '@/components/userSelectFrom';

export default {
  components: { userSelectFrom },
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    height: {
      type: String,
      default: 'auto'
    },
    check: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      visible: false,
      selectList: []
    };
    return data;
  },
  mounted() {},
  computed: {
    selectText() {
      const nameList = this.selectList.map(select => {
        return select.name;
      });
      return nameList.join();
    }
  },
  methods: {
    clickOne(index) {
      this.selectList.splice(index, 1);
    },
    show() {
      this.visible = true;
    },
    getValue() {
      if (this.check) {
        return this.selectList.map(item => item.id);
      } else {
        if (this.selectList.length > 0) {
          return this.selectList[0].id + '';
        }
        return null;
      }
    },
    getNames() {
      if (this.check) {
        return this.selectList.map(item => item.name);
      } else {
        if (this.selectList.length > 0) {
          return this.selectList[0].name;
        }
        return null;
      }
    },
    getObj() {
      if (this.check) {
        return this.selectList.map(item => {
          return {
            id: item.id,
            name: item.name
          };
        });
      } else {
        if (this.selectList.length > 0) {
          return {
            id: this.selectList[0].id,
            name: this.selectList[0].name
          };
        }
        return null;
      }
    },
    setObj(objs, nameKey) {
      if (!nameKey) nameKey = 'name';
      this.selectList.splice(0, this.selectList.length);
      objs.forEach(element => {
        this.selectList.push({
          id: element.id,
          name: element[nameKey]
        });
      });
    },
    setValue(ids) {
      this.selectList.splice(0, this.selectList.length);
      if (!ids || ids.length == 0) {
        return;
      }
	  
      ids.forEach(id => {
        sysUserApi.getTea(id).then(res => {
          const po = res.result;
          this.selectList.push({
            id: po.id,
            name: po.xm
          });
        });
      });
    },
    onOk(data) {
      this.selectList.splice(0, this.selectList.length);
      //这里判断
      if (data && data.length > 0) {
        if (this.check) {
          data.forEach(po => {
            this.selectList.push({
              id: po.id,
              name: po.xm
            });
          });
        } else {
          const po = data[0];
          this.selectList.push({
            id: po.id,
            name: po.xm
          });
        }
      }
      this.visible = false;
    },
    handelCancel() {
      this.visible = false;
    }
  }
};
</script>
<style lang="less" scoped>
.no-check {
  width: 300px;
  .flex {
    display: flex;
    .show-div {
      flex: 1;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      margin-right: 15px;
    }
    .select-div {
      width: 150px;
    }
  }
  .select-box {
    .select-ont {
      height: 24px;
      padding: 0 8px;
      line-height: 22px;
      box-sizing: border-box;
      margin: 2px 0 2px 6px;
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
      display: inline-block;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }
    .select-close {
      color: #909399;
      background-color: #c0c4cc;
      border-radius: 50%;
    }
    .no-data-sapn {
      display: inline-block;
      margin-left: 12px;
      color: #bbb;
    }
  }
}
.check {
  .flex {
    display: flex;
    .show-div {
      flex: 1;
      border: 1px solid #d9d9d9;
      border-radius: 3px;
      margin-right: 15px;
    }
    .select-div {
      width: 150px;
    }
  }
  .select-box {
    .select-ont {
      height: 24px;
      padding: 0 8px;
      line-height: 22px;
      box-sizing: border-box;
      margin: 2px 0 2px 6px;
      background-color: #f4f4f5;
      border-color: #e9e9eb;
      color: #909399;
      display: inline-block;
      border-radius: 5px;
      cursor: pointer;
      user-select: none;
    }
    .select-close {
      color: #909399;
      background-color: #c0c4cc;
      border-radius: 50%;
    }
    .no-data-sapn {
      display: inline-block;
      margin-left: 12px;
      color: #bbb;
    }
  }
}
</style>
