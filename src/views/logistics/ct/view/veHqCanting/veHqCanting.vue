<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqCanting" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="餐厅名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="餐厅位置" pname="ctwz" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="建设时间" pname="js_Time" pop="gt" stype="date"> </edu-query-item>
            <edu-query-item title="负责人" pname="fzr_Name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqCantingTable"
          code="veHqCanting"
          :api="veHqCantingTable.api"
          :get-params="getParams"
          :toDetail="toDetail"
          :exportConfig="{
            url: 'veHqCanting/export',
            name: '《餐厅表导出》'
          }"
          :config="{
            delete: false,
            bdelete: false
          }"
          :doImport="doImport"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="餐厅名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="餐厅位置" dataIndex="ctwz" width="150px"> </a-table-column>
          <a-table-column title="餐厅楼层" dataIndex="ctlc" width="150px"> </a-table-column>
          <a-table-column title="开放窗口数" dataIndex="kfcks" width="150px"> </a-table-column>
          <a-table-column title="容纳人数" dataIndex="rnrs" width="150px"> </a-table-column>
          <a-table-column title="建设时间" dataIndex="jsTime" width="150px"> </a-table-column>
          <a-table-column title="负责人" dataIndex="fzrName" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqCantingEdit v-if="showType == 'edit'" ref="veHqCantingEdit" @onOk="editOk" @onCancel="editCancel"> </veHqCantingEdit>
      <veHqCantingShow v-if="showType == 'show'" ref="veHqCantingShow" @onOk="editOk" @onCancel="editCancel"> </veHqCantingShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqCantingApi from '@/views/logistics/ct/api/veHqCantingApi';
import veHqCantingEdit from './veHqCantingEdit';
import veHqCantingShow from './veHqCantingShow';

export default {
  components: {
    veHqCantingEdit,
    veHqCantingShow
  },
  data() {
    const data = {
      veHqCantingQuery: {},
      showType: 'table'
    };
    data.veHqCantingTable = {
      api: veHqCantingApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['餐厅名称', '餐厅位置', '餐厅楼层', '开放窗口数', '容纳人数', '建设时间', '餐厅状态', '负责人工号', '负责人姓名', '人员备注'],
        tempName: '餐厅',
        implName: 'VeHqCantingServiceImpl.importExcel'
      };
    },
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
      this.$refs.veHqCantingTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqCantingEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqCantingEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqCantingShow.doUpdate(row);
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
      this.$refs.veHqCantingTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
