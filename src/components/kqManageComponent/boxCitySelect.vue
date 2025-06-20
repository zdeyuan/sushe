<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:28:25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-04-11 13:27:31
-->
<template>
  <span>
    <a-select :disabled="disabled" v-model="shenId" :style="{ width: width }" placeholder="请选择省" @change="onShen">
      <a-select-option v-for="item in shenList" :key="item.name" :value="item.name">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <a-select :disabled="disabled" v-model="shiId" :style="{ width: width, marginLeft: '15px' }" placeholder="请选择市" @change="onShi">
      <a-select-option v-for="item in shiList" :key="item.name" :value="item.name">
        {{ item.name }}
      </a-select-option>
    </a-select>
    <a-select :disabled="disabled" v-model="quId" :style="{ width: width, marginLeft: '15px' }" placeholder="请选择区县">
      <a-select-option v-for="item in xianList" :key="item" :value="item">
        {{ item }}
      </a-select-option>
    </a-select>
  </span>
</template>

<script>
import city from '@/utils/libs/city';

export default {
  props: {
    width: {
      type: String,
      default: '200px'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const data = {
      shenList: city,
      shiList: [],
      xianList: [],
      shenId: null,
      shiId: null,
      quId: null
    };
    /*     fal_id
spec_id
bj_id
grade_id */

    return data;
  },

  mounted() {},
  methods: {
    setValue(data) {
      this.shenId = data.province;
      this.onShen(() => {
        this.shiId = data.city;
        this.onShi();
        this.quId = data.county;
      });
    },
    getSetValue(data) {
      data.province = this.shenId;
      data.city = this.shiId;
      data.county = this.quId;
    },
    onShen(callback) {
      this.shiId = null;
      this.quId = null;
      setTimeout(() => {
        for (let i = 0; i < city.length; i++) {
          const element = city[i];
          if (element.name == this.shenId) {
            this.shiList = element.city;
            if (callback) callback();
            return;
          }
        }
      }, 100);
    },
    onShi() {
      this.quId = null;
      setTimeout(() => {
        for (let i = 0; i < this.shiList.length; i++) {
          const element = this.shiList[i];
          if (element.name == this.shiId) {
            this.xianList = element.districtAndCounty;
            return;
          }
        }
      }, 100);
    }
  }
};
</script>
<style scoped>
/* 单选间距 */
.a-radio {
  margin-right: 10px;
}
.title {
  display: inline-block;
  text-align: right;
  padding-right: 5px;
  min-width: 60px;
}
</style>
