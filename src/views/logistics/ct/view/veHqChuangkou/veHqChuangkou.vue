<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqChuangkou" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="餐厅名称">
              <ctList v-model="veHqChuangkouQuery.ctId" @change="handleFilter"></ctList>
            </edu-query-item>
            <edu-query-item title="窗口名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="合作者姓名" pname="hzz_Name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="负责人" pname="d.fzr_Name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqChuangkouTable"
          code="veHqChuangkou"
          :api="veHqChuangkouTable.api"
          :get-params="getParams"
          :doImport="doImport"
          :toDetail="toDetail"
          :exportConfig="{
            url: 'veHqChuangkou/export',
            name: '《餐厅窗口表导出》'
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
          <a-table-column title="餐厅名称" dataIndex="ctName" width="150px"> </a-table-column>
          <a-table-column title="窗口名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="合作者姓名" dataIndex="hzzName" width="150px"> </a-table-column>
          <a-table-column title="负责人" dataIndex="fzrName" width="150px"> </a-table-column>
          <a-table-column title="窗口状态" dataIndex="status" width="150px">
            <template slot-scope="text">
              <edu-dict-text code="ctStatus" :class="'status' + text" :value="text"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqChuangkouEdit v-if="showType == 'edit'" ref="veHqChuangkouEdit" @onOk="editOk" @onCancel="editCancel"> </veHqChuangkouEdit>
      <veHqChuangkouShow v-if="showType == 'show'" ref="veHqChuangkouShow" @onOk="editOk" @onCancel="editCancel"> </veHqChuangkouShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqChuangkouApi from '@/views/logistics/ct/api/veHqChuangkouApi';
import veHqChuangkouEdit from './veHqChuangkouEdit';
import veHqChuangkouShow from './veHqChuangkouShow';
import ctList from '@/views/logistics/ct/component/ctList';

export default {
  components: {
    veHqChuangkouEdit,
    ctList,
    veHqChuangkouShow
  },
  data() {
    const data = {
      veHqChuangkouQuery: {},
      showType: 'table'
    };
    data.veHqChuangkouTable = {
      api: veHqChuangkouApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: ['餐厅名称', '窗口名称', '合作者姓名', '窗口状态', '窗口负责人工号', '窗口负责人姓名', '备注', '负责人编号', '负责人姓名', '人员备注'],
        tempName: '窗口',
        implName: 'VeHqChuangkouServiceImpl.importExcel'
      };
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.veHqChuangkouQuery.ctId) {
        this.$utils.addPageConditions(params, 'ct_id', 'eq', this.veHqChuangkouQuery.ctId);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqChuangkouTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqChuangkouEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqChuangkouEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqChuangkouShow.doUpdate(row);
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
      this.$refs.veHqChuangkouTable.reload();
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
