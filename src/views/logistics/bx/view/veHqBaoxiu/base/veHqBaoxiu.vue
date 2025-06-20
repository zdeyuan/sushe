<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veHqBaoxiu" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="物品名称" pname="NAME" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="申请人" pname="apply_User_Name" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="审批人" pname="pj_User_Name" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="维修人" pname="jb_User_Name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veHqBaoxiuTable"
        code="veHqBaoxiu"
        :api="veHqBaoxiuTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          bdelete: false,
          delete: false,
          status: false
        }"
        :toDetail="toDetail"
      >
        <template slot="top_bef_btn">
          <edu-pms
            :code="'veJkyUser-btn-add'"
            v-if="viewType == 'apply'"
            type="primary"
            ext="add"
            iconfont="plus"
            name="报修申请"
            @click="handleCreate('in')"
          ></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="物品名称" dataIndex="name" min-width="150px" align="center"> </a-table-column>
        <a-table-column title="维修地点" dataIndex="place" width="150px"> </a-table-column>
        <a-table-column title="申请人" dataIndex="applyUserName" width="150px"> </a-table-column>
        <a-table-column title="审批人" dataIndex="pjUserName" width="150px"> </a-table-column>
        <a-table-column title="维修人" dataIndex="jbUserName" width="150px"> </a-table-column>
        <a-table-column title="状态" dataIndex="status" width="150px">
          <template slot-scope="text">
            <edu-dict-text code="bxStatus" :value="text"></edu-dict-text>
          </template>
        </a-table-column>

        <template slot="af_btn" slot-scope="{ row }">
          <edu-pms
            :code="'aaa'"
            v-if="viewType == 'audit' && row.status == 1"
            name="审核"
            ext="tdo"
            type="success"
            size="mini"
            @click="doRuku(row, 'audit')"
          >
          </edu-pms>
          <edu-pms
            :code="'aaa'"
            v-if="viewType == 'my' && row.status == 2"
            name="反馈"
            ext="tdo"
            type="success"
            size="mini"
            @click="doRuku(row, 'back')"
          >
          </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veHqBaoxiuEdit v-if="showType == 'edit'" ref="veHqBaoxiuEdit" @onOk="editOk" @onCancel="editCancel"> </veHqBaoxiuEdit>
    <veHqBaoxiuShow v-if="showType == 'show'" ref="veHqBaoxiuShow" @onOk="editOk" @onCancel="editCancel"> </veHqBaoxiuShow>
  </div>
</template>

<script> 
import veHqBaoxiuApi from '@/views/logistics/bx/api/veHqBaoxiuApi';
import veHqBaoxiuEdit from './veHqBaoxiuEdit';
import veHqBaoxiuShow from './veHqBaoxiuShow';
import { baseMixins } from '@/mixins/baseMixins';
export default {
  props: {
    viewType: {
      type: String
    },
    viewName: {
      type: String
    }
  },
  components: {
    veHqBaoxiuEdit,
    veHqBaoxiuShow
  },
  mixins: [baseMixins],
  data() {
    const data = {
      veHqBaoxiuQuery: {},
      showType: 'table'
    };
    data.veHqBaoxiuTable = {
      api: veHqBaoxiuApi
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

      if (this.viewType == 'apply') {
        this.$utils.addPageConditions(params, 'apply_user', 'eq', this.loginInfo.userId);
        //如果是未完成
      } else if (this.viewType == 'audit') {
        //   this.$utils.addPageConditions(params, 'status', 'in', [1,]);
        //如果是未完成
      } else if (this.viewType == 'my') {
        this.$utils.addPageConditions(params, 'js_user', 'eq', this.loginInfo.userId);
        //如果是未完成
      }

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veHqBaoxiuTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqBaoxiuEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veHqBaoxiuEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqBaoxiuShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    doRuku(row, type) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veHqBaoxiuShow.doShow(row, type);
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
      this.$refs.veHqBaoxiuTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
