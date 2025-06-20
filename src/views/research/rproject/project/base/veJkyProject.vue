<template>
  <!-- 表格 -->
  <div class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyProject" :do-filter="handleFilter" @refreshBack="refreshBack">
        <template slot="search">
          <edu-query-item title="项目编号" pname="d.serial" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目完成情况" v-if="viewType != 'user'" pname="projectStatus" stype="select"  code="projectType"> </edu-query-item>
          <edu-query-item title="项目类型" stype="costom">
            <edu-tree-select @onChange="handleFilter" ref="eduTree" :check="false" :nodes="categoryNodes"></edu-tree-select>
          </edu-query-item>
          <edu-query-item
            title="项目级别"
            pname="d.level_Id"
            textKey="name"
            pop="eq"
            stype="select" 
            code="projectType"
            :datas="levelNodes"
            dtype="datas"
          >
          </edu-query-item>
          <edu-query-item title="审核情况" v-if="viewType != 'user'" pname="d.check_Status" pop="eq" stype="select"   code="projectAudit">
          </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyProjectTable"
        code="veJkyProject"
        :api="veJkyProjectTable.api"
        :get-params="getParams"
        :to-update="handleUpdate"
        :do-add="viewType == 'base' ? handleCreate : null"
        :toDetail="toDetail"
        :exportConfig="
          viewType == 'base'
            ? {
                url: 'veJkyProject/export',
                name: '《项目导出》'
              }
            : null
        "
        :doImport="viewType == 'base' ? doImport : null"
        :opWidth="350"
        :rowBtnShowCallback="rowBtnShowCallback"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false,
          checkBox: false
        }"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目编号" dataIndex="serial" width="250px"> </a-table-column>
        <a-table-column title="项目名称" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="项目类型" dataIndex="cateIdText" width="150px"> </a-table-column>
        <a-table-column title="项目级别" dataIndex="levelIdText" width="150px"> </a-table-column>
        <template v-if="viewType == 'base'">
          <a-table-column title="项目总经费" dataIndex="totalCost" width="150px"> </a-table-column>
          <a-table-column title="项目进度" dataIndex="progress" width="150px"> </a-table-column>
        </template>
        <a-table-column title="立项组织" dataIndex="createOragnText" width="150px"> </a-table-column>
        <a-table-column title="负责人" dataIndex="chargeUidText" width="150px"> </a-table-column>
        <template v-if="viewType == 'over' || viewType == 'wait'">
          <a-table-column title="项目合同号 " dataIndex="termNum" width="150px"> </a-table-column>
          <a-table-column title="项目来源 " dataIndex="source" width="150px"> </a-table-column>
          <a-table-column title="开始时间 " dataIndex="startTime" width="150px"> </a-table-column>
          <a-table-column title="结束时间 " dataIndex="endTime" width="150px"> </a-table-column>
          <a-table-column title="审批人" dataIndex="mark" width="150px"> </a-table-column>
          <a-table-column title="审核时间" dataIndex="checkTime" width="150px"> </a-table-column>
        </template>

        <a-table-column title="项目成员" v-if="viewType == 'user'" dataIndex="userNames" width="150px"> </a-table-column>
        <template v-if="viewType != 'user' && viewType != 'over' && viewType != 'wait'">
          <a-table-column title="审批人" dataIndex="mark" width="150px"> </a-table-column>
          <a-table-column title="审核时间" dataIndex="checkTime" width="150px"> </a-table-column>
          <a-table-column title="审批状态" dataIndex="checkStatus" width="150px">
            <template slot-scope="status">
              <edu-dict-text code="projectAudit" :class="'cstatus' + status" :value="status"></edu-dict-text>
            </template>
          </a-table-column>
        </template>
        <template slot="af_btn" slot-scope="{ row }">
          <edu-pms
            v-if="viewType == 'shen' && row.checkStatus == 1"
            :code="'veJkyProject-btn-detail'"
            name="审核"
            type="success"
            size="mini"
            @click="toShen(row)"
          >
          </edu-pms>
          <edu-pms
            v-if="(viewType == 'shen' || viewType == 'user') && row.checkStatus == 2"
            :code="'veJkyProject-btn-detail'"
            name="人员管理"
            type="success"
            size="mini"
            @click="toUser(row)"
          >
          </edu-pms>

          <edu-pms v-if="viewType == 'wait' && row.checkStatus == 2" :code="'eee'" name="工作管理" size="mini" @click="workAdmin(row)"> </edu-pms>
          <edu-pms v-if="viewType == 'wait' && row.checkStatus == 2" :code="'eee'" name="修改项目进度" size="mini" @click="projectJd(row)"> </edu-pms>
          <edu-pms v-if="viewType == 'wait' && row.checkStatus == 2" :code="'eee'" name="修改工作进度" size="mini" @click="workJd(row)"> </edu-pms>
        </template>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veJkyProjectEdit
      v-if="showType == 'edit'"
      :levelNodes="levelNodes"
      :categoryNodes="categoryNodes"
      :organizes="organizes"
      ref="veJkyProjectEdit"
      @onOk="editOk"
      @onCancel="editCancel"
    >
    </veJkyProjectEdit>
    <veJkyProjectShow v-if="showType == 'show'" ref="veJkyProjectShow" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectShow>
    <veJkyProjectUser v-if="showType == 'user'" ref="veJkyProjectUser" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectUser>
    <veJkyProjectWorkList v-if="showType == 'workList'" ref="veJkyProjectWorkList" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectWorkList>
    <veJkyProjectWorkPro v-if="showType == 'workPro'" ref="veJkyProjectWorkPro" @onOk="editOk" @onCancel="editCancel"> </veJkyProjectWorkPro>
  </div>
