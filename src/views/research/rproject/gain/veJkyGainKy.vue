<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veJkyGain" :do-filter="handleFilter" @refreshBack="refreshBack">
          <template slot="search">
            <edu-query-item title="成果名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
            <edu-query-item
              title="成果级别"
              pname="d.level_Id"
              textKey="name"
              pop="eq"
              stype="select"  width="180px"  
              code="projectType"
              :datas="levelNodes"
              dtype="datas"
            >
            </edu-query-item>
            <edu-query-item title="成果类型" stype="costom">
              <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="categoryNodes"></edu-tree-select>
            </edu-query-item>
            <edu-query-item title="成果性质" pname="cgxz" stype="select"  width="180px"   code="cgxz"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veJkyGainTable"
          code="veJkyGain"
          :api="veJkyGainTable.api"
          :get-params="getParams"
          :to-update="handleUpdate"
          :do-add="handleCreate"
          :rowBtnShowCallback="rowBtnShowCallback"
          :toDetail="toDetail"
          :config="{
            status: false,
            open: false,
            close: false
          }"
          :sorts="[
            {
              column: 'd.id',
              asc: false
            }
          ]"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="成果名称" dataIndex="name" width="200px"> </a-table-column>
          <a-table-column title="成果类型" dataIndex="cateIdText" width="150px"> </a-table-column>
          <a-table-column title="成果性质" dataIndex="projectId" width="150px">
            <template slot-scope="projectId">
              <span>{{ projectId == 0 ? '科研成果' : '项目成果' }}</span>
            </template>
          </a-table-column>
          <a-table-column title="级别" dataIndex="levelIdText" width="150px"> </a-table-column>
          <!--     <a-table-column title="项目成果人员" dataIndex="userNames" width="150px"> </a-table-column> -->
          <a-table-column title="添加时间" dataIndex="createTime" width="200px"> </a-table-column>
          <a-table-column title="发布状态" width="100px" align="center" dataIndex="status">
            <template slot-scope="status">
              <edu-dict-text code="statusFb" :class="'status' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veJkyGainEdit
        v-if="showType == 'edit'"
        editViewType="ky"
        ref="veJkyGainEdit"
        :levelNodes="levelNodes"
        :categoryNodes="categoryNodes"
        @onOk="editOk"
        @onCancel="editCancel"
      >
      </veJkyGainEdit>
      <veJkyGainShow v-if="showType == 'show'" ref="veJkyGainShow" @onOk="editOk" @onCancel="editCancel"> </veJkyGainShow>
    </div>
  </edu-layout>
</template>

<script>
import veJkyGainApi from '@/api/research/rproject/veJkyGainApi';

import veJkyLevelApi from '@/api/research/rbase/veJkyLevelApi';
import veJkyCategoryApi from '@/api/research/rbase/veJkyCategoryApi';

import veJkyGainEdit from './veJkyGainEdit';
import veJkyGainShow from './veJkyGainShow';

export default {
  components: {
    veJkyGainEdit,
    veJkyGainShow
  },
  data() {
    const data = {
      veJkyGainQuery: {},
      showType: 'table',
      levelNodes: [],
      categoryNodes: []
    };
    data.veJkyGainTable = {
      api: veJkyGainApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    rowBtnShowCallback(type, row) {
      if (type == 'detail' || type == 'delete') {
        return true;
      }
      if (row.projectId == 0) {
        return true;
      }
      return false;
    },
    refreshBack() {
      this.$refs.eduTree.setValue([]);
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veJkyLevelApi.all(sub).then(res => {
        this.levelNodes = res.result;
      });
      veJkyCategoryApi.all(sub).then(res => {
        this.categoryNodes = res.result;
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      const tres = this.$refs.eduTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'd.cate_Id', 'eq', tres[0]);
      }
      if (params.cgxz == 'ky') {
        //
        this.$utils.addPageConditions(params, 'd.project_id', 'eq', 0);
      } else if (params.cgxz == 'xm') {
        //
        this.$utils.addPageConditions(params, 'd.project_id', 'ne', 0);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyGainTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyGainEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyGainEdit.doUpdate(row);
      });
    },
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyGainShow.doShow(row);
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
      this.$refs.veJkyGainTable.reload();
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
</style>
