<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuXjAudit" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学生姓名" pname="s.xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学生学号" pname="s.xh" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuXjAuditTable"
          code="veStuXjAudit"
          :api="veStuXjAuditTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false,
            bdelete: false
          }"
		  :toDetail="toDetail"
        >
		
          <template slot="top_bef_btn">
            <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="通过" @click="updateStatus('all', 1)"></edu-pms>
            <edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="未通过" @click="updateStatus('all', 2)"></edu-pms>
          </template>
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学生姓名" dataIndex="stuName" width="150px"> </a-table-column>
          <a-table-column title="学生学号" dataIndex="stuCode" width="150px"> </a-table-column>
          <a-table-column title="审核状态" dataIndex="auditStatus" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="xjAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>

          <template slot="af_btn" slot-scope="{ row }" v-if="!row.auditStatus">
            <edu-pms :code="'ttt'" name="通过" type="primary" size="mini" @click="updateStatus(row.id, 1)"> </edu-pms>
            <edu-pms :code="'ttt'" name="不通过" type="danger" size="mini" @click="updateStatus(row.id, 2)"> </edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuXjAuditEdit v-if="showType == 'edit'" ref="veStuXjAuditEdit" @onOk="editOk" @onCancel="editCancel"> </veStuXjAuditEdit>
      <veStuXjAuditShow v-if="showType == 'show'" ref="veStuXjAuditShow" @onOk="editOk" @onCancel="editCancel"> </veStuXjAuditShow> </div
  ></edu-layout>
</template>

<script>
import veStuXjAuditApi from '@/views/stuManage/xjManage/api/veStuXjAuditApi';
import veStuXjAuditEdit from './veStuXjAuditEdit';
import veStuXjAuditShow from './veStuXjAuditShow';

export default {
  components: {
    veStuXjAuditEdit,
    veStuXjAuditShow
  },
  data() {
    const data = {
      veStuXjAuditQuery: {},
      showType: 'table'
    };
    data.veStuXjAuditTable = {
      api: veStuXjAuditApi
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = this.$refs.veStuXjAuditTable.getSelectRowIds();
        if (!ids || ids.length == 0) {
          this.$message.error('请选择一项');
          return;
        }
        ssids = ids;
      }
      const sub = {
        ids: ssids,
        status: status
      };
      veStuXjAuditApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuXjAuditTable.reload();
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
      this.$refs.veStuXjAuditTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuXjAuditEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuXjAuditEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuXjAuditShow.doShow(row);
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
      this.$refs.veStuXjAuditTable.reload();
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
