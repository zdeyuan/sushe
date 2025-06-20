<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqWeixiu" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="物品名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="维修地点" pname="place" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqWeixiuTable"
          code="veHqWeixiu"
          :api="veHqWeixiuTable.api"
          :get-params="getParams"
          :doImport="doImport"
          :exportConfig="{
            url: 'veHqWeixiu/export',
            name: '《维修记录表导出》'
          }"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="物品名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="维修方式" dataIndex="type" width="150px"> </a-table-column>
          <a-table-column title="维修地点" dataIndex="place"  width="150px"> </a-table-column>
          <a-table-column title="维修结果" width="150px" align="center" dataIndex="status">
            <template slot-scope="status">
              <edu-dict-text code="wxStatus" :class="'status' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="申请人" align="center" dataIndex="applyUserName" width="150px"> </a-table-column>
          <a-table-column title="经手人" align="center" dataIndex="jbUserName" width="150px"> </a-table-column>
          <a-table-column title="批准人" align="center" dataIndex="pjUserName" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqWeixiuEdit v-if="showType == 'edit'" ref="veHqWeixiuEdit" @onOk="editOk" @onCancel="editCancel"> </veHqWeixiuEdit>
      <veHqWeixiuShow v-if="showType == 'show'" ref="veHqWeixiuShow" @onOk="editOk" @onCancel="editCancel"> </veHqWeixiuShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqWeixiuApi from '@/views/logistics/ct/api/veHqWeixiuApi';
import veHqWeixiuEdit from './veHqWeixiuEdit';
import veHqWeixiuShow from './veHqWeixiuShow';

export default {
  components: {
    veHqWeixiuEdit,
    veHqWeixiuShow
  },
  data() {
    const data = {
      veHqWeixiuQuery: {},
      showType: 'table'
    };
    data.veHqWeixiuTable = {
      api: veHqWeixiuApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: [
          '物品名称',
          '维修地点',
          '维修方式',
          '维修结果',
          '申请人工号',
          '申请人姓名',
          '经手人编号',
          '经手人姓名',
          '批准人编号',
          '批准人姓名',
          '人员备注'
        ],
        tempName: '维修',
        implName: 'VeHqWeixiuServiceImpl.importExcel'
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
      this.$refs.veHqWeixiuTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqWeixiuEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqWeixiuEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqWeixiuShow.doUpdate(row);
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
      this.$refs.veHqWeixiuTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status0 {
  color: rgb(212, 117, 117);
}
</style>
