<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-14 23:14:20
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-18 19:20:45
-->
<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyMeetRemind" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="会议名称" pname="a.title" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="通知标题" pname="d.title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyMeetRemindTable"
          code="veJkyMeetRemind"
          :api="veJkyMeetRemindTable.api"
          :get-params="getParams"
          :toDetail="toDetail"
          :config="{
            open: false,
            close: false,
            checkBox: false,
            status: false,
            delete: false,
            bdelete: false
          }"
          :sorts="[
            {
              column: 'd.id',
              asc: false
            }
          ]"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="会议名称" dataIndex="meetName" width="150px"> </a-table-column>
          <a-table-column title="通知标题" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="通知内容" dataIndex="content" width="150px"> </a-table-column>
          <a-table-column title="通知人员" dataIndex="userNames" width="150px"> </a-table-column>
          <a-table-column title="发送时间" dataIndex="createTime" width="200px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyMeetRemindShow v-if="showType == 'show'" ref="veJkyMeetRemindShow" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetRemindShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyMeetRemindApi from '@/api/research/rwork/veJkyMeetRemindApi';
import veJkyMeetRemindShow from './veJkyMeetRemindShow';
export default {
  components: {
    veJkyMeetRemindShow
  },
  data() {
    const data = {
      veJkyMeetRemindQuery: {},
      showType: 'table'
    };
    data.veJkyMeetRemindTable = {
      api: veJkyMeetRemindApi
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
      this.$refs.veJkyMeetRemindTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyMeetRemindShow.doUpdate(row);
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
      this.$refs.veJkyMeetRemindTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
