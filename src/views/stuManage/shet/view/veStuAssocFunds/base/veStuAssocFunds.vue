<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuAssocFunds" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="社团名称" pname="assoc_Id" textKey="name" pop="eq" stype="select" :datas="shetList" dtype="datas"> </edu-query-item>
          <edu-query-item title="社团缴费标准" pname="standard_Id" textKey="name" pop="eq" stype="select" :datas="typeList" dtype="datas">
          </edu-query-item>
          <edu-query-item title="学生名称" pname="s.xm" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="缴费时间" pname="d.create_date" pop="gt" stype="date"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuAssocFundsTable"
        code="veStuAssocFunds"
        :api="veStuAssocFundsTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: viewType == 'admin'
        }"
        :to-update="handleUpdate"
        :isAutoBtn="viewType == 'show'"
        :do-add="viewType == 'admin' ? handleCreate : null"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="社团名称" dataIndex="assocName" width="150px"> </a-table-column>
        <a-table-column title="社团缴费标准" dataIndex="jfname" width="150px"> </a-table-column>
        <a-table-column title="学生" dataIndex="xm" width="150px"> </a-table-column>
        <a-table-column title="缴费时间" dataIndex="addTime" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuAssocFundsEdit
      :shetList="shetList"
      :typeList="typeList"
      v-if="showType == 'edit'"
      ref="veStuAssocFundsEdit"
      @onOk="editOk"
      @onCancel="editCancel"
    >
    </veStuAssocFundsEdit>
    <veStuAssocFundsShow v-if="showType == 'show'" ref="veStuAssocFundsShow" @onOk="editOk" @onCancel="editCancel"> </veStuAssocFundsShow>
  </div>
</template>

<script>
import veStuAssocFundsApi from '@/views/stuManage/shet/api/veStuAssocFundsApi';
import veStuAssocFundsEdit from './veStuAssocFundsEdit';
import veStuAssocFundsShow from './veStuAssocFundsShow';
import veStuAssocInfoApi from '@/views/stuManage/shet/api/veStuAssocInfoApi';
import veStuAssocFundsStandardApi from '@/views/stuManage/shet/api/veStuAssocFundsStandardApi';
export default {
  props: {
    viewType: String
  },
  components: {
    veStuAssocFundsEdit,
    veStuAssocFundsShow
  },
  data() {
    const data = {
      veStuAssocFundsQuery: {},
      showType: 'table',
      shetList: [],
      typeList: []
    };
    data.veStuAssocFundsTable = {
      api: veStuAssocFundsApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const params2 = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };

      veStuAssocInfoApi.all(params2).then(res => {
        this.shetList = res.result;
      });

      const params3 = {
        //   conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuAssocFundsStandardApi.all(params3).then(res => {
        this.typeList = res.result;
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
      this.$refs.veStuAssocFundsTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuAssocFundsShow.doShow(row);
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
      this.$refs.veStuAssocFundsTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
