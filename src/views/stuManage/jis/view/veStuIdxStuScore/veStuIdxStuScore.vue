<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div>
        <edu-query ref="cwQuery" ext="boxZybmbj" code="veStuIdxStuScore" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="学号" pname="xh" pop="like" stype="input"> </edu-query-item>
            <edu-query-item title="姓名" pname="xm" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="veStuIdxStuScoreTable"
          code="veStuIdxStuScore"
          :api="veStuIdxStuScoreTable.api"
          :get-params="getParams"
          :config="{
            open: false,
            close: false,
            status: false,
            delete: false
          }"
          :isShowTopBtn="false"
          :toDetail="toDetail"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="学号" dataIndex="xh" width="150px"> </a-table-column>
          <a-table-column title="姓名" dataIndex="xm" width="150px"> </a-table-column>
          <a-table-column title="专业部" dataIndex="falText" width="150px"> </a-table-column>
          <a-table-column title="专业" dataIndex="specText" width="150px"> </a-table-column>
          <a-table-column title="班级" dataIndex="bjText" width="150px"> </a-table-column>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <veStuIdxStuScoreEdit v-if="showType == 'edit'" ref="veStuIdxStuScoreEdit" @onOk="editOk" @onCancel="editCancel"> </veStuIdxStuScoreEdit>
      <veStuIdxStuScoreShow v-if="showType == 'show'" ref="veStuIdxStuScoreShow" @onOk="editOk" @onCancel="editCancel"> </veStuIdxStuScoreShow>
    </div>
  </edu-layout>
</template>

<script>
import veStuIdxStuScoreApi from '@/views/stuManage/jis/api/veStuIdxStuScoreApi';
import veStuIdxStuScoreEdit from './veStuIdxStuScoreEdit';
import veStuIdxStuScoreShow from './veStuIdxStuScoreShow';

export default {
  components: {
    veStuIdxStuScoreEdit,
    veStuIdxStuScoreShow
  },
  data() {
    const data = {
      veStuIdxStuScoreQuery: {},
      showType: 'table'
    };
    data.veStuIdxStuScoreTable = {
      api: veStuIdxStuScoreApi
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
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veStuIdxStuScoreTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuIdxStuScoreEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuIdxStuScoreEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuIdxStuScoreShow.doShow(row);
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
      this.$refs.veStuIdxStuScoreTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
