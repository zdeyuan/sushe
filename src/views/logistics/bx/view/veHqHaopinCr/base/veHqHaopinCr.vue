<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veHqHaopinCr" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="耗品名称" pname="a.NAME" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="数量" pname="number" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veHqHaopinCrTable"
        code="veHqHaopinCr"
        :api="veHqHaopinCrTable.api"
        :get-params="getParams"
        :config="{
          status: false,
          open: false,
          close: false,
          bdelete: false
        }"
        :toDetail="toDetail"
      >
        <!--            :exportConfig="{
          url: 'veHqHaopinCr/export',
          name: '《a-低耗品出入库导出》'
        }"     <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="耗品名称" dataIndex="hqName" width="150px"> </a-table-column>
        <a-table-column title="数量" dataIndex="number" width="150px"> </a-table-column>
        <a-table-column :title="viewType == 'chu' ? '出库时间' : '入库时间'" dataIndex="crTime" width="150px"> </a-table-column>
        <a-table-column title="备注" dataIndex="remark" width="150px"> </a-table-column>
        <a-table-column title="领用人" v-if="viewType == 'chu'" dataIndex="applyUserName" width="150px"> </a-table-column>
        <a-table-column title="批准人" dataIndex="pjUserName" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veHqHaopinCrShow v-if="showType == 'show'" ref="veHqHaopinCrShow" @onOk="editOk" @onCancel="editCancel"> </veHqHaopinCrShow>
  </div>
</template>

<script>
import veHqHaopinCrApi from '@/views/logistics/bx/api/veHqHaopinCrApi';
import veHqHaopinCrShow from './veHqHaopinCrShow';

export default {
  props: {
    viewType: String
  },
  components: {
    veHqHaopinCrShow
  },
  data() {
    const data = {
      veHqHaopinCrQuery: {},
      showType: 'table'
    };
    data.veHqHaopinCrTable = {
      api: veHqHaopinCrApi
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
      if (this.viewType == 'chu') {
        this.$utils.addPageConditions(params, 'type', 'eq', 2);
      } else {
        this.$utils.addPageConditions(params, 'type', 'eq', 1);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqHaopinCrTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrShow.doShow(row);
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
      this.$refs.veHqHaopinCrTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
