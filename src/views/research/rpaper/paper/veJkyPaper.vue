<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyPaper" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="教师姓名" pname="a.realname" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="教师工号" pname="a.work_num" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyPaperTable"
          code="veJkyPaper"
          :api="veJkyPaperTable.api"
          :get-params="getParams"
          :config="{
            status: false,
            open: false,
            close: false
          }"
          :exportConfig="{
            url: 'veJkyPaper/export',
            name: '《论文导出》'
          }"
          :to-update="handleUpdate"
          :do-add="handleCreate"
          :doImport="doImport"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="工号" dataIndex="workNum" width="150px"> </a-table-column>
          <a-table-column title="教师姓名" dataIndex="userName" width="150px"> </a-table-column>
          <a-table-column title="教师部门" dataIndex="depart" width="150px"> </a-table-column>
          <a-table-column title="论文编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="论文中文名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="论文英文名称" dataIndex="engName" width="150px"> </a-table-column>
          <a-table-column title="期刊名称" dataIndex="journalName" width="150px"> </a-table-column>
          <a-table-column title="发表时间" dataIndex="pubTime" width="150px"> </a-table-column>
          <a-table-column title="出版号" dataIndex="pubCode" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyPaperEdit v-if="showType == 'edit'" ref="veJkyPaperEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyPaperEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyPaperApi from '@/api/research/rpaper/veJkyPaperApi';
import veJkyPaperEdit from './veJkyPaperEdit';

export default {
  components: {
    veJkyPaperEdit
  },
  data() {
    const data = {
      veJkyPaperQuery: {},
      showType: 'table'
    };
    data.veJkyPaperTable = {
      api: veJkyPaperApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {},
    doExport() {},
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
      this.$refs.veJkyPaperTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyPaperEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyPaperEdit.doUpdate(row);
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
      this.$refs.veJkyPaperTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
