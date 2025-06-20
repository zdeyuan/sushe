<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veHqHaopin" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="编号" pname="code" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veHqHaopinTable"
          code="veHqHaopin"
          :api="veHqHaopinTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            bdelete: false,
            delete: false,
            close: false
          }"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         :exportConfig="{
            url: 'veHqHaopin/export',
            name: '《低耗品管理导出》'
          }"     <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="低耗品编号" dataIndex="code" width="150px"> </a-table-column>
          <a-table-column title="低耗品名称" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="品牌" dataIndex="wppp" width="150px"> </a-table-column>
          <a-table-column title="计划使用年限" dataIndex="jhsynx" width="150px"> </a-table-column>
          <a-table-column title="物品单价" dataIndex="wpdj" width="150px"> </a-table-column>
          <a-table-column title="物品数量" dataIndex="num" width="150px"> </a-table-column>
          <template slot="af_btn" slot-scope="{ row }">
            <edu-pms :code="'aaa'" name="入库" ext="tedit" type="success" size="mini" @click="doRuku(row, 1)"> </edu-pms>
            <edu-pms :code="'aaa'" name="领用" ext="tdo" type="success" size="mini" @click="doRuku(row, 2)"> </edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veHqHaopinEdit v-if="showType == 'edit'" ref="veHqHaopinEdit" @onOk="editOk" @onCancel="editCancel"> </veHqHaopinEdit>
      <veHqHaopinCrEdit v-if="showType == 'ruku'" ref="veHqHaopinCrEdit" @onOk="editOk" @onCancel="editCancel"> </veHqHaopinCrEdit>
      <veHqHaopinShow v-if="showType == 'show'" ref="veHqHaopinShow" @onOk="editOk" @onCancel="editCancel"> </veHqHaopinShow>
    </div>
  </edu-layout>
</template>

<script>
import veHqHaopinApi from '@/views/logistics/bx/api/veHqHaopinApi';
import veHqHaopinEdit from './veHqHaopinEdit';
import veHqHaopinCrEdit from './veHqHaopinCrEdit';
import veHqHaopinShow from './veHqHaopinShow';

export default {
  components: {
    veHqHaopinEdit,
    veHqHaopinShow,
    veHqHaopinCrEdit
  },
  data() {
    const data = {
      veHqHaopinQuery: {},
      showType: 'table'
    };
    data.veHqHaopinTable = {
      api: veHqHaopinApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 新增事件
     */
    doRuku(row, type) {
      this.showType = 'ruku';
      this.$nextTick(() => {
        this.$refs.veHqHaopinCrEdit.doCreate(row, type);
      });
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
      this.$refs.veHqHaopinTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqHaopinEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqHaopinEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqHaopinShow.doShow(row);
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
      this.$refs.veHqHaopinTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
