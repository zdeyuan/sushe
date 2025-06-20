<!--
 * @Descripttion: 木麻模板 列表页面
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2020-11-25
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 14:04:57
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="template" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="级别名称" pname="name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="排序" pname="list_sort" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table ref="templateTable" code="template" :api="templateTable.api" :get-params="getParams" :to-update="handleUpdate" :do-add="doAdd">
          <!--         <template slot-scope="text, record, index">
          <span></span>
          </template>-->
          <a-table-column title="级别名称" dataIndex="name"> </a-table-column>
          <a-table-column title="排序" dataIndex="listSort" width="200px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <levelEdit ref="levelEdit" v-if="showType == 'edit'" @onOk="editOk" @onCancel="editCancel"> </levelEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyLevelApi from '@/api/research/rbase/veJkyLevelApi';
import levelEdit from './levelEdit';

export default {
  components: {
    levelEdit
  },
  data() {
    const data = {
      templateQuery: {},
      showType: 'table'
    };
    data.templateTable = {
      api: veJkyLevelApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @name: Erik Zhang
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      var params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @name: Erik Zhang
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.templateTable.reload();
    },
    doAdd() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.levelEdit.doCreate();
      });
    },

    /**
     * @name: Erik Zhang
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.levelEdit.doUpdate(row);
      });
    },
    /**
     * @name: Erik Zhang
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    /**
     * @name: Erik Zhang
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$refs.templateTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
