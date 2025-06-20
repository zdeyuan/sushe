<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:14:20
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 17:23:43
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyMeetSummary" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="会议名称" pname="a.title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="纪要标题" pname="d.title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyMeetSummaryTable"
          code="veJkyMeetSummary"
          :api="veJkyMeetSummaryTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :sorts="[
            {
              column: 'd.id',
              asc: false
            }
          ]"
        >
          <a-table-column title="会议名称" dataIndex="meetName" width="150px"> </a-table-column>
          <a-table-column title="纪要标题" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="纪要内容" dataIndex="content"> </a-table-column>
          <a-table-column title="创建用户" dataIndex="createName" width="150px"> </a-table-column>
          <a-table-column title="创建时间" dataIndex="createTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyMeetSummaryShow v-if="showType == 'show'" ref="veJkyMeetSummaryShow" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetSummaryShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyMeetSummaryApi from '@/api/research/rwork/veJkyMeetSummaryApi';
import veJkyMeetSummaryShow from './veJkyMeetSummaryShow';

export default {
  components: {
    veJkyMeetSummaryShow
  },
  data() {
    const data = {
      veJkyMeetSummaryQuery: {},
      showType: 'table'
    };
    data.veJkyMeetSummaryTable = {
      api: veJkyMeetSummaryApi
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
      this.$refs.veJkyMeetSummaryTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryShow.doShow(
          {
            title: row.meetName
          },
          row
        );
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
      this.$refs.veJkyMeetSummaryTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
