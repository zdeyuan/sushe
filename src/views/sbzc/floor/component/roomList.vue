<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-05 14:28:25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-20 21:34:32
-->
<template>
  <a-select v-model="inputValue" allowClear :style="{ width: width }" placeholder="请选择" @change="onChange">
    <a-select-option v-for="item in options" :key="item.id" :value="item.id"> {{ item.code }}楼 </a-select-option>
  </a-select>
</template>

<script>
import veSbzcJzwRoomApi from '@/views/sbzc/floor/api/veSbzcJzwRoomApi';
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
    // this.init();
  },
  methods: {
    onChange() {
      setTimeout(() => {
        this.$emit('change');
      }, 0);
    },
    init(jzwId) {
      const params = {
        size: 1000,
        current: 1,
        conditions: [],
        sorts: [{ column: 'create_date', asc: false }]
      };
      // this.$utils.addPageConditions(params, 'is_delete', 'eq', 0);
      this.$utils.addPageConditions(params, 'floor_id', 'eq', jzwId);
      veSbzcJzwRoomApi.page(params).then(res => {
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
