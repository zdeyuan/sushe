<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqWupin" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="物品编号" pname="d.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="物品名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="购置时间" pname="d.gz_Time" pop="gt" stype="date"> </edu-query-item>
            <edu-query-item title="物品类型" stype="costom">
              <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="bgwuList"></edu-tree-select>
            </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqWupinTable"
          code="veHqWupin"
          :api="veHqWupinTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veHqWupin/export',
            name: '《办公物品信息导出》'
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :doImport="doImport"
          :config="{
            delete: false,
            bdelete: false
            //     status: false
          }"
          :toDetail="toDetail"
          :to-update="handleUpdate"
          :do-add="handleCreate"
          :opWidth="300"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="物品编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="物品名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="物品分类" dataIndex="wpflName" width="150px"> </a-table-column>
          <a-table-column title="物品单价" dataIndex="wpdj" width="150px"> </a-table-column>
          <!--           <a-table-column title="物品状态" dataIndex="status" width="150px"> </a-table-column> -->
          <a-table-column title="购置时间" dataIndex="gzTime" width="150px"> </a-table-column>
          <template slot="af_btn" slot-scope="{ row }">
            <edu-pms :code="'aaa'" name="借用" ext="tdo" type="success" size="mini" @click="doRuku(row, 3)"> </edu-pms>
            <edu-pms :code="'aaa'" name="领用" ext="tdo" type="success" size="mini" @click="doRuku(row, 2)"> </edu-pms>
            <edu-pms :code="'aaa'" name="入库" ext="tedit" type="success" size="mini" @click="doRuku(row, 1)"> </edu-pms>
            <edu-pms :code="'aaa'" name="报废" ext="tdetil" type="success" size="mini" @click="doRuku(row, 4)"> </edu-pms>
            <edu-pms :code="'aaa'" name="调拨" ext="tdetil" type="success" size="mini" @click="doRuku(row, 6)"> </edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqWupinEdit v-if="showType == 'edit'" :bgwuList="bgwuList" ref="veHqWupinEdit" @onOk="editOk" @onCancel="editCancel"> </veHqWupinEdit>
      <veHqWupinShow v-if="showType == 'show'" ref="veHqWupinShow" @onOk="editOk" @onCancel="editCancel"> </veHqWupinShow>
      <veHqChurukuEdit v-if="showType == 'ruku'" ref="veHqChurukuEdit" @onOk="editCancel" @onCancel="editCancel"> </veHqChurukuEdit>
    </div>
  </edu-layout>
</template>

<script>
import veHqWupinApi from '@/views/logistics/good/api/veHqWupinApi';
import veHqBgwpflApi from '@/views/logistics/base/api/veHqBgwpflApi';
import veHqWupinEdit from './veHqWupinEdit';
import veHqWupinShow from './veHqWupinShow';
import veHqChurukuEdit from './veHqChurukuEdit';

export default {
  components: {
    veHqWupinEdit,
    veHqWupinShow,
    veHqChurukuEdit
  },
  data() {
    const data = {
      veHqWupinQuery: {},
      showType: 'table'
    };
    data.veHqWupinTable = {
      api: veHqWupinApi
    };
    data.bgwuList = [];
    return data;
  },
  mounted() {
    this.initWpfl();
  },
  methods: {
    doImport() {
      return {
        temp: ['物品编号', '物品名称', '物品分类', '物品单价', '物品状态', '计划使用年限', '品牌', '使用状态', '是否租借', '购置时间', '物品描述'],
        tempName: '物品',
        implName: 'veHqWupinServiceImpl.importExcel'
      };
    },
    refreshBack() {
      this.$refs.eduTree.setValue([]);
    },
    initWpfl() {
      const params = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'status', value: 1 }],
        sorts: [{ column: 'id', asc: false }]
      };
      this.$utils.addPageConditions(params, 'status', 'eq', 1);
      veHqBgwpflApi.page(params).then(res => {
        this.bgwuList = res.result.records;
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      const tres = this.$refs.eduTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'd.wpfl_id', 'eq', tres[0]);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqWupinTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqWupinEdit.doCreate();
      });
    },
    /**
     * @msg: 新增事件
     */
    doRuku(row, type) {
      this.showType = 'ruku';
      this.$nextTick(() => {
        this.$refs.veHqChurukuEdit.doCreate(row, type);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqWupinEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqWupinShow.doUpdate(row);
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
      this.$refs.veHqWupinTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
