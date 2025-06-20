<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqYiliao" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="患者姓名" pname="patient" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="医疗时间" pname="yl_Time" pop="like" stype="date"> </edu-query-item>
            <edu-query-item title="医疗人员">
              <hqUserSelect v-model="veHqYiliaoQuery.hqUserId" hqUserType="1" @change="handleFilter"></hqUserSelect>
            </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqYiliaoTable"
          code="veHqYiliao"
          :api="veHqYiliaoTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veHqYiliao/export',
            name: '《医疗记录表导出》'
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :config="{
            status: false,
            open: false,
            close: false
          }"
          :doImport="doImport"
          :toDetail="toDetail"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="患者姓名" dataIndex="patient" width="150px"> </a-table-column>
          <a-table-column title="医疗时间" dataIndex="ylTime" width="150px"> </a-table-column>
          <a-table-column title="医疗原因" dataIndex="ylyy" width="150px"> </a-table-column>
          <a-table-column title="医疗人员" dataIndex="userName" width="150px"> </a-table-column>
          <a-table-column title="是否接受校外治疗" dataIndex="sfxw" width="150px">
            <template slot-scope="sfxw">
              <edu-dict-text code="shifou" :value="sfxw"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="医疗地址" dataIndex="address" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqYiliaoEdit v-if="showType == 'edit'" ref="veHqYiliaoEdit" @onOk="editOk" @onCancel="editCancel"> </veHqYiliaoEdit>
      <veHqYiliaoShow v-if="showType == 'show'" ref="veHqYiliaoShow" @onOk="editOk" @onCancel="editCancel"> </veHqYiliaoShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqYiliaoApi from '@/views/logistics/base/api/veHqYiliaoApi';
import veHqYiliaoEdit from './veHqYiliaoEdit';
import veHqYiliaoShow from './veHqYiliaoShow';

import hqUserSelect from '@/components/kqManageComponent/hqUserSelect';

export default {
  components: {
    veHqYiliaoEdit,
    hqUserSelect,
    veHqYiliaoShow
  },
  data() {
    const data = {
      veHqYiliaoQuery: {},
      showType: 'table'
    };
    data.veHqYiliaoTable = {
      api: veHqYiliaoApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['医疗时间', '患者姓名', '医疗原因', '医疗人', '是否接受校外治疗', '医疗地址', '备注'],
        tempName: '人员',
        implName: 'VeHqYiliaoServiceImpl.importExcel'
      };
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.veHqYiliaoQuery.hqUserId) {
        this.$utils.addPageConditions(params, 'hq_user_id', 'eq', this.veHqYiliaoQuery.hqUserId);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqYiliaoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqYiliaoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqYiliaoEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqYiliaoShow.doUpdate(row);
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
      this.$refs.veHqYiliaoTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
	::v-deep .ant-select-selection--single{
		width: 200px;
	}
</style>
