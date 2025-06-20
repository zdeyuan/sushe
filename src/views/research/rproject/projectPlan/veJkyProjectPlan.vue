<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyProjectPlan" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="项目编号" pname="a.serial" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="项目名称" pname="a.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="项目计划名称" pname="d.title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyProjectPlanTable"
          code="veJkyProjectPlan"
          :api="veJkyProjectPlanTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
          :config="{ close: false, open: false, status: false }"
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
          <a-table-column title="项目编号" dataIndex="projectSerial" width="150px"> </a-table-column>
          <a-table-column title="项目名称" dataIndex="projectName" width="150px"> </a-table-column>
          <a-table-column title="项目计划名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="发布人" dataIndex="createName" width="150px"> </a-table-column>
          <a-table-column title="发布时间" dataIndex="createTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyProjectPlanEdit v-if="showType == 'edit'" ref="veJkyProjectPlanEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectPlanEdit>
      <veJkyProjectPlanShow v-if="showType == 'show'" ref="veJkyProjectPlanShow" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectPlanShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyProjectPlanApi from '@/api/research/rproject/veJkyProjectPlanApi';
import veJkyProjectPlanEdit from './veJkyProjectPlanEdit';
import veJkyProjectPlanShow from './veJkyProjectPlanShow';

export default {
  components: {
    veJkyProjectPlanEdit,
    veJkyProjectPlanShow
  },
  data() {
    const data = {
      veJkyProjectPlanQuery: {},
      showType: 'table'
    };
    data.veJkyProjectPlanTable = {
      api: veJkyProjectPlanApi
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
      this.$refs.veJkyProjectPlanTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectPlanEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectPlanEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyProjectPlanShow.doShow(row);
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
      this.$refs.veJkyProjectPlanTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
