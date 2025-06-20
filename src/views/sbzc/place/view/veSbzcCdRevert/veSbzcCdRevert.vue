<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcCdRevert" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="场地名称" pname="a.NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="所属部门" stype="costom">
              <deptTree ref="deptTree"></deptTree>
            </edu-query-item>
            <edu-query-item title="归还人" pname="d.revert_user_name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="批准人" pname="d.check_User_Name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcCdRevertTable"
          code="veSbzcCdRevert"
          :api="veSbzcCdRevertTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcCdRevert/export',
            name: '《场地归还导出》'
          }"
          :config="{
            delete: false,
            checkBox: false,
            open: false,
            close: false,
            bdelte: false,
            status: false
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :toDetail="toDetail"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="场地名称" dataIndex="cdName" width="150px"> </a-table-column>
          <a-table-column title="所属部门" dataIndex="applyDeptName" width="150px"> </a-table-column>
          <a-table-column title="归还人" dataIndex="revertUserName" width="150px"> </a-table-column>
          <a-table-column title="批准人" dataIndex="checkUserName" width="150px"> </a-table-column>
          <a-table-column title="归还时间" dataIndex="revertTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcCdRevertShow v-if="showType == 'show'" ref="veSbzcCdRevertShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcCdRevertShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcCdRevertApi from '@/views/sbzc/place/api/veSbzcCdRevertApi';
import veSbzcCdRevertShow from './veSbzcCdRevertShow';
import deptTree from '@/components/deptTree';

export default {
  components: {
    veSbzcCdRevertShow,
    deptTree
  },
  data() {
    const data = {
      veSbzcCdRevertQuery: {},
      showType: 'table'
    };
    data.veSbzcCdRevertTable = {
      api: veSbzcCdRevertApi
    };
    return data;
  },
  mounted() {},
  methods: {
    refreshBack() {
      this.$refs.deptTree.setValue([]);
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();

      const tres = this.$refs.deptTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'd.apply_Dept_id', 'eq', tres[0]);
      }

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veSbzcCdRevertTable.reload();
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcCdRevertShow.doShow(row);
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
      this.$refs.veSbzcCdRevertTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
