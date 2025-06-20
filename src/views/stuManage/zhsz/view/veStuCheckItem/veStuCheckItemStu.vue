<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuCheckItem" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="项目名称" pname="name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuCheckItemTable"
        code="veStuCheckItem"
        :api="veStuCheckItemTable.api"
        :get-params="getParams"
        :config="{
          openText: '发布',
          closeText: '取消发布',
          status: false
        }"
        :to-update="handleUpdate"
        :toDetail="toDetail"
        :do-add="handleCreate"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目名称" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="设置被评人员" dataIndex="createBy" width="150px">
          <template slot-scope="text, row">
            <edu-pms :code="'v-add'" type="primary" ext="success" name="设置被评人员" @click="doSetStu(row)"></edu-pms>
          </template>
        </a-table-column>
        <a-table-column title="设置参评人员" dataIndex="createName" width="150px">
          <template slot-scope="text, row">
            <edu-pms :code="'v-add'" type="primary" ext="success" name="设置参评人员" @click="doSetTea(row)"></edu-pms>
          </template>
        </a-table-column>
        <a-table-column title="开始时间" dataIndex="startTime" width="150px"> </a-table-column>
        <a-table-column title="结束时间" dataIndex="endTime" width="150px"> </a-table-column>
        <a-table-column title="项目负责人" dataIndex="userName" width="150px"> </a-table-column>
        <a-table-column title="状态" width="100px" align="center" dataIndex="status">
          <template slot-scope="status">
            <edu-dict-text code="statusFb" :class="'status' + status" :value="status"></edu-dict-text>
          </template>
        </a-table-column>
        <template slot="bef_btn" slot-scope="{ row }">
          <edu-pms :code="'v-add'" type="primary" ext="success" name="设置项目指标" @click="doSetItem(row)"></edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuCheckItemEdit v-if="showType == 'edit'" ref="veStuCheckItemEdit" @onOk="editOk" @onCancel="editCancel"> </veStuCheckItemEdit>
    <veStuCheckItemShow v-if="showType == 'show'" ref="veStuCheckItemShow" @onOk="editOk" @onCancel="editCancel"> </veStuCheckItemShow>
  </div>
</template>

<script>
import veStuCheckItemApi from '../../api/veStuCheckItemApi';
import veStuCheckItemEdit from './base/veStuCheckItemEdit';
import veStuCheckItemShow from './base/veStuCheckItemShow';

export default {
  components: {
    veStuCheckItemEdit,
    veStuCheckItemShow
  },
  data() {
    const data = {
      veStuCheckItemQuery: {},
      showType: 'table'
    };
    data.veStuCheckItemTable = {
      api: veStuCheckItemApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doSetItem(row) {},
    doSetStu(row) {},
    doSetTea(row) {},
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
      this.$refs.veStuCheckItemTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckItemEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckItemEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuCheckItemShow.doShow(row);
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
      this.$refs.veStuCheckItemTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
