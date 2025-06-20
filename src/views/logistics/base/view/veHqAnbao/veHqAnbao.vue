<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqAnbao" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="记录人姓名">
              <hqUserSelect v-model="veHqAnbaoQuery.hqUserId" hqUserType="3" @change="handleFilter"></hqUserSelect>
            </edu-query-item>
            <edu-query-item title="记录时间" pname="jl_Time" pop="like" stype="date"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqAnbaoTable"
          code="veHqAnbao"
          :api="veHqAnbaoTable.api"
          :get-params="getParams"
          :toDetail="toDetail"
          :doImport="doImport"
          :exportConfig="{
            url: 'veHqAnbao/export',
            name: '《安保记录表导出》'
          }"
          :config="{
            status: false,
            open: false,
            close: false
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="记录时间" align="center" dataIndex="jlTime" width="150px"> </a-table-column>
          <a-table-column title="记录人姓名" align="center" dataIndex="userName" width="150px"> </a-table-column>
          <a-table-column title="安保状态" align="center" dataIndex="jllx" width="150px">
            <template slot-scope="jllx">
              <edu-dict-text code="anbaozStatus" :value="jllx"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqAnbaoEdit v-if="showType == 'edit'" ref="veHqAnbaoEdit" @onOk="editOk" @onCancel="editCancel"> </veHqAnbaoEdit>
      <veHqAnbaoShow v-if="showType == 'show'" ref="veHqAnbaoShow" @onOk="editOk" @onCancel="editCancel"> </veHqAnbaoShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqAnbaoApi from '@/views/logistics/base/api/veHqAnbaoApi';
import veHqAnbaoEdit from './veHqAnbaoEdit';
import veHqAnbaoShow from './veHqAnbaoShow';

import hqUserSelect from '@/components/kqManageComponent/hqUserSelect';

export default {
  components: {
    veHqAnbaoEdit,
    veHqAnbaoShow,
    hqUserSelect
  },
  data() {
    const data = {
      veHqAnbaoQuery: {},
      showType: 'table'
    };
    data.veHqAnbaoTable = {
      api: veHqAnbaoApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['记录时间', '记录姓名', '记录类型', '备注'],
        tempName: '人员',
        implName: 'veHqAnbaoServiceImpl.importExcel'
      };
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.veHqAnbaoQuery.hqUserId) {
        this.$utils.addPageConditions(params, 'hq_user_id', 'eq', this.veHqAnbaoQuery.hqUserId);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqAnbaoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqAnbaoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqAnbaoEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqAnbaoShow.doUpdate(row);
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
      this.$refs.veHqAnbaoTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
	::v-deep .ant-select-selection--single{
		width: 200px;
	}
</style>
