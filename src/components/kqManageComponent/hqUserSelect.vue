<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:28:25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-05 14:56:25
-->
<template>
  <a-select v-model="inputValue" allowClear :style="{ width: width }" placeholder="请选择用户" @change="onChange">
    <a-select-option v-for="item in options" :key="item.id" :value="item.id">
      {{ item.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import veHqUserApi from '@/views/logistics/base/api/veHqUserApi';
export default {
  model: {
    // prop即 父组件使用 v-model 绑定的属性,这个名称是自定义的
    prop: 'value',
    // event即 子组件会向父组件触发的事件,父组件的 v-model可以监听到这个事件,并将vlaue赋值给v-model绑定的属性
    event: 'input'
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    value: {
      type: [String, Array],
      default: function() {
        return [];
      }
    },
    hqUserType: {
      type: String,
      default: '1'
    }
  },
  data() {
    const data = {
      options: []
    };
    return data;
  },
  computed: {
    inputValue: {
      get: function() {
        if (this.value === null || this.value === '') return undefined;
        return this.value;
      },
      set: function(value) {
        this.$emit('input', value);
      }
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    onChange() {
      this.$emit('change');
    },
    init() {
      const params = {
        size: 1000,
        current: 1,
        conditions: [],
        sorts: [{ column: 'id', asc: false }]
      };
      this.$utils.addPageConditions(params, 'USER_TYPE', 'eq', this.hqUserType);
      this.$utils.addPageConditions(params, 'rzzt', 'eq', 1);
      veHqUserApi.page(params).then(res => {
        this.options = res.result.records;
      });
    }
  }
};
</script>
<style scoped>
/* 单选间距 */
.a-radio {
  margin-right: 10px;
}
</style>
