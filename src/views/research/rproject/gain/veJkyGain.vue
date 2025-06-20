<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyGain" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="项目名称" pname="d.project_name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="项目编号" pname="a.serial" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="项目成果名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyGainTable"
          code="veJkyGain"
          :api="veJkyGainTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
          :toDetail="toDetail"
          :config="{
            status: false,
            open: false,
            close: false
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
          <a-table-column title="项目名称" dataIndex="projectName" width="150px"> </a-table-column>
          <a-table-column title="项目编号" dataIndex="serial" width="150px"> </a-table-column>
          <a-table-column title="项目成果名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="项目成果人员" dataIndex="userNames" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyGainEdit v-if="showType == 'edit'" editViewType="xm" ref="veJkyGainEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyGainEdit>
      <veJkyGainShow v-if="showType == 'show'" ref="veJkyGainShow" @onOk="editOk" @onCancel="editCancel"> </veJkyGainShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyGainApi from '@/api/research/rproject/veJkyGainApi';
import veJkyGainEdit from './veJkyGainEdit';
import veJkyGainShow from './veJkyGainShow';

export default {
  components: {
    veJkyGainEdit,
    veJkyGainShow
  },
  data() {
    const data = {
      veJkyGainQuery: {},
      showType: 'table'
    };
    data.veJkyGainTable = {
      api: veJkyGainApi
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
      this.$utils.addPageConditions(params, 'd.project_id', 'ne', 0);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyGainTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyGainEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyGainEdit.doUpdate(row);
      });
    },
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyGainShow.doShow(row);
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
      this.$refs.veJkyGainTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
