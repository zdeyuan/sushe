<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" ext="boxZybmbj" :nianji="false" code="veStuHealthReport" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuHealthReportTable"
          code="veStuHealthReport"
          :api="veStuHealthReportTable.api"
          :get-params="getParams"
          :doImport="doImport"
          :exportConfig="{
            url: 'veStuHealthReport/export',
            name: '《体质健康记录导出》'
          }"
          :config="{
            open: false,
            close: false,
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
          <a-table-column title="班级" dataIndex="bjText" width="150px"> </a-table-column>
          <a-table-column title="开始时间" dataIndex="startTime" width="150px"> </a-table-column>
          <a-table-column title="结束时间" dataIndex="endTime" width="150px"> </a-table-column>
          <a-table-column title="健康体质得分" dataIndex="score" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuHealthReportEdit v-if="showType == 'edit'" ref="veStuHealthReportEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHealthReportEdit>
      <veStuHealthReportShow v-if="showType == 'show'" ref="veStuHealthReportShow" @onOk="editOk" @onCancel="editCancel"> </veStuHealthReportShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuHealthReportApi from '../../api/veStuHealthReportApi';
import veStuHealthReportEdit from './veStuHealthReportEdit';
import veStuHealthReportShow from './veStuHealthReportShow';

export default {
  components: {
    veStuHealthReportEdit,
    veStuHealthReportShow
  },
  data() {
    const data = {
      veStuHealthReportQuery: {},
      showType: 'table'
    };
    data.veStuHealthReportTable = {
      api: veStuHealthReportApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['姓名' /* stuId */, '学号' /* stuId */, '开始时间' /* startTime */, '结束时间' /* endTime */, '健康体质得分' /* score */],
        tempName: '体质健康记录',
        implName: 'veStuHealthReportServiceImpl.importExcel'
      };
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuHealthReportTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHealthReportEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHealthReportEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuHealthReportShow.doShow(row);
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
      this.$refs.veStuHealthReportTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
