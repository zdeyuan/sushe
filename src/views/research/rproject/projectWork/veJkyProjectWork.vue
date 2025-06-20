<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyProjectWork" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="项目编号" pname="a.serial" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="项目名称" pname="a.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="工作名称" pname="d.title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyProjectWorkTable"
          code="veJkyProjectWork"
          :api="veJkyProjectWorkTable.api"
          :get-params="getParams"
          :toDetail="toDetail"
          :to-update="handleUpdate"
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
          <a-table-column title="工作名称" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="工作进度" dataIndex="progress" width="150px">
            <template slot-scope="progress">
              {{ progress }}%
              <span></span>
            </template>
          </a-table-column>
          <a-table-column title="工作人员" dataIndex="userNames" width="150px"> </a-table-column>
          <a-table-column title="工作开始时间" dataIndex="startTime" width="150px"> </a-table-column>
          <a-table-column title="工作结束时间" dataIndex="endTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyProjectWorkEdit v-if="showType == 'edit'" ref="veJkyProjectWorkEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectWorkEdit>
      <veJkyProjectWorkShow v-if="showType == 'show'" ref="veJkyProjectWorkShow" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectWorkShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyProjectWorkApi from '@/api/research/rproject/veJkyProjectWorkApi';
import veJkyProjectWorkEdit from './veJkyProjectWorkEdit';
import veJkyProjectWorkShow from './veJkyProjectWorkShow';

export default {
  components: {
    veJkyProjectWorkEdit,
    veJkyProjectWorkShow
  },
  data() {
    const data = {
      veJkyProjectWorkQuery: {},
      showType: 'table'
    };
    data.veJkyProjectWorkTable = {
      api: veJkyProjectWorkApi
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
      this.$refs.veJkyProjectWorkTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkShow.doShow(row);
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
      this.$refs.veJkyProjectWorkTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
