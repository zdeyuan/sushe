<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:14:20
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-15 15:02:40
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyMeetPlace" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="场地名称" pname="name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyMeetPlaceTable"
          code="veJkyMeetPlace"
          :api="veJkyMeetPlaceTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="场地名称" dataIndex="name" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyMeetPlaceEdit v-if="showType == 'edit'" ref="veJkyMeetPlaceEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetPlaceEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyMeetPlaceApi from '@/api/research/rwork/veJkyMeetPlaceApi';
import veJkyMeetPlaceEdit from './veJkyMeetPlaceEdit';

export default {
  components: {
    veJkyMeetPlaceEdit
  },
  data() {
    const data = {
      veJkyMeetPlaceQuery: {},
      showType: 'table'
    };
    data.veJkyMeetPlaceTable = {
      api: veJkyMeetPlaceApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyMeetPlaceTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyMeetPlaceEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyMeetPlaceEdit.doUpdate(row);
      });
    },
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
      this.$refs.veJkyMeetPlaceTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
