<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div :style="{padding:$hasPer(['system'])?'0':'10px'}">
      <edu-query ref="cwQuery" code="veStuLiteraryAward" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="奖励类型" pname="d.item_id" textKey="name" pop="eq" width="150px" stype="select" :datas="typeNodes" dtype="datas">
          </edu-query-item>
          <edu-query-item title="获奖者" pname="winner_Name" pop="like" stype="input" v-if="$hasPer(['system','teacher'])"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuLiteraryAwardTable"
        code="veStuLiteraryAward"
        :api="veStuLiteraryAwardTable.api"
        :get-params="getParams"
        :rowBtnShowCallback="rowBtnShowCallback"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false
        }"
        :isAutoBtn="viewType == 'shen'"
        :to-update="handleUpdate"
        :toDetail="toDetail"
        :do-add="viewType == 'admin' ? handleCreate : null"
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
            @click="updateStatus('all', 2)"
          ></edu-pms>
        </template>
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目类型" dataIndex="itemType" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="jllb2" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="获奖项目" dataIndex="itemName" width="150px"> </a-table-column>
        <a-table-column title="获奖等级" dataIndex="grade" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="awardLevel" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="获奖者" dataIndex="winnerName" width="150px"> </a-table-column>
        <a-table-column title="申请人" dataIndex="createName" width="150px"> </a-table-column>
        <a-table-column title="申请时间" dataIndex="createDate" width="150px"> </a-table-column>
        <a-table-column title="审核状态" v-if="viewType != 'my'" dataIndex="auditStatus" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="xjAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="审核人" v-if="viewType == 'shen'" dataIndex="auditUserName" width="150px"> </a-table-column>
        <a-table-column title="审核时间" v-if="viewType == 'shen'" dataIndex="auditTime" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuLiteraryAwardEdit :typeNodes="typeNodes" v-if="showType == 'edit'" ref="veStuLiteraryAwardEdit" @onOk="editOk" @onCancel="editCancel">
    </veStuLiteraryAwardEdit>
    <veStuLiteraryAwardShow v-if="showType == 'show'" ref="veStuLiteraryAwardShow" @onOk="editOk" @onCancel="editCancel"> </veStuLiteraryAwardShow>
  </div>
</template>

<script>
import veStuLiteraryAwardApi from '../../../api/veStuLiteraryAwardApi';
import veStuLiteraryAwardEdit from './veStuLiteraryAwardEdit';
import veStuLiteraryAwardShow from './veStuLiteraryAwardShow';
import veStuLiteraryAwardItemApi from '../../../api/veStuLiteraryAwardItemApi';
export default {
  props: {
    viewType: String
  },
  components: {
    veStuLiteraryAwardEdit,
    veStuLiteraryAwardShow
  },
  data() {
    const data = {
      veStuLiteraryAwardQuery: {},
      showType: 'table',
      typeNodes: []
    };
    data.veStuLiteraryAwardTable = {
      api: veStuLiteraryAwardApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    rowBtnShowCallback(type, row) {
      if (this.viewType == 'admin') {
        if (row.auditStatus != 1) {
          if (type == 'update' || type == 'delete') {
            return true;
          }
        }
      }

      if (this.viewType == 'my') {
        if (type == 'detail') {
          return true;
        }
      }

      return false;
    },

    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veStuLiteraryAwardTable.getSelectRow();
        if (!datas || datas.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        for (let i = 0; i < datas.length; i++) {
          const element = datas[i];
          if (element.auditStatus != 0) {
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
      veStuLiteraryAwardApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuLiteraryAwardTable.reload();
      });
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuLiteraryAwardItemApi.all(sub).then(res => {
        this.typeNodes = res.result;
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      if (this.viewType == 'my') {
        this.$utils.addPageConditions(params, 'audit_Status', 'eq', 1);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuLiteraryAwardTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuLiteraryAwardShow.doShow(row);
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
      this.$refs.veStuLiteraryAwardTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.status1 {
  color: #039471;
}
.status2 {
  color: rgb(212, 117, 117);
}
.status0 {
  color: #999;
}
</style>
