<template>
  <div class="edit_form">
    <!-- 编辑页 -->
    <edu-form :title="'会议[' + meetPo.title + '] - 会议纪要'" width="70%" size="big" :isShowBtn="false" @cancel="cancelNow">
      <div class="right_table">
        <div>
          <edu-query ref="cwQuery" code="veJkyMeetSummary" :do-filter="handleFilter">
            <template slot="search">
              <edu-query-item title="纪要标题" pname="d.title" pop="like" stype="input"> </edu-query-item>
            </template>
          </edu-query>
          <edu-table
            ref="veJkyMeetSummaryTable"
            code="veJkyMeetSummary"
            :api="veJkyMeetSummaryTable.api"
            :get-params="getParams"
            :to-update="handleUpdate"
            :toDetail="toDetail"
            :do-add="handleCreate"
            :config="{
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
            <a-table-column title="纪要标题" dataIndex="title" width="150px"> </a-table-column>
            <a-table-column title="纪要内容" dataIndex="content"> </a-table-column>
            <a-table-column title="创建用户" dataIndex="createName" width="150px"> </a-table-column>
            <a-table-column title="创建时间" dataIndex="createTime" width="150px"> </a-table-column>
          </edu-table>
        </div>
        <!-- 编辑页 -->
        <veJkyMeetSummaryEdit v-if="showType == 'edit'" ref="veJkyMeetSummaryEdit" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetSummaryEdit>
        <veJkyMeetSummaryShow v-if="showType == 'show'" ref="veJkyMeetSummaryShow" @onOk="editOk" @onCancel="editCancel"> </veJkyMeetSummaryShow>
      </div>
    </edu-form>
  </div>
</template>

<script>
import veJkyMeetSummaryApi from '@/api/research/rwork/veJkyMeetSummaryApi';
import veJkyMeetSummaryEdit from './veJkyMeetSummaryEdit';
import veJkyMeetSummaryShow from './veJkyMeetSummaryShow';

export default {
  components: { veJkyMeetSummaryEdit, veJkyMeetSummaryShow },
  data() {
    const data = {
      showType: 'table'
    };
    data.veJkyMeetSummaryTable = {
      api: veJkyMeetSummaryApi
    };
    data.meetPo = {};
    return data;
  },
  mounted() {},
  methods: {
    doShow(row) {
      this.meetPo = row;
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
      this.$refs.veJkyMeetSummaryTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryEdit.doCreate(this.meetPo);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryEdit.doUpdate(this.meetPo, row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veJkyMeetSummaryShow.doShow(this.meetPo, row);
      });
    },
    /**
     * @msg: 编辑页取消事件
     */
    editCancel() {
      this.showType = 'table';
    },
    cancelNow() {
      this.$emit('onCancel');
    },
    /**
     * @msg: 编辑页成功事件
     */
    editOk() {
      this.showType = 'table';
      this.$refs.veJkyMeetSummaryTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
