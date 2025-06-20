<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veSbzcJzwInspect" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="建筑名称" pname="a.NAME" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="楼层编号" pname="b.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="房间号" pname="r.code" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="检查类别" stype="costom">
              <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="categoryNodes"></edu-tree-select>
            </edu-query-item>
            <edu-query-item title="检查时间" pname="d.inspect_date" pop="gt" stype="date"> </edu-query-item>
            <edu-query-item title="检查人" pname="d.inspect_user_name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veSbzcJzwInspectTable"
          code="veSbzcJzwInspect"
          :api="veSbzcJzwInspectTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veSbzcJzwInspect/export',
            name: '《检查记录表导出》'
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :to-update="handleUpdate"
          :toDetail="toDetail"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="建筑名称" dataIndex="jzwName" width="150px"> </a-table-column>
          <a-table-column title="楼层编号" dataIndex="floorCode" width="100px"> </a-table-column>
          <a-table-column title="房间号" dataIndex="roomCode" width="100px"> </a-table-column>
          <a-table-column title="检查类型" dataIndex="cateName" width="150px"> </a-table-column>
          <a-table-column title="检查时间" dataIndex="inspectDate" width="150px"> </a-table-column>
          <a-table-column title="检查人" dataIndex="inspectUserName" width="150px"> </a-table-column>
          <a-table-column title="检查情况描述 " dataIndex="description"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veSbzcJzwInspectEdit v-if="showType == 'edit'" :categoryNodes="categoryNodes" ref="veSbzcJzwInspectEdit" @onOk="editOk" @onCancel="editCancel">
      </veSbzcJzwInspectEdit>
      <veSbzcJzwInspectShow v-if="showType == 'show'" ref="veSbzcJzwInspectShow" @onOk="editOk" @onCancel="editCancel"> </veSbzcJzwInspectShow>
    </div>
  </edu-layout>
</template>

<script>
import veSbzcJzwInspectApi from '@/views/sbzc/floor/api/veSbzcJzwInspectApi';
import veSbzcJzwInspecttypeApi from '@/views/sbzc/floor/api/veSbzcJzwInspecttypeApi';

import veSbzcJzwInspectEdit from './veSbzcJzwInspectEdit';
import veSbzcJzwInspectShow from './veSbzcJzwInspectShow';

export default {
  components: {
    veSbzcJzwInspectEdit,
    veSbzcJzwInspectShow
  },
  data() {
    const data = {
      veSbzcJzwInspectQuery: {},
      showType: 'table',
      categoryNodes: []
    };
    data.veSbzcJzwInspectTable = {
      api: veSbzcJzwInspectApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      const sub = {
        conditions: [
          /* { operator: 'eq', column: 'status', value: 1 } */
        ]
      };
      veSbzcJzwInspecttypeApi.all(sub).then(res => {
        this.categoryNodes = res.result;
      });
    },
    refreshBack() {
      this.$refs.eduTree.setValue([]);
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      const tres = this.$refs.eduTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'd.inspect_type_id', 'eq', tres[0]);
      }

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veSbzcJzwInspectTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspectEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspectEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veSbzcJzwInspectShow.doShow(row);
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
      this.$refs.veSbzcJzwInspectTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
