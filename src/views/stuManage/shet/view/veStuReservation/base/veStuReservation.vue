<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuReservation" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="社团名称" pname="assoc_Id" textKey="name" pop="eq" stype="select" :datas="shetList" dtype="datas"> </edu-query-item>
          <edu-query-item title="场地名称" pname="cd_Id" textKey="name" pop="eq" stype="select" :datas="cdList" dtype="datas"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuReservationTable"
        code="veStuReservation"
        :api="veStuReservationTable.api"
        :get-params="getParams"
        :rowBtnShowCallback="rowBtnShowCallback"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false
        }"
        :to-update="handleUpdate"
        :toDetail="toDetail"
        :do-add="viewType == 'shen' ? null : handleCreate"
        :isAutoBtn="viewType == 'shen'"
      >
        <template slot="top_bef_btn">
          <edu-pms
            :code="'v-add'"
            v-if="viewType == 'shen'"
            type="primary"
            ext="success"
            iconfont="check-circle"
            name="批量通过"
            @click="updateStatus('all', 1)"
          ></edu-pms>
          <edu-pms
            :code="'veJn-add'"
            v-if="viewType == 'shen'"
            type="primary"
            ext="delete"
            iconfont="stop"
            name="批量不通过"
            @click="updateStatus('all', 0)"
          ></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="社团名称" dataIndex="shetName" width="150px"> </a-table-column>
        <a-table-column title="场地名称" dataIndex="cdName" width="150px"> </a-table-column>
        <a-table-column title="限制人数" dataIndex="limitNum" width="150px"> </a-table-column>
        <a-table-column title="开始时间" dataIndex="statusTime" width="150px"> </a-table-column>
        <a-table-column title="结束时间" dataIndex="endTime" width="150px"> </a-table-column>
        <a-table-column title="申请人" dataIndex="createName" width="150px"> </a-table-column>
        <a-table-column title="申请时间" dataIndex="createDate" width="250px"> </a-table-column>
        <a-table-column title="审核状态" dataIndex="authStatus" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="shetAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <!-- 
        <a-table-column title="状态（1：启用，0：禁用）" dataIndex="status" width="150px"> </a-table-column>
        <a-table-column title="审核人ID" dataIndex="authPersonId" width="150px"> </a-table-column>
        <a-table-column title="审核人" dataIndex="authPersonName" width="150px"> </a-table-column>
        <a-table-column title="不通过原因" dataIndex="auditReason" width="150px"> </a-table-column>
        <a-table-column title="预约说明" dataIndex="yyRemark" width="150px"> </a-table-column>
        <a-table-column title="审核级别 1会长 2 副会长 3 指定审核人" dataIndex="auditLevel" width="150px"> </a-table-column> -->
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuReservationEdit
      :cdList="cdList"
      :shetList="shetList"
      v-if="showType == 'edit'"
      ref="veStuReservationEdit"
      @onOk="editOk"
      @onCancel="editCancel"
    >
    </veStuReservationEdit>
    <veStuReservationShow v-if="showType == 'show'" ref="veStuReservationShow" @onOk="editOk" @onCancel="editCancel"> </veStuReservationShow>
  </div>
</template>

<script>
import veStuAssocInfoApi from '@/views/stuManage/shet/api/veStuAssocInfoApi';
import veStuReservationApi from '@/views/stuManage/shet/api/veStuReservationApi';
import veStuReservationEdit from './veStuReservationEdit';
import veStuReservationShow from './veStuReservationShow';
import veSbzcCdInfoApi from '@/views/sbzc/place/api/veSbzcCdInfoApi';

export default {
  props: {
    viewType: Array
  },
  components: {
    veStuReservationEdit,
    veStuReservationShow
  },
  data() {
    const data = {
      veStuReservationQuery: {},
      showType: 'table',
      cdList: [],
      shetList: []
    };
    data.veStuReservationTable = {
      api: veStuReservationApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veStuReservationTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          if (element.authStatus != 2) {
            this.$message.error('请选择未审核的数据');
            return;
          }
          ids.push(element.id);
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veStuReservationApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuReservationTable.reload();
      });
    },
    rowBtnShowCallback(type, row) {
      if (type == 'detail') {
        return true;
      } else if (type == 'update' && row.authStatus == 2) {
        return true;
      } else if (type == 'delete' && (row.authStatus == 2 || row.authStatus == 0)) {
        return true;
      }
      return false;
    },
    initData() {
      const params = {
        size: 1000,
        current: 1,
        conditions: [{ operator: 'eq', column: 'is_delete', value: 0 }],
        sorts: [{ column: 'id', asc: false }]
      };
      //   this.$utils.addPageConditions(params, 'status', 'eq', 1);
      veSbzcCdInfoApi.page(params).then(res => {
        this.cdList = res.result.records;
      });

      const params2 = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };

      veStuAssocInfoApi.all(params2).then(res => {
        this.shetList = res.result;
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
      this.$refs.veStuReservationTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuReservationEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuReservationEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuReservationShow.doShow(row);
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
      this.$refs.veStuReservationTable.reload();
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
.status2 {
  color: #999;
}
</style>
