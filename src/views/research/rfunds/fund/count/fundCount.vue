<!--
 * @Descripttion: 
 * @version: 1.0
 * @Author: Erik Zhang
 * @Date: 2021-02-18 08:41:59
 * @LastEditors: Erik Zhang
 * @LastEditTime: 2021-02-27 19:09:54
-->
<template>
  <!-- 表格 -->
  <div class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyFund" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="项目名称" pname="b.name" width="150px" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目编号" pname="b.serial" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="起始时间" pname="d.apply_time" pop="gt" stype="date"  placeholder="请选择时间"  > </edu-query-item>
		  <edu-query-item title="结束时间" pname="d.apply_time" pop="lt" stype="date"  placeholder="请选择时间"  > </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyFundTable"
        code="veJkyFund"
        :api="veJkyFundTable.api"
        :get-params="getParams"
        :exportConfig="{
          url: 'veJkyFund/export',
          name: '《经费统计导出》'
        }"
        :toDetail="toDetail"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false,
          checkBox: false,
          delete: false
        }"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目名称" dataIndex="projectName" width="150px"> </a-table-column>
        <a-table-column title="项目编号" dataIndex="projectSerial" width="150px"> </a-table-column>
        <a-table-column title="预算费用" dataIndex="totalCost" width="150px">
          <template slot-scope="totalCost"> {{ totalCost.toFixed(2) }}元 </template>
        </a-table-column>
        <a-table-column title="申请人" dataIndex="userName" width="150px"> </a-table-column>
        <a-table-column title="申请时间" dataIndex="applyTime" width="150px"> </a-table-column>
        <a-table-column title="审批人" dataIndex="adminName" width="150px"> </a-table-column>
        <template>
          <a-table-column title="审批状态" dataIndex="status" width="150px">
            <template slot-scope="status">
              <edu-dict-text code="fundAudit" :class="'ffstatus' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
        </template>
      </edu-table>
    </div>
    <veJkyFundShow v-if="showType == 'show'" ref="veJkyFundShow" @onOk="editOk" @onCancel="editCancel"> </veJkyFundShow>
  </div>
</template>

<script>
import veJkyFundApi from '@/api/research/rfunds/veJkyFundApi';
import veJkyFundShow from '../../fund/base/veJkyFundShow';

export default {
  components: { veJkyFundShow },
  data() {
    const data = {
      veJkyFundQuery: {},
      showType: 'table'
    };
    data.veJkyFundTable = {
      api: veJkyFundApi
    };
    return data;
  },
  mounted() {},
  methods: {
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyFundShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    doExport(row) {},
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
      this.$refs.veJkyFundTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>

</style>
