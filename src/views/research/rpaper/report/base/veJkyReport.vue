<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyReport" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="上报人" v-if="viewType != 'my'" pname="NAME" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="上报标题" pname="TITLE" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="上报类型" extClass="width280" pname="type" pop="like" stype="radio" code="report"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyReportTable"
        code="veJkyReport"
        :api="veJkyReportTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false,
          delete: viewType == 'my' ? true : false
        }"
        :to-update="viewType == 'my' ? handleUpdate : null"
        :toDetail="toDetail"
      >
        <template slot="top_bef_btn" v-if="viewType == 'my'">
          <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="论文上报" @click="handleCreate(1)"></edu-pms>
          <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="科研课题上报" @click="handleCreate(2)"></edu-pms>
          <edu-pms :code="'veJkyUser-btn-add'" type="primary" ext="add" iconfont="plus" name="其他上报" @click="handleCreate(3)"></edu-pms>
        </template>

        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="上报人" dataIndex="userName" v-if="viewType != 'my'" width="150px" align="center"> </a-table-column>
        <a-table-column title="上报类型" dataIndex="type" width="150px" align="center">
          <template slot-scope="text">
            <a-tag color="#108ee9" v-if="text == 1">
              论文
            </a-tag>
            <a-tag color="#2db7f5" v-else-if="text == 2">
              科研课题
            </a-tag>
            <a-tag color="#87d068" v-else>
              其他
            </a-tag>
            <span></span>
          </template>
        </a-table-column>
        <a-table-column title="上报标题" dataIndex="name"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veJkyReportEdit v-if="showType == 'edit'" ref="veJkyReportEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyReportEdit>
    <veJkyReportShow v-if="showType == 'show'" ref="veJkyReportShow" @onOk="editOk" @onCancel="editCancel"> </veJkyReportShow>
  </div>
</template>

<script>
import veJkyReportApi from '@/api/research/rpaper/veJkyReportApi';
import veJkyReportEdit from './veJkyReportEdit';
import veJkyReportShow from './veJkyReportShow';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  props: {
    viewType: {
      type: String
    }
  },
  components: {
    veJkyReportEdit,
    veJkyReportShow
  },
  mixins: [baseMixins],
  data() {
    const data = {
      veJkyReportQuery: {},
      showType: 'table'
    };
    data.veJkyReportTable = {
      api: veJkyReportApi
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
      if (this.viewType == 'my') {
        this.$utils.addPageConditions(params, 'user_id', 'eq', this.loginInfo.userId);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyReportTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate(type) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyReportEdit.doCreate(type);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyReportEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyReportShow.doShow(row);
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
      this.$refs.veJkyReportTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
