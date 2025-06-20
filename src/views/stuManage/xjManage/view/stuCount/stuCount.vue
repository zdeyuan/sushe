<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veBaseStudent" ext="boxZybmbj" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="身份证号" pname="sfzh" pop="like" stype="input"> </edu-query-item>
          <edu-query-item title="学籍状态" pname="xsdqztm" pop="like" stype="select" code="stuStatye"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veBaseStudentTable"
        code="veBaseStudent"
        :api="veBaseStudentTable.api"
        :get-params="getParams"
        :exportConfig="{
          url: 'veBaseStudent/export',
          name: '《学生信息表导出》'
        }"
        :config="{
          open: false,
          close: false,
          status: false,
          delete: false,
          bdelete: false
        }"
        :sorts="[
          {
            column: 'd.id',
            asc: false
          }
        ]"
        :tableX="2000"
        :toDetail="toDetail"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="学号" fixed="left" dataIndex="xh" width="150px"> </a-table-column>
        <a-table-column title="姓名" fixed="left" dataIndex="xm" width="100px"> </a-table-column>
        <a-table-column title="性别" fixed="left" dataIndex="xbm" width="60px">
          <template slot-scope="value">
            <edu-dict-text code="sexStr" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="身份证号" fixed="left" dataIndex="sfzh" width="200px"> </a-table-column>
        <a-table-column title="状态" fixed="left" dataIndex="xsdqztm" width="100px">
          <template slot-scope="value">
            <edu-dict-text code="stuStatye" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="所属年级" dataIndex="gradeText" width="150px"> </a-table-column>
        <a-table-column title="所属专业部" dataIndex="falText" width="150px"> </a-table-column>
        <a-table-column title="所属专业" dataIndex="specText" width="150px"> </a-table-column>
        <a-table-column title="所属班级" dataIndex="bjText" width="150px"> </a-table-column>
        <a-table-column title="学制" dataIndex="xz" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="xz" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="学生联系电话" dataIndex="xslxdh" width="150px"> </a-table-column>
        <a-table-column title="信箱" dataIndex="dzxx" width="200px"> </a-table-column>

        <a-table-column title="所在省份" dataIndex="province" width="150px"> </a-table-column>
        <a-table-column title="所在市" dataIndex="city" width="150px"> </a-table-column>
        <a-table-column title="所在区" dataIndex="county" width="150px"> </a-table-column>
        <a-table-column title="家庭地址" dataIndex="jtdz" width="150px"> </a-table-column>

        <a-table-column title="是否低保" dataIndex="sfdb" width="120px">
          <template slot-scope="value">
            <edu-dict-text code="shifou" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="报名号" dataIndex="bmh" width="200px"> </a-table-column>

        <a-table-column title="民族" dataIndex="mzm" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="mzm" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="健康状况" dataIndex="jkzkm" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="jkzkm" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="政治面貌" dataIndex="zzmmm" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="zzmmm" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="户口类别" dataIndex="hklbm" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="hklbm" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="是否是流动人口" dataIndex="sfsldrk" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="sfsldrk" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
        <a-table-column title="就读方式" dataIndex="jdfs" width="150px">
          <template slot-scope="value">
            <edu-dict-text code="jdfs" :value="value"></edu-dict-text>
          </template>
        </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veBaseStudentEdit v-if="showType == 'edit'" ref="veBaseStudentEdit" @onOk="editOk" @onCancel="editCancel"> </veBaseStudentEdit>
    <veBaseStudentShow v-if="showType == 'show'" ref="veBaseStudentShow" @onOk="editOk" @onCancel="editCancel"> </veBaseStudentShow>
  </div>
</template>

<script>
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import veBaseStudentEdit from '../veBaseStudent/veBaseStudentEdit';
import veBaseStudentShow from '../veBaseStudent/veBaseStudentShow';

export default {
  components: {
    veBaseStudentEdit,
    veBaseStudentShow
  },
  data() {
    const data = {
      veBaseStudentQuery: {},
      showType: 'table'
    };
    data.veBaseStudentTable = {
      api: veBaseStudentApi
    };
    return data;
  },
  mounted() {},
  methods: {
    doImport() {
      return {
        temp: [
          '学生ID' /* 123 */,
          '曾用名',
          '出生日期',
          '籍贯',
          '健康状况码',
          '政治面貌码',
          '户口类别码',
          '是否是流动',
          '家庭地址',
          '家庭联系电话',
          '特长',
          '学生联系电话',
          '电子信箱',
          '照片',
          '即时通讯号',
          '是否低保0否1是',
          '毕业学校',
          '报名方式',
          '入学成绩',
          '家庭地址是否公开 1公开2不公开',
          '联系电话是否公开 1公开2不公开'
        ],
        tempName: '学生基本信息',
        implName: 'veBaseStudentInfoServiceImpl.importExcel'
      };
    },
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veBaseStudentTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veBaseStudentEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veBaseStudentEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veBaseStudentShow.doShow(row);
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
      this.$refs.veBaseStudentTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
