<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="hqStuHealthUser" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="标题" pname="title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="hqStuHealthUserTable"
          code="hqStuHealthUser"
          :api="hqStuHealthUserTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            checkBox: false,
            status: false
          }"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" dataIndex="xm" width="150px"> </a-table-column>
          <a-table-column title="学号" dataIndex="xh" width="150px"> </a-table-column>
          <a-table-column title="标题" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="发布时间 " dataIndex="createDate" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <hqStuHealthUserEdit v-if="showType == 'edit'" ref="hqStuHealthUserEdit" @onOk="editOk" @onCancel="editCancel"> </hqStuHealthUserEdit>
      <hqStuHealthUserShow v-if="showType == 'show'" ref="hqStuHealthUserShow" @onOk="editOk" @onCancel="editCancel"> </hqStuHealthUserShow>
    </div>
  </edu-layout>
</template>

<script>
import hqStuHealthUserApi from '../../api/hqStuHealthUserApi';
import hqStuHealthUserEdit from './hqStuHealthUserEdit';
import hqStuHealthUserShow from './hqStuHealthUserShow';

export default {
  components: {
    hqStuHealthUserEdit,
    hqStuHealthUserShow
  },
  data() {
    const data = {
      hqStuHealthUserQuery: {},
      showType: 'table'
    };
    data.hqStuHealthUserTable = {
      api: hqStuHealthUserApi
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
      this.$refs.hqStuHealthUserTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthUserEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthUserEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.hqStuHealthUserShow.doShow(row);
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
      this.$refs.hqStuHealthUserTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
