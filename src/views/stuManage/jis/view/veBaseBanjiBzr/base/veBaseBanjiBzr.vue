<template>
  <!-- 表格 -->
  <div slot="table" class="right_table">
    <div>
      <edu-query ref="cwQuery" ext="boxZybmbj" code="veBaseBanjiBzr" :do-filter="handleFilter">
        <template slot="search">
          <edu-query-item title="班级名称" pname="xzbmc" pop="like" stype="input"> </edu-query-item>
        </template>
      </edu-query>
      <edu-table
        ref="veBaseBanjiBzrTable"
        code="veBaseBanjiBzr"
        :api="veBaseBanjiBzrTable.api"
        :get-params="getParams"
        :config="{
          open: false,
          close: false,
          status: false,
          bdelete: false
        }"
        :to-update="handleUpdate"
        :toDetail="toDetail"
        isAutoBtn
      >
        <!--         <template slot-scope="text, record, index">
       <span></span>
       </template>-->
        <a-table-column title="班主任" dataIndex="bzrUserName" width="150px"> </a-table-column>
        <a-table-column title="班级名称" dataIndex="xzbmc" width="150px"> </a-table-column>
        <a-table-column title="所属年级" dataIndex="njmc" width="150px"> </a-table-column>
        <a-table-column title="所属专业" dataIndex="zymc" width="150px"> </a-table-column>
        <a-table-column title="毕业时间 " dataIndex="bysj" width="150px">
          <template slot-scope="text">
            <span>{{ $date.formatData(text * 1000, 'YYYY-MM-DD') }}</span>
          </template>
        </a-table-column>
        <a-table-column title="男生数" dataIndex="nansrs" width="150px"> </a-table-column>
        <a-table-column title="女生数 " dataIndex="nvsrs" width="150px"> </a-table-column>
      </edu-table>
    </div>
    <!-- 编辑页 -->
    <veBaseBanjiBzrEdit v-if="showType == 'edit'" ref="veBaseBanjiBzrEdit" @onOk="editOk" @onCancel="editCancel"> </veBaseBanjiBzrEdit>
    <veBaseBanjiBzrShow v-if="showType == 'show'" ref="veBaseBanjiBzrShow" @onOk="editOk" @onCancel="editCancel"> </veBaseBanjiBzrShow>
  </div>
</template>

<script>
import veBaseBanjiBzrApi from '@/views/stuManage/jis/api/veBaseBanjiBzrApi';
import veBaseBanjiBzrEdit from './veBaseBanjiBzrEdit';
import veBaseBanjiBzrShow from './veBaseBanjiBzrShow';

export default {
  props: {
    viewType: String
  },
  components: {
    veBaseBanjiBzrEdit,
    veBaseBanjiBzrShow
  },
  data() {
    const data = {
      veBaseBanjiBzrQuery: {},
      showType: 'table'
    };
    data.veBaseBanjiBzrTable = {
      api: veBaseBanjiBzrApi
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
      if (this.viewType == 'now') {
        this.$utils.addPageConditions(params, 'is_current', 'eq', 1);
      } else {
        this.$utils.addPageConditions(params, 'is_current', 'eq', 0);
      }
      return params;
    },
    /**
     * @msg: 搜索事件
     */
    handleFilter() {
      this.$refs.veBaseBanjiBzrTable.reload();
    },
    /**
     * @msg: 新增事件
     */
    handleCreate() {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veBaseBanjiBzrEdit.doCreate();
      });
    },
    /**
     * @msg: 编辑行事件
     */
    handleUpdate(row) {
      this.showType = 'edit';
      this.$nextTick(() => {
        this.$refs.veBaseBanjiBzrEdit.doUpdate(row);
      });
    },
    /**
     * @msg: 编辑行事件
     */
    toDetail(row) {
      this.showType = 'show';
      this.$nextTick(() => {
        this.$refs.veBaseBanjiBzrShow.doShow(row);
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
      this.$refs.veBaseBanjiBzrTable.reload();
    }
  }
};
</script>
<style lang="less" scoped></style>
getQueryData