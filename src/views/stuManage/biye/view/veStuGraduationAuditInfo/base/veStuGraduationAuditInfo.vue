<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" ext="boxZybmbj" :nianji="false" bjStart="s." code="veStuGraduationAuditInfo" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="审核状态" pname="audit_status" code="biyeStatus" pop="eq" stype="select"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuGraduationAuditInfoTable"
        code="veStuGraduationAuditInfo"
        :api="veStuGraduationAuditInfoTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          status: false,
          delete: false,
          checkBox: false
        }"
      >
        <template slot="af_btn" slot-scope="{ row }">
          <edu-pms :code="'aaa'" name="学籍" ext="tedit" type="success" size="mini" @click="handleStuShow(row)"> </edu-pms>
          <edu-pms :code="'aaa'" name="审核" v-if="row.auditStatus == -1" ext="tdo" type="success" size="mini" @click="handleUpdate(row)"> </edu-pms>
          <edu-pms :code="'aaa'" name="修改" v-if="row.auditStatus == 0" ext="tdo" type="success" size="mini" @click="handleUpdate(row)"> </edu-pms>
        </template>

        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="姓名" dataIndex="xm" width="150px"> </a-table-column>
        <a-table-column title="学号" dataIndex="xh" width="150px"> </a-table-column>
        <a-table-column title="身份证号" dataIndex="sfzh" width="250px"> </a-table-column>
        <a-table-column title="所属专业部" dataIndex="falText" width="150px"> </a-table-column>
        <a-table-column title="所属专业" dataIndex="specText" width="150px"> </a-table-column>
        <a-table-column title="所属班级" dataIndex="bjText" width="150px"> </a-table-column>
        <a-table-column title="学制" dataIndex="xz" width="150px"> </a-table-column>
        <a-table-column title="审核状态" dataIndex="auditStatus" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="biyeStatus" :class="'status' + value" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veBaseStudentShow v-if="showType == 'showStu'" ref="veBaseStudentShow" @onOk="editOk" @onCancel="editCancel"> </veBaseStudentShow>
    <veStuGraduationAuditInfoEdit
      :viewType="viewType"
      v-if="showType == 'edit'"
      ref="veStuGraduationAuditInfoEdit"
      @onOk="editOk"
      @onCancel="editCancel"
    >
    </veStuGraduationAuditInfoEdit>
    <veStuGraduationAuditInfoShow v-if="showType == 'show'" ref="veStuGraduationAuditInfoShow" @onOk="editOk" @onCancel="editCancel">
    </veStuGraduationAuditInfoShow>
  </div>
</template>

<script>
import veStuGraduationAuditInfoApi from '@/views/stuManage/biye/api/veStuGraduationAuditInfoApi';
import veStuGraduationAuditInfoEdit from './veStuGraduationAuditInfoEdit';
import veStuGraduationAuditInfoShow from './veStuGraduationAuditInfoShow';
import veBaseStudentShow from '@/views/stuManage/xjManage/view/veBaseStudent/veBaseStudentShow';
export default {
  components: {
    veStuGraduationAuditInfoEdit,
    veStuGraduationAuditInfoShow,
    veBaseStudentShow
  },
  props: {
    viewType: String
  },
  data() {
    const data = {
      veStuGraduationAuditInfoQuery: {},
      showType: 'table'
    };
    data.veStuGraduationAuditInfoTable = {
      api: veStuGraduationAuditInfoApi
    };
    return data;
  },
  mounted() {},
  methods: {
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });
      //(BZR=>班主任，CJ=>成绩（学分），CW=>财务，XSC=>学生处)
      this.$utils.addPageConditions(params, 'audit_type', 'eq', this.viewType);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuGraduationAuditInfoTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuGraduationAuditInfoEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuGraduationAuditInfoEdit.doUpdate(row,this.viewType);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuGraduationAuditInfoShow.doShow(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleStuShow(row) {
      this.showType = 'showStu';
      this.$nextTick(() => {
        this.$refs.veBaseStudentShow.doShow(null, row.stuId);
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
      this.$refs.veStuGraduationAuditInfoTable.reload();
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
.status-1 {
  color: #999;
}
</style>
