<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuLeave" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="姓名" pname="name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学号" pname="code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="请假类型" code="levelType"  width="150px" pname="type" pop="eq" stype="select"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuLeaveTable"
          code="veStuLeave"
          :api="veStuLeaveTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false
          }"
          :opWidth="100"
        >
          <template slot="top_bef_btn">
            <edu-pms :code="'v-add'" type="primary" ext="success" iconfont="check-circle" name="通过" @click="updateStatus('all', 1)"></edu-pms>
            <edu-pms :code="'veJn-add'" type="primary" ext="delete" iconfont="stop" name="未通过" @click="updateStatus('all', 2)"></edu-pms>
          </template>
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学生姓名" dataIndex="name" width="150px"> </a-table-column>
          <a-table-column title="学生学号" dataIndex="code" width="150px"> </a-table-column>
          <!-- <a-table-column title="班主任" dataIndex="bzrName" width="150px"> </a-table-column> -->
          <a-table-column title="请假类型" dataIndex="type" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="levelType" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="开始时间" dataIndex="startTime" width="150px"> </a-table-column>
          <a-table-column title="结束时间" dataIndex="endTime" width="150px"> </a-table-column>
          <a-table-column title="申请时间" dataIndex="createDate" width="150px"> </a-table-column>
          <a-table-column title="审核状态" dataIndex="auditStatus" width="150px">
            <template slot-scope="value">
              <edu-dict-text code="xjAuditStatus" :class="'status' + value" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="审核时间" dataIndex="auditTime" width="150px"> </a-table-column>

          <template slot="af_btn" slot-scope="{ row }">
            <edu-pms :code="'aaa'" name="审核" v-if="row.auditStatus == 0" ext="tedit" type="success" size="mini" @click="toDetail(row)"> </edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuLeaveEdit v-if="showType == 'edit'" ref="veStuLeaveEdit" @onOk="editOk" @onCancel="editCancel"> </veStuLeaveEdit>
      <veStuLeaveShow v-if="showType == 'show'" ref="veStuLeaveShow" @onOk="editOk" @onCancel="editCancel"> </veStuLeaveShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuLeaveApi from '../../api/veStuLeaveApi';
import veStuLeaveEdit from './veStuLeaveEdit';
import veStuLeaveShow from './veStuLeaveShow';

export default {
  components: {
    veStuLeaveEdit,
    veStuLeaveShow
  },
  data() {
    const data = {
      veStuLeaveQuery: {},
      showType: 'table'
    };
    data.veStuLeaveTable = {
      api: veStuLeaveApi
    };
    return data;
  },
  mounted() {},
  methods: {
    updateStatus(id, status) {
      let ssids = [id];
      if (id == 'all') {
        const ids = [];
        const datas = this.$refs.veStuLeaveTable.getSelectRow();
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
      veStuLeaveApi.updateStatus(sub).then(res => {
        this.$notification.success({
          message: '审核成功',
          description: `成功审核[${ssids.length}]条数据`
        });
        this.$refs.veStuLeaveTable.reload();
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
      this.$refs.veStuLeaveTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLeaveEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuLeaveEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuLeaveShow.doShow(row);
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
      this.$refs.veStuLeaveTable.reload();
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
