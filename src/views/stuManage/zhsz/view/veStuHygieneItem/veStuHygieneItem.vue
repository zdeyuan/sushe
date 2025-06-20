<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuHygieneItem" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="项目名称" pname="name" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuHygieneItemTable"
        code="veStuHygieneItem"
        :api="veStuHygieneItemTable.api"
        :get-params="getParams"
        :config="{
          openText: '发布',
          closeText: '取消发布',
          status: false
        }"
        :to-update="handleUpdate"
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
    <veStuHygieneItemEdit v-if="showType == 'edit'" ref="veStuHygieneItemEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHygieneItemEdit>
    <veStuHygieneItemShow v-if="showType == 'show'" ref="veStuHygieneItemShow" @onOk="editOk" @onCancel="editCancel"> </veStuHygieneItemShow>
    <veStuHygieneItemNormEdit v-if="showType == 'item'" ref="veStuHygieneItemNormEdit" @onOk="editOk" @onCancel="editCancel">
    </veStuHygieneItemNormEdit>
    <veStuHygieneJudgerEdit v-if="showType == 'tea'" ref="veStuHygieneJudgerEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHygieneJudgerEdit>
    <veStuHygieneStudentEdit v-if="showType == 'stu'" ref="veStuHygieneStudentEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHygieneStudentEdit>
  </div>
</template>

<script>
import veStuHygieneItemApi from '../../api/veStuHygieneItemApi';
import veStuHygieneItemEdit from './base/veStuHygieneItemEdit';
import veStuHygieneItemShow from './base/veStuHygieneItemShow';
import veStuHygieneJudgerEdit from './base/veStuHygieneJudgerEdit';
import veStuHygieneItemNormEdit from './base/veStuHygieneItemNormEdit';
import veStuHygieneStudentEdit from './base/veStuHygieneStudentEdit';

export default {
  components: {
    veStuHygieneItemEdit,
    veStuHygieneItemShow,
    veStuHygieneJudgerEdit,
    veStuHygieneItemNormEdit,
    veStuHygieneStudentEdit
  },
  data() {
    const data = {
      veStuHygieneItemQuery: {},
      showType: 'table'
    };
    data.veStuHygieneItemTable = {
      api: veStuHygieneItemApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doSetItem(row) {
      this.showType = 'item';
      this.$nextTick(() => {
        this.$refs.veStuHygieneItemNormEdit.doCreate(row);
      });
    },
    doSetStu(row) {
      this.showType = 'stu';
      this.$nextTick(() => {
        this.$refs.veStuHygieneStudentEdit.doCreate(row);
      });
    },
    doSetTea(row) {
      this.showType = 'tea';
      this.$nextTick(() => {
        this.$refs.veStuHygieneJudgerEdit.doCreate(row);
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
      this.$refs.veStuHygieneItemTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHygieneItemEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHygieneItemEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuHygieneItemShow.doShow(row);
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
      this.$refs.veStuHygieneItemTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