</template>

<script>
import veJkyProjectApi from '@/api/research/rproject/veJkyProjectApi';
import veJkyProjectEdit from './veJkyProjectEdit';
import veJkyProjectUser from './veJkyProjectUser';
import veJkyProjectShow from './veJkyProjectShow';
import veJkyProjectWorkList from './veJkyProjectWorkList';
import veJkyProjectWorkPro from './veJkyProjectWorkPro';
import veJkyLevelApi from '@/api/research/rbase/veJkyLevelApi';
import veJkyCategoryApi from '@/api/research/rbase/veJkyCategoryApi';
import veJkyOrganizeApi from '@/api/research/rbase/veJkyOrganizeApi';

export default {
  props: {
    viewType: {
      type: String,
      require: true
    }
  },
  components: {
    veJkyProjectEdit,
    veJkyProjectShow,
    veJkyProjectUser,
    veJkyProjectWorkPro,
    veJkyProjectWorkList
  },
  data() {
    const data = {
      veJkyProjectQuery: {},
      showType: 'table',
      levelNodes: [],
      categoryNodes: [],
      organizes: []
    };
    data.veJkyProjectTable = {
      api: veJkyProjectApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    rowBtnShowCallback(type, row) {
      if (type == 'detail') {
        return true;
      }
      if (this.viewType == 'shen') {
        return false;
      }
      if (this.viewType == 'user') {
        return false;
      }
      if (this.viewType == 'over') {
        return false;
      }
      if (this.viewType == 'wait') {
        return false;
      }
      if (type == 'update' || type == 'delete') {
        //如果审核通过不可以删除
        if (row.checkStatus == 2) {
          return false;
        }
      }
      return true;
    },
    workAdmin(row) {
      //项目进度
      this.showType = 'workList';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkList.doShow(row);
      });
      //工作管理
    },
    projectJd(row) {
      //项目进度
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyProjectShow.doShow(row, 'progress');
      });
    },
    workJd(row) {
      //工作进度
      this.showType = 'workPro';
      this.$nextTick(() => {
        this.$refs.veJkyProjectWorkPro.doShow(row);
      });
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
      veJkyOrganizeApi.all(sub).then(res => {
        this.organizes = res.result;
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      const tres = this.$refs.eduTree.getValue();
      if (tres && tres.length > 0) {
        this.$utils.addPageConditions(params, 'cate_Id', 'eq', tres[0]);
      }
      if (this.viewType == 'user') {
        //如果是人员管理
        this.$utils.addPageConditions(params, 'check_status', 'eq', 2);
      }
      if (this.viewType == 'over') {
        this.$utils.addPageConditions(params, 'progress', 'eq', 100);
        //如果是已经完成
      }
      if (this.viewType == 'wait') {
        this.$utils.addPageConditions(params, 'progress', 'ne', 100);
        //如果是未完成
      }
      if (params.projectStatus == 1) {
        this.$utils.addPageConditions(params, 'progress', 'ne', 100);
      } else if (params.projectStatus == 2) {
        this.$utils.addPageConditions(params, 'progress', 'eq', 100);
      }
      return params;
    },
    doImport() {},
    doExport() {},
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyProjectTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyProjectEdit.doUpdate(row);
      });
    },
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyProjectShow.doShow(row, 'show');
      });
    },
    toShen(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyProjectShow.doShow(row, 'audit');
      });
    },
    toUser(row) {
      this.showType = 'user';
      this.$nextTick(() => {
        this.$refs.veJkyProjectUser.doShow(row);
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
      this.$refs.veJkyProjectTable.reload();
    }
  }
};
</script>
<style lang="less" scoped>
.cstatus2 {
  color: #039471;
}
.cstatus3 {
  color: rgb(212, 117, 117);
}
.cstatus1 {
  color: #999;
}
</style>
