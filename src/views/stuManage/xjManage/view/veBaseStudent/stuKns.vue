<template>
  <!-- 表格 -->
  <edu-layout type="table">
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" code="veBaseStudent" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学号" pname="d.xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="d.xm" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="身份证号" pname="d.sfzh" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veBaseStudentTable"
          code="veBaseStudent"
          :api="veBaseStudentTable.api"
          :get-params="getParams"
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
          :toDetail="toDetail"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="姓名" fixed="left" dataIndex="xm" width="100px"> </a-table-column>
          <a-table-column title="学号" fixed="left" dataIndex="xh" width="150px"> </a-table-column>
          <a-table-column title="入学年月" fixed="left" dataIndex="rxny" width="200px">
            <template slot-scope="value">
              {{ $date.intTime(value) }}
            </template>
          </a-table-column>
          <a-table-column title="性别" fixed="left" dataIndex="xbm" width="60px">
            <template slot-scope="value">
              <edu-dict-text code="sexStr" :value="value"></edu-dict-text>
            </template>
          </a-table-column>
          <a-table-column title="身份证号" fixed="left" dataIndex="sfzh" width="200px"> </a-table-column>
          <a-table-column title="生源地" fixed="left" dataIndex="shengId" width="200px">
            <template slot-scope="value">
              --
            </template>
          </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veBaseStudentEdit v-if="showType == 'edit'" ref="veBaseStudentEdit" @onOk="editOk" @onCancel="editCancel"> </veBaseStudentEdit>
      <veBaseStudentShow v-if="showType == 'show'" ref="veBaseStudentShow" @onOk="editOk" @onCancel="editCancel"> </veBaseStudentShow> </div
  ></edu-layout>
</template>

<script>
import veBaseStudentApi from '@/views/stuManage/xjManage/api/veBaseStudentApi';
import veBaseStudentEdit from './veBaseStudentEdit';
import veBaseStudentShow from './veBaseStudentShow';

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
    /**
     * @msg: 表格获取请求数据 必须return 一个对象
     */
    getParams() {
      const params = this.$refs['cwQuery'].getQueryData({ base: true });

      this.$utils.addPageConditions(params, 'SFKNS', 'eq', 1);

      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veBaseStudentTable.reload();
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
