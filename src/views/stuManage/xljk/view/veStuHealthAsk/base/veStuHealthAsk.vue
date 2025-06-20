<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" code="veStuHealthAsk" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="标题" pname="title" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veStuHealthAskTable"
        code="veStuHealthAsk"
        :api="veStuHealthAskTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          delete: viewType == 'my',
          status: false
        }"
        :toDetail="toDetail"
        :do-add="viewType == 'my' ? handleCreate : null"
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="姓名" dataIndex="name" width="150px"> </a-table-column>
        <a-table-column title="标题" dataIndex="title" width="150px"> </a-table-column>
        <a-table-column title="问题内容" dataIndex="content" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veStuHealthAskEdit v-if="showType == 'edit'" ref="veStuHealthAskEdit" @onOk="editOk" @onCancel="editCancel"> </veStuHealthAskEdit>
    <veStuHealthAskShow v-if="showType == 'show'" ref="veStuHealthAskShow" @onOk="editOk" @onCancel="editCancel"> </veStuHealthAskShow>
  </div>
</template>

<script>
import veStuHealthAskApi from '../../../api/veStuHealthAskApi';
import veStuHealthAskEdit from './veStuHealthAskEdit';
import veStuHealthAskShow from './veStuHealthAskShow';

export default {
  props: {
    viewType: String
  },
  components: {
    veStuHealthAskEdit,
    veStuHealthAskShow
  },
  data() {
    const data = {
      veStuHealthAskQuery: {},
      showType: 'table'
    };
    data.veStuHealthAskTable = {
      api: veStuHealthAskApi
    };
    return data;
  },
  mounted() {},
  methods: {
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
      this.$refs.veStuHealthAskTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHealthAskEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veStuHealthAskEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veStuHealthAskShow.doShow(row);
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
      this.$refs.veStuHealthAskTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
