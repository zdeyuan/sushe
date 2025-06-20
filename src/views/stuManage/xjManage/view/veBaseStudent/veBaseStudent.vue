<template>
  <!-- 表格 -->
  <edu-layout type="table">
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veBaseStudent" :ext="$hasPer([`system`, `bzr`]) ? 'boxZybmbj' : ''"
          :showZybAndnj="$hasPer([`bzr`]) ? false : true" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="身份证号" pname="sfzh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="学籍状态" pname="xsdqztm" pop="like" stype="select" code="stuStatye"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table ref="veBaseStudentTable" code="veBaseStudent" :api="veBaseStudentTable.api" :get-params="getParams"
          :exportConfig="$hasPer(['system', 'bzr']) ? {
            url: 'veBaseStudent/export',
            name: '《学生信息表导出》'
          } : null" type="stu" :doImport="$hasPer(['system', 'bzr']) ? doImport : null"
          :mburl="'/stu/veBaseStudent/exportTemp'" :config="{
            open: false,
            close: false,
            status: false,
            delete: $hasPer(['system', 'bzr']) ? true : false,
            bdelete: $hasPer(['system', 'bzr']) ? true : false,
          }" :sorts="[
            {
              column: 'xh',
              asc: true
            }
          ]" :tableX="2000" :toDetail="toDetail" :do-add="$hasPer(['system', 'bzr']) ? handleCreate : null"
          :to-update="$hasPer(['system', 'bzr']) ? handleUpdate : null">
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
          <!-- <template slot="bef_btn" slot-scope="{ row }">
            <edu-pms :code="'v-add'" type="primary" ext="success" name="学生成绩单" @click="showStuScore(row)"></edu-pms>
          </template> -->
        </edu-table>
      </div>
      <veStuScoreReport v-if="showType == 'info'" ref="veStuScoreReport" @onOk="editOk" @onCancel="editCancel"
        :stuVo="veBaseStudentQuery.stuVo"> </veStuScoreReport>
      <!-- 编辑页 -->
      <veBaseStudentEdit v-if="showType == 'edit'" ref="veBaseStudentEdit" @onOk="editOk" @onCancel="editCancel">
      </veBaseStudentEdit>
      <veBaseStudentShow v-if="showType == 'show'" ref="veBaseStudentShow" @onOk="editOk" @onCancel="editCancel">
      </veBaseStudentShow>
    </div>
  </edu-layout>
</template>

<script>
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import veBaseStudentEdit from './veBaseStudentEdit';
import veBaseStudentShow from './veBaseStudentShow';
import veStuScoreReport from '@/views/stuManage/kqtj/view/veStuScoreReport';
export default {
  components: {
    veBaseStudentEdit,
    veBaseStudentShow,
    veStuScoreReport
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
  mounted() { },
  methods: {
    doImport() {
      return {
        temp: [
          '序号',
          '身份证号',
          '学号' /* 123 */,
          '姓名',
          '性别',
          '民族',
          '所属年级',
          '入学年月',
          '修读专业',
          '学制',
          '班级',
          '所在省份',
          '所在市',
          '所在区',
          '详情地址',
          '报名号',
          '健康状况',
          '政治面貌',
          '户口类别',
          '是否低保',
          '就读方式',
          '状态'
        ],
        tempName: '学籍模板'
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
    },
    showStuScore(row) {
      // 学生成绩单 TODO
      this.veBaseStudentQuery.stuVo = { stuId: row.id, stuName: row.xm }
      this.showType = 'info';
      this.$nextTick(() => {
        this.$refs.veStuScoreReport.handleFilter();
      });
    },
  }
};
</script>
<style lang="less" scoped></style>
