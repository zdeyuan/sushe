<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyAdmin" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="电话" pname="phone" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="工号" pname="work_Num" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyAdminTable"
          code="veJkyAdmin"
          :api="veJkyAdminTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="电话" dataIndex="phone" width="150px"> </a-table-column>
          <a-table-column title="工号" dataIndex="workNum" width="150px"> </a-table-column>
          <a-table-column title="部门" dataIndex="depart" width="150px"> </a-table-column>
          <a-table-column title="职务" dataIndex="posts" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyAdminEdit v-if="showType == 'edit'" ref="veJkyAdminEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyAdminEdit>
    </div>
  </edu-layout>
</template>

<script>
import veJkyAdminApi from '@/api/research/rbase/veJkyAdminApi';
import veJkyAdminEdit from './veJkyAdminEdit';

export default {
  components: {
    veJkyAdminEdit
  },
  data() {
    const data = {
      veJkyAdminQuery: {},
      showType: 'table'
    };
    data.veJkyAdminTable = {
      api: veJkyAdminApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      var params = this.$refs['cwQuery'].getQueryData();
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyAdminTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyAdminEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyAdminEdit.doUpdate(row);
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
      this.$refs.veJkyAdminTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
