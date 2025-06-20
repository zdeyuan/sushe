<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veStuCheck" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学生姓名" pname="s.xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学生学号" pname="s.xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="考勤类型" pname="d.type_id" textKey="title" pop="eq" stype="select" :datas="typeNodes" dtype="datas">
            </edu-query-item>
            <edu-query-item title="考勤名称" pname="d.course_name" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuCheckTable"
          code="veStuCheck"
          :api="veStuCheckTable.api"
          :get-params="getParams"
          :exportConfig="{
            url: 'veStuCheck/export',
            name: '《考勤信息表导出》'
          }"
          :config="{
            open: false,
            close: false,
            status: false
          }"
          :sorts="[
            {
              column: 'd.create_date',
              asc: true
            }
          ]"
          :toDetail="toDetail"
          :do-add="handleCreate"
          :doImport="doImport"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学生姓名" dataIndex="xm" width="150px"> </a-table-column>
          <a-table-column title="学生学号" dataIndex="xh" width="150px"> </a-table-column>
          <a-table-column title="班级名称" dataIndex="bjText" width="150px"> </a-table-column>
          <a-table-column title="考勤类型" dataIndex="typeName" width="150px"> </a-table-column>
          <a-table-column title="考勤名称" dataIndex="courseName" width="150px"> </a-table-column>
          <a-table-column title="异常时间" dataIndex="checkTime" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuCheckEdit v-if="showType == 'edit'" :typeNodes="typeNodes" ref="veStuCheckEdit" @onOk="editOk" @onCancel="editCancel"> </veStuCheckEdit>
      <veStuCheckShow v-if="showType == 'show'" ref="veStuCheckShow" @onOk="editOk" @onCancel="editCancel"> </veStuCheckShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuCheckTypeApi from '../../api/veStuCheckTypeApi';
import veStuCheckApi from '../../api/veStuCheckApi';
import veStuCheckEdit from './veStuCheckEdit';
import veStuCheckShow from './veStuCheckShow';
import { baseMixins } from '@/mixins/baseMixins';

export default {
  // mixins: [baseMixins],
  components: {
    veStuCheckEdit,
    veStuCheckShow
  },
  data() {
    const data = {
      veStuCheckQuery: {},
      showType: 'table',
      typeNodes: []
    };
    data.veStuCheckTable = {
      api: veStuCheckApi
    };
    return data;
  },
  mounted() {
    this.initData();
  },
  methods: {
    doImport() {
      return {
        temp: ['学生姓名', '学生学号', '考勤类型', '考勤名称', '异常时间', '备注'],
        tempName: '考勤信息',
        implName: 'veStuCheckServiceImpl.importExcel'
      };
    },
    initData() {
      const sub = {
        conditions: [{ operator: 'eq', column: 'status', value: 1 }]
      };
      veStuCheckTypeApi.all(sub).then(res => {
        this.typeNodes = res.result;
      });
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData();
      // this.$utils.addPageConditions(params, 'd.create_by', 'eq', this.loginInfo.userId);
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuCheckTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuCheckEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuCheckShow.doShow(row);
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
      this.$refs.veStuCheckTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
