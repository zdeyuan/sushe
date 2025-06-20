<template>
  <!-- 表格 -->
  <div class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veJkyProject" :do-filter="handleFilter" @refreshBack="refreshBack">
        <template slot="search">
          <edu-query-item title="项目编号" pname="d.serial" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目名称" pname="d.name" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="项目完成情况" v-if="viewType != 'user'" pname="projectStatus" stype="select" code="projectType"> </edu-query-item>
          <edu-query-item title="项目类型" stype="costom">
            <edu-tree-select @onChange="handleFilter" ref="eduTree" width="200px" :check="false" :nodes="categoryNodes"></edu-tree-select>
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
          <edu-query-item title="审核情况" v-if="viewType != 'user'" pname="d.check_Status" pop="eq" stype="select"  code="projectAudit">
          </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veJkyProjectTable"
        code="veJkyProject"
        :api="veJkyProjectTable.api"
        :get-params="getParams"
        :toDetail="toDetail"
        :exportConfig="{
          url: 'veJkyProject/countProjectExport',
          name: '《项目统计导出表》'
        }"
        :opWidth="150"
        :config="{
          pageFn: 'countProject',
          open: false,
          close: false,
          status: false,
          bdelete: false,
          delete: false,
          checkBox: false
        }"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="项目编号" dataIndex="serial" width="160px"> </a-table-column>
        <a-table-column title="项目名称" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="项目进度" dataIndex="progress" width="100px">
          <template slot-scope="progress"> {{ progress }}% </template>
        </a-table-column>
        <a-table-column title="项目类型" dataIndex="cateIdText" width="100px"> </a-table-column>
        <a-table-column title="项目级别" dataIndex="levelIdText" width="100px"> </a-table-column>
        <a-table-column title="立项组织" dataIndex="createOragnText" width="100px"> </a-table-column>
        <a-table-column title="项目来源 " dataIndex="source" width="100px"> </a-table-column>
        <a-table-column title="项目成员" dataIndex="userNames" width="150px"> </a-table-column>
        <a-table-column title="负责人" dataIndex="chargeUidText" width="100px"> </a-table-column>
        <a-table-column title="项目成果个数" dataIndex="fruitNum" width="150px"> </a-table-column>
        <a-table-column title="项目工作个数 " dataIndex="workNums" width="150px"> </a-table-column>
        <a-table-column title="开始时间 " dataIndex="startTime" width="120px"> </a-table-column>
        <a-table-column title="结束时间 " dataIndex="endTime" width="120px"> </a-table-column>
      </edu-table>
    </div>
    <projectCountShow v-if="showType == 'show'" showFruit :showAudit="false" ref="projectCountShow" @onOk="editOk" @onCancel="editCancel">
    </projectCountShow>
  </div>
</template>

<script>
import veJkyProjectApi from '@/api/research/rproject/veJkyProjectApi';
import projectCountShow from '../base/veJkyProjectShow';
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
    projectCountShow
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
      if (params.projectStatus == 1) {
        this.$utils.addPageConditions(params, 'progress', 'ne', 100);
      } else if (params.projectStatus == 2) {
        this.$utils.addPageConditions(params, 'progress', 'eq', 100);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veJkyProjectTable.reload();
    },
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.projectCountShow.doShow(row, 'show');
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
