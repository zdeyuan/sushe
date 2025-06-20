<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqHaopin" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="编号" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="开始时间" pname="create_date" pop="gt" stype="date"> </edu-query-item>
            <edu-query-item title="结束时间" pname="create_date" pop="lt" stype="date"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqHaopinTable"
          code="veHqHaopin"
          :api="veHqHaopinTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            bdelete: false,
            delete: false,
            close: false,
            status: false,
            pageFn: 'pageDtoCount'
          }"
          isAutoBtn
          :to-update="handleUpdate"
          :toDetail="toDetail"
        >
          <!--         :exportConfig="{
            url: 'veHqHaopin/export',
            name: '《低耗品管理导出》'
          }"     <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="低耗品编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="低耗品名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="品牌" dataIndex="wppp" width="150px"> </a-table-column>
          <a-table-column title="计划使用年限" dataIndex="jhsynx" width="150px"> </a-table-column>
          <a-table-column title="物品单价" dataIndex="wpdj" width="150px"> </a-table-column>
          <a-table-column title="入库数量" dataIndex="inNum" width="150px"> </a-table-column>
          <a-table-column title="领用数量" dataIndex="outNum" width="150px"> </a-table-column>
        </edu-table>
      </div>
    </div>
  </edu-layout>
</template>

<script>
import veHqHaopinApi from '@/views/logistics/bx/api/veHqHaopinApi';

export default {
  components: {},
  data() {
    const data = {
      veHqHaopinQuery: {},
      showType: 'table'
    };
    data.veHqHaopinTable = {
      api: veHqHaopinApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 新增事件
     */
    doRuku(row, type) {
      this.showType = 'ruku';
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrEdit.doCreate(row, type);
      });
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
      this.$refs.veHqHaopinTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqHaopinEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqHaopinEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqHaopinShow.doShow(row);
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
      this.$refs.veHqHaopinTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
