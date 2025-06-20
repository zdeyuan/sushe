<template>
  <!-- 表格 -->
  <div class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyFund" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="项目名称" pname="b.name" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目编号" pname="b.serial" pop="like" stype="input" v-if="viewType == 'shen'"> </edu-query-item>
          <edu-query-item title="审批状态" pname="d.status" pop="eq" stype="select" code="fundAudit"> </edu-query-item>
          <edu-query-item title="起始时间" pname="d.apply_time" pop="gt" stype="date"  placeholder="请选择时间"  > </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyFundTable"
        code="veJkyFund"
        :api="veJkyFundTable.api"
        :get-params="getParams"
        :to-update="handleUpdate"
        :toDetail="toDetail"
        :do-add="handleCreate"
        :rowBtnShowCallback="rowBtnShowCallback"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false,
          checkBox: false
        }"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目名称" dataIndex="projectName" width="150px"> </a-table-column>
        <a-table-column title="项目编号" dataIndex="projectSerial" width="150px"> </a-table-column>
        <a-table-column title="总费用" dataIndex="totalCost" width="150px">
          <template slot-scope="totalCost"> {{ totalCost.toFixed(2) }}元 </template>
        </a-table-column>
        <template v-if="viewType != 'my'">
          <a-table-column title="申请人" dataIndex="userName" width="150px"> </a-table-column>
        </template>
        <a-table-column title="申请时间" dataIndex="applyTime" width="150px"> </a-table-column>
        <template v-if="viewType != 'user'">
          <a-table-column title="审批人" dataIndex="adminName" width="150px"> </a-table-column>
          <a-table-column title="审批状态" dataIndex="status" width="150px">
            <template slot-scope="status">
              <edu-dict-text code="fundAudit" :class="'ffstatus' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
        </template>

        <template slot="af_btn" slot-scope="{ row }">
          <edu-pms
            v-if="viewType == 'shen' && row.status == 0 && row.adminId == loginInfo.userId"
            :code="'veJkyProject-btn-detail'"
            name="通过"
            type="success"
            size="mini"
            @click="doAudit(row, 1)"
          >
          </edu-pms>
          <edu-pms
            v-if="viewType == 'shen' && row.status == 0 && row.adminId == loginInfo.userId"
            :code="'veJkyProject-btn-detail'"
            name="不通过"
            type="danger"
            size="mini"
            @click="doAudit(row, 2)"
          >
          </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veJkyFundEdit v-if="showType == 'edit'" ref="veJkyFundEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyFundEdit>
    <veJkyFundShow v-if="showType == 'show'" ref="veJkyFundShow" @onOk="editOk" @onCancel="editCancel"> </veJkyFundShow>
  </div>
</template>

<script>
import veJkyFundApi from '@/api/research/rfunds/veJkyFundApi';
import veJkyFundEdit from './veJkyFundEdit';
import veJkyFundShow from './veJkyFundShow';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  props: {
    viewType: {
      type: String,
      require: true
    }
  },
  components: {
    veJkyFundEdit,
    veJkyFundShow
  },
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
  mixins: [baseMixins],
  mounted() {},
  methods: {
    rowBtnShowCallback(type, row) {
      if (type == 'detail') {
        return true;
      }
      if (this.viewType == 'shen') {
        return false;
      }
      if (type == 'update' || type == 'delete') {
        //如果审核通过不可以删除
        if (row.status == 1) {
          return false;
        }
      }
      return true;
    },
    doAudit(row, status) {
      this.msgUtil.confirm('审核提示', `确定要 [${status == 1 ? '通过' : '不通过'}] 选择的项目 [${row.projectName}] 的预算吗?`, () => {
        veJkyFundApi
          .updateStatus({
            ids: [row.id],
            status: status
          })
          .then(res => {
            this.$notification.success({
              message: '数据操作成功',
              description: `成功${status == 1 ? '通过' : '不通过'} 项目 [${row.projectName}]的预算`
            });
            this.handleFilter();
          })
          .catch(res => {
            console.error(res);
          });
      });
    },
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyFundShow.doShow(row);
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
      this.$refs.veJkyFundTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyFundEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyFundEdit.doUpdate(row);
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
      this.$refs.veJkyFundTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>

</style>
