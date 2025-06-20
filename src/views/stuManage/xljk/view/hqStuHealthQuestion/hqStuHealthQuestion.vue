<template>
  <edu-layout type="table">
    <!-- 表格 -->
    <div slot="table" class="right_table">
      <div v-show="showType == 'table' || showType == 'show'">
        <edu-query ref="cwQuery" code="hqStuHealthQuestion" :do-filter="handleFilter">
          <template slot="search">
            <edu-query-item title="名称" pname="title" pop="like" stype="input"> </edu-query-item>
          </template>
        </edu-query>
        <edu-table
          ref="hqStuHealthQuestionTable"
          code="hqStuHealthQuestion"
          :api="hqStuHealthQuestionTable.api"
          :get-params="getParams"
          :config="{
            status: false,
            openText: '开始调研',
            closeText: '取消调研'
          }"
          :rowBtnShowCallback="rowBtnShowCallback"
          :to-update="handleUpdate"
          :do-add="handleCreate"
        >
          <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
          <a-table-column title="标题" dataIndex="title" width="150px"> </a-table-column>
          <a-table-column title="状态" width="70px" align="center" dataIndex="status">
            <template slot-scope="text">
              <edu-dict-text code="dioayan" :class="'status' + text" :value="text"></edu-dict-text>
            </template>
          </a-table-column>

          <template slot="bef_btn" slot-scope="{ row }">
            <edu-pms :code="'v-add'" v-if="row.status == 1" type="primary" ext="success" name="查看统计" @click="toDetail(row)"></edu-pms>
          </template>
        </edu-table>
      </div>
      <!-- 编辑页 -->
      <hqStuHealthQuestionEdit v-if="showType == 'edit'" ref="hqStuHealthQuestionEdit" @onOk="editOk" @onCancel="editCancel">
      </hqStuHealthQuestionEdit>
      <hqStuHealthQuestionShow v-if="showType == 'show'" ref="hqStuHealthQuestionShow" @onOk="editOk" @onCancel="editCancel">
      </hqStuHealthQuestionShow>
    </div>
  </edu-layout>
</template>

<script>
import hqStuHealthQuestionApi from '../../api/hqStuHealthQuestionApi';
import hqStuHealthQuestionEdit from './hqStuHealthQuestionEdit';
import hqStuHealthQuestionShow from './hqStuHealthQuestionShow';

export default {
  components: {
    hqStuHealthQuestionEdit,
    hqStuHealthQuestionShow
  },
  data() {
    const data = {
      hqStuHealthQuestionQuery: {},
      showType: 'table'
    };
    data.hqStuHealthQuestionTable = {
      api: hqStuHealthQuestionApi
    };
    return data;
  },
  mounted() {},
  methods: {
    rowBtnShowCallback(type, row) {
      if (row.status == 1) {
        return false;
      }
      return true;
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
      this.$refs.hqStuHealthQuestionTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthQuestionEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.hqStuHealthQuestionEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.hqStuHealthQuestionShow.doShow(row);
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
      this.$refs.hqStuHealthQuestionTable.reload();
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
