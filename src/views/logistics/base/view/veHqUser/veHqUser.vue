<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqUser" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="身份证号" pname="sfzh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="出生年月" pname="csny" pop="like" stype="date"> </edu-query-item>
            <edu-query-item title="人员类型" width='200px;' pname="user_Type" pop="eq" stype="select" code="hqUserType"> </edu-query-item>
            <edu-query-item title="上岗时间" pname="sg_Time" pop="like" stype="date"> </edu-query-item>
            <edu-query-item title="离岗时间" pname="lg_Time" pop="like" stype="date"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqUserTable"
          code="veHqUser"
          :api="veHqUserTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veHqUser/export',
            name: '《人员信息导出》'
          }"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :doImport="doImport"
          :toDetail="toDetail"
          :to-update="handleUpdate"
        >
          <template slot="top_bef_btn">
            <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="添加校内人员" @click="handleCreate('in')"></edu-pms>
            <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="添加校外人员" @click="handleCreate('out')"></edu-pms>
          </template>
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="工号" dataIndex="number" width="150px"> </a-table-column>
          <a-table-column title="姓名" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="性别" dataIndex="sex" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="sex" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="出生年月" dataIndex="csny" width="150px"> </a-table-column>
          <a-table-column title="家庭住址" dataIndex="address" width="150px"> </a-table-column>
          <a-table-column title="联系电话" dataIndex="phone" width="150px"> </a-table-column>
          <a-table-column title="人员分类" dataIndex="flag" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="userType" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="人员类型 " dataIndex="userType" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="hqUserType" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="上岗时间" dataIndex="sgTime" width="150px"> </a-table-column>
          <a-table-column title="离岗时间" dataIndex="lgTime" width="150px"> </a-table-column>
          <a-table-column title="状态" dataIndex="rzzt" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="hqUserStatus" :class="'status' + text" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqUserEdit v-if="showType == 'edit'" ref="veHqUserEdit" @onOk="editOk" @onCancel="editCancel"> </veHqUserEdit>
      <veHqUserShow v-if="showType == 'show'" ref="veHqUserShow" @onOk="editOk" @onCancel="editCancel"> </veHqUserShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqUserApi from '@/views/logistics/base/api/veHqUserApi';
import veHqUserEdit from './veHqUserEdit';
import veHqUserShow from './veHqUserShow';

export default {
  components: {
    veHqUserEdit,
    veHqUserShow
  },
  data() {
    const data = {
      veHqUserQuery: {},
      showType: 'table'
    };
    data.veHqUserTable = {
      api: veHqUserApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['姓名', '身份证号', '性别', '出生年月', '家庭住址', '联系电话', '人员类型', '上岗时间', '离岗时间', '人员状态', '人员备注'],
        tempName: '人员',
        implName: 'VeHqUserServiceImpl.importExcel'
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
      this.$refs.veHqUserTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate(type) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqUserEdit.doCreate(type);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqUserEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqUserShow.doUpdate(row);
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
      this.$refs.veHqUserTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status2 {
  color: rgb(212, 117, 117);
}

::v-deep .ant-select-selection--single{
	width: 200px;
}
</style>
