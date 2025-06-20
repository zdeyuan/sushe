<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-03-06 14:42:51
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-03-06 16:13:41
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <!-- 编辑页 -->
      <veHqWeixiuEdit v-if="showType == 'edit'" ref="veHqWeixiuEdit" isDj @onOk="editOk" @onCancel="editCancel"> </veHqWeixiuEdit>
    </div>
  </edu-layout>
</template>

<script>
import veHqWeixiuEdit from './veHqWeixiuEdit';

export default {
  components: {
    veHqWeixiuEdit
  },
  data() {
    const data = {
      showType: 'edit'
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$nextTick(() => {
        this.showType = 'edit';
      });
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status0 {
  color: rgb(212, 117, 117);
}
</style>
